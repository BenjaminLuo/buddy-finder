import React, { useContext } from "react";
import { Typography } from '@mui/material';
import { AuthContext } from '../Authentication/AuthDetails';
import { SignInForm } from "./SignInForm";

const SignIn = () => {
    const { authUser } = useContext(AuthContext);

    return (
        <>
            {
                authUser ?
                    <Typography variant="h6">
                        You are signed in as <b>{authUser.email}</b>.
                    </Typography>
                    :
                    <>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Log In or Register
                        </Typography>
                        <hr style={{ marginBottom: '20px' }} />
                        <SignInForm />
                    </>
            }
        </>
    );
};

export default SignIn;