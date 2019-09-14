import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Header, List, Message, Segment} from 'semantic-ui-react';
import {GQLError} from "../utils/Errors.jsx";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import {Author} from "../utils/author.jsx";
import {LoadingMessage} from "../utils/Messages.jsx";
import {messageExtended} from "../graphql/fragments/message";

/**
 * @constant Requête pour obtenir tous les posts.
 */
const GET_QUESTION = gql`
    query getQuestion($mid: ID!) {
        message(mid: $mid) {
            ...messageExtended
        }
    }
    ${messageExtended}
`;

/**
 * @class Liste des publications effectuées.
 * @author manifold
 * @extends React.Component
 */
class QuestionPage extends React.Component {
    render() {
        return (
            <Query
                query={GET_QUESTION}
                variables={{mid: this.props.match.params.mid}}
                fetchPolicy='cache-first'
            >
                {({loading, error, data}) => {
                    if (loading) return <LoadingMessage/>;
                    else if (error) {
                        return <GQLError error={error}/>;
                    }
                    const q = data.question;
                    const a = q.forAnswer;
                    return (
                        <div>
                            <Segment vertical>
                                <Header>
                                    {q.title}
                                </Header>
                                <List>
                                    <List.Item>
                                        <List.Icon name="group"/>
                                        <List.Content>
                                            Par <Author {...q.author}/> pour <Author {...q.recipient}/>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name="calendar"/>
                                        <List.Content>
                                            {q.updatedAt ?
                                                <span>Edited <Moment withTitle fromNow date={q.updatedAt}/></span>
                                                :
                                                <span>Created <Moment withTitle fromNow date={q.createdAt}/></span>
                                            }
                                        </List.Content>
                                    </List.Item>
                                </List>
                            </Segment>

                            <Segment vertical>
                                <ReactMarkdown>{q.content}</ReactMarkdown>
                            </Segment>
                            <Segment vertical>
                                <Header>
                                    {a.title}
                                </Header>
                                <ReactMarkdown>
                                    {a.content}
                                </ReactMarkdown>
                            </Segment>
                            <Segment vertical>
                                <Message warning>
                                    Commentaires pas encore implémentés
                                </Message>
                            </Segment>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default QuestionPage;
