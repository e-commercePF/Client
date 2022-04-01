import axios from 'axios';
import { useState } from 'react';


export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleForgotPassword = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3000/api/auth/forgot-password', {
            email: email
        }).then((response) => {
            console.log(response);
            setMessage(response.data.message);
            setSuccess(true);
        }).catch((error) => {
            console.log(error);
            setMessage("Email not found or invalid request");
        })
    }

    return (
        <div>
            <h1>Forgot Password</h1>
            <p>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </p>
            <p>
                <button onClick={handleForgotPassword}>Submit</button>
            </p>
            {success && <p>{message}</p>}
        </div>
    )
}