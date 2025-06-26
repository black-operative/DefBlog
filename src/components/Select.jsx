import { forwardRef, useId } from "react";

function Select(
    {
        options = [],
        label,
        className = '',
        ...props
    },
    ref
) {
    const id = useId();
    return (
        <div className = "w-full">
            {
                label && 
                <label 
                    htmlFor   = {id}
                    className = ""
                ></label>
            }
            
            <select 
                id        = {id}
                ref       = {ref} 
                className = {
                    `px-3 py-2 rounded-lg w-full
                    bg-white text-black
                    outline-none border border-gray-200
                    focus:bg-gray-50 duration-200                    
                    ${className}
                    `
                } 
                {...props}
            >
                {
                    options?.map(
                        (option) => (
                            <option 
                                key   = {option}
                                value = {option}
                            >
                                {option}
                            </option>
                        )
                    )
                }
            </select>
        </div>
    );
}

export default forwardRef(Select);