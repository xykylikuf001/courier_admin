import React from "react";
import ModernLayout from "@/components/layout/modern/ModernLayout";

// import DashboardLayout from "@/components/layout/DashboardLayout";


async function Layout({children}: { children: React.ReactNode; }) {
    return (
        // <DashboardLayout>
        // </DashboardLayout>

        <ModernLayout>
            {children}

        </ModernLayout>
    )
}
export default Layout;