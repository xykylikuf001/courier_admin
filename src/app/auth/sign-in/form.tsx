'use client'

import {z} from "zod";
import {useFormik} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {useRouter, useSearchParams} from "next/navigation";

import TextField from "@/components/ui/forms/fields/TextField";
import PasswordField from "@/components/ui/forms/fields/PasswordField";
import Checkbox from "@/components/ui/forms/fields/Checkbox";
import Button from "@/components/ui/Button";
import {canSubmit, checkError, getError, toastLoading, toastUpdate} from "@/lib/helper";
import {AUTH_LOGIN_REDIRECT, WEBSITE_URL} from "@/lib/constants";
import BaseForm from "@/components/forms/Form";

import {authenticate} from "./actions";


const Form = ()=>{
    const errors = {};

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
        <BaseForm loading={false} onSubmit={formik.handleSubmit} noValidate>
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                name="username"
                label="Username"
                autoComplete="username"
                autoFocus
                value={formik.values.username}
                onChange={formik.handleChange}
                error={checkError(formik, errors, "username")}
                helperText={getError(formik, errors, "username")}
                size="small"
            />
            <PasswordField
                size="small"
                margin="normal"
                required
                fullWidth
                label="Password"
                id="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                autoComplete="current-password"
                error={checkError(formik, errors, "password")}
                helperText={getError(formik, errors, "password")}
            />
            <Checkbox
                label="Remember me"
                name="remember"
                checked={formik.values.remember}
                handleChange={formik.handleChange}
                id="remember"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                disabled={canSubmit(formik)}
            >
                Sign in
            </Button>
        </BaseForm>
    )
}

export default Form;