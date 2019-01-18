/**
 * @file Un exemple jouet pour comprendre comment faire des formulaires en React (+ semantic UI).
 * Cet exemple est adapté de https://react.semantic-ui.com/collections/form#form-example-capture-values
 */

import React from 'react';
import { Form } from 'semantic-ui-react';

class ControlledComponentFormDemo extends React.Component {

    // https://reactjs.org/docs/forms.html
    // this "controlled components" method is the recommended way to manage forms:
    // the idea is making the React state be the “single source of truth”.

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            submittedName: '',
            submittedEmail: '' 
        };

        // This binding is necessary to make `this` work in the callback
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const name = e.target.name; //l'attribut "name" du Component qui appelle ce handle (par un onChange)
        const value = e.target.value;
        this.setState({ [name]: value }); //ES6 computed property name syntax
    }
    
    handleSubmit(e) {
        const { name, email } = this.state;
        this.setState({ submittedName: name, submittedEmail: email });
    }

    render() {

        const { name, email, submittedName, submittedEmail } = this.state;
        //on peut le voir comme un shorthand de "name=this.state.name", "email=...", ...

        return (
            <div>
                {/*rappelons qu'on ne doit return qu'un seul element ("only one Child element"), donc on wrap tout dans un <div>*/}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Input
                            placeholder='Name'
                            name='name' 
                            value={name} 
                            onChange={this.handleChange} />
                        <Form.Input 
                            placeholder='Email' 
                            name='email' 
                            value={email} 
                            onChange={this.handleChange} />
                        <Form.Button content='Submit' />
                    </Form.Group>
                </Form>
                <strong>onChange:</strong>
                <pre>{JSON.stringify({ name, email }, null, 2)}</pre>
                <strong>onSubmit:</strong>
                <pre>{JSON.stringify({ submittedName, submittedEmail }, null, 2)}</pre>
            </div>
        );
    }
}

export default ControlledComponentFormDemo;