import React from 'react';
import {Card, Image, Label} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';

import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {GQLError} from "../utils/Errors.jsx";
import {UserContext} from "../utils/contexts.jsx";
import {LoadingMessage} from "../utils/Messages.jsx";
import {groupBase} from "../graphql/fragments/group";

/**
 * @file Composant pour afficher les informations sur un groupe.
 * L'idee est d'avoir un preview du groupe, a inserer en header de chaque announcement par ex.
 * Mieux : afficher ce Component au-dessus de la souris en hover.
 * Ca correspond a la notion de 'card' comme pour UserCard et AnnouncementCard.
 * @author manifold
 */


class GroupCard extends React.Component {

    static propTypes = {
        group: PropTypes.object.isRequired
    };

    state = {
        redirectTo: false,
    };

    constructor(props) {
        super(props);
    }

    render() {
        if (this.state.redirectTo)
            return <Redirect to={this.state.redirectTo}/>;

        const {group} = this.props;

        const user = {adminOf: [], speakerOf: [], memberOf: [], likes: [], dislikes: [], ...this.context};
        let extraContent = "";
        if (group.gid in user.adminOf.map((g) => g.gid))
            extraContent = <Card.Content extra content={<Label color='red' corner="right" icon={"chess queen"}/>}/>;
        else if (group.gid in user.speakerOf.map((g) => g.gid))
            extraContent = <Card.Content extra content={<Label color='red' corner="right" icon={"bullhorn"}/>}/>;
        else if (group.gid in user.memberOf.map((g) => g.gid))
            extraContent = <Card.Content extra content={<Label color='red' corner="right" icon={"heart"}/>}/>;
        else if (group.gid in user.likes.map((g) => g.gid))
            extraContent = <Card.Content extra content={<Label color='red' corner="right" icon={"eye"}/>}/>;
        else if (group.gid in user.dislikes.map((g) => g.gid))
            extraContent = <Card.Content extra content={<Label color='red' corner="right" icon={"eye slash"}/>}/>;

        return (
            <Card
                color={"blue"} as="div" link
                onClick={() => this.setState({redirectTo: "/group/" + group.gid})}
            >
                <Image
                    src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' wrapped
                    ui={false}
                />
                <Card.Content>
                    <Card.Header>
                        <Link to={"/group/" + group.gid}>{group.name}</Link>
                    </Card.Header>
                    <Card.Meta>
                        <a href={group.website}>{group.website}</a>
                    </Card.Meta>
                </Card.Content>
                <Card.Content>
                    <Card.Description>
                        {group.description}
                    </Card.Description>
                </Card.Content>
                {extraContent}
            </Card>
        );
    }
}

GroupCard.contextType = UserContext;

export default GroupCard;
