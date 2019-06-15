import React from "react";
import PropTypes from "prop-types";
import {Button, Icon, Message, Segment} from "semantic-ui-react";
import {UserContext} from "../utils/contexts.jsx";
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import Portal from "semantic-ui-react/dist/commonjs/addons/Portal";

const PARTICIPATE = gql`
    mutation participate($mid: ID!) {
        userParticipate(forEvent: $mid)
    }
`;
const UNPARTICIPATE = gql`
    mutation unparticipate($mid: ID!) {
        userUnparticipate(forEvent: $mid)
    }
`;

const messageStyle = {
    left: '40%',
    position: 'fixed',
    top: '5%',
    zIndex: 1000,
};


class ButtonParticipate extends React.Component {
    handleMutationCompleted(status) {
        if (this.props.onChange)
            this.props.onChange();
        if (!status) {
            this.setState({
                portalOpen: true,
            });
            this.timeout = setTimeout(() => this.setState({portalOpen: false}), 5000);
        }
    }

    handleMutationRequested(action) {
        if (this.timeout) {
            this.setState({portalOpen: false});
            clearTimeout(this.timeout);
        }
        action();
    }

    static propTypes = {
        participatingUid: PropTypes.arrayOf(PropTypes.string).isRequired,
        onChange: PropTypes.func,
        mid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        floated: PropTypes.string,
    };

    state = {
        portalOpen: false,
        mutationResult: ""
    };

    render() {
        let user = this.context;
        let userParticipate = this.props.participatingUid.indexOf(user.uid) !== -1;

        let portal = <Portal
            onClose={() => this.setState({portalOpen: false})}
            open={this.state.portalOpen}
        >
            <Message
                style={messageStyle}
                error
            >
                <Message.Header>Error: Mutation could not be applied</Message.Header>
                <Message.List>
                    <Message.Item>The changes could not be applied.</Message.Item>
                    <Message.Item>
                        Contact your administrator and/or an admin of the event.
                    </Message.Item>
                </Message.List>
            </Message>
        </Portal>;

        if (userParticipate)
            return <Mutation
                mutation={UNPARTICIPATE}
                variables={{mid: this.props.mid}}
                onCompleted={({userUnparticipate}) => this.handleMutationCompleted(userUnparticipate)}
            >
                {(unparticipate, {loading}) => (
                    <Button
                        color="orange"
                        onClick={() => this.handleMutationRequested(unparticipate)}
                        loading={loading}
                        floated={this.props.floated}
                        icon
                        labelPosition="left"
                    >
                        <Icon name="delete calendar"/>
                        Ne plus participer
                        {portal}
                    </Button>
                )}
            </Mutation>;
        else return (
            <Mutation
                mutation={PARTICIPATE}
                variables={{mid: this.props.mid}}
                onCompleted={({userParticipate}) => this.handleMutationCompleted(userParticipate)}
            >
                {(participate, {loading}) => (
                    <Button
                        color="green"
                        onClick={() => this.handleMutationRequested(participate)}
                        loading={loading}
                        floated={this.props.floated}
                        icon
                        labelPosition="left"
                    >
                        <Icon name="add to calendar"/>
                        Participer
                        {portal}
                    </Button>
                )}
            </Mutation>);
    }
}

ButtonParticipate.contextType = UserContext;

export default ButtonParticipate;
