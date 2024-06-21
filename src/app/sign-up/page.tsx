'use client';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Auth, { AuthType } from '@/components/Auth';
import { NAV_HEIGHT } from '@/constants';


export default function SignUpSide() {
  return (
    <Grid container component="main" sx={{ height: `calc(100vh - ${NAV_HEIGHT}px)` }}>
        <CssBaseline />
        <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1544640808-32ca72ac7f37?q=80&amp;w=1035&amp;auto=format&amp;fit=crop)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'grey',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} square>
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Auth type={AuthType.SignUp} />
            </Box>
        </Grid>
    </Grid>
  );
}
