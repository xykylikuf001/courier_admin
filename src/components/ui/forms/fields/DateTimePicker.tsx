"use client"

import React from "react";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFnsV3';

import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {MdCalendarMonth} from "react-icons/md";

import {MobileDateTimePicker} from '@mui/x-date-pickers/MobileDateTimePicker';
import InputAdornment from "@mui/material/InputAdornment";

import {FormControl} from "@mui/material";


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
        label, value, onChange, placeholder, className, formControlClassName, error, variant = "outlined",
        disablePast = false,
    }:
        DateTimePickerProps) => {
    return (
        <LocalizationProvider
            dateAdapter={AdapterDateFns}>
            <FormControl variant={variant} className={formControlClassName} error={error}>
                <MobileDateTimePicker
                    disablePast={disablePast}
                    label={label}
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
                        }
                    }}
                />
            </FormControl>
        </LocalizationProvider>
    );
};


export default DateTimePicker;