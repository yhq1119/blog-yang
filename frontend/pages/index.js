import Layout from '../components/Layout'
import Link from 'next/link'


const Index = () =>
    <Layout>
        <h2>Index Page</h2>
        <Link href='/signup'>
            <a>SignUp</a>
        </Link>
        <Link href='/signin'>
            <a >SignIn</a>
        </Link>
    </Layout>

export default Index