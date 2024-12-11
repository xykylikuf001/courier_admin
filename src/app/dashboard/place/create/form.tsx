"use client"

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {z} from "zod";

import {languages} from "@/config";
import FormConstructor, {BaseFormInputProps} from '@/components/forms/FormConstructor';
import {
    ValidationError,
    PlaceLevelChoices,
    PlaceCreateWithTranslation, LanguagesChoices,
} from '@/openapi/client';

import {create} from "./actions";


const Form = () => {
    const router = useRouter();
    const [errors, setErrors] = useState<ValidationError[] | null>(null);

    const inputs: BaseFormInputProps[] = [

        {
            id: "name",
            name: "name",
            label: "Name",
            inputType: "textField",
            InputProps: {
                required: true,
                type: "text",
                autoFocus: true,
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
            id: "slug",
            name: "slug",
            label: "Slug",
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
        {
            id: 'locationLevel',
            name: 'locationLevel',
            label: "Location level",
            inputType: 'selectField',
            InputProps: {
                items: (Object.keys(PlaceLevelChoices) as Array<keyof typeof PlaceLevelChoices>).map((key) => ({
                    value: PlaceLevelChoices[key],
                    label: key,
                })),
                required: true,
            }
        },
        {
            id: "isActive",
            name: "isActive",
            label: "Is active",
            inputType: "checkboxField",
        },
    ]

    const schema = z.object(
        {
            name: z.string({required_error: "This field is required"}),
            fullName: z.string().optional(),
            slug: z.string().optional(),
            isActive: z.boolean().optional(),
            locationLevel: z.nativeEnum(PlaceLevelChoices),
            locale: z.nativeEnum(LanguagesChoices)
        }
    )


    const handleSubmit = async (
        values: PlaceCreateWithTranslation, callback: (props: {
        isError: boolean,
        message?: string | null
    }) => Promise<void>) => {
        const response = await create(values)
        if (response.status === 201) {
            await callback({
                isError: false,
                message: response.message
            })
            setErrors(null)
            if (response.data) {
                router.push(`/dashboard/place/${response.data.id}/detail`)
            }
        } else {
            await callback({isError: true, message: response.message})

            if (response.status === 422) setErrors(response.errors)
        }
    }

    const initialValues = {
        name: "",
        fullName: "",
        slug: "",
        isActive: true,
        locationLevel: PlaceLevelChoices.CITY,
        locale: LanguagesChoices.TK
    }
    return (
        <FormConstructor<PlaceCreateWithTranslation>
            onSubmit={handleSubmit}
            title={"Add new place"}
            initialValues={initialValues}
            schema={schema}
            errors={errors}
            inputs={inputs}
            onReset={() => setErrors(null)}
        />
    )
}

export default Form;