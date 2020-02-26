import fetch from 'isomorphic-fetch'
import { API } from '../config'

export const create = (tag, token) => {
    return fetch(`${API}/tag`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(tag)
    })
        .then(res => {
            return res.json()
        })
        .catch(err =>
            console.log(err)
        )
}

export const getTags = () => {
    return fetch(`${API}/tag`, {
        method: 'get',
    })
        .then(res => {
            return res.json()
        })
        .catch(err =>
            console.log(err)
        )
}

export const singleTag = (slug) => {
    return fetch(`${API}/tag/${slug}`, {
        method: 'GET',
    })
        .then(res => {
            return res.json()
        })
        .catch(err =>
            console.log(err)
        )

}

export const removeTag = (slug, token) => {
    return fetch(`${API}/tag/${slug}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json()
        })
        .catch(err => {

            return err
        }
        )
}