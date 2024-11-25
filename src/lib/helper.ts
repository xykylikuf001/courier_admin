import type {ToastOptions} from "react-toastify";
import {toast as baseToast} from "react-toastify";
import {format, parseISO} from "date-fns";

import type {FormikProps} from "formik";

import {ValidationError} from "@/openapi/client";
// import {DEFAULT_LOCALE} from "@/lib/constants";

const toastOptions: ToastOptions = {
    // autoClose: 5000,
    position: "top-center",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    closeButton: true,
    pauseOnFocusLoss: false,
};

export const toastLoading = (message: string) => {
    return baseToast.loading(message, toastOptions);
};

export const toastUpdate = (
    toastId: any,
    message: string,
    toastType: any = "success"
) => {
    baseToast.update(toastId, {
        render: message,
        type: toastType,
        isLoading: false,
        autoClose: 5000,
    });
};

export const toast = (
    message: string,
    toastType: any = "success",
    options?: ToastOptions
) => {
    baseToast(message, {
        type: toastType,
        autoClose: 5000,

        ...toastOptions,
        ...options,
    });
}

export function filterOutFalsyItems(obj: Record<any, any>): any {
    const resObj: any = {};
    for (const i in obj) {
        if (obj[i]) {
            resObj[i] = obj[i];
        }
    }
    return resObj;
}

export const isObjectEmpty = (obj: Record<any, any>) => {
    try {
        if (!obj) throw new Error(`argument type is not object or in null value`);
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    } catch (error) {
        console.log(error);
    }
};

export const formatDate = (
    {
        date,
        formatStr = "PP",
    }: {
        date?: string;
        formatStr?: string;
    }) => {
    if (!date) return "";
    return format(parseISO(date), formatStr);
};

export const formatDatetime = (
    {
        date,
        formatStr = "dd.MM.yyyy HH:mm",
    }: {
        date: string;
        formatStr?: string;
    }) => {
    if (!date) return "";
    return format(parseISO(date), formatStr);
};

export function getItem(object: any, key: string, default_value = "") {
    const result = object[key];
    return typeof result !== "undefined" ? result : default_value;
}

type ResolutionType = "DESKTOP" | "MOBILE";

export function getResolution(): ResolutionType {
    if (process.browser) {
        return window.innerWidth <= 768 ? "MOBILE" : "DESKTOP";
    } else return "DESKTOP";
}

export function getValueFromEnum<T extends string>(
    enumObj: Record<string, T>,
    value: string | number | undefined
): T | undefined {
    if (value === undefined) {
        return undefined;
    }
    const keys = Object.keys(enumObj) as Array<keyof typeof enumObj>;
    const key = keys.find((k) => enumObj[k] === value);
    return key ? enumObj[key] : undefined;
}

export const checkError = (
    formik: FormikProps<any>,
    errors: ValidationError[] | Record<string, string> | null,
    field: any
) => {
    if (formik.errors[field]) return true;
    else if (errors && Array.isArray(errors)) {
        return !!errors?.find(e => e.loc[1] === field);
    } else if (errors && errors[field]) return true;
    return false;
};

export const getError = (
    formik: FormikProps<any>,
    errors: ValidationError[] | Record<string, string> | null,
    field: any
): string | undefined => {
    if (formik.errors[field]) {
        return formik.errors[field]?.toString();
    } else if (errors && Array.isArray(errors)) {
        if (errors?.find(e => e.loc[1] === field)) {
            return errors?.find(e => e.loc[1] === field)?.msg || ''
        }
    } else if (errors && errors[field]) {
        return errors[field];
    }
    return undefined;
};

export const canSubmit = (formik: FormikProps<any>) => {
    if (!(formik.isValid && formik.dirty)) return true;
    return formik.isSubmitting;
};

export const convertValidationErrorToDict = (
    errors: ValidationError[]
): Record<string, string> => {
    if (!errors || errors.length === 0) return {};
    return errors.reduce((acc, e) => {
        acc[e.loc[1]] = e.msg;
        return acc;
    }, {} as Record<string, string>);
};


export const readFile = (
    file: File | null,
    type: "text" | "dataURL" | "arrayBuffer"
) => {
    return new Promise<string | ArrayBuffer>((r) => {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", (e) => {
            if (e && e.target && e.target.result && file !== null) {
                r(e.target.result);
            }
        });
        if (file !== null) {
            if (type === "text") {
                fileReader.readAsText(file);
            } else if (type === "dataURL") {
                fileReader.readAsDataURL(file);
            } else if (type === "arrayBuffer") {
                fileReader.readAsArrayBuffer(file);
            }
        }
    });
};


export function isImage(file: File) {
    if (file.type.split('/')[0] === 'image') {
        return true;
    }
}

export function convertBytesToMbsOrKbs(filesize: number) {
    let size = '';
    if (filesize >= 1048576) {
        size = (filesize / 1048576) + ' megabytes';
    } else if (filesize >= 1024) {
        size = (filesize / 1024) + ' kilobytes';
    } else {
        size = filesize + ' bytes';
    }
    return size;
}

export async function createFileFromUrl(url: string) {
    const response = await fetch(url);
    const data = await response.blob();
    const metadata = {type: data.type};
    const filename: string = (url.replace(/\?.+/, '') || '').split('/').pop() || '';
    return new File([data], filename, metadata);
}

export function displayCurrency(props?: { amount: number | string | null, currency?: string } | null): string {
    if (!props || props.amount === "" || props.amount === null) return '';

    // Convert amount to a number if it's a string
    const amount = typeof props.amount === 'string' ? parseFloat(props.amount) : props.amount;
    if (isNaN(amount)) return '';
    return new Intl.NumberFormat('ru-RU', {style: 'currency', currency: props.currency}).format(props.amount as number)
}