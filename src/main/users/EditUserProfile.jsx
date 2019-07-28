import React from 'react';
import gql from 'graphql-tag';
import {UserContext} from "../utils/contexts.jsx";
import {Form, Header, Input, Segment} from "semantic-ui-react";
import Mutation from "react-apollo/Mutation";


const EDIT_PROFILE = gql`
    mutation editProfile($nickname: String, $mail: String, $phone: String) {
        editProfile(nickname: $nickname, mail: $mail, phone: $phone) {
            nickname
            mail
            phone
        }
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
                    <Form onSubmit={() => editProfile({ variables: this.state})}>
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
        </>;
    };

}


EditUserProfile.contextType = UserContext;
export default EditUserProfile;
