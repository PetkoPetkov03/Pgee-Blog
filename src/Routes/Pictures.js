import {  useState, useEffect  } from "react"
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./ArticleList.css"

const Pictures = () => {

    const { user } = useAuth0();
    
    const [pictures, setPictures] = useState([]);

    const getPictures = async () => {
        try {
            const request = await fetch("#", {
                mode: "cors"
            });

            const parsedData = await request.json();
            setPictures(parsedData);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getPictures()
    },[])

    if(user){
        return(
            <div className="wrapper">
                <Link to="/addpicture"><button className="bg-blue-500 hover:bg-transparent text-white font-semibold hover:text-blue-700 py-1 px-3 border border-transparent hover:border-blue-500 rounded" >Add a picture</button></Link>
                <div className="grid grid-cols-3">
                {pictures.map(picture => {
                return(
                    <div>
                        <Link to={`/getpicture/${picture._id}`} ><img src={picture.url} alt="File not found!" /></Link>
                    </div>
                );
            }).reverse()}
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3">
            {pictures.map(picture => {
                return(
                    <div>
                        <Link to={`/getpicture/${picture._id}`} ><img className="" src={picture.url} alt="File not found!" /></Link>
                    </div>
                );
            }).reverse()}
        </div>
    )
}

export default Pictures
