import React from 'react';
import { Link } from 'react-router-dom';
type LandingPageProps = {

};

const LandingPage: React.FC<LandingPageProps> = () => {

    return <div className='flex bg-gray-100 m-5 p-5 justify-between rounded-lg'>
        <h1 className='text-2xl'>Welcome</h1>
        <div className='flex gap-10'>
            <Link className='text-indigo-600' to={'/login'}>Login</Link>
            <Link className='text-indigo-600' to={'/register'}>Register</Link>
        </div>
    </div>
}
export default LandingPage;