import React, {useContext} from "react";
import UserContext from "../../../components/UserContext/context";
import {useMutation} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import {Button, ButtonProps} from "semantic-ui-react";
import {UserBase} from "../../../services/apollo/fragments/user";

export interface ParticipateButtonProps {
    eid: string
    participatingUsers: UserBase[]
    refresh: () => void
}

interface SubButtonProps {
    eid: string
    refresh: () => void
    buttonProps: ButtonProps
}

const PARTICIPATE = gql`
    mutation participate ($eid: ID!){
        userParticipate(forEvent: $eid)
    }
`;

const UNPARTICIPATE = gql`
    mutation unparticipate($eid: ID!) {
        userUnparticipate(forEvent: $eid)
    }
`;

function UnparticipateSubButton(props: SubButtonProps) {
    const [unparticipate, {loading}] = useMutation<{ userUnparticipate: boolean }, { eid: string }>(UNPARTICIPATE, {
        variables: {eid: props.eid},
        onCompleted: data1 => data1 && props.refresh(),
    });

    return (<Button
        {...props.buttonProps}
        content="Ne plus participer"
        icon="calendar check outline"
        color="yellow"
        loading={loading}
        onClick={() => unparticipate()}
    />)
}

function ParticipateSubButton(props: SubButtonProps) {
    const [unparticipate, {loading}] = useMutation<{ userParticipate: boolean }, { eid: string }>(PARTICIPATE, {
        variables: {eid: props.eid},
        onCompleted: data1 => data1 && props.refresh(),
    });

    return (<Button
        {...props.buttonProps}
        content="Participer"
        icon="calendar plus"
        color="green"
        loading={loading}
        onClick={() => unparticipate()}
    />)
}

function ParticipateButton(props: ParticipateButtonProps) {
    const {eid, participatingUsers, refresh} = props;
    const {user} = useContext(UserContext);

    const doesUserParticipate = user && participatingUsers.map(u => u.uid).indexOf(user.uid) !== -1;

    const buttonProps: ButtonProps = {
        floated: 'right',
    };

    return doesUserParticipate
        ? <UnparticipateSubButton buttonProps={buttonProps} refresh={refresh} eid={eid}/>
        : <ParticipateSubButton buttonProps={buttonProps} refresh={refresh} eid={eid}/>
}

export default ParticipateButton;
