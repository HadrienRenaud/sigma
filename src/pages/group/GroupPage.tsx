import React from "react";
import {Container} from "semantic-ui-react";
import Main from "./components/Main";

export interface GroupPageProps {
    match?: {
        params: {
            group?: string
        }
        url: string
    }
}

function GroupPage(props: GroupPageProps) {
    const match = props.match;
    const gid = match && match.params.group;

    return (
        <Container>
            {gid && (
                <Main gid={gid}/>
            )}
        </Container>
    );
}

export default GroupPage;
