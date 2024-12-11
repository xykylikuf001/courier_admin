"use client"

import React, {useState} from "react";
import {z} from "zod";
import {useRouter} from "next/navigation";

import FormConstructor, {BaseFormInputProps} from "@/components/forms/FormConstructor";
import {ValidationError, PlaceTranslationCreate, LanguagesChoices} from "@/openapi/client";


import {createTranslation} from "./actions";
import {languages} from "@/config";


const Form = ({objId}: { objId: number }) => {
    const createWithId = createTranslation.bind(null, objId);
    const router = useRouter();

    const inputs: BaseFormInputProps[] = [
        {
            id: "name",
            name: "name",
            label: "Name",
            inputType: "textField",
            InputProps: {
                required: true,
                type: "text",
            }
        },
        {
            id: "fullName",
            name: "fullName",
            label: "Full name",
            inputType: "textField",
            InputProps: {
                type: "text",
            }
        },

        {
            id: 'locale',
            name: 'locale',
            label: "Language",
            inputType: 'selectField',
            InputProps: {
                items: languages,
                required: true,
            }
        },
    ]

    const schema = z.object(
        {
            name: z.string({required_error: "This field required"}),
            fullName: z.string().optional(),
            locale: z.nativeEnum(LanguagesChoices)
        }
    )
    const [
        errors,
        setErrors
    ] = useState<ValidationError[] | null>(null)
    const handleSubmit = async (values: PlaceTranslationCreate, callback: (props: {
        isError: boolean,
        message?: string | null
    }) => Promise<void>) => {
        const response = await createWithId(values)
        if (response.status === 201) {
            await callback({
                isError: false,
                message: response.message
            })
            setErrors(null)

            if (response.data) {
                router.refresh()
            }
        } else {
            await callback({isError: true, message: response.message})
            if (response.status === 422) setErrors(response.errors)
        }
    }

    const initialValues = {
        name: "",
        fullName: "",
        locale: LanguagesChoices.TK,
    }

    return (
        <FormConstructor<PlaceTranslationCreate>
            onSubmit={handleSubmit}
            title={"Add place translation"}
            initialValues={initialValues}
            schema={schema}
            errors={errors}
            inputs={inputs}
            onReset={() => setErrors(null)}
        />
    )
}

export default Form;