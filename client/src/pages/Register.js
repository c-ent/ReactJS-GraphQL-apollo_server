import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../hooks/useRegister'; // Replace with the actual path
import { LOGIN_USER } from '../hooks/useLogin';
import { useAuth } from '../hooks/AuthProvider'; // Import the useAuth hook

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
      // Handle createUser errors here
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
    <form onSubmit={handleCreateUserSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUser;
