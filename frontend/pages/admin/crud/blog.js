import Layout from '../../../components/Layout'
import Admin from '../../../components/auth/Admin'
import BlogCreate from '../../../components/crud/BlogCreate'
import Tag from '../../../components/crud/Tag'


import Link from 'next/link'


const Blog = () =>
    <Layout>
        <Admin>
            <div className="container-fluid">
                <div className='row'>
                    <div className='col-md-12 pt-5 pb-5'>
                        <h2>Create new blog</h2>
                    </div>

                    <div className='col-md-12'>
                        <ul className="list-group">
                            <li className="list-group-item">
                                {/* <Link href='/crud/blog'> */}
                                 <BlogCreate />
                                {/* </Link> */}
                            </li>
                        </ul>
                    </div>
                    {/* <div className='col-md-6'>
                    <ul className="list-group">
                            <li className="list-group-item">
                                <Link href='/crud/category-tag'>
                                 <Tag />
                                </Link>
                            </li>
                        </ul>
                    </div> */}
                </div>

            </div>
        </Admin>
    </Layout>

export default Blog