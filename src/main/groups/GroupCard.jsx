import React from 'react';
import {Card, Image, Label} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {GQLError} from "../Errors.jsx";
import {UserContext} from "../utils/contexts.jsx";

/**
 * @file Composant pour afficher les informations sur un groupe.
 * L'idee est d'avoir un preview du groupe, a inserer en header de chaque announcement par ex.
 * Mieux : afficher ce Component au-dessus de la souris en hover.
 * Ca correspond a la notion de 'card' comme pour UserCard et AnnouncementCard.
 * @author manifold
 */

const GET_GROUP = gql`
    query getGroup($gid: ID!) {
        group(gid: $gid) {
            gid
            name
            website
            description
        }
    }
`;

class GroupCard extends React.Component {

    static propTypes = {
        gid: PropTypes.string.isRequired
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


        let user = {adminOf: [], speakerOf: [], memberOf: [], likes: [], dislikes: [] , ...this.context } ;
        let extraContent = "";
        if (this.props.gid in user.adminOf.map((g) => g.gid))
            extraContent = <Card.Content extra content={<Label color='red' corner="right" icon={"chess queen"}/>}/>;
        else if (this.props.gid in user.speakerOf.map((g) => g.gid))
            extraContent = <Card.Content extra content={<Label color='red' corner="right" icon={"bullhorn"}/>}/>;
        else if (this.props.gid in user.memberOf.map((g) => g.gid))
            extraContent = <Card.Content extra content={<Label color='red' corner="right" icon={"heart"}/>}/>;
        else if (this.props.gid in user.likes.map((g) => g.gid))
            extraContent = <Card.Content extra content={<Label color='red' corner="right" icon={"eye"}/>}/>;
        else if (this.props.gid in user.dislikes.map((g) => g.gid))
            extraContent = <Card.Content extra content={<Label color='red' corner="right" icon={"eye slash"}/>}/>;

        return (
            <Query query={GET_GROUP}
                   variables={{gid: this.props.gid}}
                   fetchPolicy='cache-first' //choose cache behaviour
            >
                {({loading, error, data}) => {
                    if (loading) return <div>Chargement...</div>;
                    else if (error) return <GQLError error={error}/>;

                    const {group} = data; //extracts the actual data from object 'data'

                    return (
                        <Card color={"blue"} as="div" link
                              onClick={() => this.setState({redirectTo: "/group/" + group.gid})}>
                            <Image src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' wrapped
                                   ui={false}/>
                            <Card.Content>
                                <Card.Header>
                                    <Link to={"/group/" + this.props.gid}>{group.name}</Link>
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
                }}
            </Query>
        );
    }
}

GroupCard.contextType = UserContext;

export default GroupCard;
