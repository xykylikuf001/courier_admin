import React from "react";

import TextField, {TextFieldProps} from "./TextField";


const EmailField = (props: TextFieldProps) => {
    return (
        <TextField {...props} type="email"/>
    )
}

export default EmailField;