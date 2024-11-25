"use client"

import React from "react";
import type {ReactNode} from "react";

import {useServerInsertedHTML} from "next/navigation";

import {CacheProvider} from "@emotion/react";
import createCache from "@emotion/cache";
import CssBaseline from '@mui/material/CssBaseline';

// import ThemeProvider from "./theme-provider";
import AuthProvider from "@/lib/auth/provider";
import AppTheme from "@/shared-theme/AppTheme";
import {
    chartsCustomizations,
    dataGridCustomizations,
    datePickersCustomizations,
    treeViewCustomizations,
} from '@/lib/theme/customizations';

const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...treeViewCustomizations,
};


type Props = {
    children: ReactNode;
    options: { key: string }
};


const AppProviders = (props: Props) => {
    const [{cache, flush}] = React.useState(() => {
        const cache = createCache(props.options);
        cache.compat = true;
        const prevInsert = cache.insert;
        let inserted: string[] = [];
        cache.insert = (...args) => {
            const serialized = args[1];
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push(serialized.name);
            }
            return prevInsert(...args);
        };
        const flush = () => {
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };
        return {cache, flush};
    });

    useServerInsertedHTML(() => {
        const names = flush();
        if (names.length === 0) {
            return null;
        }
        let styles = '';
        for (const name of names) {
            styles += cache.inserted[name];
        }
        return (
            <style
                key={cache.key}
                data-emotion={`${cache.key} ${names.join(' ')}`}
                dangerouslySetInnerHTML={{
                    __html: styles,
                }}
            />
        );
    });

    return (
        <AuthProvider>
            <CacheProvider value={cache}>
                <AppTheme themeComponents={xThemeComponents} disableCustomTheme={false}>
                    <CssBaseline enableColorScheme />
                    {props.children}
                </AppTheme>
                {/*<ThemeProvider>*/}
                {/*</ThemeProvider>*/}
            </CacheProvider>
        </AuthProvider>
    );
};

export default AppProviders;
