"use client";

import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import {styled} from '@mui/material/styles';
import {SitemarkIcon} from './custom-icons';
// import ColorModeSelect from '@/shared-theme/ColorModeSelect';
import {useRouter} from "next/navigation";
import {z} from "zod";
import {canSubmit, checkError, getError, toastLoading, toastUpdate} from "@/lib/helper";
import {authenticate} from "@/app/auth/sign-in/actions";
import {AUTH_LOGIN_REDIRECT} from "@/lib/constants";
import {useFormik} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import PasswordField from "@/components/ui/forms/fields/PasswordField";
import {ValidationError} from "@/openapi/client";
import ColorModeIconDropdown from "@/shared-theme/ColorModeIconDropdown";

const Card = styled(MuiCard)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInContainer = styled(Stack)(({theme}) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function Content() {
    const [errors, setErrors] = useState<ValidationError[] | null>(null);


    const router = useRouter();

    const schema = z.object({
        username: z.string({required_error: "Please fill your email"}),
        password: z.string({required_error: "Please fill your password"}),
    });
    const handleSubmit = async (values: {
        remember: boolean;
        username: string;
        password: string;
    }) => {
        const toastId = toastLoading("Please wait!");

        const response = await authenticate(values);

        if (response.status == 200){
            toastUpdate(toastId, response.message ?? "Auth successfully!", "success");
            router.push(AUTH_LOGIN_REDIRECT)
        }else{
            toastUpdate(toastId, response.message ?? "Can't sign-in", "warning");
            if (response.status === 422) setErrors(response.errors)
        }
    };

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            remember: true,
        },
        validationSchema: toFormikValidationSchema(schema),
        onSubmit: handleSubmit,
    });

    return (
        <SignInContainer direction="column" justifyContent="space-between">
            <div className="tw-flex tw-flex-row ">
                <div className="tw-flex-grow"/>
                <ColorModeIconDropdown/>
            </div>
            <Card variant="outlined">
                <SitemarkIcon/>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
                >
                    Sign in
                </Typography>

                <Box
                    component="form"
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                    onSubmit={formik.handleSubmit}
                >
                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField
                            // error={emailError}
                            // helperText={emailErrorMessage}
                            id="username"
                            type="username"
                            name="username"
                            placeholder="your@email.com"
                            autoComplete="username"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            // color={emailError ? 'error' : 'primary'}
                            sx={{ariaLabel: 'username'}}


                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={checkError(formik, errors, "username")}
                            helperText={getError(formik, errors, "username")}
                        />
                    </FormControl>
                    <FormControl>
                        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <FormLabel htmlFor="password">Password</FormLabel>
                        </Box>
                        <PasswordField
                            // error={passwordError}
                            // helperText={passwordErrorMessage}
                            name="password"
                            placeholder="••••••"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            required
                            fullWidth
                            variant="outlined"

                            onChange={formik.handleChange}
                            value={formik.values.password}
                            error={checkError(formik, errors, "password")}
                            helperText={getError(formik, errors, "password")}
                        />
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox
                            // value="remember"
                            name="remember"
                            id="remember"
                            color="primary"
                            onChange={formik.handleChange}
                            checked={formik.values.remember}
                        />}
                        label="Remember me"


                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={canSubmit(formik)}
                    >
                        Sign in
                    </Button>
                </Box>
            </Card>
        </SignInContainer>
    );
}