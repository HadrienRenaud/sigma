import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import {Header, Icon, Feed, Image, Message, Accordion, List, Divider} from 'semantic-ui-react';
import {Link} from "react-router-dom";

class DisplayList extends React.Component {
    render() {
        let elts = this.props.elements;
        if (elts.length === 0)
            return "";
        else if (elts.length === 1)
            return elts[0];
        else
            return <span>
                {
                    elts.slice(0, -1).map((g, i) => <span key={i}>{g}</span>)
                } et {elts[elts.length - 1]}
            </span>;
    }
}

/**
 * @class Définit le composant Author, qui représente un lien vers un auteur d'un post
 * @author hadi
 * @extends React.Component
 */
class Author extends React.Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
    };

    render() {
        let link = "/";

        if (this.props.auth.uid)
            link = '/users/' + this.props.auth.uid;
        else if (this.props.auth.gid)
            link = '/groups/' + this.props.auth.gid;

        return <Link to={link}> {this.props.auth.name}</Link>;
    }
}

class PostTemplate extends React.Component {
    state = {
        expanded: false
    };

    render() {
        return <Feed.Event as={List.Item}>
            <Feed.Label>
                <Image src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"/>
            </Feed.Label>
            <Feed.Content>
                <Feed.Date>
                    Created at: {this.props.raw.createdAt}
                    {this.props.raw.updatedAt ?
                        <span>- Edited at: {this.props.raw.updatedAt}</span> : ""}
                </Feed.Date>
                <Feed.Summary>
                    {this.props.title}
                </Feed.Summary>
                <Feed.Extra text>

                    <Accordion>
                        <Accordion.Title
                            icon="dropdown"
                            content={<strong>{this.props.raw.title}</strong>}
                            active={this.state.expanded}
                            onClick={() => this.setState({expanded: !this.state.expanded})}
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

/**
 * @class Définit le composant Post, qui représente une publication effectuée par un ou des groupes.
 * @author manifold
 * @extends React.Component
 */
class DefaultPost extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        location: PropTypes.string,
        authors: PropTypes.arrayOf(PropTypes.object)
    };

    eventLocation() {
        if (this.props.hasOwnProperty("location") && this.props.location != null) {
            return <div>
                <Icon name='map' color="blue"/>
                {this.props.location}
            </div>;
        }
    }

    render() {
        let authors = this.props.authors || [];

        console.log(authors);

        return <Feed.Event>
            <Feed.Label>
                <Image src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"/>
            </Feed.Label>
            <Feed.Content>
                <Feed.Summary>
                    <Feed.User>
                        {authors.map((auth, i) => {
                            if (i === authors.length - 1)
                                return <span key={auth.uid || auth.gid}>auth.name</span>;
                            else
                                return <span key={auth.uid || auth.gid}>auth.name, </span>;
                        })}
                    </Feed.User>
                    ont publié sur {this.props.location}
                </Feed.Summary>
            </Feed.Content>

        </Feed.Event>;
    }
}

class AnnouncementPost extends Component {
    render() {
        return <PostTemplate
            title={<div>
                <DisplayList
                    elements={this.props.authors.map(g =>
                        <Feed.User as={Link} to={'/groups/' + g.gid} content={g.name}/>
                    )}
                /> ont publié pour&nbsp;
                <DisplayList
                    elements={this.props.recipients.map(g =>
                        <Feed.User as={Link} to={'/groups/' + g.gid} content={g.name}/>
                    )}
                />
            </div>}
            raw={this.props}
        />;
    }
}

class EventPost extends Component {
    render() {
        return <PostTemplate
            title={<div>
                <DisplayList elements={this.props.authors.map(g =>
                    <Feed.User as={Link} to={'/groups/' + g.gid} content={g.name}/>)
                }/> ont créé un évènement pour <DisplayList elements={this.props.authors.map(g =>
                <Feed.User as={Link} to={'/groups/' + g.gid} content={g.name}/>)}/>
            </div>}
            raw={this.props}
        />;
    }
}

class QuestionPost extends Component {
    render() {
        return <PostTemplate
            title={<div>
                <Feed.User as={Link} to={'/users/' + this.props.author.uid}>
                    {this.props.author.givenName} {this.props.author.lastName}
                </Feed.User> a posé une question à&nbsp;
                <Feed.User as={Link} to={'/groups/' + this.props.recipient.gid}>
                    {this.props.recipient.name}
                </Feed.User>
            </div>}
            raw={this.props}
        />;
    }
}


class AnswerPost extends Component {
    render() {
        return <PostTemplate
            title={<div>
                <Feed.User as={Link} to={'/groups/' + this.props.forQuestion.recipient.gid}>
                    {this.props.forQuestion.recipient.name}
                </Feed.User>
                &nbsp;a répondu à la question de&nbsp;
                <Feed.User as={Link} to={'/users/' + this.props.forQuestion.author.uid}>
                    {this.props.forQuestion.author.givenName}
                    &nbsp;
                    {this.props.forQuestion.author.lastName}
                </Feed.User>
            </div>}
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
        />;
    }
}

class PrivatePost extends Component {
    render() {
        return <PostTemplate
            title={<div>
                <Feed.User as={Link} to={'/users/' + this.props.author.uid}>
                    {this.props.author.givenName} {this.props.author.lastName}
                </Feed.User> a envoyé un message privé à&nbsp;
                <Feed.User as={Link} to={'/groups/' + this.props.recipient.gid}>
                    {this.props.recipient.name}
                </Feed.User>
            </div>}
            raw={this.props}
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