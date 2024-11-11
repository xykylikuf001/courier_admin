
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import DoNotDisturbOutlinedIcon from '@mui/icons-material/DoNotDisturbOutlined';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

const TrueFalseCheck = (
    {
        label,
        isTrue,
        falseMessage,
        trueMessage
    }: { label?: string | undefined, isTrue?: boolean | undefined, falseMessage?: string, trueMessage?: string }) => {
    if (isTrue) return (
        <Tooltip  title={trueMessage ?? ''}>
            <Chip label={label} color={'success'} icon={<CheckCircleOutlinedIcon/>}/>
        </Tooltip>
    )
    return (
        <Tooltip title={falseMessage ?? ''}>
            <Chip label={label} color={'default'} icon={<DoNotDisturbOutlinedIcon/>}/>
        </Tooltip>
    )
}

export default TrueFalseCheck