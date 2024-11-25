import React from 'react';
import { format } from 'date-fns';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFnsV3';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import ButtonField from "@/components/ui/forms/fields/ButtonField";

export default function DatePicker() {
    const [value, setValue] = React.useState<Date | null>(new Date());
    const [open, setOpen] = React.useState(false);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MuiDatePicker
                value={value}
                label={value == null ? null : format(value, 'MMM dd, yyyy')}
                onChange={(newValue) => setValue(newValue)}
                slots={{ field: ButtonField }}
                slotProps={{
                    field: { setOpen, className: "tw-text-left" } as any,
                    nextIconButton: { size: 'small' },
                    previousIconButton: { size: 'small' },
                }}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                views={['day', 'month', 'year']}
            />
        </LocalizationProvider>
    );
}