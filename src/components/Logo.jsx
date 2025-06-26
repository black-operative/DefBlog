function Logo(
    { width = '100px' }
) {
    return (
        <div style = { { width: width } }>
            <img 
                src = "/Logo.png" 
                alt = "Logo"
            />
        </div>
    );
}

export default Logo;