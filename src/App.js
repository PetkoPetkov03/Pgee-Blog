import './App.css';
import Header from './components/Header.js';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from "./Routes/Home"
import Articles from "./Routes/Articles"
import CreateArticle from "./Routes/CreateArticle";
import EditArticle from './Routes/EditArticle';
import Pictures from './Routes/Pictures';
import PictureInfo from './Routes/PictureInfo';
import AddPicture from './Routes/AddPicture';

function App() {
  return (
    <div className="App">

        <Router>
        <Header className="Header" />
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route exact path="/articles"><Articles /></Route>
            <Route exact path="/createarticle"><CreateArticle /></Route>
            <Route exact path="/editarticle/:id" ><EditArticle /></Route>
            <Route exact path="/pictures"><Pictures/></Route>
            <Route exact path="/getpicture/:id"><PictureInfo /></Route>
            <Route exact path="/addpicture"><AddPicture /></Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
