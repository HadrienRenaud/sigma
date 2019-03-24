import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {List, Message} from 'semantic-ui-react';

import {Link} from "react-router-dom";

class GroupMembers extends Component {
    static propTypes = {
        members: PropTypes.arrayOf(PropTypes.object),
    }

    render() {

        if (!this.props.members)
            return <Message info content="Ce groupe n'a pas de membres. Administre le pour en rajouter !"/>;
        return <List>
            {this.props.members.map(user => (
                <List.Item key={user.uid}>
                    <List.Content>
                        <Link to={'/users/' + user.uid}>
                            {user.givenName} {user.lastName} ({user.promotion})
                        </Link>
                    </List.Content>
                </List.Item>
            ))}
        </List>
    }

}

export default GroupMembers;