"use client"
import {useRef} from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import CopyButton from "@/components/ui/buttons/CopyButton";
import {toast} from "@/lib/helper";

const CopyContainer = ({text}: { text: string }) => {


    const textRef = useRef<HTMLDivElement | null>(null)
    const handleCopy = () => {
        const textElement = textRef.current
        if (!textElement) return
        const targetText = textElement.innerText;
        if (targetText) {
            navigator.clipboard.writeText(targetText)
                .then(() => {
                    toast("Copied")
                })
                .catch(() => {
                    toast("Error copying text to clipboard", "warning")
                });
        }
    }
    return (
        <Stack alignItems="center" direction="row" spacing={1}>
            <Typography onClick={handleCopy}
                        sx={{textDecoration: "underline", cursor: "pointer"}}
                        ref={textRef}
                        component="div" variant="body2">
                {text}
            </Typography>
            <CopyButton sx={{fontSize: "16px"}} onClick={handleCopy}/>
        </Stack>
    )
}

export default CopyContainer;