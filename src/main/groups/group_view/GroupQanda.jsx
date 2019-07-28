import React from 'react';
import {Link, Redirect} from 'react-router-dom';

import {Button, Comment, Dropdown, Form, Menu, Message, Search} from 'semantic-ui-react';
import gql from 'graphql-tag';
import {Mutation, Query} from 'react-apollo';
import {GQLError} from "../../utils/Errors.jsx";
import {UserContext} from "../../utils/contexts.jsx";
import {LoadingMessage} from "../../utils/Messages.jsx";

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
                    photo
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
                        photo
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

const ANSWER = gql`
    mutation answer($mid: ID!, $title: String, $content: String) {
        createAnswer(forQuestion: $mid, title: $title, content: $content) {
            mid,
            title,
            content
        }
    }
`;

const DELETE_QUESTION = gql`
    mutation deleteQuestion($mid: ID!) {
        removeQuestion(questionToRemove: $mid)
    }
`;

const EDIT_QUESTION = gql`
    mutation editQuestion($mid: ID!, $title: String, $content: String) {
        editQuestion(questionToEdit: $mid, title: $title, content: $content) {
            mid
        }
    }
`;


class Answer extends React.Component {
    // states: not-sent, sending, sent, redirecting, error, gql-error
    state = {
        step: "not-sent",
        title: "",
        content: "",
    };

    handleSubmit(e, mutate) {
        mutate({
            variables: {
                mid: this.props.qid,
                title: this.state.title,
                content: this.state.content,
            }
        });
    }

    handleChangeTitle(e, {title}) {
        this.setState({title});
    }

    handleChangeContent(e, {content}) {
        this.setState({content});
    }

    render() {
        return <Mutation mutation={ANSWER}>
            {(mutate, {data, error, loading, called}) => {
                if (!called)
                    return <Form>
                        <Form.Input fluid label='Title'
                            placeholder='The title of your answer here'
                            onChange={this.handleChangeTitle.bind(this)}
                        />
                        <Form.TextArea label="Content"
                            placeholder="Type your answer here"
                            onChange={this.handleChangeContent.bind(this)}
                        />
                        <Button content="Reply" labelPosition="left" icon="send" name="submit"
                            onClick={(e) => this.handleSubmit(e, mutate)}
                        />
                        <Button content="Cancel" labelPosition="left" icon="cancel" name="cancel"
                            onClick={this.props.handleCancelAnswer}
                        />
                    </Form>;
                else if (error)
                    return <GQLError error={error}/>;
                else if (loading)
                    return <LoadingMessage/>;
                else if (data && data.createAnswer && data.createAnswer.mid)
                    return <Redirect to={'/question/' + this.props.qid}/>;
                else
                    return <Message error>
                        <Message.Header>Problème avec la requête</Message.Header>
                        {JSON.stringify({data, error, loading, called})}
                    </Message>;
            }}
        </Mutation>;
    }
}


class Question extends React.Component {

    state = {
        isAnswering: false,
        isEditing: false,
        deleted: false,
        title: "",
        content: "",
        redirectTo: false,
    };

    handleChangeTitle(e, {title}) {
        this.setState({title});
    }

    handleChangeContent(e, {content}) {
        this.setState({content});
    }

    handleAnswerButton(e) {
        e.preventDefault();
        this.setState({
            isAnswering: true,
            isEditing: false,
        });
    }

    handleCancelQuestion(e) {
        e.preventDefault();
        this.setState({
            isAnswering: false,
            isEditing: false,
        });
    }

    handleEditButton(e) {
        e.preventDefault();
        this.setState({
            isEditing: true,
            isAnswering: false,
        });
    }

