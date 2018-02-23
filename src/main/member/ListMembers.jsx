import React from 'react';
import {Route, Link} from 'react-router-dom';

import faker from 'faker';
import {Accordion, Button, Segment, Checkbox, Icon, Divider, Grid, Search, Card, Image } from 'semantic-ui-react';

const MemberCard = () => (
    <Card>
        <Card.Content href="/member/1">
            <Image floated='left' size='tiny' src='/assets/images/default_avatar.jpg' />
            <Card.Header>
                Prénom Nom
            </Card.Header>
            <Card.Meta>
                Rôle(s) <br/>
                X20??
            </Card.Meta>
            <Card.Description>
                Commentaire chombier personnalisable pour garder les bonnes vieilles traditions de frankiz.
            </Card.Description>
        </Card.Content>
        <Card.Content extra as={Accordion}>
            <Accordion.Title center>
                Liste des binets
            </Accordion.Title>
            <Accordion.Content>
                <p>
                TODO : la liste des binets
                {faker.lorem.paragraphs()}
                </p>
            </Accordion.Content>
        </Card.Content>
    </Card>
)

const Members = () => (
    <Card.Group>
        <MemberCard/>
        <MemberCard/>
        <MemberCard/>
        <MemberCard/>
        <MemberCard/>
        <MemberCard/>
        <MemberCard/>
        <MemberCard/>
        <MemberCard/>
        <MemberCard/>
        <MemberCard/>
        <MemberCard/>
        <MemberCard/>
    </Card.Group>
)

class MemberSearchBar extends React.Component {
    componentWillMount() {
        this.resetComponent()
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            /*
            if (this.state.value.length < 1) return this.resetComponent()

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result) => re.test(result.title)*/

            this.setState({
                isLoading: value!="",
                /*results: _.filter(source, isMatch),*/
            })
        }, 500)
    }

    render() {
        const { isLoading, value, results } = this.state

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
        )
    }
}

const MemberSearch = () => (
    <div>
        <Grid>
            <Grid.Column width={6}>
                <MemberSearchBar/>
            </Grid.Column>
            <Grid.Column width={3}>
            	<Checkbox toggle />
            </Grid.Column>
        </Grid>
    </div>
)

const ListMembers = ({match}) => (
    <div>
        <MemberSearch/>
        <Divider/>
        <Members/>
    </div>
)
export default ListMembers;