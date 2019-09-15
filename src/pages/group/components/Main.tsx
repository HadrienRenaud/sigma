import React from "react";
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import {groupBase} from "../../../services/apollo/fragments/group";
import {Group} from "../../../constants/types";
import {Header, Segment} from "semantic-ui-react";
import ReactMarkdown from "react-markdown";
import GraphQLError from "../../../components/Messages/Errors";

export interface MainProps {
    gid: string
}

const GET_GROUP = gql`
    query getGroup($gid: ID!) {
        group(gid: $gid) {
            ...groupBase
        }
    }
    ${groupBase}
`;

function Main(props: MainProps) {
    const {gid} = props;
    const {data, error, loading} = useQuery<{ group: Group }, { gid: string }>(
        GET_GROUP,
        {
            variables: {gid}
        }
    );

    const group = data && data.group;

    return (
        <>
            {error && <GraphQLError error={error}/>}
            {loading && <GraphQLError error={error}/>}
            {group && (
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
            )}

        </>
    );
}

export default Main;
