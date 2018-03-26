/**
 * @file page listant les Annonces _écrites_ par ce groupe.
 */


import React from 'react';
import {Route, Link} from 'react-router-dom';

import faker from 'faker';

import { Search, Grid, Divider } from 'semantic-ui-react';
import _ from 'lodash';

import {Announcements} from '../../messages/Announcement.jsx';

const source = _.times(5, () => ({
    title: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    image: faker.internet.avatar(),
}));

class AnnouncementSearchBar extends React.Component {
    componentWillMount() {
        this.resetComponent();
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value });

        setTimeout(() => {
            /*
            if (this.state.value.length < 1) return this.resetComponent()

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result) => re.test(result.title)*/

            this.setState({
                isLoading: value!="",
                /*results: _.filter(source, isMatch),*/
            });
        }, 500);
    }

    render() {
        const { isLoading, value, results } = this.state;

        return (
            <Search
                fluid
                input = {{ fluid: true }}
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                showNoResults={false}
                results={results}
                value={value}
                {...this.props}
            />
        );
    }
}

const AnnouncementSearch = () => (
    <div>
        <Grid>
            <Grid.Column width={6}>
                <AnnouncementSearchBar/>
            </Grid.Column>
        </Grid>
    </div>
);

const GroupAnnouncements = ({match}) => (
    <div>
        <AnnouncementSearch/>
        <Divider/>
        <Announcements/>
    </div>
);

export default GroupAnnouncements;