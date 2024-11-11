'use c/home/user/projects/pubg_tg_bot/src/admin/src/app/dashboardlient'

import { useFormStatus } from 'react-dom'
import Button from "@/components/ui/Button";

export function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
            disabled={pending}
        >
            Sign in
        </Button>
    )
}