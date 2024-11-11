import React from "react";
import Shell from "./Shell";

const DashboardLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <Shell>{children}</Shell>
    )
}

export default DashboardLayout;
