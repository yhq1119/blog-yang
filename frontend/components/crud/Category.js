/**
 * FULL CODE CATEGORY
 * components/crud/Category.js
 */
 
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie } from '../../actions/auth';
import { create, getCategories, removeCategory } from '../../actions/category';
 
const Category = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        categories: [],
        removed: false,
        reload: false,
    });
 
    const { name, error, success, categories, removed, reload } = values;
    const token = getCookie('token');
 
    useEffect(() => {
        loadCategories();
    }, [reload]);

    const timer = (slug) =>{
        setTimeout(()=> deleteConfirm(slug),1500)
    }
 
    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, categories: data });
            }
        });
    };
 
    const showCategories = () => {
        return categories.map((c, i) => {
            return (
                <button
                onTouchEnd={() => deleteConfirm(c.slug)}
            
                    onDoubleClick={() => deleteConfirm(c.slug)}
                    title="Double click to delete"
                    key={i}
                    className="btn btn-outline-primary mr-1 ml-1 mt-3"
                >
                    {c.name}
                </button>
            );
        });
    };

    
 
    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete this category?');
        if (answer) {
            deleteCategory(slug);
        }
    };
 
    const deleteCategory = slug => {
        // console.log('delete', slug);
        removeCategory(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, error: false, success: false, name: '', removed: !removed, reload: !reload });
            }
        });
    };
 
    const clickSubmit = e => {
        e.preventDefault();
        // console.log('create category', name);
        create({ name }, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({ ...values, error: false, success: true, name: '',  reload: !reload });
            }
        });
    };
 
    const handleChange = e => {
        setValues({ ...values, name: e.target.value, error: false });
    };
 
    const showSuccess = () => {
        if (success) {
            return <p className="text-success">Category is created</p>;
        }
    };
 
    const showError = () => {
        if (error) {
            return <p className="text-danger">Category already exist</p>;
        }
    };
 
    const showRemoved = () => {
        if (removed) {
            return <p className="text-danger">Category is removed</p>;
        }
    };
 
    const mouseMoveHandler = e => {
        setValues({ ...values, error: false,success:false ,removed:false});
    };
 
    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Category</label>
                <input type="text" 
                className="form-control" 
                onChange={handleChange} 
                value={name} 
                placeholder='Input here, long press or double click to delete'
                required />
            </div>
            <div>
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </div>
        </form>
    );
 
    return (
        <React.Fragment>
            {showSuccess()}
            {showError()}
            {showRemoved()}
            <div onMouseMove={mouseMoveHandler}>
                {newCategoryForm()}
                {showCategories()}
            </div>
        </React.Fragment>
    );
};
 
export default Category;