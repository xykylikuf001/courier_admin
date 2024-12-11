import clsx from "clsx";
import {Fragment, ReactNode} from 'react';
// import {Listbox, Transition} from '@headlessui/react';
import {HiCheck, HiChevronUpDown} from "react-icons/hi2";
import { Listbox, Transition, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

export interface OptionType {
    value: string;
    label: string;
}

function Select(
    {
        selected,
        onChange,
        options,
        renderSelected,
        multiple = true,
        className = "",
        placeholder = "Select items..."
    }: {
        options: OptionType[];
        selected?: OptionType | OptionType[] | null;
        onChange: (value: OptionType | OptionType[]) => void;
        renderSelected?: () => ReactNode;
        className?: string;
        placeholder?: string;
        error?: boolean | null;
        helperText?: string;
        multiple?: boolean;
    }) {
    const render = () => {
        if (renderSelected) renderSelected();
        if (selected == null || typeof selected === 'undefined') {
            return <span className="block truncate text-gray-500">{placeholder}</span>
        } else if (Array.isArray(selected)) {
            if (selected.length === 0) {
                return <span className="tw-block tw-truncate tw-text-gray-500">{placeholder}</span>
            } else if (selected.length > 1) {
                return <span className="tw-block tw-truncate tw-text-black">{selected.length} items selected</span>
            } else {
                return <span className="tw-block tw-truncate tw-text-black">{selected[0].label}</span>;
            }
        } else {
            return <span className="tw-block tw-truncate tw-text-black">{selected.label}</span>;
        }
    }

    return (
        <div className="h-full w-full">
            <Listbox
                multiple={multiple}
                value={selected}
                onChange={onChange}
                by={(a: OptionType | null, z: OptionType) => {
                    return a?.value === z.value
                }}
            >
                <div className="h-full relative">
                    <ListboxButton
                        className={clsx(
                            "tw-relative tw-text-black tw-flex tw-flex-row tw-items-center tw-justify-between",
                            "tw-h-full tw-w-full tw-cursor-default tw-rounded",
                            "tw-bg-white tw-pl-3 tw-text-left tw-shadow-md sm:tw-text-sm",
                            className,
                        )}>
                        {render()}
                        {/*<div className="h-full w-full flex flex-wrap items-center overflow-y-auto">*/}
                        {/*    {selected.length === 0 ? <span>Select items...</span> : selected.map((e, i) => (*/}
                        {/*        <span key={i}*/}
                        {/*              className={clsx(*/}
                        {/*                  "inline-flex items-center",*/}
                        {/*                  "px-2.5 py-0.5 mr-1 mb-1",*/}
                        {/*                  "rounded-full text-xs font-medium bg-indigo-100 text-black"*/}
                        {/*              )}>*/}
                        {/*            {e}*/}
                        {/*        </span>))}*/}
                        {/*</div>*/}
                        <span className="tw-pointer-events-none tw-flex tw-items-center tw-pr-2">
                      <HiChevronUpDown className="tw-h-5 tw-w-5 tw-text-gray-400" aria-hidden="true"/>
                    </span>
                    </ListboxButton>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <ListboxOptions
                            className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {options.map((option, index) => (
                                <ListboxOption
                                    key={index}
                                    className={({focus}) =>
                                        `tw-relative tw-cursor-default tw-select-none tw-py-2 tw-pl-10 tw-pr-4 ${
                                            focus ? 'tw-bg-amber-100 tw-text-amber-900' : 'tw-text-gray-900'
                                        }`
                                    }
                                    value={option}
                                >
                                    {({selected}) => (
                                        <>
                                          <span
                                              className={`tw-block tw-truncate ${
                                                  selected ? 'tw-font-medium' : 'tw-font-normal'
                                              }`}
                                          >
                                            {option.label}
                                          </span>
                                            {selected ? (
                                                <span
                                                    className="tw-absolute tw-inset-y-0 tw-left-0 tw-flex tw-items-center tw-pl-3 tw-text-amber-600">
                                                  <HiCheck className="tw-h-5 tw-w-5" aria-hidden="true"/>
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}

export default Select;