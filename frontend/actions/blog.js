import fetch from 'isomorphic-fetch'
import { API } from '../config'
import { handleResponse } from './auth'
import {PIC} from '../helpers/pic'

export const createBlog = (blog, token) => {
    return fetch(`${API}/blog`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: blog
    })
        .then(res => {
            return res.json()
        })
        .catch(err =>
            console.log(err)
        )
}

export const listBlogsCategoriesTags = (skip,limit) => {

    const data = {
        limit, skip
    }

    return fetch(`${API}/blogs-categories-tags`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json'
            // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)

    })
        .then(res => {
            return res.json()
        })
        .catch(err =>
            console.log(err)
        )
}


export const singleBlog = slug =>{
    return fetch(`${API}/blog/${slug}`,{
        method: 'GET'
    })
    .then(res =>{
        return res.json()
    })
    .catch(err =>{
        console.log(err)
    })
}

export const getPhoto = slug =>{
    return fetch(`${API}/blog/${slug}/photo`,{
        method: 'GET'
    })
    .then(res =>{
        if(res!=null){
            
            return res.json()
        }else{
            return PIC.json()
        }
    })
    .catch(err =>{
        console.log(err)
    })
}