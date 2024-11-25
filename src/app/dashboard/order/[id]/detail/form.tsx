"use client"

import React, {useState} from "react";
import {z} from "zod";
import {useRouter} from "next/navigation";

import FormConstructor, {BaseFormInputProps} from "@/components/forms/FormConstructor";
import type {OrderBase, OrderVisible, ValidationError} from "@/openapi/client";
import {OrderStatusChoices, ShippingTypeChoices} from "@/openapi/client";
import NumberFormat from "@/components/ui/forms/fields/NumberFormat";

import {edit} from "./actions";


interface Props {
    data: OrderVisible
}

const Form = ({data}: Props) => {
    const updateWithId = edit.bind(null, data.id)
    const router = useRouter();

    const [
        errors,
        setErrors
    ] = useState<ValidationError[] | null>(null)
    const handleSubmit = async (values: OrderBase, callback: (props: {
        isError: boolean,
        message?: string | null
    }) => Promise<void>) => {
        const response = await updateWithId(values)
        if (response.status === 200) {
            await callback({
                isError: false,
                message: response.message
            })
            setErrors(null);
            router.refresh();
            // window.location.reload();
        } else {
            await callback({isError: true, message: "Something went wrong!"});
            if (response.status === 422) setErrors(response.errors);
        }
    }
    const initialValues = {
        code: data.code ?? "",
        senderName: data.senderName,
        senderPhone: data.senderPhone,
        receiverName: data.receiverName,
        receiverPhone: data.receiverPhone,
        billingAddress: data.billingAddress,
        shippingAddress: data.shippingAddress,
        status: data.status.value,
        shippingAmount: data.shippingAmount ?? "",
        completedAt: data.completedAt ?? "",
        note: data.note ?? "",
        shippingType: data.shippingType.value,
    }

    const inputs: BaseFormInputProps[] = [
        {
            id: "code",
            name: "code",
            label: "Code",
            inputType: "textField",
            InputProps: {
                required: true,
                type: "text",
            }
        },
        {
            id: "senderName",
            name: "senderName",
            label: "Sender name",
            inputType: "textField",
            InputProps: {
                type: "text",
            }
        },
        {
            id: "senderPhone",
            name: "senderPhone",
            label: "Sender phone",
            inputType: "textField",
            InputProps: {
                type: "text",
            }
        },
        {
            id: "receiverName",
            name: "receiverName",
            label: "Receiver name",
            inputType: "textField",
            InputProps: {
                type: "text",
            }
        },
        {
            id: "receiverPhone",
            name: "receiverPhone",
            label: "Receiver phone",
            inputType: "textField",
            InputProps: {
                type: "text",
            }
        },
        {
            id: "billingAddress",
            name: "billingAddress",
            label: "Billing Address",
            inputType: "textField",
            InputProps: {
                type: "text",
            }
        },
        {
            id: "shippingAddress",
            name: "shippingAddress",
            label: "Shipping Address",
            inputType: "textField",
            InputProps: {
                type: "text",
            }
        },
        {
            id: "weight",
            name: "weight",
            label: "Weight",
            inputType: "textField",
            InputProps: {
                type: "text",
            }
        },
        {
            id: "price",
            name: "price",
            label: "Price",
            inputType: "textField",
            InputProps: {
                type: "text",

                InputProps: {
                    inputComponent: NumberFormat as any,
                }
            }
        },
        {
            id: "shippingAmount",
            name: "shippingAmount",
            label: "Shipping Amount",
            inputType: "textField",

            InputProps: {
                type: "text",

                InputProps: {
                    inputComponent: NumberFormat as any,
                }
            }
        },
        {
            id: "note",
            name: "note",
            label: "Note",
            inputType: "textField",
            InputProps: {
                multiline: true,
                type: "text",
            }
        },

        {
            id: 'status',
            name: 'status',
            label: "Status",
            inputType: 'selectField',
            InputProps: {
                items: (Object.keys(OrderStatusChoices) as Array<keyof typeof OrderStatusChoices>).map((key) => ({
                    value: OrderStatusChoices[key],
                    label: key,
                })),
                required: true,

            }
        },
        {
            id: 'shippingType',
            name: 'shippingType',
            label: "Shipping type",
            inputType: 'selectField',
            InputProps: {
                items: (Object.keys(ShippingTypeChoices) as Array<keyof typeof ShippingTypeChoices>).map((key) => ({
                    value: ShippingTypeChoices[key],
                    label: key,
                })),
                required: true,

            }
        },
        {
            id: "completedAt",
            name: "completedAt",
            label: "Completed At",
            inputType: "datetimeField",
        },
    ]

    const schema = z.object(
        {
            code: z.string({required_error: "This field is required"}),
            senderName: z.string({required_error: "This field is required"}),
            senderPhone: z.string({required_error: "This field is required"}),
            receiverName: z.string({required_error: "This field is required"}),
            receiverPhone: z.string({required_error: "This field is required"}),
            billingAddress: z.string({required_error: "This field is required"}),
            shippingAddress: z.string({required_error: "This field is required"}),
            status: z.nativeEnum(OrderStatusChoices),
            shippingType: z.nativeEnum(ShippingTypeChoices)
        }
    )


    return (
        <FormConstructor<OrderBase>
            resetForm={false}
            onSubmit={handleSubmit}
            title="Edit user"
            initialValues={initialValues}
            schema={schema}
            errors={errors}
            inputs={inputs}
            onReset={() => setErrors(null)}
        />
    )
}

export default Form;
