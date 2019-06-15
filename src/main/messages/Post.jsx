import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import {Header, Icon, Feed, Image, Message, Accordion, List, Divider, Label} from 'semantic-ui-react';
import {Link, Redirect} from "react-router-dom";
import Moment from "react-moment";
import {AuthorList} from "../utils/author.jsx";

class PostTemplate extends React.Component {
    state = {
        expanded: false,
        redirectTo: false,
    };

    render() {
        if (this.state.redirectTo)
            return <Redirect to={this.state.redirectTo}/>;

        return <Feed.Event as={List.Item} onClick={() => {
            if (this.cliqued)
                this.cliqued = false;
            else {
                this.props.to && this.setState({redirectTo: this.props.to});
            }
        }}>
            <Feed.Label>
                <Image src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"/>
            </Feed.Label>
            <Feed.Content>
                <Feed.Date>
                    {this.props.raw.updatedAt ?
                        <span>Edited <Moment fromNow withTitle date={this.props.raw.updatedAt}/></span>
                        :
                        <span>Created <Moment fromNow withTitle date={this.props.raw.createdAt}/></span>
                    }
                </Feed.Date>
                <Feed.Summary>
                    <AuthorList elements={this.props.in}/> {this.props.action} <AuthorList elements={this.props.out}/>
                </Feed.Summary>
                <Feed.Extra text>
                    <Accordion>
                        <Accordion.Title
                            icon="dropdown"
                            content={<strong>{this.props.raw.title}</strong>}
                            active={this.state.expanded}
                            onClick={(e) => {
                                e.preventDefault();
                                this.cliqued = true;
                                this.setState({expanded: !this.state.expanded});
                            }}
                        />
                        <Accordion.Content active={this.state.expanded} style={{
                            marginTop: '-12px'
                        }}>
                            {this.props.raw.content}
                        </Accordion.Content>
                    </Accordion>
                </Feed.Extra>
                <Feed.Meta>
                    {this.props.extra}
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>;
    }
}

class AnnouncementPost extends Component {
    render() {
        return <PostTemplate
            in={this.props.authors}
            out={this.props.recipients}
            action="ont publié pour"
            raw={this.props}
            to={"/post/" + this.props.mid}
        />;
    }
}

class EventPost extends Component {
    render() {
        return <PostTemplate
            in={this.props.authors}
            out={this.props.recipients}
            action="ont créé un évènement pour"
            raw={this.props}
            to={'/event/' + this.props.mid}
        />;
    }
}

class QuestionPost extends Component {
    render() {
        return <PostTemplate
            in={[this.props.author]}
            out={[this.props.recipient]}
            action="a posé une question à"
            raw={this.props}
            to={'/question/' + this.props.mid}
        />;
    }
}


class AnswerPost extends Component {
    render() {
        return <PostTemplate
            in={[this.props.forQuestion.recipient]}
            out={[this.props.forQuestion.author]}
            action="a répondu à la question de"
            raw={{
                ...this.props,
                title: this.props.forQuestion.title,
                content: <div>
                    {this.props.forQuestion.content}
                    <Divider hidden/>
                    <Header as="h5" style={{
                        marginTop: '-20px'
                    }}>
                        <Icon name="long alternate arrow right"/>
                        {this.props.title}
                    </Header>
                    {this.props.content}
                </div>
            }}
            to={"/question/" + this.props.forQuestion.mid}
        />;
    }
}

class PrivatePost extends Component {
    render() {
        return <PostTemplate
            in={[this.props.author]}
            out={[this.props.recipient]}
            action="a envoyé un message privé à"
            raw={this.props}
            to="/groups"
        />;
    }
}

class Post extends Component {
    static propTypes = {
        __typename: PropTypes.string.isRequired
    };

    render() {
        switch (this.props.__typename) {
        case 'Announcement':
            return <AnnouncementPost {...this.props} />;
        case 'Event':
            return <EventPost {...this.props} />;
        case 'Question':
            return <QuestionPost {...this.props}/>;
        case 'PrivatePost':
            return <PrivatePost {...this.props}/>;
        case 'Answer':
            return <AnswerPost {...this.props}/>;
        default: {
            console.warn(this.props);
            return <Message error>Invalid type return by GQL : {this.props.__typename}</Message>;
        }
        }
    }
}

export default Post;
