"use client";
import React, {useState} from "react";

import TextField, {TextFieldProps} from "@mui/material/TextField/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";


const PasswordField = (props: TextFieldProps) => {
    const [showPass, setShowPass] = useState(false);

    return (
        <TextField {...props}
                   type={showPass ? "text" : "password"}
                   slotProps={{
                       input: {
                           endAdornment: (
                               <InputAdornment position="end">
                                   <IconButton className="select-none hover:text-blue-600 outline-none"
                                               sx={{border: "none", outline: "none"}}
                                               onClick={() => setShowPass(!showPass)}>
                                       {showPass ? <MdVisibility/> : <MdVisibilityOff/>}
                                   </IconButton>
                               </InputAdornment>
                           )
                       }
                   }}
        />
    )
}

export default PasswordField;