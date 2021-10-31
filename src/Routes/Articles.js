import Fragment,  {useEffect, useState} from  "react";
import { Link } from "react-router-dom";
import EditArticle from "./EditArticle";
import { useAuth0 } from "@auth0/auth0-react";
import "./ArticleList.css"


const Articles = () => {

    const { user } = useAuth0();

    const [articles, setArticle] = useState([]);



    const getArticles = async () => {
        try {
            const response = await fetch("#", {
                mode: "cors",
                method: "GET",
                headers: { "Access-Control-Allow-Origin": "*" }
            });
            const parsedData = await response.json();
            setArticle(parsedData);
        } catch (err) {
            console.error(err.message);
        }
    }

    const deleteArticle = async (id) => {
        try {
            const response = await fetch(`#`, {
                mode: 'cors',
                method: "DELETE"
            });

            const filteredArticles = articles.filter((article) => article._id !== id);

            setArticle(filteredArticles);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getArticles();
    }, [])

    if(user){
        return(
            <div className="wrapper">
              <Link to="/createarticle"><button className="bg-blue-500 hover:bg-transparent text-white font-semibold hover:text-blue-700 py-1 px-3 border border-transparent hover:border-blue-500 rounded">Create Article</button></Link>
            {articles.map((article) => {
                return(
                    <div className="component">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Title:
                        </label>
                        <h1 className="font-mono text-2xl">{article.title}</h1>
                        <div className="article-body">
                            <p>{article.description}</p>
                        </div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Article written by:
                        </label>
                        <p className="font-mono">{article.createdby}</p>
                        <div className="Buttons">
                          {user.email === article.createdby ?  <button onClick={() => deleteArticle(article._id)} className="bg-blue-500 hover:bg-transparent text-white font-semibold hover:text-blue-700 py-1 px-3 border border-transparent hover:border-blue-500 rounded mr-4" >Delete</button> : ""}
                          {user.email === article.createdby ?  <Link to={`/editarticle/${article._id}`}><button className="bg-blue-500 hover:bg-transparent text-white font-semibold hover:text-blue-700 py-1 px-3 border border-transparent hover:border-blue-500 rounded">Edit</button></Link> : ""}
                        </div>
                    </div>
                );
                
            }
            ).reverse()
            }
            </div>
        );
        
    }else{
        return(
            articles.map((article) => {
                return(
                    <div className="wrapper">
                    <div className="component">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                            Title:
                        </label>
                        <h1 className="font-mono text-2xl">{article.title}</h1>
                        <div className="article-body">
                            <p>{article.description}</p>
                        </div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Article written by:
                        </label>
                        <p className="font-mono">{article.createdby}</p>
                    </div>
                    </div>
                );
            })
        );
    }
}

export default Articles


