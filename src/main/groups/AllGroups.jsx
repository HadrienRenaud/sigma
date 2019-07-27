/**
 * @file Page rassemblant tous les groupes visibles par l'utilisateur, à afficher pour path="baseurl/groups/"
 * @author kadabra
 */

import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {Card, Divider, Header, Icon, Input, Menu, Search, Segment} from "semantic-ui-react";
import GroupCard from './GroupCard.jsx';
import {GQLError} from "../utils/Errors.jsx";
import {LoadingMessage} from "../utils/Messages.jsx";

const groupReq = gql`
    query {
        allGroups {
            gid
            name
            description
        }
    }
`;

class AllGroups extends React.Component {

    loadGroups = ({loading, error, data}) => {
        if (loading) return <LoadingMessage />;
        else if (error) {
            console.log(error.name);
            console.log(error.message);
            return <GQLError error={error}/>;
        }

        const {allGroups} = data;

        return <Card.Group>
            {allGroups.map((group) => <GroupCard key={group.gid} gid={group.gid}/>)}
        </Card.Group>;
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
                    <Menu.Item>
                        Binets
                    </Menu.Item>
                    <Menu.Item>
                        Sports
                    </Menu.Item>
                    <Menu.Item>
                        Cours
                    </Menu.Item>
                    <Menu.Item>
                        Formation
                    </Menu.Item>
                    <Menu.Item>
                        Promo
                    </Menu.Item>

                    <Menu.Menu position="right">
                        <Input
                            transparent
                            icon={{name: 'search', link: true}}
                            placeholder='Search groups...'
                        />
                    </Menu.Menu>
                </Menu>
                <Divider hidden/>
                <Query query={groupReq} fetchPolicy='cache-first'>
                    {this.loadGroups}
                </Query>
            </div>
        );
    }
}

export default AllGroups;
