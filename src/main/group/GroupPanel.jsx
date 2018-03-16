import React from 'react';
import { Accordion, Button, Segment, Icon, Component, Sticky, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

/** 
 * @constant Requête GraphQL pour récupérer tous les groupes.
*/
const GET_ALLGROUPS = gql`
    query GroupQuery {
        accessGroups {
            allGroups {
                uid
                name
                website
            }
        }
    }
`;

class GroupPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { 
        const { groupQuery: { loading, error, accessGroups } } = this.props;

        if (loading) {
            return <li>Loading...</li>;
        } else if (error) {
            return <li>Error</li>;
        }

        return (
            <div>
                {accessGroups.allGroups.map(gr => {
                    return <div key={gr.uid}>
                        <Link to="/group/1"><Button>{gr.name}</Button></Link>
                    </div>;
                }
                )}
            </div>
        );}
}

export default graphql(GET_ALLGROUPS,{name:"groupQuery"})(GroupPanel);