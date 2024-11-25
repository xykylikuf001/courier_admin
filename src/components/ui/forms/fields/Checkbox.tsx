import React, {ChangeEvent} from 'react';
import MuiCheckbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';


export interface CheckboxProps {
    id: string
    name: string
    label: string
    checked: boolean
    handleChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean)=>void,
    size?: 'small' | 'medium'
    color?: 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'default' | undefined
    fullWidth?: boolean
    margin?: 'normal' | 'dense' | 'none'
}

const Checkbox = (props: CheckboxProps) => {
    const {
        id,
        name,
        label,
        handleChange,
        checked,
        size = 'medium',
        color = 'primary',
        fullWidth = false,
        margin = 'dense',
    } = props
    return (
        <FormControl margin={margin} fullWidth={fullWidth}>
            <FormControlLabel
                control={
                    <MuiCheckbox
                        id={id}
                        name={name}
                        size={size}
                        color={color}
                        checked={checked}
                        onChange={handleChange}
                    />
                }
                label={
                    <Typography variant="inherit" sx={{userSelect: 'none'}}>
                        {label}
                    </Typography>
                }
            />
        </FormControl>

    )
}

export default Checkbox;

