import React from 'react';
import PropTypes from 'prop-types';
import { Card, Header, List } from 'semantic-ui-react';

class UserCard extends React.Component {

    static propTypes = {
        givenName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        console.log(`User card mounted.`);
    }

    render() {
        return (
            <Card>
                <Card.Content>
                    <Card.Header as='h2'>
                        {this.props.givenName} {this.props.lastName}
                    </Card.Header>
                    <List>
                        <List.Item icon='mail' content={<a href={`mailto:${this.props.mail}`}>{this.props.mail}</a>} />
                        <List.Item>
                            <List.Icon name='marker' />
                            <List.Content>
                                Adresse : {this.props.address ? this.props.address[0] : "Nulle part..."}
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name="group" />
                            <List.Content>
                                Groupes :
                                <List>
                                    {this.props.groups.map(gr => 
                                        <List.Item key={gr.uid}>{gr.name}</List.Item>
                                    )}
                                </List>
                            </List.Content>
                        </List.Item>
                    </List>
                    
                </Card.Content>
            </Card>
        );
    }

}

export default UserCard;