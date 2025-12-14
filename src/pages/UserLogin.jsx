import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';


export default function UserLogin() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();


const login = async () => {
const res = await api.post('/auth/login', { email, password });
localStorage.setItem('userToken', res.data.token);
navigate('/');
};


return (
<div>
<h2>User Login</h2>
<input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
<input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)
