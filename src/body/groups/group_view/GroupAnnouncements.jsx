/**
 * @file page listant les Annonces _adressées à OU faites par_ ce groupe.
 * @author kadabra
 */

import React from 'react';
import {Route, Link} from 'react-router-dom';

import { Menu, Header, Button, Search, Grid, Divider } from 'semantic-ui-react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import AnnouncementCard from '../../messages/AnnouncementCard.jsx';

/*
const source = _.times(5, () => ({
    title: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    image: faker.internet.avatar(),
}));
*/

/** 
 * @constant Requête GraphQL...
 * Rq: si on en a besoin (notamment pour search parmi les resultats de la Query), on pourra aussi 
 * recuperer d'autres fields (date et titre notamment).
*/
const GET_ANNOUNCEMENTS_FROM = gql`
    query announcements_from(
        $groupid: ID!
    ) {
        #returns [Announcement] array of JS objects with only the 'id' field, representing announcement id's
        announcementsFromGroup(uid: $groupid) {
            uid
        }
    }
`;

const GET_ANNOUNCEMENTS_TO = gql`
    query announcements_to(
        $groupid: ID!
    ) {
        #returns [Announcement] array of JS objects with only the 'id' field, representing announcement id's
        announcementsToGroup(uid: $groupid) {
            uid
        }
    }
`;

class GroupAnnouncements extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: "to"
        };
        this.handleChangeMode = this.handleChangeMode.bind(this);
    }

    handleChangeMode(e) {
        const name = e.target.name; //l'attribut "name" du Component qui appelle ce handle
        this.setState({ mode: name }); //ES6 computed property name syntax
    }    

    renderAnnouncementsFrom() {
        //using the 'output' variable allows React to do lazy component mounting
        //https://blog.logrocket.com/conditional-rendering-in-react-c6b0e5af381e
        let output;

        if (this.state.mode=='from' || this.state.mode=='both') {
            output =
                <Query query={GET_ANNOUNCEMENTS_FROM}
                    variables={{ uid: "br" }}
                    fetchPolicy='cache-first'
                >
                    {({ loading, error, data }) => {
                        if (loading) return <div>Chargement, patience SVP...</div>;
                        else if (error) return <div>Erreur.</div>;

                        const { announcementsFromGroup } = data; //extracts the actual data from object 'data'

                        return (
                            <div>
                                {announcementsFromGroup.map(res => {
                                    return <AnnouncementCard key={res.id} uid={res.id} />;
                                })}
                            </div>
                        );
                    }}
                </Query>
            ;
        }

        return output; //returns null if variable was not modified
    }

    renderAnnouncementsTo() {
        let output;

        if (this.state.mode=='to' || this.state.mode=='both') {
            output =
                <Query query={GET_ANNOUNCEMENTS_TO}
                    variables={{ uid: "br" }}
                    fetchPolicy='cache-first'
                >
                    {({ loading, error, data }) => {
                        if (loading) return <div>Chargement, patience SVP...</div>;
                        else if (error) return <div>Erreur.</div>;

                        const { announcementsToGroup } = data; //extracts the actual data from object 'data'

                        return (
                            <div>
                                {announcementsToGroup.map(res => {
                                    return <AnnouncementCard key={res.id} uid={res.id} />;
                                })}
                            </div>
                        );
                    }}
                </Query>
            ;
        }

        return output; //returns null if variable was not modified
    }


    render() {
        const { mode } = this.state;

        return (
            <div>
                <Menu attached='top'>
                    <Menu.Item>
                        Désolé, la recherche d'annonces (client-side, parmi celles déjà Query-ées) n'est pas encore implémentée.
                        {/*<Search />*/}
                    </Menu.Item>

                    <Menu.Item position='right'>
                        <Button.Group color='teal' size="mini">
                            <Button content="Annonces adressées au groupe" 
                                name="to"
                                onClick={(e) => this.handleChangeMode(e)} />
                            <Button.Or text="ou" />
                            <Button content="Les deux"
                                name="both"
                                onClick={(e) => this.handleChangeMode(e)} />
                            <Button.Or text="ou" />
                            <Button content="Annonces faites par le groupe"
                                name="from"
                                onClick={(e) => this.handleChangeMode(e)} />
                        </Button.Group>
                    </Menu.Item>
                </Menu>

                {this.renderAnnouncementsTo()}
                {this.renderAnnouncementsFrom()}
                
            </div>

        );
    }
}

export default GroupAnnouncements;

