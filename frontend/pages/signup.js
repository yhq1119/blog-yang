import Layout from '../components/Layout'
import SignupComponent from '../components/auth/SignupComponent';
import Link from 'next/link'

const Signup = () =>
    <Layout>
        <h2 className='text-center pt-4 pb-4'>SignUp</h2>
        <div className='row'>
            <div className='col-md-8 offset-md-2'>
                <SignupComponent />
            </div>
        </div>

        {/* <Link href='/'>
            <a>Home</a>
        </Link> */}
    </Layout>

export default Signup