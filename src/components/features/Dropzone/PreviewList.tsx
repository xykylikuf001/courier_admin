"use client"
import React from 'react';
import clsx from 'clsx';

import Chip from '@mui/material/Chip';
import Fab from '@mui/material/Fab';
import Grid, {GridProps} from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/system';
import {MdDelete} from "react-icons/md";


interface FileObject {
    file: File;
    data: any;
}

export interface PreviewGridProps {

    container: GridProps;
    item?: GridProps;
}

export interface PreviewGridClasses {
    container: string | string[];
    item?: string | string[];
}

interface PreviewListProps {
    fileObjects: Array<FileObject>;
    getPreviewIcon: (fileObject: FileObject) => React.ReactNode;
    handleRemove: (value: number) => (e: React.UIEvent) => void;
    previewChipProps?: Record<string, any>;
    previewGridClasses?: PreviewGridClasses;
    previewGridProps?: PreviewGridProps;
    showFileNames?: boolean;
    useChipsForPreview?: boolean;
}

const MuiDropzonePreviewList = styled("div")(({theme}) => ({
    ".MuiDropzonePreviewList-root": {},
    '.MuiDropzonePreviewList-imageContainer': {
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        '&:hover .MuiDropzonePreviewList-image': {
            opacity: 0.3,
        },
        '&:hover .MuiDropzonePreviewList-removeButton': {
            opacity: 1,
        },
    },
    '.MuiDropzonePreviewList-image': {
        height: 100,
        width: 'initial',
        maxWidth: '100%',
        color: theme.palette.text.primary,
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        boxSizing: 'border-box',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px',
        borderRadius: theme.shape.borderRadius,
        zIndex: 5,
        opacity: 1,
    },
    '.MuiDropzonePreviewList-removeButton': {
        transition: '.5s ease',
        position: 'absolute',
        opacity: 0,
        top: theme.spacing(-1),
        right: theme.spacing(-1),
        width: 40,
        height: 40,
        '&:focus': {
            opacity: 1,
        },
    },
}))



function PreviewList(
    {
        fileObjects,
        handleRemove,
        showFileNames,
        useChipsForPreview,
        previewChipProps,
        previewGridClasses,
        previewGridProps,
        getPreviewIcon,
    }: PreviewListProps) {
    if (useChipsForPreview) {
        return (
            <MuiDropzonePreviewList>
                <Grid
                    spacing={1}
                    direction="row"
                    {...previewGridProps?.container}
                    container={true}
                    className={clsx("MuiDropzonePreviewList-root", previewGridClasses?.container)}
                >
                    {fileObjects.map((fileObject, i) => {
                        return (
                            <Grid
                                {...previewGridProps?.item}
                                item={true}
                                key={`${fileObject.file?.name ?? 'file'}-${i}`}
                                className={"MuiDropzonePreviewList-imageContainer"}
                            >
                                <Chip
                                    variant="outlined"
                                    {...previewChipProps}
                                    label={fileObject.file.name}
                                    onDelete={handleRemove(i)}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </MuiDropzonePreviewList>
        );
    }

    return (
        <MuiDropzonePreviewList>

            <Grid
                spacing={8}
                {...previewGridProps?.container}
                container={true}
                className={clsx("MuiDropzonePreviewList-root", previewGridClasses?.container)}
            >
                {fileObjects.map((fileObject, i) => {
                    return (
                        <Grid
                            xs={4}
                            {...previewGridProps?.item}
                            item={true}
                            key={`${fileObject.file?.name ?? 'file'}-${i}`}
                            className={clsx("MuiDropzonePreviewList-imageContainer", previewGridClasses?.item)}
                        >
                            {getPreviewIcon(fileObject)}

                            {showFileNames && (
                                <Typography variant="body1" component="p">
                                    {fileObject.file.name}
                                </Typography>
                            )}

                            <Fab
                                onClick={handleRemove(i)}
                                aria-label="Delete"
                                className={"MuiDropzonePreviewList-removeButton"}
                            >
                                <MdDelete/>
                            </Fab>
                        </Grid>
                    );
                })}
            </Grid>
        </MuiDropzonePreviewList>
    );
}


export default PreviewList;