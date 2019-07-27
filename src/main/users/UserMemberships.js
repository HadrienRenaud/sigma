import React from 'react';
import {Accordion, Icon, Image, List} from "semantic-ui-react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";


function GroupListItem({group, allGroups}) {
    return <List.Item key={group.gid}>
        <Image
            avatar
            src='https://react.semantic-ui.com/images/avatar/small/lindsay.png'
        />
        <List.Content>
            <List.Header as={Link} to={'/groups/' + group.gid}>
                {group.name}
            </List.Header>
            <List.Description>
                {group.description}
            </List.Description>
            <List.List>
                {group.parents && group.parents.map(g =>
                    <GroupListItem group={g} allGroups={allGroups} key={g.gid}/>
                )}
            </List.List>
        </List.Content>
    </List.Item>;
}

class GroupItemAccordion extends React.Component {

    state = {
        active: false
    };

    static propTypes = {
        group: PropTypes.object.isRequired,
        allGroups: PropTypes.array.isRequired,
    };

    render() {
        const {group, allGroups} = this.props;
        const {active} = this.state;

        return <Accordion>
            <Accordion.Title
                active={active}
                onClick={() => this.setState({active: !active})}
            >
                <Icon name="dropdown"/>
                Expand
            </Accordion.Title>
            <Accordion.Content active={active}>
                <List.List>
                    {group.parents && group.parents.map(g =>
                        <GroupListItem group={g} allGroups={allGroups} key={g.gid}/>
                    )}
                </List.List>
            </Accordion.Content>
        </Accordion>;
    }
}


export function UserMemberships({displayedGroups, allGroups, expanded}) {
    return <List relaxed>
        {displayedGroups.map(gr =>
            <List.Item key={gr.gid}>
                <Image
                    avatar
                    src='https://react.semantic-ui.com/images/avatar/small/lindsay.png'
                />
                <List.Content>
                    <List.Header as={Link} to={'/group/' + gr.gid}>
                        {gr.name}
                    </List.Header>
                    <List.Description>
                        {gr.description}
                    </List.Description>
                    {expanded && gr.parents &&
                    <GroupItemAccordion
                        group={gr}
                        allGroups={allGroups}
                    />
                    }
                </List.Content>
            </List.Item>
        )}
    </List>;
}



