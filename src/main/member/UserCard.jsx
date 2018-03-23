import React from 'react';
import PropTypes from 'prop-types';
import { Card, Header, List } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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

class UserCard extends React.Component {

    static propTypes = {
        uid: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        console.log(`User card mounted.`);
    }

    render() {
        return (
            <Query query={GET_USER}
                variables={{ uid: this.props.uid }}
            >
                {
                    ({ loading, error, data }) => {
                        if (loading) return <div>Chargement, patientez SVP...</div>;
                        else if (error) return <div>Erreur.</div>;

                        const { user } = data;
                        
                        return (
                            <Card>
                                <Card.Content>
                                    <Card.Header as='h2'>
                                        {user.givenName} {user.lastName}
                                    </Card.Header>
                                    <List>
                                        <List.Item icon='mail' content={<a href={`mailto:${user.mail}`}>{user.mail}</a>} />    
                                        {user.address ? 
                                            <List.Item>
                                                <List.Icon name='marker' />
                                                <List.Content>{user.address[0]}</List.Content>
                                            </List.Item> : ""
                                        }
                                        <List.Item>
                                            <List.Icon name="group" />
                                            <List.Content>
                                                Groupes :
                                                <List>
                                                    {user.groups.map(gr => 
                                                        <List.Item key={gr.uid}>{gr.name}</List.Item>
                                                    )}
                                                </List>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon name="group" />
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
            </Query>
        );
    }

}

export default UserCard;