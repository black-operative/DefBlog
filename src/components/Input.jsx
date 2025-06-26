import React, { useId } from "react";

const Input = React.forwardRef( 
    function Input(
        {
            label,
            type = "text",
            className = "",
            ...props
        }, 
        ref
    ) {
        const id = useId();

        return (
            <div className="w-full">
                {
                    label && 
                    <label
                        className = "inline-block mb-1 pl-1"
                        htmlFor   = {id}
                    >
                        {label}
                    </label>
                }
                <input 
                    {...props}
                    type      = {type}
                    ref       = {ref}
                    id        = {id}
                    className = {
                        `px-3 py-2 w-full
                        rounded-lg
                        bg-white text-black
                        outline-none
                        focus:bg-gray-200
                        border border-gray-200
                        duration-200 
                        ${className}`
                    }
                />
            </div>
        );
    }
);


export default Input;