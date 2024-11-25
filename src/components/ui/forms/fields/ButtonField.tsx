import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import {UseDateFieldProps} from "@mui/x-date-pickers/DateField";
import {BaseSingleInputFieldProps, DateValidationError, FieldSection} from "@mui/x-date-pickers/models";

import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import {MdClose} from "react-icons/md";


interface ButtonFieldProps
    extends UseDateFieldProps<Date, false>,
        BaseSingleInputFieldProps<
            Date | null,
            Date,
            FieldSection,
            false,
            DateValidationError
        > {
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    wrapClassName?: string;
    onReset?: ()=>void;
}

export default function ButtonField(props: ButtonFieldProps) {
    const {
        setOpen,
        label,
        id,
        disabled,
        InputProps: {ref} = {},
        inputProps: {'aria-label': ariaLabel} = {},
        wrapClassName="",
        onReset,
    } = props;

    return (
        <Stack direction="row" spacing={2} className={wrapClassName}>

            <Button
                variant="outlined"
                id={id}
                disabled={disabled}
                ref={ref}
                aria-label={ariaLabel}
                size="small"
                onClick={() => setOpen?.((prev) => !prev)}
                startIcon={<CalendarTodayRoundedIcon fontSize="small"/>}
                sx={{minWidth: 'fit-content', textAlign: "left"}}
                className={props.className}
            >
                {label ? `${label}` : 'Pick a date'}
            </Button>
            {onReset && <IconButton size="small" onClick={onReset}>
                {<MdClose/>}
            </IconButton>}
        </Stack>
    );
}