"use client"
import {Fragment} from "react";
import {useRouter, useSearchParams, usePathname} from "next/navigation";


import {GridColDef} from "@mui/x-data-grid";

import {LanguagesChoices, PlaceVisible} from "@/openapi/client";

import ViewButton from "@/components/ui/buttons/ViewButton";
import TrueFalseCheck from "@/components/features/TrueFalseCheck";
import ServerSideDataGrid from "@/components/table/ServerSideDataGrid";
import AddButton from "@/components/ui/buttons/AddButton";

import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {languages} from "@/config";
import {getValueFromEnum} from "@/lib/helper";

interface Props {
    rows: PlaceVisible[];
    page: number;
    limit: number;
    lang: LanguagesChoices;

}


export default function Content({rows, limit, page, lang}: Props) {

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const handleChange = async (key: string, value: any) => {
        const params = new URLSearchParams(searchParams)
        params.set(key, value);
        router.replace(`${pathname}?${params.toString()}`);
    };
    // const handleClear = async () => {
    //     const params = new URLSearchParams({
    //         page: page.toString(), limit: limit.toString()
    //     } as Record<string, string>)
    //     router.replace(`${pathname}?${params.toString()}`);
    // };

    const columns: GridColDef[] = [
        {
            field: 'slug',
            headerName: 'Slug',
            flex: 1.5,
            minWidth: 200
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            flex: 1,
            minWidth: 100
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            minWidth:100
        },
        {
            field: 'locationLevel',
            headerName: 'Level',
            flex: 1,
            minWidth: 100,
            renderCell: (params) => params.value.label
        },
        {
            field: 'parentId',
            headerName: 'parentId',
            flex: 1,
            minWidth: 100,
        },
        {
            field: 'isActive',
            headerName: 'Is active',
            flex: 1,
            align: 'center',
            headerAlign: "center",
            renderCell: (params) => {
                return <TrueFalseCheck
                    label={params.row.isActive ? "Yes" : "No"} isTrue={params.row.isActive}
                    falseMessage={"No"}
                    trueMessage={"Yes"}/>
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            headerAlign: "center",
            align: "center",
            width: 100,
            renderCell: (params) => {
                return (
                    <ViewButton type='iconButton' href={`/dashboard/place/${params.row.id}/detail`}/>
                )
            },
            sortable: false,
            filterable: false,
        },
    ];


    const getAction = () => {
        return (
            <div className="tw-flex tw-flex-row tw-space-x-2">
                <Select

                    variant="outlined"
                    labelId={'is_filter_lang_label'}
                    id={'is_filter_lang'}
                    value={lang.toLowerCase()}
                    onChange={(e) => handleChange(
                        'lang', getValueFromEnum(LanguagesChoices, e.target.value)
                    )}
                >
                    {languages.map((item, i) => (
                        <MenuItem key={i} value={item.value}>{item.label}</MenuItem>
                    ))}
                </Select>
                <AddButton type="iconButton" href={"/dashboard/place/create"}/>
            </div>

        )
    };

    return (
            // <FilterToolbar handleClear={handleClear}>
            //     <FormFlex>
            //         <FormControl fullWidth margin={'normal'}>
            //             <InputLabel id={'is_filter_lang_label'}>Language</InputLabel>
            //             <Select
            //                 variant="outlined"
            //                 labelId={'is_filter_lang_label'}
            //                 id={'is_filter_lang'}
            //                 value={locale.toLowerCase()}
            //                 onChange={(e) => handleChange(
            //                     'locale', getValueFromEnum(LanguagesChoices, e.target.value)
            //                 )}
            //             >
            //                 {languages.map((item, i) => (
            //                     <MenuItem key={i} value={item.value}>{item.label}</MenuItem>
            //                 ))}
            //             </Select>
            //         </FormControl>
            //     </FormFlex>
            // </FilterToolbar>

        <Fragment>
            <Typography component="h2" variant="h6" sx={{mb: 2}}>
                Places
            </Typography>

            <ServerSideDataGrid page={page} pageSize={limit}
                                getAction={getAction} columns={columns}
                                rows={rows}/>
        </Fragment>
    )
}
