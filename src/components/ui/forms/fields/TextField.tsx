import MuiTextField  from "@mui/material/TextField";
import type {TextFieldProps as MuiTextFieldProps} from "@mui/material/TextField/TextField";


export type TextFieldProps  = {} & MuiTextFieldProps;


const TextField = (props: TextFieldProps) => {
    return (
        <MuiTextField {...props}/>
    )
}

export default TextField;