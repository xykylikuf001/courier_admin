import IconButton, {IconButtonProps} from "@mui/material/IconButton";
import { MdCopyAll } from "react-icons/md";

const CopyButton = (props: IconButtonProps) => {
    return (
        <IconButton sx={{bgcolor: "info.main"}} aria-label="copy" {...props}>
            <MdCopyAll/>
        </IconButton>
    )
}

export default CopyButton;