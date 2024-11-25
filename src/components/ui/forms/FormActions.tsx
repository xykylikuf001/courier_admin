import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import {NextLinkComposed} from "@/components/Link";

interface Props {
    cancelUrl?: string
    disabled: boolean
    onReset?: () => void
}

export const FormActions = (props: Props) => {
    return (
        <CardActions>
            {props.cancelUrl && <Stack spacing={2} direction="row">
                <Button component={NextLinkComposed} to={{pathname: props.cancelUrl}}
                        variant="outlined">Cancel</Button>

            </Stack>}
            <Box component="div" sx={{flexGrow: 1}}/>
            <Stack direction={'row'} spacing={2}>
                {props.onReset && <Button
                    type="button"
                    variant="outlined"
                    color={'secondary'}
                    onClick={props.onReset}>
                    Reset
                </Button>}
                <Button
                    type="submit"
                    variant="contained"
                    disabled={props.disabled}>
                    Submit
                </Button>
            </Stack>
        </CardActions>
    )
}