"use client"

import React from "react";

import Header from "../Header";
import Sidebar from "../Sidebar";
import Subheader from "../Subheader";

import {StyledPaper, StyledBox} from "./styled";
import {useThemeContext} from "@/lib/theme-provider";

const Shell = ({children}: {children: React.ReactNode})=>{
    const {drawer} = useThemeContext()
    return (
        <StyledPaper >
            <Header />
            <Sidebar />
            <StyledBox style={{
                width: drawer ? "calc(100% - 200px)" : "calc(100% - 50px)",
            }} id="styled-content">
                <Subheader/>
                {children}
            </StyledBox>
        </StyledPaper>
    )
}

export default Shell;