import React from "react";
import ModernLayout from "@/components/layout/modern/ModernLayout";


async function Layout({children}: { children: React.ReactNode; }) {
    return (
        <ModernLayout>
            {children}

        </ModernLayout>
    )
}

export default Layout;