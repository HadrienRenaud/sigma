/**
 * @file Component carte presentant toutes les informations sur un user
 * @file Utilisé à la fois pour afficher les resultats de la recherche TOL et au path="baseurl/users/:uid"
 * @author manifold
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Card, List} from 'semantic-ui-react';
import {Link} from "react-router-dom";
//import UserQuery from "../body/logic/getUser.jsx";

class UserCard extends React.Component {

    render() {
        const user = this.props.user;
        return (
            <Card>
                <Card.Content>
                    <Card.Header as='h2'>
                        <Link to={"/user/" + this.props.uid}>
                            {user.givenName} {user.lastName}
                        </Link>
                    </Card.Header>
                    <List>
                        <List.Item
                            icon='mail'
                            content={<a href={`mailto:${user.mail}`}>{user.mail}</a>}
                        />
                        {
                            user.address ?
                            //TODO: use user.addresses instead
                                <List.Item>
                                    <List.Icon name='marker'/>
                                    <List.Content>{user.address[0]}</List.Content>
                                </List.Item>
                                : ""
                        }
                        <List.Item>
                            <List.Icon name="group"/>
                            <List.Content>
                                Groupes :
                                <List>
                                    {user.memberOf.map(gr =>
                                        <List.Item key={gr.uid}>
                                            <Link to={"/groups/" + gr.uid}>
                                                {gr.name}
                                            </Link>
                                        </List.Item>
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

                </Card.Content>
            </Card>
        );
    }
}
UserCard.propTypes = {
    user: PropTypes.any.isRequired,
};

/*
class UserCard extends React.Component {

    static propTypes = {
        uid: PropTypes.string.isRequired
    };

    render() {
        return <UserQuery uid={String(this.props.uid)}>
            <UserCardContent uid={String(this.props.uid)} user={{loading: true}}/>
        </UserQuery>;
    }
}

UserCard.propTypes = {
    uid: PropTypes.string.isRequired,
};
*/

export default UserCard;