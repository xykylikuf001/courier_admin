"use client"

import React, {useState} from "react";
import {z} from "zod";
import {useRouter} from "next/navigation";

import FormConstructor, {BaseFormInputProps} from "@/components/forms/FormConstructor";
import {LobbyBase, LobbyStatusChoices, LobbyTypeChoices, LobbyVisible, ValidationError} from "@/openapi/client";
import NumberFormat from "@/components/ui/forms/fields/NumberFormat";

import {edit} from "./actions";


interface Props {
    data: LobbyVisible
}

const Form = ({data}: Props) => {
    const updateWithId = edit.bind(null, data.id)
    const router = useRouter();

    const [
        errors,
        setErrors
    ] = useState<ValidationError[] | null>(null)
    const handleSubmit = async (values: LobbyBase, callback: (props: {
        isError: boolean,
        message?: string | null
    }) => Promise<void>) => {
        const response = await updateWithId(values)
        if (response.status === 200) {
            await callback({
                isError: false,
                message: response.message
            })
            setErrors(null)
            router.refresh();
        } else {
            await callback({isError: true, message: response.message})
            if (response.status === 422) setErrors(response.errors)
        }
    }
    const initialValues = {
        startAt: data.startAt,
        telegramGroup: data.telegramGroup,
        stakeAmount: data.stakeAmount,
        totalAmount: data.totalAmount,
        priceAmount: data.priceAmount,
        feeAmount: data.feeAmount,
        isPaid: data.isPaid,
        status: data.status.value,
        lobbyType: data.lobbyType.value
    }

    const inputs: BaseFormInputProps[] = [
        {
            id: "telegramGroup",
            name: "telegramGroup",
            label: "Telegram group",
            inputType: "textField",
            InputProps: {
                required: true,
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
                required: true,

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
            status: z.nativeEnum(LobbyStatusChoices),
            lobbyType: z.nativeEnum(LobbyTypeChoices)
        }
    )


    return (
        <FormConstructor<LobbyBase>
            onSubmit={handleSubmit}
            title="Edit lobby"
            initialValues={initialValues}
            schema={schema}
            errors={errors}
            inputs={inputs}
            onReset={() => setErrors(null)}
        />
    )
}

export default Form;
