import React from 'react';

//Import router
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//Import components
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {MainPage} from "./components/MainPage";
import {CreateBookPage} from "./components/CreateBookPage";
import {EditBookPage} from "./components/EditBookPage";
import {AuthenticationMode, AuthenticationPage} from "./components/AuthenticationPage";
import {Page404} from "./components/Page404";

function App() {
    return (
        <Router>
            <div>
                <Header/>

                <Switch>
                    <Route path="/" exact component={MainPage}/>
                    <Route path="/addBook" component={CreateBookPage}/>
                    <Route path="/editBook/:bookId" component={EditBookPage}/>
                    <Route path="/register" component={() => AuthenticationPage(AuthenticationMode.REGISTER)}/>
                    <Route path="/login" component={() => AuthenticationPage(AuthenticationMode.LOGIN)}/>
                    <Route component={Page404} />
                </Switch>

                <div style={{height: "500px"}}/>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;