import Layout from '../components/Layout'
import SigninComponent from '../components/auth/SigninComponent'
import Link from 'next/link'

const Index = () =>
    <Layout>
        <h2 className='text-center pt-4 pb-4'>SignIn</h2>
        <div className='row'>
            <div className='col-md-8 offset-md-2'>
                <SigninComponent />
            </div>
        </div>
        {/* <Link href='/'>
            <a>Home</a>
        </Link> */}
    </Layout>

export default Index