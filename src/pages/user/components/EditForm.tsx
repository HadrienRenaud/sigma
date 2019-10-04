import React, {useState} from "react";
import {User} from "../../../constants/types";
import {Form} from "semantic-ui-react";
import {gql} from "apollo-boost";
import {userBase} from "../../../services/apollo/fragments/user";
import {useMutation} from "@apollo/react-hooks";

export interface EditFormProps {
    user: User,
    onCompleted: () => void,
}

interface EditProfileVariables {
    nickname: string,
    mail: string,
    phone: string,
}

const EDIT_PROFILE = gql`
    mutation editProfile($nickname: String, $mail: String, $phone: String) {
        editProfile(nickname: $nickname, mail: $mail, phone: $phone) {
            ...userBase
        }
    }
    ${userBase}
`;

function EditForm(props: EditFormProps) {
    const {user, onCompleted} = props;
    const [editProfile, {loading}] = useMutation<{ editProfile: User }, EditProfileVariables>(EDIT_PROFILE, {onCompleted});
    const [nickname, setnickname] = useState<string>(user.nickname || "");
    const [mail, setmail] = useState<string>(user.mail || "");
    const [phone, setphone] = useState<string>(user.phone || "");

    return (
        <Form
            onSubmit={() => editProfile({variables: {nickname, mail, phone}})}
        >
            <Form.Input
                value={user.givenName}
                label="Prénom (non éditable)"
                readOnly
            />
            <Form.Input
                value={user.lastName}
                label="Nom (non éditable)"
                readOnly
            />
            <Form.Input
                value={nickname}
                onChange={(e) => setnickname(e.target.value)}
                label="Surnom"
                placeholder="Un surnom stylé pour qqn de stylé"
            />
            <Form.Input
                value={user.birthdate}
                label="Date de naissance (non éditable)"
                readOnly
            />
            <Form.Input
                value={mail}
                onChange={(e) => setmail(e.target.value)}
                label="Mail"
                placeholder="louis.vaneau@polytechnique.edu"
            />
            <Form.Input
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                label="Surnom"
                placeholder="0628318531"
            />
            <Form.Button
                color="orange"
                content="Submit"
                icon="check"
                loading={loading}
            />
        </Form>
    );
}

export default EditForm;
