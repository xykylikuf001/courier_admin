"use client"

import React, {useState} from "react";
import {z} from "zod";
import {useRouter} from "next/navigation";


import FormConstructor, {BaseFormInputProps} from '@/components/forms/FormConstructor';
import {ValidationError, LobbyCreate, LobbyTypeChoices, LobbyStatusChoices} from '@/openapi/client';

import {create} from "./actions";
import NumberFormat from "@/components/ui/forms/fields/NumberFormat";



const Form = () => {
    const router = useRouter();
    const [errors, setErrors] = useState<ValidationError[] | null>(null);

    const inputs: BaseFormInputProps[] = [

        {
            id: "telegramGroup",
            name: "telegramGroup",
            label: "Telegram group",
            inputType: "textField",
            InputProps: {
                required: true,
                autoFocus: true,
                type: "text",
            }
        },
        {
            id: "startAt",
            name: "startAt",
            label: "Started at",
            inputType: "datetimeField",
        },
        {
            id: "winnerGroup",
            name: "winnerGroup",
            label: "Winner group",
            inputType: "textField",
            InputProps: {
                type: "text"
            }
        },

        {
            id: 'status',
            name: 'status',
            label: "Status",
            inputType: 'selectField',
            InputProps: {
                items: (Object.keys(LobbyStatusChoices) as Array<keyof typeof LobbyStatusChoices>).map((key) => ({
                    value: LobbyStatusChoices[key],
                    label: key,
                })),
            }
        },

        {
            id: 'lobbyType',
            name: 'lobbyType',
            label: "Lobby type",
            inputType: 'selectField',
            InputProps: {
                items: (Object.keys(LobbyTypeChoices) as Array<keyof typeof LobbyTypeChoices>).map((key) => ({
                    value: LobbyTypeChoices[key],
                    label: key,
                })),
                required: true,
            }
        },
        {
            id: "stakeAmount",
            name: "stakeAmount",
            label: "Stake amount",
            inputType: "textField",
            InputProps: {
                type: "text",
                InputProps: {
                    inputComponent: NumberFormat as any
                }
            }
        },
        {
            id: "totalAmount",
            name: "totalAmount",
            label: "Total amount",
            inputType: "textField",
            InputProps: {
                type: "text",
                InputProps: {
                    inputComponent: NumberFormat as any,
                }
            }
        },
        {
            id: "priceAmount",
            name: "priceAmount",
            label: "Price amount",
            inputType: "textField",
            InputProps: {
                type: "text",
                InputProps: {
                    inputComponent: NumberFormat as any,
                }
            }
        },
        {
            id: "feeAmount",
            name: "feeAmount",
            label: "Fee amount",
            inputType: "textField",
            InputProps: {
                type: "text",
                InputProps: {
                    inputComponent: NumberFormat as any,
                }
            }
        },
        {
            id: "isPaid",
            name: "isPaid",
            label: "Is paid",
            inputType: "checkboxField",
        },

    ]

    const schema = z.object(
        {
            telegramGroup: z.string({required_error: "This field required"}),
            startAt: z.string().datetime().nullable().optional(),
            isPaid: z.boolean().optional(),
            stakeAmount: z.string(),
            totalAmount: z.string(),
            priceAmount: z.string(),
            feeAmount: z.string(),
            status: z.nativeEnum(LobbyStatusChoices).nullable().optional(),
            lobbyType: z.nativeEnum(LobbyTypeChoices)
        }
    )


    const handleSubmit = async (values: LobbyCreate, callback: (props: {
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
                router.push(`/dashboard/lobby/${response.data.id}/detail`)
            }
        } else {
            await callback({isError: true, message: response.message})
            if (response.status === 422) setErrors(response.errors)
        }
    }

    const initialValues = {
        startAt: null,
        telegramGroup: "",
        winnerGroup: "",
        stakeAmount: "1.0",
        totalAmount: "0.0",
        priceAmount: "0.0",
        feeAmount: "0.0",
        isPaid: false,
        lobbyType: LobbyTypeChoices.SOLO
    }

    return (
        <FormConstructor<LobbyCreate>
            onSubmit={handleSubmit}
            title={"Add new lobby"}
            initialValues={initialValues}
            schema={schema}
            errors={errors}
            inputs={inputs}
            onReset={() => setErrors(null)}
        />
    )
}

export default Form;