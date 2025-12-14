import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';


export default function Register() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();


const register = async () => {
try {
await api.post('/auth/register', { email, password });
alert('Registration successful');
navigate('/login');
} catch (err) {
alert('Registration failed');
console.error(err);
}
};


return (
<div style={{ padding:20 }}>
<h2>Register</h2>
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
<button onClick={register} style={{ padding:10, background:'#2563EB', color:'#fff', border:'none', width:'100%' }}>
Register
</button>
</div>
);
}
