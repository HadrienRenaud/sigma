import React from 'react';
import gql from 'graphql-tag';
import {UserContext} from "../utils/contexts.jsx";
import {Form, Header, Input, Segment, Button} from "semantic-ui-react";
import Mutation from "react-apollo/Mutation";
import Query from "react-apollo/Query";
import {GQLError} from "../Errors.jsx";


const EDIT_PROFILE = gql`
    mutation editProfile($nickname: String, $mail: String, $phone: String) {
        editProfile(nickname: $nickname, mail: $mail, phone: $phone) {
            nickname
            mail
            phone
        }
    }
`;

const GET_RIGHTS_TO_CHANGE_PICTURES = gql`
    query getRightsToChangeProfilePicture {
        getRightsToChangeProfilePicture
    }
`;


class EditProfileForm extends React.Component {
    state = {
        nickname: '',
        mail: '',
        phone: '',
    };

    handleSubmit = () => {
        console.log("Submit on state=", this.state);
    };

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    componentDidMount() {
        const {nickname, mail, phone} = this.props.user;
        this.setState({nickname, mail, phone});
    }

    render() {
        return (
            <Mutation mutation={EDIT_PROFILE}>
                {editProfile => (
                    <Form onSubmit={() => editProfile({variables: this.state})}>
                        <Form.Field>
                            <label>Nickname</label>
                            <Input
                                placeholder='Nickname'
                                value={this.state.nickname}
                                name='nickname'
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Phone number</label>
                            <Input
                                placeholder='Phone number'
                                value={this.state.phone}
                                name='phone'
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <Input
                                placeholder='Email'
                                value={this.state.mail}
                                name='mail'
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Button content='Submit'/>
                    </Form>
                )}
            </Mutation>
        );
    }
}


class ChangePicture extends React.Component {
    state = {
        file: null,
    };

    fileInputRef = React.createRef();

    onFormSubmit = e => {
        e.preventDefault(); // Stop form submit
        this.fileUpload(this.state.file).then(response => {
            console.log(response.data);
        });
    };

    fileChange = e => {
        this.setState({file: e.target.files[0]}, () => {
            console.log("File chosen --->", this.state.file);
        });
    };

    fileUpload = file => {
        const url = this.props.url;
        const formData = new FormData();
        formData.append("file", file);
        return fetch(url, {method: 'PUT', body: file});
    };

    render = () => {
        return (
            <Form onSubmit={this.onFormSubmit}>
                <Form.Field>
                    <Button
                        content="Choose File"
                        labelPosition="left"
                        icon="file"
                        onClick={() => this.fileInputRef.current.click()}
                    />
                    <input
                        ref={this.fileInputRef}
                        type="file"
                        hidden
                        onChange={this.fileChange}
                    />
                </Form.Field>
                <Button type="submit">Upload</Button>
            </Form>
        );
    };
}

const EditProfilePicture = () => (
    <Query query={GET_RIGHTS_TO_CHANGE_PICTURES}>
        {({error, loading, data}) => {
            if (error) return <GQLError error={error}/>;
            if (loading) return <span>Chargement ...</span>;
            return <ChangePicture url={data.getRightsToChangeProfilePicture}/>;
        }}
    </Query>
);

class EditUserProfile extends React.Component {
    render = () => {
        const user = this.context;
        console.log("User: ", user);
        return <>
            <Segment vertical>
                <Header>
                    {user.givenName} {user.lastName} ({user.nickname})
                    <Header.Subheader>@{this.props.uid || this.context.uid}</Header.Subheader>
                </Header>
            </Segment>
            <Segment vertical>
                <EditProfileForm user={user}/>
            </Segment>
            <Segment>
                <EditProfilePicture user={user}/>
            </Segment>
        </>;
    };

}


EditUserProfile.contextType = UserContext;
export default EditUserProfile;
