import { useDispatch } from "react-redux";
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice';

function LogoutButton() {
    const dispatch = useDispatch(); 
    
    const Logout_Handler = function() {
        authService.logout().then(
            () => {
                dispatch(logout());
            }
        );
    };

    return (
        <button
            className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
            onClick = {Logout_Handler}
        >
            Logout
        </button>
    );
}

export default LogoutButton;