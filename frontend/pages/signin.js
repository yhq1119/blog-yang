import Layout from '../components/Layout'
import Link from 'next/link'

const Index = () =>
    <Layout>
        <h2>SignIn Page</h2>
       <Link href='/'>
        <a>Home</a>
       </Link>
    </Layout>

export default Index