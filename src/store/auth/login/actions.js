import { 
    CHECK_LOGIN, 
    LOGIN_USER_SUCCESSFUL, 
    APILOGIN_FAILED, 
    CHECK_OTP,
    VALIDATE_OTP_SUCCESS, 
    VALIDATE_OTP_ERROR, 
    ERROR_CLEAR, 
    LOGOUT_USER, 
    GET_USER_INFO,
    GET_USER_INFO_OK,
    GET_USER_INFO_ERROR,
    REFRESH_TOKEN
} from './actionTypes';

export const checkLogin = (email, password, history) => {
    return {
        type: CHECK_LOGIN,
        payload: { email, password, history }
    }
}

export const checkOtp = (user_id, otp, history) => {
    return {
        type: CHECK_OTP,
        payload: { user_id, otp, history }
    }
}

export const validateOtpSuccess = (user) => {
    return {
        type: VALIDATE_OTP_SUCCESS,
        payload: user
    }
}

export const validateOtpError = (error) => {
    return {
        type: VALIDATE_OTP_ERROR,
        payload: error
    }
}


export const loginUserSuccessful = (user) => {
    return {
        type: LOGIN_USER_SUCCESSFUL,
        payload: user
    }
}

export const apiLoginError = (error) => {
    return {
        type: APILOGIN_FAILED,
        payload: error
    }
}


export const clearErrorLogin = () => {
    return {
        type: ERROR_CLEAR
    }
}


export const logoutUser = (user) => {
    return {
        type: LOGOUT_USER
    }
}




export const getUserInfo = () => {
    return {
        type: GET_USER_INFO        
    }
}

export const getUserInfoOk = (user) => {
    return {
        type: GET_USER_INFO_OK,
        payload: user
    }
}

export const getUserInfoError = (error) => {
    return {
        type: GET_USER_INFO_ERROR,
        payload: error
    }
}



export const refreshToken = (newToken, newRefreshToken) => {
    return {
        type: REFRESH_TOKEN,
        payload: {
            newToken: newToken,
            newRefreshToken: newRefreshToken
        }
    }
}