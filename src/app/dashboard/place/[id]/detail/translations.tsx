"use client"
import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {TabPanel, a11yProps} from "@/components/ui/Tab";
import type {PlaceTranslationVisible} from "@/openapi/client";
import TranslationEditForm from "./translation-edit-form";
import TranslationAddForm from "./translation-add-form";
import {MdAdd} from "react-icons/md";

export default function Translations({objId, data}: { objId: number, data: PlaceTranslationVisible[] }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const lastIndex = data.length === 0 ? 0 : data.length
    console.log(lastIndex)
    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {data.map((e, i) => (
                        <Tab key={i} label={e.locale.label} {...a11yProps(i)} />
                    ))}
                    <Tab label={<MdAdd/>} {...a11yProps(lastIndex)} />

                </Tabs>
            </Box>
            {data.map((e, i) => (
                <TabPanel key={i} value={value} index={i}>
                    <TranslationEditForm data={e}/>
                </TabPanel>
            ))}

            <TabPanel value={value} index={lastIndex}>
                <TranslationAddForm objId={objId}/>
            </TabPanel>
        </Box>
    );
}