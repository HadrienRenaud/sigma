import React from "react";
import PropTypes from "prop-types";
import {Container, Header, List} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import UserQuery from "../logic/getUser.jsx";


// TODO factoriser depuis UserCard
const GET_USER = gql`
    query getUser($uid: ID) {
        user(uid: $uid) {
            lastName
            givenName
            mail
            phone
            address
            promotion
            groups {
                uid
                name
            }
        }
    }
`;

class UserPageContent extends React.Component {
    static propTypes = {
        user: PropTypes.object.isRequired
    };

    render() {
        let user = this.props.user;
        return (
            <Container>
                <Header as='h1' attached='top'>
                    <Link to={"/user/" + this.props.uid}>
                        {user.givenName} {user.lastName}
                    </Link>
                </Header>
                <List>
                    <List.Item
                        icon='mail'
                        content={<a href={`mailto:${user.mail}`}>{user.mail}</a>}
                    />
                    {
                        user.address ?
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
                                {user.groups.map(gr =>
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

            </Container>
        );
    }
}

class UserPage extends React.Component {

    static propTypes = {
        uid: PropTypes.string.isRequired
    };

    render() {
        const {match} = this.props;

        return (
            <UserQuery uid={String(match.params.uid)}>
                <UserPageContent/>
            </UserQuery>
        );
    }
}

export default UserPage;