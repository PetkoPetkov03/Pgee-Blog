import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import "./Forms.css"

const EditArticle = () => {

    const {id} = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const fetchTheArticle = async() => {
        const response = await fetch(`https://pgee-blog.herokuapp.com/articles/${id}`, {
            mode: 'cors'
        });
        const parsedData = await response.json();

        setTitle(parsedData.title);
        setDescription(parsedData.description);
    }
    const onSubmitEdit = async(e) => {
        e.preventDefault();
        const body = {
            title: title,
            description: description
        }

        const response = await fetch(`#`, {
            mode: 'cors',
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });

        setMessage("Message successfuly updated");
    }

    useEffect(() => {
        fetchTheArticle();
    }, [])

    return (
        <div className="form-container">
            <div className="form" onSubmit={(e) => onSubmitEdit(e)}>
            <form>
                <h1 className="font-mono" >Edit {title}</h1>
            <div className="inputs">
                         <lable className="block text-gray-700 text-sm font-bold mb-2">
                           Title:
                         <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                         </lable>
                         <lable className="block text-gray-700 text-sm font-bold mb-2">
                           Body:
                         <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Title" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                         </lable>
                    </div>
                    <button className="bg-blue-500 hover:bg-transparent text-white font-semibold hover:text-blue-700 py-1 px-9 border border-transparent hover:border-blue-500 rounded mr-4">Save Edit!</button>
                    <p id="p">{message}</p>
            </form>
        </div>
        </div>
    )
}

export default EditArticle
