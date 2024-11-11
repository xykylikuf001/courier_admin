import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";


export default function NotFound() {
    return (
        <Stack className="h-full p-5" component="div"
               direction={"column"} justifyContent="center" alignItems={"center"} sx={{height: "100%"}}>
            <div style={{
                fontSize: "128px", lineHeight: "155px",
            }}>
                404
            </div>
            <Typography variant="body1">
                Page or source not found!
            </Typography>
        </Stack>
    );
}
