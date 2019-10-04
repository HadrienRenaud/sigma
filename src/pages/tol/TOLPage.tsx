import React, {useState} from "react";
import {Container, Divider, Form, Header, Image, List, Message} from "semantic-ui-react";
import {User} from "../../constants/types";
import {useLazyQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import {userBase} from "../../services/apollo/fragments/user";
import {LoadingMessage} from "../../components/Messages/LoadingMessage";
import {Link} from "react-router-dom";
import {RoutesBuilders} from "../../constants/routes";


interface SearchParams {
    givenName: string
    lastName: string
    nickname: string
    nationality: string
    school: string
    groups: Array<string>
    studies: string
    phone: string
    mail: string
    address: string
}

interface DisplayUsersProps {
    users: Array<User>,
}

const SEARCH_TOL = gql`
    query searchTOL(
        $givenName: String
        $lastName: String
        $nickname: String
        $nationality: String
        $school: String
        $groups: [String]
        $studies: String
        $phone: String
        $mail: String
        $address: String
    ) {
        searchTOL (
            givenName: $givenName
            lastName: $lastName
            nickname: $nickname
            nationality: $nationality
            school: $school
            groups: $groups
            studies: $studies
            phone: $phone
            mail: $mail
            address: $address
        ) {
            ...userBase
            photo
        }
    }
    ${userBase}
`;


function DisplayUsers(props: DisplayUsersProps) {
    const {users} = props;

    if (users) {
        return (
            <List>
                {users.map(u => (
                    <List.Item key={u.uid}>
                        <Image src={u.photo} avatar/>
                        <List.Content>
                            <List.Header as={Link} to={RoutesBuilders.User(u.uid)}>
                                {u.nickname
                                    ? `${u.givenName} ${u.lastName} (${u.nickname})`
                                    : `${u.givenName} ${u.lastName}`
                                }
                            </List.Header>
                            <List.Description>
                                @{u.uid}
                            </List.Description>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        );
    } else {
        return (
            <Message
                header="We couldn't find any result"
                content="Please retry"
            />
        )
    }
}

function TOLPage() {
    const [searchTol, {data, loading, called}] = useLazyQuery<{ searchTOL: Array<User> }, SearchParams>(SEARCH_TOL);

    const [givenName, setGivenName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [nationality, setNationality] = useState<string>("");
    const [school, setSchool] = useState<string>("");
    const [groups, setGroups] = useState<Array<string>>([]);
    const [studies, setStudies] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [mail, setMail] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    return <>
        <Form
            onSubmit={() => searchTol({
                variables: {
                    givenName,
                    lastName,
                    nickname,
                    nationality,
                    school,
                    groups,
                    studies,
                    phone,
                    mail,
                    address,
                }
            })}
        >
            <Form.Group>
                <Form.Input
                    width={6}
                    label="Prénom"
                    value={givenName}
                    onChange={(e) => setGivenName(e.target.value)}
                />
                <Form.Input
                    width={6}
                    label="Nom"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <Form.Input
                    width={6}
                    label="Surnom"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Input
                    width={4}
                    label="Nationalité"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                />
                <Form.Input
                    disabled
                    width={4}
                    label="Formation"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                />
                <Form.Input
                    width={4}
                    label="Groups"
                    disabled
                />
                <Form.Input
                    width={4}
                    label="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Input
                    width={8}
                    label="Adresse"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <Form.Input
                    width={8}
                    label="Mail"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                />
            </Form.Group>
            <Form.Button
                content="Search"
                type="submit"
                icon="search"
            />
        </Form>
        <Divider hidden />
        {called ? (<>
            {loading && <LoadingMessage/>}
            <DisplayUsers users={(data && data.searchTOL) || []}/>
        </>) : (<>
            <Message
                header="Use the fields to search a profile"
                content="Click on the button search to submit your query"
            />
        </>)}
    </>
}

function TOLPageWrapper() {
    return (
        <Container>
            <Header as="h1">
                Search a face
            </Header>
            <TOLPage/>
        </Container>
    );
}

export default TOLPageWrapper;
