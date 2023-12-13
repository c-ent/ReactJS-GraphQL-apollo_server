import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../hooks/useLogin';
import { useAuth } from '../hooks/AuthProvider'; // Import the useAuth hook

const Login = () => {
  const { handleLogin } = useAuth(); // Use the useAuth hook to access authentication functions

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      const token = data.loginUser.token;
      const user = data.loginUser.user;

      // Use the handleLogin function from useAuth
      handleLogin({ token, user });
    },
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ variables: { email, password } });
    } catch (error) {
      // Handle login errors here
      console.error('Login failed:', error.message);
    }
  };

  return (
    <form onSubmit={handleLoginSubmit}>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
