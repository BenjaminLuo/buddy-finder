import React, { useState } from "react";
import { TextField, Button, Typography, Box, Stack, Alert } from '@mui/material';
import { signIn, signUp, auth } from "../Auth/auth";

export const SignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorPassword, triggerErrorPassword] = useState(false);
    const [errorEmail, triggerErrorEmail] = useState(false);
    const [authError, setAuthError] = useState("");

    const handleSignIn = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        signIn(auth, email, password)
            .then(res => console.log('--- SIGN IN SUCCESS ---', res))
            .catch((error) => {
                setAuthError(getRefinedAuthErrorMessage(error.message));
            });
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        signUp(auth, email, password)
            .then(res => console.log('--- SIGN UP SUCCESS ---', res))
            .catch((error) => {
                setAuthError(getRefinedAuthErrorMessage(error.message));
            });
    };

    const validateForm = () => {
        const isEmailValid = email !== "";
        const isPasswordValid = password !== "";
        triggerErrorEmail(!isEmailValid);
        triggerErrorPassword(!isPasswordValid);
        return isEmailValid && isPasswordValid;
    }

    return (
        <Box component="form" noValidate sx={{ mt: 1 }}>
            {authError && 
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {authError}
                </Alert>
            }
            <Stack spacing={2.5}>
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    error={errorEmail}
                    helperText={errorEmail ? "Email is required" : ""}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                        }
                    }}
                />
                <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    error={errorPassword}
                    helperText={errorPassword ? "Password is required" : ""}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                        }
                    }}
                />
                
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={handleSignIn}
                    size="large"
                    sx={{ 
                        py: 1.5,
                        fontSize: '1rem',
                        mt: 1
                    }}
                >
                    Sign In
                </Button>
                
                <Box sx={{ position: 'relative', py: 1 }}>
                    <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', position: 'absolute', top: '50%', left: 0, right: 0 }} />
                    <Typography 
                        variant="caption" 
                        sx={{ 
                            px: 2, 
                            bgcolor: 'background.paper', 
                            position: 'relative', 
                            color: 'text.secondary',
                            mx: 'auto',
                            display: 'table'
                        }}
                    >
                        OR
                    </Typography>
                </Box>

                <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleSignUp}
                    size="large"
                    sx={{ py: 1.5 }}
                >
                    Create New Account
                </Button>
            </Stack>
        </Box>
    );
}

function getRefinedAuthErrorMessage(errorMessage) {
    return errorMessage
        .replace('Firebase: ', '')
        .replace('Error', '')
        .replace(`(${'auth/'}`, '')
        .replace(')', '')
        .replace(/-/g, ' ');
}
