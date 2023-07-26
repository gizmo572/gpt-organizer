import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const App = () => {



    return (
        <Router>
            <Switch>
                <div>HELLO WORLLLLLLLDDDDDD!!!!!</div>
                <Route exact path="/log-in" component={logInPage} />
                <Route exact path="/sign-up" component={signUpPage} />
                <Route exact path="/" component={logInPage} />
            </Switch>
        </Router>
    )



}

export default App;