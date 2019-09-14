import {Grid, Header, Image, Segment} from "semantic-ui-react";
import React, {ReactNode} from "react";
// @ts-ignore
import logo_sigma from "../../../assets/logo_sigma.png";

function LoginLayout({children}: { children: ReactNode }) {
    return (
        <div className='login-form'>
            <Grid textAlign='center'
                  style={{height: '100%', paddingTop: 100}}
                  verticalAlign='middle'
            >
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' color='blue' textAlign='center'>
                        <Image src={logo_sigma}/>
                        Connexion
                    </Header>
                    <Segment raised>
                        {children}
                    </Segment>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default LoginLayout;
