import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';


export default function UserLogin() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();


const login = async () => {
try {
const res = await api.post('/auth/login', { email, password });
localStorage.setItem('userToken', res.data.token);
alert('Login successful');
navigate('/');
} catch (err) {
alert('Login failed');
console.error(err);
}
};


return (
<div style={{ padding:20 }}>
<h2>User Login</h2>
<div style={{ marginBottom:10 }}>
<input
type="email"
placeholder="Email"
value={email}
onChange={e => setEmail(e.target.value)}
style={{ padding:8, width:'100%' }}
/>
</div>
<div style={{ marginBottom:10 }}>
<input
type="password"
placeholder="Password"
value={password}
onChange={e => setPassword(e.target.value)}
style={{ padding:8, width:'100%' }}
/>
</div>
<button
onClick={login}
style={{ padding:10, background:'#2563EB', color:'#fff', border:'none', width:'100%' }}
>
Login
</button>
</div>
);
}
