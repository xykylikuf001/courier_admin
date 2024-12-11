import {
    autoUpdate,
    flip,
    FloatingFocusManager,
    FloatingList,
    FloatingNode,
    FloatingPortal,
    FloatingTree,
    offset,
    safePolygon,
    shift,
    useClick,
    useDismiss,
    useFloating,
    useFloatingNodeId,
    useFloatingParentNodeId,
    useFloatingTree,
    useHover,
    useInteractions,
    useListItem,
    useListNavigation,
    useMergeRefs,
    useRole,
    useTypeahead
} from "@floating-ui/react";
import React from "react";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import  {LinkProps as NextLinkProps} from 'next/link';
import Button from "@/components/ui/Button";


const MenuContext = React.createContext<{
    getItemProps: (
        userProps?: React.HTMLProps<HTMLElement>
    ) => Record<string, unknown>;
    activeIndex: number | null;
    setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
    setHasFocusInside: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
}>({
    getItemProps: () => ({}),
    activeIndex: null,
    setActiveIndex: () => {
    },
    setHasFocusInside: () => {
    },
    isOpen: false
});

interface MenuProps {
    label: React.ReactNode;
    nested?: boolean;
    children?: React.ReactNode;
    className?: string;
    buttonClassName?: string;
}

export const MenuComponent = React.forwardRef<
    HTMLButtonElement,
    MenuProps & Omit<React.HTMLProps<HTMLButtonElement>, "label">
>(({children, label, className = "", buttonClassName="", ...props}, forwardedRef) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [hasFocusInside, setHasFocusInside] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

    const elementsRef = React.useRef<Array<HTMLButtonElement | null>>([]);
    const labelsRef = React.useRef<Array<string | null>>([]);
    const parent = React.useContext(MenuContext);

    const tree = useFloatingTree();
    const nodeId = useFloatingNodeId();
    const parentId = useFloatingParentNodeId();
    const item = useListItem();

    const isNested = parentId != null;

    const {floatingStyles, refs, context} = useFloating<HTMLButtonElement>({
        nodeId,
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: isNested ? "right-start" : "bottom-end",
        middleware: [
            offset({mainAxis: isNested ? 0 : 4, alignmentAxis: isNested ? -4 : 0}),
            flip(),
            shift()
        ],
        whileElementsMounted: autoUpdate
    });

    const hover = useHover(context, {
        enabled: isNested,
        delay: {open: 75},
        handleClose: safePolygon({blockPointerEvents: true})
    });
    const click = useClick(context, {
        event: "mousedown",
        toggle: !isNested,
        ignoreMouse: isNested
    });
    const role = useRole(context, {role: "menu"});
    const dismiss = useDismiss(context, {bubbles: true});
    const listNavigation = useListNavigation(context, {
        listRef: elementsRef,
        activeIndex,
        nested: isNested,
        onNavigate: setActiveIndex
    });
    const typeahead = useTypeahead(context, {
        listRef: labelsRef,
        onMatch: isOpen ? setActiveIndex : undefined,
        activeIndex
    });

    const {
        getReferenceProps,
        getFloatingProps,
        getItemProps
    } = useInteractions([hover, click, role, dismiss, listNavigation, typeahead]);

    // Event emitter allows you to communicate across tree components.
    // This effect closes all menus when an item gets clicked anywhere
    // in the tree.
    React.useEffect(() => {
        if (!tree) return;

        function handleTreeClick() {
            setIsOpen(false);
        }

        function onSubMenuOpen(event: { nodeId: string; parentId: string }) {
            if (event.nodeId !== nodeId && event.parentId === parentId) {
                setIsOpen(false);
            }
        }

        tree.events.on("click", handleTreeClick);
        tree.events.on("menuopen", onSubMenuOpen);

        return () => {
            tree.events.off("click", handleTreeClick);
            tree.events.off("menuopen", onSubMenuOpen);
        };
    }, [tree, nodeId, parentId]);

    React.useEffect(() => {
        if (isOpen && tree) {
            tree.events.emit("menuopen", {parentId, nodeId});
        }
    }, [tree, isOpen, nodeId, parentId]);

    return (
        <FloatingNode id={nodeId}>
            <IconButton
                size={'small'}
                ref={useMergeRefs([refs.setReference, item.ref, forwardedRef])}
                tabIndex={
                    !isNested ? undefined : parent.activeIndex === item.index ? 0 : -1
                }
                role={isNested ? "menuitem" : undefined}
                data-open={isOpen ? "" : undefined}
                data-nested={isNested ? "" : undefined}
                data-focus-inside={hasFocusInside ? "" : undefined}
                className={clsx(
                    isNested && "MenuItem", buttonClassName
                )}
                {...getReferenceProps(
                    parent.getItemProps({
                        ...props,
                        onFocus(event: React.FocusEvent<HTMLButtonElement>) {
                            props.onFocus?.(event);
                            setHasFocusInside(false);
                            parent.setHasFocusInside(true);
                        }
                    })
                )}
            >
                {label}
                {isNested && (
                    <span aria-hidden style={{marginLeft: 10, fontSize: 10}}>
                        ▶
                    </span>
                )}
            </IconButton>
            <MenuContext.Provider
                value={{
                    activeIndex,
                    setActiveIndex,
                    getItemProps,
                    setHasFocusInside,
                    isOpen
                }}
            >
                <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                    {isOpen && (
                        <FloatingPortal>
                            <FloatingFocusManager
                                context={context}
                                modal={false}
                                initialFocus={isNested ? -1 : 0}
                                returnFocus={!isNested}
                            >
                                <div
                                    ref={refs.setFloating}
                                    className={clsx(
                                        "tw-origin-top-right tw-divide-y tw-divide-gray-100",
                                        "tw-bg-white tw-shadow-lg tw-ring-1 tw-ring-black",
                                        "tw-ring-opacity-5 focus:tw-outline-none tw-z-[1000]",
                                        className
                                    )}
                                    // className="Menu"
                                    style={{zIndex: 1000,...floatingStyles}}
                                    {...getFloatingProps()}
                                >
                                    {children}
                                </div>
                            </FloatingFocusManager>
                        </FloatingPortal>
                    )}
                </FloatingList>
            </MenuContext.Provider>
        </FloatingNode>
    );
});

