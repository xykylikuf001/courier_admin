import React, {Fragment, ReactNode, useEffect} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from "@mui/material/Backdrop";
import FormGroup from "@mui/material/FormGroup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import FormHelperText from "@mui/material/FormHelperText";
import Autocomplete from "@mui/material/Autocomplete";
import {FormikProps, FormikValues, useFormik} from "formik";
import {ZodType} from "zod";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {useConfirm} from "material-ui-confirm";

import {TextFieldProps} from "@mui/material/TextField/TextField";
import {AutocompleteProps} from "@mui/material/Autocomplete/Autocomplete"
import Select, {SelectProps as BaseSelectProps} from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

import Link from "@/components/Link";
import {FormActions} from "@/components/ui/forms/FormActions";
import {canSubmit, checkError, getError, toastLoading, toastUpdate} from "@/lib/helper";
import {type ValidationError as ValidationErrorType} from "@/openapi/client";
import Checkbox, {CheckboxProps} from "@/components/ui/forms/fields/Checkbox";
import DateTimePicker, {DateTimePickerProps} from "@/components/ui/forms/fields/DateTimePicker";
import TextField from "@/components/ui/forms/fields/TextField";
import FormLabel from "@mui/material/FormLabel";


type  LocalSelectProps = {
    items: { value: string | number, label: ReactNode }[];
} & BaseSelectProps;


export type BaseFormInputTypes =
    "textField"
    | "selectField"
    | "checkboxField"
    | "tipTapEditorField"
    | "componentField"
    | "autocompleteField"
    | "datetimeField";


interface BaseProps {
    id: string
    name: string
    label: string
    render?: (formik: FormikProps<any>, error: boolean, helperText?: string | null) => ReactNode
}

interface TextFieldInput extends BaseProps {
    inputType: "textField";
    InputProps?: TextFieldProps;
}

interface SelectFieldInput extends BaseProps {
    inputType: "selectField";
    InputProps: LocalSelectProps;
}

interface CheckboxFieldInput extends BaseProps {
    inputType: "checkboxField";
    InputProps?: CheckboxProps;
}

interface DatetimeFieldInput extends BaseProps {
    inputType: "datetimeField";
    InputProps?: DateTimePickerProps;
}


interface AutocompleteFieldInput extends BaseProps {
    inputType: "autocompleteField";
    InputProps: AutocompleteProps<any, any, any, any>;
}

interface ComponentFieldInput extends BaseProps {
    inputType: "componentField";
    InputProps?: undefined;
}

export type BaseFormInputProps<InputType extends BaseFormInputTypes = BaseFormInputTypes> =
    InputType extends 'textField'
        ? TextFieldInput
        : InputType extends "selectField"
            ? SelectFieldInput
            : InputType extends "checkboxField"
                ? CheckboxFieldInput
                : InputType extends "datetimeField"
                    ? DatetimeFieldInput
                        : InputType extends "autocompleteField"
                            ? AutocompleteFieldInput : ComponentFieldInput;

type FormInputProps = { inputType: BaseFormInputTypes } & Omit<BaseFormInputProps, "inputType">

