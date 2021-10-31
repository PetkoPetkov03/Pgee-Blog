import {useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Forms.css"

const CreateArticle = () => {

    const { user } = useAuth0();
    const [message, setMessage] = useState(null);

    const [title, setNewTitle] = useState("");
    const [description, setNewDescription] = useState("");

    const userInfo = JSON.stringify(user);


    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = {
                title,
                description,
                createdby: user.email

            };
            const response = await fetch("#", {
                method: "POST",
                mode: 'cors',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)

            });

            if(e){
                setMessage("Successfuly created an article")
            }
             
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div className="form-container">
            <div className="form">
                <h1>Create an Article</h1>
                <form onSubmit={onSubmitForm}>
                    <div className="inputs">
                         <lable className="block text-gray-700 text-sm font-bold mb-2">
                           Title:
                         <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Title" value={title} onChange={(e) => setNewTitle(e.target.value)}/>
                         </lable>
                         <lable className="block text-gray-700 text-sm font-bold mb-2">
                           Body:
                         <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Title" value={description} onChange={(e) => setNewDescription(e.target.value)}></textarea>
                         </lable>
                    </div>
                    <button className="bg-blue-500 hover:bg-transparent text-white font-semibold hover:text-blue-700 py-1 px-9 border border-transparent hover:border-blue-500 rounded mr-4"> Add</button>
                    <p id="p">{message}</p>
                </form>
            </div>
        </div>
    )
}

export default CreateArticle
