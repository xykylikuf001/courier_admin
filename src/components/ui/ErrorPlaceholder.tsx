"use client"

import React from "react";
import {MdRefresh} from "react-icons/md";
import Button from '@mui/material/Button';


const ErrorPlaceholder = ({handleRefresh, message}: {handleRefresh?: ()=>void, message?: string|null})=> {
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-0.5">
            <Button variant="text" sx={{zIndex: 999}} onClick={handleRefresh}>
                <MdRefresh size={64}/>
            </Button>
            <div>{message??'Something went wrong'}</div>
        </div>
    );
}

export default ErrorPlaceholder