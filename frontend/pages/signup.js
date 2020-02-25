import Layout from '../components/Layout'
import SignupComponent from '../components/auth/SignupComponent';
import Link from 'next/link'

const Signup = () =>
    <Layout>
        <h2>SignUp Page</h2>

        <SignupComponent />

        <Link href='/'>
            <a>Home</a>
        </Link>
    </Layout>

export default Signup