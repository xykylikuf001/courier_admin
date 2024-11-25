"use client"

import SnackbarContent from '@mui/material/SnackbarContent';
import IconButton from '@mui/material/IconButton';
import {styled} from '@mui/system';
import {
    MdCheckCircle,
    MdClose, MdError, MdInfo, MdWarning
} from 'react-icons/md';
import clsx from 'clsx';
import React, {forwardRef} from 'react';

interface SnackbarContentWrapperProps {
    className?: string;
    message?: React.ReactNode;
    onClose?: () => void;
    variant: 'success' | 'warning' | 'error' | 'info';
}

// Icon component mapping
const variantIcon: { [key: string]: React.ElementType } = {
    success: MdCheckCircle,
    warning: MdWarning,
    error: MdError,
    info: MdInfo,
};



const MuiDropzoneSnackbar = styled("div")(({theme})=>({
    ".MuiDropzoneSnackbar-successAlert": {
        backgroundColor: theme?.palette?.success?.main,
    },
    ".MuiDropzoneSnackbar-errorAlert": {
        backgroundColor: theme?.palette?.error?.main,
    },
    ".MuiDropzoneSnackbar-infoAlert": {
        backgroundColor: theme?.palette?.info?.main,
    },
    ".MuiDropzoneSnackbar-warningAlert": {
        backgroundColor: theme?.palette?.warning?.main,
    },
    ".MuiDropzoneSnackbar-message": {
        display: 'flex',
        alignItems: 'center',
        '& > svg': {
            marginRight: theme?.spacing?.(1),
        },
    },
    ".MuiDropzoneSnackbar-icon": {
        fontSize: 20,
        opacity: 0.9,
    },
    ".MuiDropzoneSnackbar-closeButton": {},
}))


// SnackbarContentWrapper component
const SnackbarContentWrapper = forwardRef<HTMLDivElement, SnackbarContentWrapperProps>(
    (props, ref) => {
        const {
            className,
            message,
            onClose,
            variant,
            ...other
        } = props;
        const Icon = variantIcon[variant];

        return (
            <MuiDropzoneSnackbar>

                <SnackbarContent
                    ref={ref}
                    className={clsx(`MuiDropzoneSnackbar-${variant}Alert`, className)}
                    aria-describedby="client-snackbar"
                    message={
                        <span id="client-snackbar" className="MuiDropzoneSnackbar-message">
                        <Icon className="MuiDropzoneSnackbar-icon" />
                            {message}
                    </span>
                    }
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className="MuiDropzoneSnackbar-closeButton"
                            onClick={onClose}
                        >
                            <MdClose className="MuiDropzoneSnackbar-icon" />
                        </IconButton>,
                    ]}
                    {...other}
                />
            </MuiDropzoneSnackbar>
        );
    });

SnackbarContentWrapper.displayName = "SnackbarContentWrapper"

export default SnackbarContentWrapper;
