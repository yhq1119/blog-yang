import fetch from 'isomorphic-fetch'
import cookie from 'js-cookie'
import { API } from '../config'

export const signup = (user) => {
    return fetch(`${API}/signup`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => {
            return res.json()
        })
        .catch(err =>
            console.log(err)
        )
}

export const signin = (user) => {
    return fetch(`${API}/signin`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => {
            return res.json()
        })
        .catch(err =>
            console.log(err)
        )
}

export const signout = next =>{
    removeCookie('token')
    removeLocalStorage('user')
    next()
    return fetch(`${API}/signout`,{
        method:'GET'
    })
    .then(res => {
        console.log('Signout success')
    })
    .catch(err => console.log(err))
}

//set cookie
export const setCookie = (key, value) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1
        })
    }
}

export const removeCookie = (key) => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1
        })
    }
}

export const getCookie = (key) => {
    if (process.browser) {
      return  cookie.get(key)
    }
}

// localStorage
export const setLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(
            key,
            JSON.stringify(value)
        )
    }
}
export const removeLocalStorage = (key) => {
    if (process.browser) {
        localStorage.removeItem(key)
    }
}

// authenicate
export const authenticate = (data, next) => {
    setCookie('token', data.token)
    setLocalStorage('user', data.user)
    next()
}

export const isAuth = () => {
    if (process.browser) {
        const cookieChecked = getCookie('token')
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(
                    localStorage.getItem('user')
                    )
            } else {
                return false
            }
        }
    }
}

export const handleResponse = response => {
    if (response.status === 401) {
        signout(() => {
            Router.push({
                pathname: '/signin',
                query: {
                    message: 'Your session is expired. Please signin'
                }
            });
        });
    }
};