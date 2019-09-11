





/**
 * @file Page rassemblant tous les groupes visibles par l'utilisateur, à afficher pour path="baseurl/groups/"
 * @author kadabra
 */

import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {Card, Divider, Header, Icon, Input, Menu, Message} from "semantic-ui-react";
import GroupCard from './GroupCard.jsx';
import {GQLError} from "../utils/Errors.jsx";
import {LoadingMessage} from "../utils/Messages.jsx";
import {groupBase} from "../graphql/fragments/group";


const SEARCH_FOR_GROUP = gql`
    query searchGroup($name: String!) {
        searchGroup(name: $name){
            ...groupBase
        }
    }
    ${groupBase}
`;

const GroupList = ({searchValue}) => (
    <Query query={SEARCH_FOR_GROUP} fetchPolicy='cache-first' variables={{name: searchValue}}>
        {({loading, error, data}) => (
            <>
                {loading && <LoadingMessage/>}
                {error && <GQLError error={error}/>}
                {data.searchGroup ? (
                    <Card.Group>
                        {data.searchGroup.map((group) => <GroupCard key={group.gid} group={group}/>)}
                    </Card.Group>
                ) : (
                    <Message
                        title={`No group found for ${searchValue}`}
                        content="Use the search bar to change your search."
                    />
                )}
            </>
        )}
    </Query>
);

class AllGroups extends React.Component {
    state = {
        value: '',
    };

    render() {
        return (
            <div>
                <Divider hidden/>
                <Header>
                    <Icon name="group"/>
                    Groupes et Binets
                </Header>
                <Divider hidden/>
                <Menu secondary pointing>
                    <Menu.Item>Binets</Menu.Item>
                    <Menu.Item>Sports</Menu.Item>
                    <Menu.Item>Cours</Menu.Item>
                    <Menu.Item>Formation</Menu.Item>
                    <Menu.Item>Promo</Menu.Item>

                    <Menu.Menu position="right">
                        <Input
                            transparent
                            icon={{name: 'search', link: true}}
                            onChange={(e) => {
                                this.setState({value: e.target.value});
                            }}
                            value={this.state.value}
                            placeholder='Search groups...'

                        />
                    </Menu.Menu>
                </Menu>
                <Divider hidden/>
                <GroupList searchValue={this.state.value}/>
            </div>
        );
    }
}

export default AllGroups;
