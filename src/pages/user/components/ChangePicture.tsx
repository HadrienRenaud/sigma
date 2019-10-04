import React, {useContext, useRef, useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import {Button, ButtonGroup, Header} from "semantic-ui-react";
import UserContext from "../../../components/UserContext/context";

export interface ChangePictureProps {
    onCompleted: () => void
}

const GET_RIGHT_TO_CHANGE_PICTURE = gql`
    query getRightsToChangeProfilePicture {
        getRightsToChangeProfilePicture
    }
`;

function uploadFile(to: string, file: any) {
    const formData = new FormData();
    formData.append("file", file);
    return fetch(to, {method: 'PUT', body: file});
}

function ChangePicture(props: ChangePictureProps) {
    const {onCompleted} = props;
    const {} = useContext(UserContext);
    const {data, loading} = useQuery<{ getRightsToChangeProfilePicture: string }, {}>(GET_RIGHT_TO_CHANGE_PICTURE);
    const [file, setFile] = useState<any>();
    const inputRef = useRef(null);

    const onSubmit = () => {
        if (data && data.getRightsToChangeProfilePicture) {
            uploadFile(data.getRightsToChangeProfilePicture, file)
                .then(() => onCompleted())
        }
    };

    return (
        <>
            <Header as="h3">
                Change your profile picture
            </Header>
            <input
                ref={inputRef}
                type="file"
                hidden
                onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />
            {file ? (
                <ButtonGroup>
                    <Button
                        color="green"
                        icon="upload"
                        content={`Upload ${file.name}`}
                        loading={loading}
                        onClick={onSubmit}
                    />
                    <Button
                        color="yellow"
                        icon="cancel"
                        content="Cancel"
                        onClick={() => setFile(null)}
                    />
                </ButtonGroup>
            ) : (
                <Button
                    content="Choose File"
                    labelPosition="left"
                    icon="file"
                    onClick={() => {
                        if (inputRef.current) {
                            // @ts-ignore
                            inputRef.current.click();
                        }
                    }}
                />
            )}
        </>
    )
        ;
}

export default ChangePicture;
