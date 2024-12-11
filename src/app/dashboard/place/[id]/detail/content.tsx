"use client"
import {useRouter} from "next/navigation";

import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

import {PlaceVisibleExtended} from "@/openapi/client";
import RefreshButton from "@/components/ui/buttons/RefreshButton";
import DetailTable from "@/components/table/DetailTable";
import Form from "./form";
import Link from "@/components/Link";
import TrueFalseCheck from "@/components/features/TrueFalseCheck";
import Translations from "./translations";

interface Props {
    data: PlaceVisibleExtended;
}

const Content = ({data}: Props) => {
    const router = useRouter();
    console.log(data.translations)

    const action = (
        <Stack direction={"row"} spacing={0.1} alignItems="center">
            <RefreshButton onClick={() => router.refresh()}/>
        </Stack>
    )

    return (
        <div className="tw-space-y-10">
            <DetailTable title={"Place"} hasData={true} action={action}>
                <TableRow>
                    <TableCell component="th" scope="row">
                        ID
                    </TableCell>
                    <TableCell>
                        {data.id}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Slug
                    </TableCell>
                    <TableCell>
                        {data.slug}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Name
                    </TableCell>
                    <TableCell>
                        {data.name}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Full name
                    </TableCell>
                    <TableCell>
                        {data.fullName}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Parent
                    </TableCell>
                    <TableCell>
                        {data.parentId && <Link href={`/dashboard/place/${data.parentId}`}>View</Link>}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Location level
                    </TableCell>
                    <TableCell>
                        {data.locationLevel.label}
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell component="th" scope="row">
                        Is active
                    </TableCell>
                    <TableCell>
                        <TrueFalseCheck
                            label={data.isActive ? "Yes" : "No"} isTrue={data.isActive}
                            falseMessage={"No"}
                            trueMessage={"Yes"}/>
                    </TableCell>
                </TableRow>
            </DetailTable>
            <Form data={data}/>

            <Card variant={"outlined"}>
                <CardHeader
                    title={(
                        <Typography sx={{flex: "1 1 100%"}}
                                    variant="h6" id="tableTitle" component="div">
                            Translations
                        </Typography>
                    )}
                />
                <CardContent component={"div"}>
                    <Translations objId={data.id} data={data.translations ?? []}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default Content;
