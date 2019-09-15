import React from "react";
import {Header, Icon, Menu, Search} from "semantic-ui-react";

export enum Tabs {
    Dislikes,
    Likes,
    Member,
    Speaker,
    Admin
}


export interface UserGroupsMenuProps {
    isMe: boolean,
    selectedTab: Tabs,
    setSelectedTab: (tab: Tabs) => void,
}

function UserGroupsMenu(props: UserGroupsMenuProps) {
    const {selectedTab, isMe, setSelectedTab} = props;

    return (
        <Menu secondary pointing>
            <Menu.Item>
                <Header>
                    <Icon name="group"/>
                    Groupes
                </Header>
            </Menu.Item>
            {isMe &&
            <Menu.Item
                active={selectedTab === Tabs.Dislikes}
                onClick={() => setSelectedTab(Tabs.Dislikes)}
                icon="eye slash"
                name="Dislikes"
            />}
            <Menu.Item
                active={selectedTab === Tabs.Likes}
                onClick={() => setSelectedTab(Tabs.Likes)}
                icon="eye"
                name="Likes"
            />
            <Menu.Item
                active={selectedTab === Tabs.Member}
                onClick={() => setSelectedTab(Tabs.Member)}
                icon="heart"
                name="Member"
            />
            <Menu.Item
                active={selectedTab === Tabs.Speaker}
                onClick={() => setSelectedTab(Tabs.Speaker)}
                icon="bullhorn"
                name="Speaker"
            />
            <Menu.Item
                active={selectedTab === Tabs.Admin}
                onClick={() => setSelectedTab(Tabs.Admin)}
                icon="chess queen"
                name="Admin"
            />
            <Menu.Menu position="right">
                <Menu.Item>
                    <Search disabled/>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
}

export default UserGroupsMenu;
