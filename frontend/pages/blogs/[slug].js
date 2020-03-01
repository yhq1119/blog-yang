import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { listBlogsCategoriesTags, singleBlog,listRelated } from '../../actions/blog';
import Card from '../../components/blog/Card';
import { API, DOMAIN, APP_NAME } from '../../config';
import moment from 'moment'
import renderHtml from 'react-render-html'


const SingleBlog = ({ blog }) => {


    const [related, setRelated] = useState([])

    const loadRelated = () =>{
        listRelated({blog})
        .then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                setRelated(data);
            }
        })
    }

    useEffect(()=>{
        loadRelated()
    },[])

    const showBlogCategories = blog => {
        return blog.categories.map((c, i) => (
            <Link key={i} href={`/category/${c.slug}`}>
                <a className='btn btn-primary mr-1 ml-1 mt-3'>{c.name}</a>
            </Link>
        ))
    }


    const showBlogTags = blog => {
        return blog.tags.map((t, i) => (
            <Link key={i} href={`/tag/${t.slug}`}>
                <a className='btn btn-outline-primary mr-1 ml-1 mt-3'>{t.name}</a>
            </Link>
        ))
    }



    return <React.Fragment>
        <Layout>
            <main>
                <article>
                    <div className='container-fluid'>
                        <section>

                            <div
                                className='row' style={{ marginTop: '-30px' }}>
                                <img src={`${API}/blog/${blog.slug}/photo`} alt={blog.title}
                                    className='img img-fluid featured-image'></img>
                            </div>
                        </section>
                        <section>
                            <h1 className='text-center'>{blog.title}</h1>
                            <p className='lead mt-3 mark'>
                                Written by {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()}
                            </p>
                        </section>
                        <section>
                            {showBlogCategories(blog)}
                            {showBlogTags(blog)}
                            <br />
                            <br />
                        </section>
                    </div>
                    <div className='container'>
                        <section>
                            <div className='col-md-12 lead'>
                                {renderHtml(blog.body)}
                            </div>
                        </section>
                    </div>
                    <div className='container pb-5'>
                        <h4 className='text-center pt-5 pb-5 h2'>Related blogs</h4>
                        <hr />
                        <p>show related blogs</p>
                        {JSON.stringify(related)}
                    </div>

                    <div className='container pb-5'>
                        <p>show comments</p>
                    </div>
                </article>
            </main>
        </Layout>
    </React.Fragment>
}


SingleBlog.getInitialProps = ({ query }) => {
    return singleBlog(query.slug)
        .then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                // console.log('GET INITIAL PROPS IN SINGLE BLOG', data)
                return { blog: data }
            }
        })
}

export default SingleBlog