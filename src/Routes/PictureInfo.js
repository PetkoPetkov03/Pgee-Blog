import { Button } from "@mui/material";
import {  useState, useEffect  } from "react"
import {  Link, useParams  } from "react-router-dom"
import {  useAuth0  } from "@auth0/auth0-react"
import "./SinglePicture.css"

const PictureInfo = () => {

    const { user } = useAuth0();

    const { id } = useParams();

    const [picture, setPicture] = useState({});

    const deletePicture = async() => {
        const response = await fetch(`#`, {
            mode: 'cors',
            method: "DELETE",
        });

        setPicture({
            title: "Deleted",
            url: "Successfuly removed"
        });
    }

    const getPicture = async() => {
        const response = await fetch(`#`);
        const parsedBody = await response.json();

        setPicture(parsedBody);
    }

    useEffect(() => {
        getPicture();
    }, []);

    if(user === undefined){
        return(
            <div className="flex wrapper">
                <img className="self-center"  src={picture.url} alt="Error" />
            </div>
        )
    }


    if(user.email === picture.addedby){
        return (
            <div className="flex wrapper" >
                <img className="self-center" src={picture.url} alt="Error" />
                <button className="bg-blue-500 hover:bg-transparent text-white font-semibold hover:text-blue-700 py-1 px-9 border border-transparent hover:border-blue-500 rounded  mt-5 mr-4" onClick={deletePicture}>Delete!</button>
            </div>
        )
    }
    
    if(user.email !== picture.addedby){
        return(
                <div className="flex wrapper" >
                    <img className="self-center" src={picture.url} alt="Error" />
                </div>
        )
    }
}

export default PictureInfo
