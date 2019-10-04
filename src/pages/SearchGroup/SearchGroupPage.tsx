import React, {useState} from "react";
import {Card, Container, Divider, Form, Header, Message} from "semantic-ui-react";
import {gql} from "apollo-boost";
import {groupBase} from "../../services/apollo/fragments/group";
import {useLazyQuery} from "@apollo/react-hooks";
import {Group} from "../../constants/types";
import {LoadingMessage} from "../../components/Messages/LoadingMessage";
import {RoutesBuilders} from "../../constants/routes";
import {useHistory} from "react-router-dom";

const SEARCH_GROUP = gql`
    query SearchGroup($search: String) {
        searchGroup(name: $search) {
            ...groupBase
        }
    }
    ${groupBase}
`;

function cropText(s: string, maxLength: number = 256): string {
    return s.slice(0, maxLength);
}

export interface SearchBarProps {
    search: (s: string) => void
}

function SearchBar(props: SearchBarProps) {
    const {search} = props;
    const [searchValue, setSearchValue] = useState<string>("");

    return (
        <Form onSubmit={() => search(searchValue)}>
            <Form.Group>
                <Form.Input
                    placeholder='Search groups...'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <Form.Button
                    type="submit"
                    content="Search"
                    icon="search"
                />
            </Form.Group>
        </Form>

    );
}

export interface GroupCardProps {
    g: Group
}

function GroupCard(props: GroupCardProps) {
    const {g} = props;
    const history = useHistory();

    return (
        <Card
            link
            onClick={() => history.push(RoutesBuilders.Group(g.gid))}
            image={g.logo}
            header={g.name}
            meta={"@" + g.gid}
            description={cropText(g.description || "")}
        />
    );
}


function SearchGroupPage() {
    const [search, {loading, data}] = useLazyQuery<{ searchGroup: Group[] }, { search: string }>(SEARCH_GROUP);

    return <Container>
        <Header as="h1">
            Search a binet
        </Header>
        <SearchBar search={(s: string) => s && search({variables: {search: s}})}/>
        <Divider hidden/>
        {loading && <LoadingMessage/>}
        {data && data.searchGroup && (
            <Card.Group>
                {data.searchGroup.map(g =>
                    <GroupCard g={g} key={g.gid}/>
                )}
            </Card.Group>
        )}
        {!loading && !data && (
            <Message
                info
                header="Pas de groupes trouvés."
                content="Utilise le champ de recherche ci-dessus pour rechercher un groupe !"
            />
        )}
    </Container>
}

function Wrapper() {
    return (
        <SearchGroupPage/>
    )
}

export default Wrapper;
