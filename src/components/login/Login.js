import { Box, Button, Container, Grid } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Context } from '../../index';
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from 'firebase/auth';

const Login = () => {

    const { auth } = useContext(Context);
    const [user, setUser] = useState(auth.currentUser);


    const login = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const { user } = await signInWithPopup(auth, provider); 
            console.log("user2", user);
            window.location.href = "/categoryDay";
        } catch (error) {
            console.error(error);
            window.location.href = "/loginDay";
        }
    }

    console.log("user", user)

    return (

        <Container>
            <Grid container
                style={{ height: window.innerHeight - 50 }}
                justifyContent={'center'}
                alignItems={'center'}>

                <Grid style={{ width: 400, background: "lightgray" }}
                    container
                    alignItems={'center'}
                    direction={"column"}>
                    <Box p={5}>
                        <Button onClick={login} variant='outlined'>Login mit Google</Button>
                    </Box>
                </Grid>

            </Grid>
        </Container>
    );
}

export default Login;