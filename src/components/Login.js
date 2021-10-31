import LoginIcon from "@mui/icons-material/Login"
import Button from "@mui/material/Button"
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom"
import "./LoginLogo.css"

const Login = () => {
    const {loginWithRedirect} = useAuth0();
    const {user} = useAuth0();
    const {logout} = useAuth0();
    if(user){
        return(
            <Button className="Logo"  onClick={() => logout()}><img src={user.picture} alt="no img" /></Button>
        )
    }else{
        return(
            <Button onClick={() => loginWithRedirect()}><LoginIcon /></Button>
        );
    }
}

export default Login
