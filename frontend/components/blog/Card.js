
import Link from 'next/link'
import renderHtml from 'react-render-html'
import moment from 'moment'
import { API } from '../../config'

const Card = ({ blog }) => {


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

    return (
        <div className='lead pb-4'>
            <header>
                <Link href={`/blogs/${blog.slug}`}>
                    <a><h2 className='display-4 pt-3 pb-3 font-weight-bold'>{blog.title}</h2></a>
                </Link>
            </header>
            <section>
                <p className='mark ml-1 pt-2 pb-2'>
                    Written by {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()}
                </p>
            </section>
            <section>
            {showBlogCategories(blog)}
                        {showBlogTags(blog)}
            </section>
            <hr />

            <div className="row">
                <div className='col-md-4'>
                    <img className='img img-fluid'
                    style={{maxHeight:'150px',width:'auto'}}
                    src={`${API}/blog/${blog.slug}/photo`}
                    alt={blog.title}
                    ></img>
                </div>
                <div className='col-md-8'>


                    <section>
                        <div className='pb-3'>{renderHtml(blog.excerpt)}</div>
                        <Link href={`/blogs/${blog.slug}`}>
                            <a className='btn btn-primary pt-2'>Read More</a>
                        </Link>
                    </section>
                </div>
                <div className='row text-right'>
                    <div className='col-md-10'>
                       
                    </div>
                </div>


            </div>
        </div>

    )
}

export default Card