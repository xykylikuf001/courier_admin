"use client"

import * as React from 'react';
// import { styled } from '@mui/material';
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Link from "@/components/Link";



export default function Content() {
    return (

        <Container>
        <Box sx={{ flexGrow: 1 }} >
            <Grid container spacing={2}>

                <Grid size={{sm: 12, md: 4}}>

                    <Typography gutterBottom sx={{ color: 'text.black', fontSize: 18, fontWeight: "500" }}>
                        Miscellaneous
                    </Typography>
                </Grid>
                <Grid size={4}>

                    <Link href={"/dashboard/config"}>
                    <Card sx={{ minWidth: 300 }} >
                        <CardContent>
                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                Site settings
                            </Typography>
                            <Typography variant="body2">
                                View and update your site settings.
                            </Typography>
                        </CardContent>
                    </Card>
                    </Link>
                </Grid>
                <Grid size={4}>
                    <Link href={"/dashboard/place"}>

                        <Card sx={{ minWidth: 300 }} >
                            <CardContent>
                                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                    Places
                                </Typography>
                                <Typography variant="body2">
                                    View and update your location places.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
            </Grid>
        </Box>
        </Container>
    );
}