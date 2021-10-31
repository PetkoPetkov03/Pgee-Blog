import "../Header.css";
import Button from "@mui/material/Button"
import  HomeIcon from "@mui/icons-material/Home"
import ArticlesIcon from "@mui/icons-material/Article"
import SearchBar from "@mui/icons-material/Search"
import InputBase from "@mui/material/InputBase"
import RegisterIcon from "@mui/icons-material/AppRegistrationRounded"
import LoginIcon from "@mui/icons-material/Login"
import PicturesIcon from "@mui/icons-material/PictureInPicture"
import Logo from "../logo.png"
import {Link} from "react-router-dom"
import {useAuth0} from "@auth0/auth0-react"
import Login from "./Login";

const Header = () => {
    return (
        <div className="header">
            <div className="header-svg">
                <img src={Logo} alt="no img" />
                <h3 className="font-serif text-xl" >Pgee Blog</h3>
            </div>
            <div className="search-bar">
                <form>
                    
                <SearchBar fontSize="small" /><InputBase className="input" ></InputBase>
                </form>
            </div>
            <div className="icons">
                <Link to="/"><Button><HomeIcon /></Button></Link>
                <Link to="/articles"><Button><ArticlesIcon /></Button></Link>
                <Link to="/pictures"><Button><PicturesIcon /></Button></Link> 
                <Login />
            </div>
        </div>
    )
}

export default Header
