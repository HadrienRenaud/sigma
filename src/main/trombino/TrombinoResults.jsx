/**
 * @file résultat de la recherche sur le TOL. Ce component ne gère que les uid des Users matchés,
 * la Query graphql des données à proprement parler sont faites dans UserCard (auquel on passe l'uid en props)
 * @author manifold
 */

import React, {Component} from 'react';
import {Card, List, Image, Label} from 'semantic-ui-react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {GQLError} from "../Errors.jsx";
import {Link, Redirect} from "react-router-dom";

class UserCardItem extends Component {
    state = {
        redirectTo: false
    };

    render() {
        if (this.state.redirectTo)
            return <Redirect to={this.state.redirectTo}/>;

        const {user} = this.props;

        return (
            <Card link as="div" onClick={() => this.setState({redirectTo: "/user/" + user.uid})}>
                <Image src="https://react.semantic-ui.com/images/avatar/large/justen.jpg" wrapped ui={false}/>
                <Card.Content>
                    <Card.Header>
                        {user.givenName} {user.lastName}
                    </Card.Header>
                    <Card.Description>
                        <List>
                            <List.Item icon="mail" href={"mailto" + user.mail} content={user.mail}/>
                            {user.address && <List.Item icon="marker" content={user.address}/>}
                            <List.Item>
                                <List.Icon name="group"/>
                                <List.Content>
                                    <List>
                                        {user.memberOf.map(gr =>
                                            <List.Item key={gr.gid} as={Link}
                                                to={"/group/" + gr.gid}>{gr.name}</List.Item>
                                        )}
                                    </List>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name="group"/>
                                <List.Content>
                                    Promotion : {user.promotion}
                                </List.Content>
                            </List.Item>
                        </List>
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

class UserListItem extends Component {
    state = {
        redirectTo: false
    };

    render() {
        if (this.state.redirectTo)
            return <Redirect to={this.state.redirectTo}/>;

        const {user} = this.props;

        return (
            <List.Item onClick={() => this.setState({redirectTo: "/user/" + user.uid})}>
                <Image avatar src="https://react.semantic-ui.com/images/avatar/large/justen.jpg"/>
                <List.Content>
                    <List.Header>
                        {user.givenName} {user.lastName}
                    </List.Header>
                    <List.Description>
                        <Label size="tiny" basic icon="mail" as="a" href={"mailto:" + user.mail} content={user.mail}/>
                        {user.address && <Label size="tiny" basic icon="marker" content={user.address}/>}
                        {user.memberOf.map(gr =>
                            <Label size="tiny" basic key={gr.gid} content={gr.name} icon="group"
                                as={Link} to={"/group/" + gr.gid}
                            />
                        )}
                    </List.Description>
                </List.Content>
            </List.Item>
        );
    }
}

/**
 * @constant Requête GraphQL...
 * [13/04/18]
 * actuellement ca marche pas, il faut changer le schema pour que searchTOL renvoie un User au lieu de [ID] ou [String]
 * ca ne donnera pas lieu a des problemes d'autoristion puisque [ID] + UserCard fait exactement la meme chose,
 * et que de toute facon on gere les autorisations ds les resolvers.
 *
 */
const GET_TROMBINO = gql`
    # Write your query or mutation here
    query searchTOL(
    $givenName: String
    $lastName: String
    $nickname: String
    $nationality: String
    $school: String
    $groups: [String]
    $studies: String
    $phone: String
    $mail: String
    $address: String
    ) {
        searchTOL (
            nickname: $nickname,
            givenName: $givenName,
            lastName: $lastName,
            nationality: $nationality,
            school: $school,
            groups: $groups,
            studies: $studies,
            phone: $phone,
            mail: $mail,
            address: $address,
        ) {
            uid
            givenName
            lastName
            nickname
            school
            phone
            mail
            address
            photo
            memberOf {
                gid
                name
            }
        }
    }
`;

/**
 * @class Affiche les résultats tu trombinoscope
 */
class TrombinoResults extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    static getDerivedStateFromProps(newProps, prevState) {
        /*
        getDerivedStateFromProps is invoked after a component is instantiated as well as when it receives new props. 
        It should return an object to update state, or null to indicate that the new props do not require any state updates.
        https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops
        */
        return null;
    }

    render() {
        return (
            <Query query={GET_TROMBINO}
                variables={{
                    givenName: this.props.params.givenName,
                    lastName: this.props.params.lastName,
                    nickname: this.props.params.nickname,
                    groups: this.props.params.groups + [this.props.params.formation],
                }}
                fetchPolicy='cache-first'
            >
                {({loading, error, data}) => {
                    if (loading) return <div>Chargement...</div>;
                    else if (error) {
                        return <GQLError error={error}/>;
                    }
                    const {searchTOL} = data; //extracts the actual data from object 'data'
                    if (this.props.params.compact)
                        return <List divided relaxed link>
                            {searchTOL.map(res => <UserListItem key={res.uid} uid={res.uid} user={res}/>)}
                        </List>;

                    return (
                        <Card.Group>
                            {searchTOL.map(res => {
                                // searchTOL's GraphQL type is [User], so it resolves to a JavaScript array 
                                // one for each value returned by searchTOL it is necessary to give a "key" attribute (https://reactjs.org/docs/lists-and-keys.html)
                                return <UserCardItem key={res.uid} uid={res.uid} user={res}/>;
                            })}
                        </Card.Group>
                    );
                }}
            </Query>
        );
    }
}

export default TrombinoResults;
