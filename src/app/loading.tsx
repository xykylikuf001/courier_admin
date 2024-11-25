"use client"
import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
export default function Loading() {
    return (
        <div className="tw-h-screen tw-flex tw-justify-center tw-items-center">
            <CircularProgress />
        </div>
    );
}
