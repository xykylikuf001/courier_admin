// import Link from 'next/link'
//
// export default function NotFound() {
//     return (
//         <div>
//             <h2>Not Found</h2>
//             <p>Could not find requested resource</p>
//             <Link href="/">Return Home</Link>
//         </div>
//     )
// }

import React from 'react';
import {Container, Typography, Button, Box} from '@mui/material';

import {NextLinkComposed} from "@/components/Link";

export default function NotFound() {
    return (
        <>
            <Container
                maxWidth="sm"
                sx={{
                    textAlign: 'center',
                    marginTop: '10%',
                    color: '#fff',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // height: '100vh',
                    }}
                >
                    <Typography variant="h1" component="div" gutterBottom sx={{fontSize: '6rem'}}>
                        404
                    </Typography>
                    <Typography variant="h4" component="div" gutterBottom>
                        Page Not Found
                    </Typography>
                    <Typography  variant="body1"  paragraph>
                        The page you are looking for doesn't exist or an error occurred. Go back to the homepage.
                    </Typography>
                    <Button
                        component={NextLinkComposed}
                        variant="contained"
                        color="primary"
                        to="/"
                        sx={{mt: 2}}
                    >
                        Go Home
                    </Button>
                </Box>
                <Box
                    sx={{
                        backgroundImage: 'url(/not-found.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: -1,
                        // opacity: 0.5,
                    }}
                />
            </Container>
        </>
    );
};