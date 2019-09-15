import React from "react";
import {Message} from "semantic-ui-react";

export interface GraphQLErrorProps {
    error? : Error
}

function GraphQLError(props: GraphQLErrorProps) {
    if (props.error)
        console.error(props.error);
    return (
        <div>
            <Message negative>
                <Message.Header>Erreur de chargement GraphQL</Message.Header>
                {props.error ?
                    <p>{props.error.toString()}</p>
                    :
                    <p>Erreur de communication entre le backend et le frontend.</p>
                }
            </Message>
        </div>
    );

}

export default GraphQLError;
