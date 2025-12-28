import React from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate('/user')}> USER </button>
            <br/><br/><br/><br/>
            <button onClick={() => navigate('/admin')}> ADMIN </button>
        </div>
    )
}

export default Login