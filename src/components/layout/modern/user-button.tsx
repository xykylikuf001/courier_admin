"use client"

import clsx from "clsx";
import {useFloating, offset} from "@floating-ui/react"
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import {Fragment} from 'react'
import {NextLinkComposed} from "@/components/Link";
import Button from "@/components/ui/Button";
import LogoutButton from "./logout-button";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import  React from "react";

export default function UserButton({placement="top"}: { placement?: "top" | "bottom" }) {


    const {floatingStyles, refs} = useFloating({
        placement: placement, middleware: [offset(10)],
        strategy: "fixed"

    })
    return (
        <Menu as="div" className="tw-relative tw-inline-block tw-text-left">
            <div>
                <MenuButton
                    // as={<IconButton/>}
                    ref={refs.setReference}
                    // className="tw-inline-flex tw-w-full tw-justify-center tw-bg-black/20 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-white hover:tw-bg-black/30 focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-white/75"
                >
                    <MoreVertRoundedIcon />
                </MenuButton>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems
                    ref={refs.setFloating}
                    style={floatingStyles}
                    className="tw-z-10 tw-my-2 tw-origin-top-right tw-divide-y tw-divide-gray-100 tw-bg-white tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5 focus:tw-outline-none"
                >
                    <div className="py-1">
                        <MenuItem>
                            {({focus}) => (
                                <Button
                                    component={NextLinkComposed}
                                    to={'/dashboard/me'}
                                    className={clsx(
                                        focus ? 'tw-bg-gray-100 tw-text-gray-900' : 'tw-text-gray-700',
                                        'tw-block tw-px-4 tw-py-2 tw-text-sm  hover:tw-bg-gray-300/90'
                                    )}
                                >
                                    My profile
                                </Button>
                            )}
                        </MenuItem>
                    </div>
                    <div className="py-1">
                        <MenuItem>
                            <LogoutButton
                                className={clsx(
                                    'tw-text-gray-700 tw-block tw-px-4 tw-py-2 tw-text-sm tw-w-full tw-text-left hover:tw-bg-gray-300/90'
                                )}/>
                        </MenuItem>
                    </div>
                </MenuItems>
            </Transition>
        </Menu>
    )
}

