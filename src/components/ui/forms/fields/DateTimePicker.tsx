"use client"

import React from "react";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFnsV3';

import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {MdCalendarMonth} from "react-icons/md";

import {DateTimePicker as MuiDateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {MobileDateTimePicker as MuiMobileDateTimePicker} from '@mui/x-date-pickers/MobileDateTimePicker';
import InputAdornment from "@mui/material/InputAdornment";

import FormControl from "@mui/material/FormControl";
import ButtonField from "@/components/ui/forms/fields/ButtonField";
import {formatDatetime, getResolution} from "@/lib/helper";


export interface DateTimePickerProps {
    /**
     * The variant to use.
     * @default 'outlined'
     */
    variant?: 'standard' | 'outlined' | 'filled';
    label?: string;
    value?: string | null;
    fullWidth: boolean;
    name?: string;
    id?: string;
    onChange?: (e: string ) => void
    placeholder?: string
    className?: string;
    formControlClassName?: string;
    error?: boolean;
    helperText?: string;
    disablePast?: boolean
}

const DateTimePicker = (
    {
        label, value,
        onChange,
        placeholder,
        className,
        formControlClassName,
        error,
        variant = "outlined",
        disablePast = false,
    }:
        DateTimePickerProps) => {
    const [open, setOpen] = React.useState(false);
    const isMobile = getResolution()
    const Component = isMobile === "MOBILE"?MuiMobileDateTimePicker:MuiDateTimePicker
    return (
        <LocalizationProvider
            dateAdapter={AdapterDateFns}>
            <FormControl variant={variant} className={formControlClassName} error={error}>
                <Component
                    label={value == null ? label : formatDatetime({date: value})}
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}

                    disablePast={disablePast}
                    value={value ? new Date(value) : null}
                    onChange={(e) => {
                        if (onChange) {
                            const value = e === null ? "" : e.toISOString()
                            onChange(value)
                        }
                    }}
                    className={className}
                    slotProps={{
                        textField: {
                            variant: variant,
                            InputProps: {
                                placeholder: placeholder,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <MdCalendarMonth/>
                                    </InputAdornment>
                                ),
                            },
                        },

                        field: {
                            setOpen,
                            wrapClassName: "tw-min-w-fit tw-my-3",
                            onReset: ()=>{
                                if (onChange){
                                    onChange("");
                                }
                            },
                        } as any,
                        nextIconButton: { size: 'small' },
                        previousIconButton: { size: 'small' },
                    }}
                    slots={{ field: ButtonField }}

                />
            </FormControl>
        </LocalizationProvider>
    );
};


export default DateTimePicker;