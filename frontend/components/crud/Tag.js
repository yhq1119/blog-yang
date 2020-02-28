/**
 * FULL CODE Tag
 * components/crud/Tag.js
 */
 
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie } from '../../actions/auth';
import { create, getTags, removeTag } from '../../actions/tag';
 
const Tag = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        tags: [],
        removed: false,
        reload: false
    });
 
    const { name, error, success, tags, removed, reload } = values;
    const token = getCookie('token');
 
    useEffect(() => {
        loadTags();
    }, [reload]);
 
    const loadTags = () => {
        getTags().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, tags: data });
            }
        });
    };
 
    const showTags = () => {
        return tags.map((c, i) => {
            return (
                <button
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
        let answer = window.confirm('Are you sure you want to delete this Tag?');
        if (answer) {
            console.log(`sssss${slug}`)
            deleteTag(slug);
        }
    };
 
    const deleteTag = slug => {
        // console.log('delete', slug);
        removeTag(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, error: false, success: false, name: '', removed: !removed, reload: !reload });
            }
        });
    };
 
    const clickSubmit = e => {
        e.preventDefault();
        // console.log('create Tag', name);
        create({ name }, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({ ...values, error: false, success: true, name: '', removed: false, reload: !reload });
            }
        });
    };
 
    const handleChange = e => {
        setValues({ ...values, name: e.target.value, error: false });
    };
 
    const showSuccess = () => {
        if (success) {
            return <p className="text-success">Tag is created</p>;
        }
    };
 
    const showError = () => {
        if (error) {
            return <p className="text-danger">Tag already exist</p>;
        }
    };
 
    const showRemoved = () => {
        if (removed) {
            return <p className="text-danger">Tag is removed</p>;
        }
    };
 
    const mouseMoveHandler = e => {
        setValues({ ...values, error: false, success: false, removed: false });
    };
 
    const newTagFom = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Tag</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} required />
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
                {newTagFom()}
                {showTags()}
            </div>
        </React.Fragment>
    );
};
 
export default Tag;