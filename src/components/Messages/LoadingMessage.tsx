import React from "react";
import {Icon, Message, MessageProps} from 'semantic-ui-react';

export const LoadingMessage = (props: MessageProps) => (
    <Message
        header={"Chargement en cours"}
        icon={<Icon name='circle notched' loading/>}
        info
        content={"Veuillez patienter svp"}
        {...props}
    />
);
