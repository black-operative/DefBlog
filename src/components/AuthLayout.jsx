import { useEffect, useState }   from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function Protected(
    {
        children,
        authentication = true
    }
) {
    const navigate              = useNavigate();
    const [loading, setLoading] = useState(true);
    const authStatus            = useSelector(
        state => state.auth.status
    );

    useEffect(
        ()=> {
            if      ( authentication && authStatus !== authentication) { navigate('/login'); } // authentication doesn't match store value 
            else if (!authentication && authStatus !== authentication) { navigate('/');      } // authentication matches store value  
            
            setLoading(false);
        },
        [authStatus, navigate, authentication]
    );

    return (
        loading ? <h1>Loading...</h1> : <>{children}</>
    );
}

export default Protected;