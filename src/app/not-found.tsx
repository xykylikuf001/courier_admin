"use client"

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NextLinkComposed } from "@/components/Link";

export default function NotFound() {
    return (
        <>
            <Container
                maxWidth="sm"
                sx={{
                    textAlign: "center",
                    marginTop: { xs: "20%", md: "10%" },
                    color: "#fff",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                    }}
                >
                    <Typography
                        variant="h1"
                        component="div"
                        gutterBottom
                        sx={{
                            fontSize: { xs: "4rem", md: "6rem" },
                            fontWeight: "bold",
                        }}
                    >
                        404
                    </Typography>
                    <Typography
                        variant="h4"
                        component="div"
                        gutterBottom
                        sx={{
                            fontSize: { xs: "1.5rem", md: "2rem" },
                            color: "rgba(255, 255, 255, 0.8)",
                        }}
                    >
                        Page Not Found
                    </Typography>
                    <Typography variant="body1" sx={{ maxWidth: "80%", lineHeight: 1.6 }}>
                        The page you are looking for doesn’t exist or an error occurred. Go back to the homepage.
                    </Typography>
                    <Button
                        component={NextLinkComposed}
                        variant="contained"
                        color="primary"
                        to="/"
                        sx={{
                            mt: 2,
                            textTransform: "none",
                            px: 4,
                            py: 1.5,
                            fontSize: "1rem",
                        }}
                    >
                        Go Home
                    </Button>
                </Box>
            </Container>
            <Box
                sx={{
                    backgroundImage: "url(/not-found.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: -1,
                    filter: "brightness(0.8)",
                }}
            />
        </>
    );
}
