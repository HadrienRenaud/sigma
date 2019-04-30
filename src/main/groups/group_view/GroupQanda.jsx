import React from 'react';
import {Link, Redirect} from 'react-router-dom';

import {Button, Comment, Dropdown, Form, Menu, Message, Search} from 'semantic-ui-react';
import gql from 'graphql-tag';
import {graphql, Mutation, Query} from 'react-apollo';
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

const ASK_QUESTION = gql`
    mutation askQuestion($gid: ID!, $title: String, $content: String) {
        createQuestion(toGroup: $gid, title: $title, content: $content) {
            mid
        }
    }

`;


class Question extends React.Component {

    state = {
        isAnswering: false,
    };

    handleAnswerButton(e) {
        e.preventDefault();
        this.setState({
            isAnswering: true
        });
    }

    handleCancelAnswer(e) {
        e.preventDefault();
        this.setState({
            isAnswering: false
        });
    }

    render() {
        let cetUtilisateurEstSpeakerDuGroupe = true;
        let q = this.props.q;
        // let hasAnswer = !!q.forAnswer
        let hasAnswer = false;
        return <Comment>
            <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/christian.jpg" as="a"
                            href={"/users/" + q.author.uid}/>
            <Comment.Content>
                <Comment.Author>
                    {q.title}
                </Comment.Author>
                <Comment.Metadata>
                    Par <Link to={"/users/" + q.author.uid}>{q.author.givenName}</Link> le {q.createdAt}
                </Comment.Metadata>
                <Comment.Text>
                    {q.content}
                </Comment.Text>
                {hasAnswer || this.state.isAnswering ? "" :
                    <Comment.Actions>
                        <Button content="Answer" labelPosition="left" icon="reply" basic size="mini"
                                onClick={this.handleAnswerButton.bind(this)}/>
                    </Comment.Actions>
                }
            </Comment.Content>
            {hasAnswer ?
                <Comment.Group>
                    <Comment>
                        <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/christian.jpg"/>
                        <Comment.Content>
                            <Comment.Author>
                                {q.forAnswer.title}
                            </Comment.Author>
                            <Comment.Text>
                                {q.forAnswer.content}
                            </Comment.Text>
                        </Comment.Content>
                    </Comment>
                </Comment.Group>
                : cetUtilisateurEstSpeakerDuGroupe && this.state.isAnswering ?
                    <Comment.Group>
                        <Form reply>
                            <Form.Input fluid label='Title' placeholder='The title of your answer here'/>
                            <Form.TextArea label="Content" placeholder="Type your answer here"/>
                            <Button content="Reply" labelPosition="left" icon="send"/>
                            <Button content="Cancel" labelPosition="left" icon="cancel"
                                    onClick={this.handleCancelAnswer.bind(this)}/>
                        </Form>
                    </Comment.Group>
                    : ""}
        </Comment>;
    }
}


class AskQuestion extends React.Component {
    // states: not-sent, sending, sent, redirecting, error, gql-error
    state = {
        step: "not-sent",
        title: "",
        content: "",
    };

    handleSubmit(e, mutate) {
        mutate({
            variables: {
                gid: this.props.gid,
                title: this.state.title,
                content: this.state.content,
            }
        });
    }

    handleChangeTitle(e, {title}) {
        this.setState({title: title});
    }

    handleChangeContent(e, {content}) {
        this.setState({content: content});
    }

    render() {
        return <Mutation mutation={ASK_QUESTION}>
            {(mutate, {data, error, loading, called}) => {
                if (!called)
                    return <Form onSubmit={(e) => this.handleSubmit(e, mutate)}>
                        <Form.Input fluid
                                    label='Title'
                                    placeholder='The title of your answer here'
                                    onChange={this.handleChangeTitle.bind(this)}
                        />
                        <Form.TextArea label="Content"
                                       placeholder="Type your answer here"
                                       onChange={this.handleChangeContent.bind(this)}
                        />
                        <Button content="Reply" labelPosition="left" icon="send"/>
                        <Button content="Cancel" labelPosition="left" icon="cancel"
                                onClick={this.props.handleCancelQuestion}
                        />
                    </Form>;
                else if (error)
                    return <GQLError error={error}/>;
                else if (loading)
                    return <Message info content='Chargement, veuillez patientez ...'/>;
                else if (data && data.createQuestion && data.createQuestion.mid)
                    return <Redirect to={'/question/' + data.createQuestion.mid}/>;
                else
                    return <Message error>
                        <Message.Header>Problème avec la requête</Message.Header>
                        {JSON.stringify({data: data, error: error, loading: loading, called: called})}
                    </Message>;
            }}
        </Mutation>;
    }
}


class GroupQuanda extends React.Component {

    state = {
        method: 'questions',
        isAsking: false,
    };

    methods = [
        {key: 0, text: 'Questions first', value: 'questions'},
        {key: 1, text: 'Answers first', value: 'answers'},
    ];

    handleAskQuestion(e) {
        e.preventDefault();
        this.setState({
            isAsking: true
        });
    }

    handleCancelQuestion(e) {
        e.preventDefault();
        this.setState({
            isAsking: false
        });
    }

    handleSelectedQuestion(e, {value}) {
        e.preventDefault();
        this.setState({
            method: value,
        });
    }

    render() {
        return (
            <div>
                <Menu secondary>
                    <Menu.Item>
                        <Dropdown options={this.methods}
                                  onChange={this.handleSelectedQuestion.bind(this)}
                                  selection
                                  defaultValue={this.methods[0].value}
                                  disabled={this.state.isAsking}
                        />
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item><Search/></Menu.Item>
                        <Menu.Item>
                            {this.state.isAsking ?
                                <Button basic content="Cancel" icon="cancel"
                                        onClick={this.handleCancelQuestion.bind(this)}/>
                                :
                                <Button basic content="Ask" icon="send" onClick={this.handleAskQuestion.bind(this)}/>
                            }
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                {this.state.isAsking ?
                    <AskQuestion gid={this.props.gid} handleCancelQuestion={this.handleCancelQuestion.bind(this)}/>
                    : this.state.method === 'questions' ?
                        this.renderQuestionsFirst()
                        : this.state.method === 'answers' ?
                            this.renderAnswersFirst() : ""
                }
            </div>
        );
    }

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
                    <Comment.Group>
                        {questions.map(q => <Question q={q} key={q.mid}/>)}
                    </Comment.Group>
                );
            }}
        </Query>;
    }

    renderAnswersFirst() {
        return <Message warning>Not implemented yet.</Message>;
    }

}

export default GroupQuanda;