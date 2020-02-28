import Link from 'next/link'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import { withRouter } from 'next/router'
import { getCookie, isAuth } from '../../actions/auth'
import { getCategories } from '../../actions/category'
import { getTags } from '../../actions/tag'
import { createBlog } from '../../actions/blog'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import '../../node_modules/react-quill/dist/quill.snow.css'
import { Button, Alert } from 'reactstrap'
import { QuillModules, QuillFormats } from '../../helpers/quill'

const BlogCreate = ({ router }) => {

    const blogFromLS = (name) => {
        if (typeof window === 'undefined') {
            return false
        }

        if (localStorage.getItem(name)) {
            return JSON.parse(localStorage.getItem(name))
        } else {
            return false
        }
    }

    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])

    const [checkedCategory, setCheckedCategory] = useState([])
    const [checkedTag, setCheckedTag] = useState([])

    const [body, setBody] = useState(blogFromLS('body'))
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        hidePublishButton: false
    })

    const {
        error,
        sizeError,
        success,
        formData,
        title,
        hidePublishButton
    } = values

    useEffect(() => {
        setValues({ ...values, formData: new FormData() })
        initCategories()
        initTags()
    }, [router])

    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setCategories(data)
            }
        })
    }

    const initTags = () => {
        getTags().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setTags(data)
            }
        })
    }
    const token = getCookie('token')

    const publishBlog = (e) => {
        e.preventDefault();
        console.log(formData)
        // console.log('ready to publish blog')
        createBlog(formData, token)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({ ...values, title: '', error: '', success: `New blog "${data.title}" is created.` })
                    setBody('')
                    setCheckedCategory([])
                    setCheckedTag([])
                }
            })
    }
    const publishBlog1 = () => {
        // e.preventDefault();
        console.log(formData)
        // console.log('ready to publish blog')
        createBlog(formData, token)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({ ...values, title: '', error: '', success: `New blog "${data.title}" is created.` })
                    setBody('')

                    setCheckedCategory([])
                    setCheckedTag([])
                }
            })
    }
    const handleChange = name => e => {
        // console.log(e.target.value)
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value, formData, error: '' })
    }

    const handleBody = e => {
        // console.log(e)
        setBody(e)
        formData.set('body', e)
        if (typeof window !== 'undefined') {
            localStorage.setItem('body', JSON.stringify(e))
        }
    }
    const handleTitle = e => {
        // console.log(e)
        setTitle(e)
        formData.set('title', e)
        if (typeof window !== 'undefined') {
            localStorage.setItem('title', JSON.stringify(e))
            localStorage.setItem('temp', formData)
        }
    }


    // const checkSets = (sets, value) => {
    //     const all = [...sets]
    //     // return the first index or -1
    //     const index = sets.indexOf(value)
    //     if (index === -1) {
    //         all.push(value)
    //     } else {
    //         all.splice(index, 1)
    //     }
    // }

    const handleToggle = (c, type, set) => () => {
        setValues({ ...values, error: '' })

        const all = [...set]
        // return the first index or -1
        const index = set.indexOf(c)
        if (index === -1) {
            all.push(c)
        } else {
            all.splice(index, 1)
        }

        console.log(all)
        switch (type) {
            case 'categories':
                setCheckedCategory(all)
                break
            case 'tags':
                setCheckedTag(all)
                break
        }
        formData.set(type, all)
    }


    const showCategories = () => {
        return (
            categories && categories.map((c, i) => (
                <li key={i} className='list-unstyled'>
                    <input
                        onChange={handleToggle(c._id, 'categories', checkedCategory)}
                        type='checkbox'
                        className='mr-2'></input>
                    <label className='check-form-label'>{c.name}</label>
                </li>
            ))
        )
    }

    const showTags = () => {
        return (
            tags && tags.map((c, i) => (
                <li key={i} className='list-unstyled'>
                    <input
                        onChange={handleToggle(c._id, 'tags', checkedTag)}
                        type='checkbox' className='mr-2'></input>
                    <label className='check-form-label'>{c.name}</label>
                </li>
            ))
        )
    }


    const onDismiss = (name) => setValues({ ...values, [name]: '' })

    const booleanString = (args) => {
        return args.length === 0
    }

    const [visable, setVisable] = useState(false)

  
    const showSuccess = () => (
        <div
            className='alert alert-success'
            style={{ display: success ? "" : "none" }}
        >
            {success}
        </div>);

    const showError = () => (
        <div
            className='alert alert-danger'
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>);

    const publishConfirm = () => {
        let answer = window.confirm('Publish now?');
        if (answer) {
            publishBlog1();
        }
    };


    const createBlogForm = () => {
        return (
            <form>
                <div className='form-group'>
                    {showError()}
                    {showSuccess()}
                    <h5>Title</h5>
                    <input type='type'
                        className='form-control'
                        placeholder='Write your blog title'
                        onChange={handleChange('title')}
                        value={title}
                        required
                    ></input>
                </div>

                <div className='form-group'>
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={body}
                        placeholder='Write your blog...'
                        onChange={handleBody}
                        required
                    >
                    </ReactQuill>
                </div>
                <div>
                    <Button
                        // type='submit' 
                        className='btn btn-primary'
                        color='primary'
                        block
                        onClick={publishConfirm}
                    >Publish</Button>
                </div>
            </form>
        )
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-9'>

                    {createBlogForm()}
                </div>
                <div className='col-md-3'>
                    <div className='form-group'>
                        <h5>Add Featured Image</h5>
                        <div className='form-item'>
                            <small className='text-muted'>Max Size:1MB</small>

                        </div>
                        <div className='form-item'>
                            <label className='btn btn-outline-info col-12'>Upload Image
                    <input onChange={handleChange('photo')} type='file' accept='image/*' hidden></input>
                            </label>
                        </div>
                    </div>
                    <hr />
                    <h5>Categories</h5>

                    <ul
                        style={{ maxHeight: '200px', overflow: 'scroll' }}
                    > {showCategories()}</ul>
                    <hr></hr>
                    <h5>Tags</h5>
                    <ul
                        style={{ maxHeight: '200px', overflow: 'scroll' }}
                    >
                        {showTags()}
                    </ul>
                    <hr />
                </div>
            </div>


        </div>
    )
}

export default withRouter(BlogCreate)