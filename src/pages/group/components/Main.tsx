import React from "react";
import {Group} from "../../../constants/types";
import {Header, Segment} from "semantic-ui-react";
import ReactMarkdown from "react-markdown";

export interface MainProps {
    group: Group
}

function Main(props: MainProps) {
    const {group} = props;

    return (
        <>
            <Segment vertical>
                <Header as="h1">
                    {group.name}
                    <Header.Subheader>
                        <a href={`${group.website}`}>{group.website}</a>
                    </Header.Subheader>
                </Header>
            </Segment>
            <Segment vertical>
                <ReactMarkdown source={group.description}/>
            </Segment>
        </>
    );
}

export default Main;
