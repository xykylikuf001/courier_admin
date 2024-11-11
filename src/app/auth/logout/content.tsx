"use client"
import {useEffect} from "react";

import Link from "@/components/Link";
import {destroyAuthCookies} from "@/lib/auth/actions";

const Content = () => {
    useEffect(()=>{
        destroyAuthCookies(false);
    },[])

    return (
        <div className="w-full bg-gray-200 h-full flex items-center justify-center">
            <div className="mx-auto max-w-md w-full bg-white p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Hope to see you soon! 👋</h2>
                <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 relative" role="alert">
                    <span className="block sm:inline">
                        You have been logged out.
                    </span>
                </div>
                <div className="mt-4 text-center">
                    <Link href={"/auth/sign-in"}
                          className="text-blue-600 font-medium hover:text-blue-700">
                        Please sign in again here
                    </Link>.
                </div>
            </div>
        </div>
    )
}

export default Content;