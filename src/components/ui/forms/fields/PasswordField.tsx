"use client";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import {TextFieldProps} from "@mui/material/TextField/TextField";
import TextField from "@/components/ui/forms/fields/TextField";
import React, {useState} from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";


const PasswordField = (props: TextFieldProps) => {
    const [showPass, setShowPass] = useState(false);

    return (
        <TextField {...props}
                   type={showPass ? "text" : "password"}
                   InputProps={{
                       endAdornment: (
                           <InputAdornment position="end">
                               <IconButton className="select-none hover:text-blue-600" onClick={() => setShowPass(!showPass)}>
                                   {showPass ? <MdVisibility/> : <MdVisibilityOff/>}
                               </IconButton>
                           </InputAdornment>
                       )
                   }}
        />
    )
}

export default PasswordField;