    render() {
        const cetUtilisateurEstSpeakerDuGroupe = true;
        const cetUtilisateurEstAuteur = false;
        const q = this.props.q;
        // let hasAnswer = !!q.forAnswer
        const hasAnswer = false;

        if (this.state.redirectTo)
            return <Redirect to={this.state.redirectTo}/>;

        if (this.state.deleted)
            return "";

        if (this.state.isEditing)
            return <Mutation mutation={EDIT_QUESTION} onCompleted={() => this.props.actualise()}>
                {(mutate, {data, error, loading, called}) => {
                    if (!called)
                        return <Form onSubmit={() => mutate({
                            variables: {
                                mid: q.mid,
                                title: this.state.title,
                                content: this.state.content
                            }
                        })}>
                            <Form.Input fluid
                                label='Title'
                                content={q.title}
                                onChange={this.handleChangeTitle.bind(this)}
                            />
                            <Form.TextArea label="Content"
                                content={q.content}
                                onChange={this.handleChangeContent.bind(this)}
                            />
                            <Button content="Reply" labelPosition="left" icon="send"/>
                            <Button content="Cancel" labelPosition="left" icon="cancel"
                                onClick={this.handleCancelQuestion.bind(this)}
                            />
                        </Form>;
                    else if (loading)
                        return <LoadingMessage/>;
                    else if (error)
                        return <GQLError error={error}/>;
                    else if (data) {
                        this.setState({isEditing: false});
                        return null;
                    } else
                        return null;
                }}
            </Mutation>;


        return <Comment>
            <Comment.Avatar src={q.author.photo || "https://react.semantic-ui.com/images/avatar/small/christian.jpg"} as={Link}
                to={"/user/" + q.author.uid}/>
            <Comment.Content>
                <Comment.Author>
                    {q.title}
                </Comment.Author>
                <Comment.Metadata>
                    Par <Link to={"/user/" + q.author.uid}>{q.author.givenName}</Link> le {q.createdAt}
                </Comment.Metadata>
                <Comment.Text>
                    {q.content}
                </Comment.Text>
                {!hasAnswer && !this.state.isAnswering && !this.state.isEditing &&
                <Comment.Actions>
                    {this.props.isSpeaker &&
                    <Button content="Answer" labelPosition="left" icon="reply" basic size="mini"
                        onClick={this.handleAnswerButton.bind(this)}/>}
                    <Button content="See More" labelPosition="left" icon="external alternate" basic size="mini"
                        onClick={() => this.setState({redirectTo: "/question/" + q.mid})}/>
                    {this.context.uid === q.author.uid &&
                    <Button content="Edit Question" labelPosition="left" icon="edit" size="mini"
                        onClick={this.handleEditButton.bind(this)} color="olive"
                    />}
                    {this.props.isSpeaker &&
                    <Mutation mutation={DELETE_QUESTION} variables={{mid: q.mid}}
                        onCompleted={() => this.props.actualise()}>
                        {(mutate, {data, error, loading, called}) => {
                            if (!called)
                                return <Button content="Delete" labelPosition="left" icon="delete"
                                    size="mini" color="red" onClick={() => mutate()}/>;
                            else if (loading)
                                return <Button content="Delete" labelPosition="left" icon="delete"
                                    size="mini" color="red" disabled={true}/>;
                            else if (error)
                                return <GQLError error={error}/>;
                            else if (data)
                                return <Message info content="Question successfully deleted."/>;
                            else
                                return <Message error content="Cannot delete this question."/>;
                        }}
                    </Mutation>}
                </Comment.Actions>}
                {this.props.isSpeaker && this.state.isAnswering &&
                <Answer qid={q.mid} handleCancelAnswer={this.handleCancelQuestion.bind(this)}/>
                }
            </Comment.Content>
            {hasAnswer &&
            <Comment.Group>
                <Link to={'/questions/' + q.mid}>
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
                </Link>
            </Comment.Group>}
        </Comment>;
    }
}

Question.contextType = UserContext;

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
        this.setState({title});
    }

    handleChangeContent(e, {content}) {
        this.setState({content});
    }

    render() {
        return <Mutation mutation={ASK_QUESTION}>
            {(mutate, {data, error, loading, called}) => {
                if (!called)
                    return <Form onSubmit={(e) => this.handleSubmit(e, mutate)}>
                        <Form.Input fluid
                            label='Title'
                            placeholder='The title of your question here'
                            onChange={this.handleChangeTitle.bind(this)}
                        />
                        <Form.TextArea label="Content"
                            placeholder="Type your question here"
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
                    return <LoadingMessage />;
                else if (data && data.createQuestion && data.createQuestion.mid)
                    return <Redirect to={'/question/' + data.createQuestion.mid}/>;
                else
                    return <Message error>
                        <Message.Header>Problème avec la requête</Message.Header>
                        {JSON.stringify({data, error, loading, called})}
                    </Message>;
            }}
        </Mutation>;
    }
}


class GroupQuanda extends React.Component {

    state = {
        method: 'questions',
        isAsking: false,
        needActualisation: false,
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
            {({loading, error, data, refetch}) => {
                if (loading) return <LoadingMessage />;
                else if (error) return <GQLError error={error}/>;
                const {group} = data;
                const {questions} = group;

                return (
                    <Comment.Group>
                        {questions.map(q => <Question q={q} key={q.mid} actualise={refetch}
                            isSpeaker={this.props.isSpeaker}/>)}
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
