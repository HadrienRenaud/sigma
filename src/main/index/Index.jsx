import React from 'react';
import PostsFeed from '../messages/PostsFeed.jsx';

/**
 * @file page d'accueil. ce Component wrap tous les minimodules presents sur la page d'accueil
 */

class Index extends React.Component {

    render() {
        return (
            <div>
                {/*<ControlledComponentFormDemo/>*/}
                {/*<TOS/>*/}
                {/*
                <p>Voici juste un form de test, il n'est pas persistant !</p>
                <p>Please don't test, it works.</p>
                <AddFormulaire addProject={this.handleAddProject.bind(this)}/>
                <Formulaire projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)} />
                */}
                {/* <GroupAnnouncements/> */}

                <h1>Fil d'actualités</h1>
                <PostsFeed/>
            </div>
        );
    }
}

export default Index;
