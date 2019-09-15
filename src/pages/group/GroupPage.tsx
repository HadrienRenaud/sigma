import React from "react";

export interface GroupPageProps {
    match?: {
        params: {
            group?: string
        }
    }
}

function GroupPage(props: GroupPageProps) {
    console.log('GroupPage.tsx props:', props);

    const gid = props.match && props.match.params.group;

    return (
        <>
            Group {gid}
        </>
    );
}

export default GroupPage;
