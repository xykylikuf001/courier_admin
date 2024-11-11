"use client"
import {useState, Fragment} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useFormik} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {z} from "zod";

import {Box} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';

import DropzoneArea from "@/components/features/Dropzone/DropzoneArea";
import TextField from "@/components/ui/forms/fields/TextField";
import {toastLoading, toastUpdate} from "@/lib/helper";
import NumberFormat from "@/components/ui/forms/fields/NumberFormat";
import {depositAmount} from "@/components/payment/actions";
import {useRouter} from "next/navigation";


interface OptionType {
    value: string;
    label: string;
}

// const filterOptions = createFilterOptions({
//     matchFrom: 'start',
//     stringify: (option: OptionType) => option,
// });

export default function DepositDialog(
    {open, setOpen, disabledUserFetch, initialUser}: {
        open: boolean,
        setOpen: (open: boolean) => void,
        initialUser: OptionType | null,
        disabledUserFetch: boolean
    }
) {
    const router = useRouter();
    const initialOptions = initialUser ? [initialUser] : []
    const [options, setOptions] = useState(initialOptions)
    const handleClose = () => {
        setOpen(false);
    };


    const schema = z.object({
        receiverUser: z.object({
            value: z.string(),
            label: z.string()
        }).nullable().refine(val => val !== null, {
            message: "Receiver User is required",
        }),
        amount: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
            message: "Amount must be a valid number greater than zero",
        }),
    });

    const handleSubmit = async (values: {
        receiverUser: OptionType | null;
        amount: string;
        files: File[]
    }) => {
        const toastId = toastLoading("Please wait!");

        if (values.receiverUser === null) return


        const formData = new FormData()
        if (values.files.length > 0){
            formData.append("file", values.files[0] as File);
        }
        formData.append("receiverUserId", values.receiverUser.value)
        formData.append("amount", values.amount)


        const response = await depositAmount(formData)

        if (response.status == 200) {
            toastUpdate(toastId, response.message ?? "Deposit successfully done!", "success");
            router.push(`/dashboard/payment/${response?.data?.id}/detail`);
        } else {
            toastUpdate(toastId, response.message ?? "Something went wrong!", "warning");
        }
    };

    const formik = useFormik({
        initialValues: {
            receiverUser: initialUser,
            amount: "",
            files: []
        },
        validationSchema: toFormikValidationSchema(schema),
        onSubmit: handleSubmit,
    });


    return (
        <Fragment>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: formik.handleSubmit,
                    noValidate: true,
                }}
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            Deposit
                        </Typography>
                        <Button type="submit" color="inherit">
                            Save
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogTitle>Deposit</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please select user and amount for deposit.
                    </DialogContentText>
                    <Autocomplete
                        disabled={disabledUserFetch}
                        // filterOptions={filterOptions}
                        disablePortal
                        onChange={(event: any, newValue: { label: string; value: string; } | null) => {
                            formik.setFieldValue("receiverUser", newValue);
                        }}
                        value={formik.values.receiverUser}
                        fullWidth={true}
                        id="combo-box-demo"
                        options={options}
                        // sx={{width: 300}}
                        renderInput={(params) => (
                            <TextField {...params}
                                       required
                                       autoFocus label="User" variant="standard"/>
                        )}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="amount"
                        name="amount"
                        label="Amount"
                        type="text"
                        // sx={{width: 300}}
                        onChange={formik.handleChange}
                        value={formik.values.amount}
                        fullWidth
                        variant="standard"
                        InputProps={{
                            inputComponent: NumberFormat as any,
                            inputProps: {min: 0}
                        }}
                    />

                    <Box p={3} textAlign="center">
                        <DropzoneArea
                            filesLimit={1}
                            acceptedFiles={{
                                // 'application/pdf': [".pdf"],
                                'image/*': ['.jpeg', '.png', "jpg"]
                            }}
                            dropzoneText={"Drag and drop an image here or click"}
                            onChange={(newFiles: File[])=>formik.setFieldValue("files", newFiles)}
                            showPreviews={true}
                            showPreviewsInDropzone={false}
                            useChipsForPreview
                            previewGridProps={{container: {spacing: 1, direction: 'row'}}}
                            previewText="Selected files"
                        />
                    </Box>
                    {/*<pre><code>{JSON.stringify(formik.values, null, 2)}</code></pre>*/}
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}
