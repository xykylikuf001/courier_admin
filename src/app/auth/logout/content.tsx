"use client"
import {useEffect} from "react";

import Link from "@/components/Link";
import {destroyAuthCookies} from "@/lib/auth/actions";

const Content = () => {
    useEffect(()=>{
        destroyAuthCookies(false);
    },[])

    return (
        <div className="tw-w-full tw-bg-gray-200 tw-h-screen tw-flex tw-items-center tw-justify-center">
            <div className="tw-mx-auto tw-max-w-md tw-w-full tw-bg-white tw-p-8 tw-shadow-lg">
                <h2 className="tw-text-2xl tw-font-bold tw-mb-4 tw-text-center tw-text-gray-900">
                    Hope to see you soon! 👋
                </h2>
                <div className="tw-text-center tw-bg-red-100 tw-border tw-border-red-400 tw-text-red-700 tw-px-4 tw-py-3 tw-relative" role="alert">
                    <span className="tw-block sm:tw-inline">
                        You have been logged out.
                    </span>
                </div>
                <div className="tw-mt-4 tw-text-center">
                    <Link href={"/auth/sign-in"}
                          className="tw-text-blue-600 tw-font-medium hover:tw-text-blue-700">
                        Please sign in again here
                    </Link>.
                </div>
            </div>
        </div>
    )
}

export default Content;