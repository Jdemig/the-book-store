'use client';

import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Copyright from '@/components/Copyright';
import { useRootStore } from '../stores/react';
import { AuthSignInData, AuthSignUpData } from '../stores/AuthStore';
import { useRouter } from 'next/navigation';


export enum AuthType {
    SignIn,
    SignUp,
};

export type AuthProps = {
    type: AuthType
};


export default function Auth(props: AuthProps) {
    const store = useRootStore();
    const { authStore } = store;

    const router = useRouter();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirm-password'),
        };

        if (props.type === AuthType.SignIn) {
            authStore.authSignIn(data as AuthSignInData)
                .then(() => {
                    router.push('/my-library');
                });
        } else if (props.type === AuthType.SignUp) {
            authStore.authSignUp(data as AuthSignUpData)
                .then(() => {
                    router.push('/my-library');
                });
        }
    };

    return (
        <>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
                {props.type === AuthType.SignIn ? 'Sign in' : 'Sign Up'}
            </Typography>
            <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                />
                {props.type === AuthType.SignUp && (
                <TextField
                        margin='normal'
                        required
                        fullWidth
                        name='confirm-password'
                        label='Confirm Password'
                        type='password'
                        id='confirm-password'
                        autoComplete='current-password'
                    /> 
                )}
                <FormControlLabel
                    control={<Checkbox value='remember' color='primary' />}
                    label='Remember me'
                />
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                >
                    {props.type === AuthType.SignIn ? 'Sign In' : 'Sign Up'}
                </Button>
                <Grid container>
                    <Grid item xs>
                        {/* <Link href='#' variant='body2'>
                        Forgot password?
                        </Link> */}
                    </Grid>
                    <Grid item>
                        {props.type === AuthType.SignIn ? (
                            <Link href='/sign-up' variant='body2'>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        ) : (
                            <Link href='/sign-in' variant='body2'>
                                {"Already have an account? Sign In"}
                            </Link>
                        )}
                    </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
            </Box>
        </>
    );
}