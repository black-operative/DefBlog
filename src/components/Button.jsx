function Button(
    {
        text,
        type      = 'button',
        bgColor   = 'bg-blue-600',
        textClr   = 'text-white',
        className = '',
        ...props
    }
) {
    return (
        <button 
            className = {
                `px-4 py-2 rounded-lg 
                ${className} 
                ${bgColor}
                ${textClr}`
            }
            type = {type}
            {...props}
        >
            {text}
        </button>
    );
}

export default Button;