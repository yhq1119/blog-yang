import { useState, useEffect } from 'react'
import { signin, authenticate, isAuth } from '../../actions/auth'
import Router from 'next/router'

const SigninComponent = () => {


    const [values, setValues] = useState({
        // name: 'TestSignIn',
        email: 'test@signin.com',
        password: 'test123',
        error: '',
        loading: false,
        message: '',
        showForm: true
    })
    const {
        // name,
        email,
        password,
        error,
        loading,
        message,
        showForm
    } = values

    useEffect(()=>{
isAuth() && Router.push('/')
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()

        setValues({
            ...values,
            loading: true,
            error: false,
        })
        const user = {
            // name, 
            email, password
        }
        signin(user)
            .then(data => {
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error,
                        loading: false
                    })
                } else {
                    // save user token to cookie

                    // save user info to localStorage

                    // authenticate user
                    authenticate(data, () => {
                        Router.push('/')
                    })

                }
            })


        // console.table({
        //     name,
        //     email,
        //     password,
        //     error,
        //     loading,
        //     message,
        //     showForm
        // })

    }

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value })
        console.log(e.target.value)
    }

    const showLoading = () => (loading ? <div className='alert alert-info'>Loading</div> : '')

    const showError = () => (error ? <div className='alert alert-danger'>{error}</div> : '')

    const showMessage = () => (message ? <div className='alert alert-info'>{message}</div> : '')


    const signinForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                {/* <h2>SignUp</h2> */}

                {/* <div className='form-group'>
                    <input
                        value={name}
                        onChange={handleChange('name')}
                        type='text' className='form-control'
                        placeholder='Input your name'></input>
                </div> */}
                <div className='form-group'>
                    <input
                        value={email}
                        onChange={handleChange('email')}
                        type='email' className='form-control'
                        placeholder='Input your email'></input>
                </div><div className='form-group'>
                    <input
                        value={password}
                        onChange={handleChange('password')}
                        type='password' className='form-control'
                        placeholder='Set password'></input>
                </div>
                <div>
                    <button className='btn btn-primary'>SignIn</button>
                </div>
            </form>
        )
    }


    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signinForm()}
        </React.Fragment>
    )
}

export default SigninComponent