import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import Header from "./userComponent/Header";
import Signup from "./userComponent/Signup";
import Login from "./userComponent/Login";
import Service from "./userComponent/Service";
import Allservice from "./userComponent/Allservice";
import Userprotected from "./component/Userprotected";
import Admin from "./adminComponent/Admin";
import Adminlogin from "./adminComponent/Adminlogin";
import Categories from "./adminComponent/Categories";
import Deshboard from "./adminComponent/Deshboard";
import Adminprotected from "./component/Adminprotected";
import Singleservice from "./userComponent/Singleservice";
import Footer from "./userComponent/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        {/* userrouter */}

        <Route exact path="/">
          <Allservice />
        </Route>
        <Route exact path="/user">
          <Signup />
        </Route>
        <Route exact path="/user/login">
          <Login />
        </Route>
        <Route exact path="/service/:id">
          <Singleservice />
        </Route>
        <Route path="/user/service">
          <Userprotected>
            <Service />
          </Userprotected>
        </Route>

        {/* adminrouter */}
        <Route exact path="/admin">
          <Admin />
        </Route>
        <Route exact path="/admin/login">
          <Adminlogin />
        </Route>
        <Route path="/admin/categories">
          <Categories />
        </Route>
        <Route path="/admin/deshboard">
          <Adminprotected>
            <Deshboard />
          </Adminprotected>
        </Route>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
