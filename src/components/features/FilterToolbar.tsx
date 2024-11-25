import React, {ReactNode} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";



const FilterToolbar = (
    {
        children,
        handleClick,
        handleClear
    }: { children: ReactNode, handleClick?: () => void, handleClear?: () => void }) => {

    return (
        <Box sx={{width: '100%'}}>
            <Paper component={'div'} sx={{width: '100%', mb: 2}}>
                <Card sx={{minWidth: 275}}>
                    <CardHeader title="Filter"/>
                    <CardContent>
                        {children}
                    </CardContent>
                    <CardActions>
                        <Box sx={{width: '100%'}}>
                            <Stack spacing={2} direction="row"
                                   justifyContent="flex-end"
                                   alignItems="center">
                                <Button onClick={handleClear} variant="outlined">
                                    Clear
                                </Button>
                                <Button
                                    onClick={handleClick}
                                    type="submit"
                                    variant="contained">
                                    Filter
                                </Button>
                            </Stack>
                        </Box>
                    </CardActions>
                </Card>
            </Paper>
        </Box>
    )
}

export default FilterToolbar;
