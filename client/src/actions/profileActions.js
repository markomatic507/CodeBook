import axios from "axios";
import {
    CLEAR_CURRENT_PROFILE,
    CLEAR_ERRORS,
    GET_ERRORS,
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_LOADING,
    SET_CURRENT_USER
} from "./types";

// Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get("/api/profile")
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        );
};

// Create profile
export const createProfile = (profileData, history) => dispatch => {
    dispatch(clearErrors());
    axios
        .post("/api/profile", profileData)
        .then(res => history.push("/"))
        .catch(err => {
            dispatch({ type: GET_ERRORS, payload: err.response.data });
            console.log("aaa");
        });
};

// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    };
};

// Clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};

// Add experience
export const addExperience = (expData, history) => dispatch => {
    dispatch(clearErrors());
    axios
        .post("/api/profile/experience", expData)
        .then(res => history.push("/dashboard"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Add education
export const addEducation = (eduData, history) => dispatch => {
    dispatch(clearErrors());
    axios
        .post("/api/profile/education", eduData)
        .then(res => history.push("/dashboard"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Delete exp
export const deleteExperience = id => dispatch => {
    axios
        .delete(`/api/profile/experience/${id}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Delete edu
export const deleteEducation = id => dispatch => {
    axios
        .delete(`/api/profile/education/${id}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Delete account and profile
export const deleteAccount = () => dispatch => {
    if (window.confirm("Are you sure? This can't be undone.")) {
        axios
            .delete("/api/profile")
            .then(res => dispatch({ type: SET_CURRENT_USER, payload: {} }))
            .catch(err =>
                dispatch({ type: GET_ERRORS, payload: err.response.data })
            );
    }
};

// Get profiles
export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get("/api/profile/all")
        .then(res => {
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: GET_PROFILES,
                payload: null
            })
        );
};

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get(`/api/profile/handle/${handle}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: null
            })
        );
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
