import {FileVisible, FileTypeChoices} from "@/openapi/client";
import Image, {ImageProps} from "./Image";
import Link from "./Link";
interface BaseProps {
    data: FileVisible;
    asLink?: boolean;
}

interface ImageType extends BaseProps {
    fileType: FileTypeChoices.IMAGE;
    TypeProps: Omit<ImageProps, "src">;
}


export type FileAttachmentProps<FileType extends FileTypeChoices = FileTypeChoices> =
    FileType extends FileTypeChoices.IMAGE
        ? ImageType
        : ImageType

function FileAttachment<FileType extends FileTypeChoices>(
    props: { fileType: FileType } & Omit<FileAttachmentProps, "fileType">
) {
    let el = <div/>
    if (props.fileType === FileTypeChoices.IMAGE) {
        const {alt, ...typeProps} = props.TypeProps

        el = <Image {...typeProps} alt={alt} src={props.data.fileUrl} style={{objectFit: "contain"}}/>

    }
    if (props.asLink && props.data.fileUrl){
        return (
            <Link target="_blank" href={props.data.fileUrl} noLinkStyle>{el}</Link>
        )
    }
    return el
}


export default FileAttachment;