function FormInput<InputType extends BaseFormInputTypes>(
    {formik, errors, ...input}: {
        errors: ValidationErrorType[] | null;
        formik: FormikProps<any>;
        inputType: InputType;
    } & Omit<BaseFormInputProps, "inputType">
): React.JSX.Element {
    if (input.inputType === 'textField') {
        const textInputProps = input.InputProps as TextFieldProps
        return (
            <Fragment>
                <FormLabel htmlFor="email">{input.label}</FormLabel>
                <TextField
                    margin="normal"
                    fullWidth
                    {...textInputProps}

                    id={input.id}
                    name={input.name}
                    value={formik.values[input.name]}
                    onChange={formik.handleChange}
                    error={checkError(formik, errors, input.name)}
                    helperText={getError(formik, errors, input.name)}
                />
            </Fragment>
        );
    } else if (input.inputType === 'selectField') {
        const selectInputProps = input.InputProps as LocalSelectProps

        if (!selectInputProps?.items) return <div/>
        const {items, ...props} = selectInputProps
        return (
            <FormControl fullWidth margin={'normal'}
                         error={checkError(formik, errors, input.name)}>
                <InputLabel id={input.id} required={props?.required ?? false}>{input.label}</InputLabel>
                <Select
                    variant="outlined"
                    {...props}
                    labelId={input.id}
                    id={input.id}
                    name={input.name}
                    label={input.label}
                    value={formik.values[input.name]}
                    onChange={(e) => formik.setFieldValue(input.name, e.target.value)}
                >
                    <MenuItem>
                        --- Select one of the below ---
                    </MenuItem>
                    {items.map((item, i: number) => {
                        return (
                            <MenuItem key={i} value={item.value}>
                                {item.label}
                            </MenuItem>
                        )
                    })}

                </Select>
                {checkError(formik, errors, input.name) && (
                    <FormHelperText>{getError(formik, errors, input.name)}</FormHelperText>
                )}
            </FormControl>

        )
    } else if (input.inputType === 'checkboxField') {
        const checkboxFieldProps = input.InputProps as CheckboxProps
        return (
            <FormGroup>
                <Checkbox
                    fullWidth={true} {...checkboxFieldProps}
                    handleChange={formik.handleChange} id={input.id}
                    label={input.label} name={input.name} checked={formik.values[input.name]}
                />
                {checkError(formik, errors, input.name) && (
                    <FormHelperText>{getError(formik, errors, input.name)}</FormHelperText>
                )}

            </FormGroup>
        )
    } else if (input.inputType === 'datetimeField') {
        const datetimeFieldProps = input.InputProps as DateTimePickerProps;
        return (
            <FormGroup>
                <FormLabel htmlFor="email">{input.label}</FormLabel>

                <DateTimePicker {...datetimeFieldProps} fullWidth={true}
                                name={input.name}
                                // label={input.label}
                                id={input.id}
                                onChange={(value: string|"") => formik.setFieldValue(input.name, value)}
                                value={formik.values[input.name]}
                />
                {checkError(formik, errors, input.name) && (
                    <FormHelperText>{getError(formik, errors, input.name)}</FormHelperText>
                )}

            </FormGroup>
        )
    } else if (input.inputType === "componentField") {
        return (
            <div>
                {input.render !== undefined && input.render(
                    formik,
                    checkError(formik, errors, input.name),
                    getError(formik, errors, input.name))}
            </div>
        )
    } else if (input.inputType === "autocompleteField") {
        const autocompleteFieldProps = input.InputProps as AutocompleteProps<any, any, any, any>
        return (
            <div>
                <Autocomplete
                    {...autocompleteFieldProps}
                    id={input.id}
                />
            </div>
        )
    }
    return <div/>;
}


interface Props<T> {
    children?: ReactNode
    onSubmit: (values: T, callback: (props: {
        isError: boolean,
        message?: string | null
    }) => Promise<void>) => Promise<void>
    title?: string
    cancelUrl?: string
    initialValues: T;
    schema: ZodType;
    errors: ValidationErrorType[] | null;
    inputs: FormInputProps[]
    action?: ReactNode
    redirect?: string
    extraValues?: Record<string, string | number | null | File> | null
    onReset?: () => void;
    withConfirm?: boolean;
    resetForm?: boolean;
}


function FormConstructor<T extends FormikValues = FormikValues>(
    {
        children,
        onSubmit,
        title,
        cancelUrl,
        initialValues,
        schema,
        errors,
        inputs,
        action,
        redirect = '#',
        extraValues,
        onReset,
        resetForm=false,
    }: Props<T>
) {
    const confirm = useConfirm();

    useEffect(() => {
        const prev = formik.values
        if (!extraValues) formik.setValues({...prev})
        formik.setValues({...prev, ...extraValues,})
    }, [extraValues])


    const handleSubmit = async (values: T) => {
        confirm().then(async () => {
            const toastId = toastLoading("Please wait!")
            const callback = async (props: { isError: boolean, message?: string | null }) => {
                if (props.isError) {
                    toastUpdate(toastId, props.message ?? "Failed with error", 'warning');
                } else {
                    if (resetForm){
                        formik.resetForm()
                    }
                    toastUpdate(toastId, props.message ?? "Successfully completed", 'success');
                }
            }
            await onSubmit(values, callback)
        })
    }
    const formik = useFormik<T>({
        initialValues: initialValues,
        validationSchema: toFormikValidationSchema(schema),
        onSubmit: handleSubmit
    })


    const handleReset = () => {

            formik.resetForm()

        if (onReset) onReset()
    }

    return (
        <div>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={formik.isSubmitting}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <form onSubmit={formik.handleSubmit} noValidate>
                <Card sx={{minWidth: 275}} variant="outlined">
                    {title && <CardHeader title={<Link href={redirect}>{title}</Link>} action={action}/>}
                    <CardContent sx={{overflow: 'visible'}} component={'div'} style={{width: '100%'}}>
                        {inputs.map((e, i) => (
                            <FormInput  {...e} formik={formik} errors={errors} inputType={e.inputType} key={i}/>
                        ))}
                        {children}
                    </CardContent>
                    <FormActions cancelUrl={cancelUrl} disabled={canSubmit(formik)} onReset={handleReset}/>
                </Card>
            </form>
            {/*<pre><code>{JSON.stringify(formik.errors, null, 2)}</code></pre>*/}
            {/*<pre><code>{JSON.stringify(extraValues, null, 2)}</code></pre>*/}
            {/*<pre><code>{JSON.stringify(errors, null, 2)}</code></pre>*/}
        </div>
    )
}

export default FormConstructor;