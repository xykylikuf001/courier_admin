"use client"
import React from 'react';
// import clsx from "clsx";


export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: (props?: any) => void;
    component?: keyof React.JSX.IntrinsicElements | React.ComponentType<any>;
    // display?: "block" | "inline-block";

    [key: string]: any;
}

const Button: React.FC<ButtonProps> = (
    {
        onClick,
        children,
        component: Component = 'button',
        ...rest
    }) => {
    return (
        <Component
            onClick={onClick} className="button" {...rest}>
            {children}
        </Component>
    );
};

export default Button;