import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../hooks/useRegister'; // Replace with the actual path
import { LOGIN_USER } from '../hooks/useLogin';
import { useAuth } from '../hooks/useAuth'; // Import the useAuth hook
import { Link } from 'react-router-dom';

const CreateUser = () => {
  const { handleLogin } = useAuth(); // Use the useAuth hook to access authentication functions

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [createUser] = useMutation(CREATE_USER);

  const handleCreateUserSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({ variables: { name, email, password } });
      await loginUser({ variables: { email, password } });
    } catch (error) {
      console.error('User creation failed:', error.message);
    }
  };


  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      const token = data.loginUser.token;
      const user = data.loginUser.user;
      handleLogin({ token, user });
    },
  });

  return (
    <div className='mx-auto w-80  flex flex-col items-center justify-center h-screen'>
    <form onSubmit={handleCreateUserSubmit} className=' w-full flex flex-col'>
        <div className='flex mx-auto'>
          <h2 className='text-2xl mb-4 text-[#00352F] font-bold'>Register</h2>
        </div>
        <div className='pb-3'>
          <p className='text-[#00352F] font-semibold'>Name</p>
          <input
            type="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border p-2 mr-2 w-full border-[#00352F] rounded-md'
          />
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
        <button type="submit" className='bg-[#00A896] rounded-full text-white p-2 '>Register</button>
    </form>

    <Link to="/login" className='text-[#00A896] font-semibold'>Login</Link>
  </div>
    
  );
};

export default CreateUser;
