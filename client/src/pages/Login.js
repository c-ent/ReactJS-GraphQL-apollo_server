import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../hooks/useLogin';
import { useAuth } from '../hooks/useAuth'; // Import the useAuth hook
import { Link } from 'react-router-dom';

const Login = () => {
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      const token = data.loginUser.token;
      const user = data.loginUser.user;
      console.log(token, user);
      handleLogin({ token, user });
    },
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ variables: { email, password } });
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className='mx-auto w-80  flex flex-col items-center justify-center h-screen'>
    <form onSubmit={handleLoginSubmit} className=' w-full flex flex-col'>

        <div className='flex mx-auto'>
          <h2 className='text-2xl mb-4 text-[#00352F] font-bold'>Login</h2>
        </div>
        <div className='pb-3'>
          <p className='text-[#00352F] font-semibold'>Email</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border p-2 mr-2 w-full border-[#00352F] rounded-md'
          />
        </div>

        <div className='pb-5' >
        <p className='text-[#00352F] font-semibold'>Password</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border p-2 mr-2 w-full border-[#00352F] rounded-md'
          />
        </div>
        <button type="submit" className='bg-[#00A896] rounded-full text-white p-2'>Login</button>
  
    </form>
    <Link to="/register" className='text-[#00A896] font-semibold'>Register</Link>
  </div>
  
  );
};

export default Login;
