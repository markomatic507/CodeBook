import axios from "axios";
import {CLEAR_ERRORS, GET_ERRORS, SET_CURRENT_USER} from "./types";
import setAuthToken from "../utils/setAuthToken";
import decode from "jwt-decode";

// Register User
export const registerUser = (userData, history) => dispatch => {
    dispatch(clearErrors());
    axios
        .post("/api/users/register", userData)
        .then(res => history.push("/login"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login Users - Get User Token
export const loginUser = userData => {
    return dispatch => {
        axios
            .post("/api/users/login", userData)
            .then(res => {
                // Save to localStorage
                const { token } = res.data;
                // Set token to ls
                localStorage.setItem("jwtToken", token);
                // Set token to auth header
                setAuthToken(token);
                // Decode token to get user data
                const decoded = decode(token);
                // Set current user
                dispatch(setCurrentUser(decoded));
            })
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );
    };
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
