import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Route, Link } from 'react-router-dom';

import faker from 'faker';

import { Button, Segment, Icon, Divider, Card } from 'semantic-ui-react';

class GroupFrontPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { frontPage } = this.props;
        
        return (
            <div>
                <p>Group Front Page</p>
                <ReactMarkdown source={frontPage} />
            </div>
        );
    }

}

export default GroupFrontPage;
