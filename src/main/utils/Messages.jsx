import React from "react";
import {Icon, Message} from 'semantic-ui-react';

export const LoadingMessage = (props) => (
    <Message header={"Chargement en cours"} icon={<Icon name='circle notched' loading />} info content={"Veuillez patienter svp"} {...props} />
);

