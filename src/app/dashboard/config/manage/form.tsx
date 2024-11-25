"use client"

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {z} from "zod";
import {MuiChipsInput} from 'mui-chips-input'
import FormGroup from "@mui/material/FormGroup";
import FormConstructor, {BaseFormInputProps} from "@/components/forms/FormConstructor";
import type {ConfigCreate, ValidationError, ConfigVisible} from "@/openapi/client";
import NumberFormat from "@/components/ui/forms/fields/NumberFormat";

import {manage} from "./actions";


const Form = ({data}: { data: ConfigVisible | null }) => {
    const router = useRouter();

    const [
        errors,
        setErrors
    ] = useState<ValidationError[] | null>(null)
    const handleSubmit = async (values: ConfigCreate, callback: (props: {
        isError: boolean,
        message?: string | null
    }) => Promise<void>) => {
        const response = await manage(values)
        if (response.status === 200) {
            await callback({
                isError: false,
                message: response.message
            })
            setErrors(null)
            router.push(`/dashboard/config`)
        } else {
            await callback({isError: true, message: response.message})
            if (response.status === 422) setErrors(response.errors)
        }
    }

    const initialValues = {
        phones: data?.phones ?? [],
        emails: data?.emails ?? [],
        supportEmail: data?.supportEmail ?? "",
        supportPhone: data?.supportEmail ?? "",
        regularShippingPrice: data?.regularShippingPrice ?? "",
        expressShippingPrice: data?.expressShippingPrice ?? "",

    }


    const inputs: BaseFormInputProps[] = [

        {
            id: "supportPhone",
            name: "supportPhone",
            label: "Support phone",
            inputType: "textField",
            InputProps: {
                autoFocus: true,
                type: "text",
            }
        },
        {
            id: "supportEmail",
            name: "supportEmail",
            label: "Support Email",
            inputType: "textField",
            InputProps: {
                type: "text",
            }
        },
        {
            id: "regularShippingPrice",
            name: "regularShippingPrice",
            label: "Regular Shipping Price",
            inputType: "textField",
            InputProps: {
                type: "text",
                InputProps: {
                    inputComponent: NumberFormat as any
                }
            }
        },
        {
            id: "expressShippingPrice",
            name: "expressShippingPrice",
            label: "Express Shipping Price",
            inputType: "textField",
            InputProps: {
                type: "text",
                InputProps: {
                    inputComponent: NumberFormat as any
                }
            }
        },
        {
            id: "phones",
            name: "phones",
            label: "Phones",
            inputType: "componentField",
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render: (formik, error, helperText) => {
                return (

                    <FormGroup>
                        <MuiChipsInput name="phones" id="phones"
                                       fullWidth
                                       label="Phones"
                                       value={formik.values.phones}
                                       onChange={(value) => formik.setFieldValue("phones", value)}
                        />
                    </FormGroup>
                )
            }
        },
        {
            id: "emails",
            name: "emails",
            label: "Emails",
            inputType: "componentField",
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render: (formik, error, helperText) => {
                return (
                    <FormGroup className="tw-mt-4">
                        <MuiChipsInput name="emails" id="emails"
                                       label="Emails"
                                       fullWidth
                                       value={formik.values.emails}
                                       onChange={(value) => formik.setFieldValue("emails", value)}
                        />
                    </FormGroup>
                )
            }
        },
    ]

    const schema = z.object(
        {
            phones: z.array(z.string()),
            emails: z.array(z.string().email()),
            expressShippingPrice: z.string(),
            regularShippingPrice: z.string(),
            supportEmail: z.string().email().optional(),
            supportPhone: z.string().optional(),
        }
    )

    return (
        <FormConstructor<ConfigCreate>
            onSubmit={handleSubmit}
            title={"Manage config data"}
            initialValues={initialValues}
            schema={schema}
            errors={errors}
            inputs={inputs}
            onReset={() => setErrors(null)}
        />
    )
}

export default Form;