import React from 'react';
import {Route, Link} from 'react-router-dom';

import {Button, Segment, Icon, Divider, Card, Grid, Item, Feed, Image} from 'semantic-ui-react';
import gql from 'graphql-tag';
import {graphql, Query} from 'react-apollo';
import {GQLError} from "../../Errors.jsx";

const GET_QUESTIONS = gql`
    query getQuestions($gid: ID!) {
        group(gid: $gid) {
            questions {
                mid
                createdAt
                title
                content
                author {
                    uid
                    givenName
                    lastName
                    nickname
                }
                recipient {
                    gid
                    name
                }
                forAnswer {
                    mid
                    createdAt
                    title
                    content
                    author {
                        gid
                        name
                    }
                }
            }
        }
    }
`;

const GET_ANSWERS = gql`
    query getAnswers($gid: ID!) {
        group(gid: $gid) {
            answers {
                mid
                createdAt
                title
                content
                author {
                    gid
                    name
                }
                forQuestion {
                    mid
                    createdAt
                    title
                    content
                    author {
                        uid
                        givenName
                        lastName
                        nickname
                    }
                }
            }
        }
    }
`;


class Question extends React.Component {
    render() {
        let q = this.props.q;
        return <Item>
            <Item.Image src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" size="small"/>
            <Item.Content>
                <Item.Header>
                    {q.title}
                </Item.Header>
                <Item.Meta>
                    Par <Link to={"/users/" + q.author.uid}>{q.author.givenName}</Link> le {q.createdAt}
                </Item.Meta>
                <Item.Description>
                    <p>
                        <Icon name="question circle"/>
                        {q.content}
                    </p>
                    <p>
                        <Icon name="hand point right"/>
                        {q.title}
                    </p>
                </Item.Description>
                <Item.Extra>
                    buttons, maybe
                </Item.Extra>
            </Item.Content>
        </Item>;
    }
}


class GroupPosts extends React.Component {

    renderQuestionsFirst() {
        return <Query query={GET_QUESTIONS}
                      variables={{gid: this.props.gid}}
                      fetchPolicy='cache-first'>
            {({loading, error, data}) => {
                if (loading) return <div>Chargement, patience SVP...</div>;
                else if (error) return <GQLError error={error}/>;
                const {group} = data;
                const {questions} = group;

                return (
                    <Item.Group relaxed divided>
                        {questions.map(q => <Question q={q} key={q.mid}/>)}
                    </Item.Group>
                );
            }}
        </Query>;
    }

    state = {
        first: 'questions'
    };

    render() {
        return (
            <div>
                {
                    this.state.first === 'questions' ?
                        this.renderQuestionsFirst() : ""
                }
            </div>
        );
    }
}

export default GroupPosts;