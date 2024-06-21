'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppBar,Box,Toolbar,Typography,Menu,Container,MenuItem, Button, } from '@mui/material';
import { useRootStore } from '../stores/react';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react';
import Cookies from 'js-cookie';


function NavBar() {
    const router = useRouter();

    const store = useRootStore();
    const { authStore } = store;
    const isLoggedIn = authStore.getIsLoggedIn();

    const [anchorElNav, setAnchorElNav] = useState(null);
    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleSignOut = () => {
        authStore.authSignOut();
        router.push('/sign-in');
    }

    useEffect(() => {
        const isLoggedIn = !!Cookies.get('token');
        authStore.setIsLoggedIn(isLoggedIn);
    }, []);

    return (
        <AppBar
            position='static'
            sx={{
                backgroundColor: '#fff',
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
            }}
        >
            <Container maxWidth='xl'>
            <Toolbar disableGutters>
                <Link href="/">
                    <Typography
                        sx={{
                            fontWeight: 800,
                            fontSize: 22,
                            fontFamily: "'Inter', sans-serif",
                            color: 'black',
                        }}
                    >
                        📚 The Book Store
                    </Typography>
                </Link>
                
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <Menu
                    id='menu-appbar'
                    anchorEl={anchorElNav}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{ display: { xs: 'block', md: 'none' } }}
                >
                    <MenuItem onClick={handleCloseNavMenu}>
                        <Button
                            onClick={handleCloseNavMenu}
                            component={Link}
                            href='/'
                            variant="text"
                        >
                            Home
                        </Button>
                    </MenuItem>
                    {isLoggedIn && (
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Button
                                onClick={handleCloseNavMenu}
                                component={Link}
                                href='/my-library'
                                variant="text"
                            >
                                My Library
                            </Button>
                        </MenuItem>
                    )}
                    <MenuItem onClick={handleCloseNavMenu}>
                        <Button
                            component={Link}
                            href='/sign-in'
                            variant="text"
                        >
                            Sign In
                        </Button>
                    </MenuItem>
                </Menu>
                </Box>

                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <Button
                        size='large'
                        onClick={handleOpenNavMenu}
                        sx={{ width: '32px', minWidth: '10px', p: 0 }}
                    >
                        <MenuIcon sx={{ width: '100%' }} />
                    </Button>
                </Box>

                <Box
                    sx={{
                        flexGrow: 1,
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        justifyContent: 'right',
                        textAlign: 'center',
                    }}
                >
                    {isLoggedIn && (
                        <Button
                            onClick={handleCloseNavMenu}
                            component={Link}
                            href='/my-library'
                            variant="text"
                            sx={{ mr: 1 }}
                        >
                            My Library
                        </Button>
                    )}
                    
                </Box>
                <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                    {isLoggedIn ? (
                        <Button
                            component={Link}
                            href="/sign-in"
                            variant="contained"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </Button>
                    ) : (
                        <Button
                            component={Link}
                            href="/sign-in"
                            variant="contained"
                        >
                            Sign In
                        </Button>
                    )}
                </Box>
            </Toolbar>
            </Container>
        </AppBar>
    );
};

export default observer(NavBar);