import React from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";


async function Layout({children}: { children: React.ReactNode; }) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    )
}
export default Layout;