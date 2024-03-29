import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {logoutUser, setCurrentUser} from "./actions/authActions";
import {Provider} from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import "./App.css";
import {clearCurrentProfile} from "./actions/profileActions";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-cred/AddExperience";
import AddEducation from "./components/add-cred/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/Profile/Profile";
import NotFound from "./components/not-found/NotFound";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

// Check for token
if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode and get user info and expiration
    const decoded = decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Clear current profile
        store.dispatch(clearCurrentProfile());
        // Redirect to login
        window.location.href = "/login";
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className='App'>
                        <Navbar />
                        <Route exact path='/' component={Landing} />
                        <div className='container'>
                            <Route
                                exact
                                path='/register'
                                component={Register}
                            />
                            <Route exact path='/login' component={Login} />
                            <Route
                                exact
                                path='/profiles'
                                component={Profiles}
                            />
                            <Route
                                exact
                                path='/profile/:handle'
                                component={Profile}
                            />
                            <Route
                                exact
                                path='/not-found'
                                component={NotFound}
                            />
                            <Switch>
                                <PrivateRoute
                                    exact
                                    path='/dashboard'
                                    component={Dashboard}
                                />
                            </Switch>
                            <Switch>
                                <PrivateRoute
                                    exact
                                    path='/create-profile'
                                    component={CreateProfile}
                                />
                            </Switch>
                            <Switch>
                                <PrivateRoute
                                    exact
                                    path='/edit-profile'
                                    component={EditProfile}
                                />
                            </Switch>
                            <Switch>
                                <PrivateRoute
                                    exact
                                    path='/add-experience'
                                    component={AddExperience}
                                />
                            </Switch>
                            <Switch>
                                <PrivateRoute
                                    exact
                                    path='/add-education'
                                    component={AddEducation}
                                />
                            </Switch>
                            <Switch>
                                <PrivateRoute
                                    exact
                                    path='/feed'
                                    component={Posts}
                                />
                            </Switch>
                            <Switch>
                                <PrivateRoute
                                    exact
                                    path='/post/:id'
                                    component={Post}
                                />
                            </Switch>
                        </div>
                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