MenuComponent.displayName = "MenuComponent";


interface MenuItemProps {
    label: string;
    disabled?: boolean;
    to?: NextLinkProps['href'];
    component?: keyof React.JSX.IntrinsicElements | React.ComponentType<any>;

}

export const MenuItem = React.forwardRef<
    HTMLButtonElement,
    MenuItemProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({label, disabled, ...props}, forwardedRef) => {
    const menu = React.useContext(MenuContext);
    const item = useListItem({label: disabled ? null : label});
    const tree = useFloatingTree();
    const isActive = item.index === menu.activeIndex;

    return (
        <Button
            {...props}
            ref={useMergeRefs([item.ref, forwardedRef])}
            role="menuitem"
            className="tw-text-gray-700 tw-block tw-px-4 tw-py-2 tw-text-sm tw-w-full tw-text-left hover:tw-bg-gray-300/90 tw-outline-none"
            // className="MenuItem"
            tabIndex={isActive ? 0 : -1}
            disabled={disabled}
            {...menu.getItemProps({
                onClick(event: React.MouseEvent<HTMLButtonElement>) {
                    props.onClick?.(event);
                    tree?.events.emit("click");
                },
                onFocus(event: React.FocusEvent<HTMLButtonElement>) {
                    props.onFocus?.(event);
                    menu.setHasFocusInside(true);
                }
            })}
        >
            {label}
        </Button>
    );
});

MenuItem.displayName = "MenuItem";


export const Menu = React.forwardRef<
    HTMLButtonElement,
    MenuProps & Omit<React.HTMLProps<HTMLButtonElement>, "label">
>((props, ref) => {
    const parentId = useFloatingParentNodeId();

    if (parentId === null) {
        return (
            <FloatingTree>
                <MenuComponent {...props} ref={ref}/>
            </FloatingTree>
        );
    }

    return <MenuComponent {...props} ref={ref}/>;
});

Menu.displayName = "Menu";
