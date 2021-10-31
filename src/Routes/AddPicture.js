import {  useState  } from "react"
import {  useAuth0  } from "@auth0/auth0-react"
import "./Forms.css"

const AddPicture = () => {

    const { user } = useAuth0();

    const [ title, setTitle ] = useState("");

    const [ url, setUrl ] = useState("");

    const [message, setMessage] = useState("");

    const onSubmitForm = async() => {
        const request = await fetch("#", {
            mode: 'cors',
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title: title,
                url: url,
                addedby: user.email
            })
        });


        setMessage("Picture added");
    }

    return (
        <div className="form-container">
        <div className="form">
        <form>
            <h1 className="font-mono" >Add Image</h1>
        <div className="inputs">
                     <lable className="block text-gray-700 text-sm font-bold mb-2">
                       Title:
                       <input type="text" placeholder="Name of the image" value={title} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setTitle(e.target.value)} />
                     </lable>
                     <lable className="block text-gray-700 text-sm font-bold mb-2">
                       URL:
                       <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Url address of the image" value={url} onChange={(e) => setUrl(e.target.value)} />
                     </lable>
                </div>
        </form>
        <button className="bg-blue-500 hover:bg-transparent text-white font-semibold hover:text-blue-700 py-1 px-9 border border-transparent hover:border-blue-500 rounded mr-4" onClick={onSubmitForm} >Add Image</button>
        <p id="p">{message}</p>
    </div>
    </div>
    )
}

export default AddPicture
