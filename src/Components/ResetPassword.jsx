import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function ResetPassword(){
    const [newPass, setNewPass] = useState('');
    const { token } = useParams();
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleResetPassword = (e) => {
        
        e.preventDefault();
        console.log(token);
        console.log(newPass);
        axios.put('http://localhost:3000/api/auth/reset-password', {
            newPass: newPass,
            resetLink: token
        }).then((response) =>{
            console.log(response);
            setMessage(response.data.message);
            setSuccess(true);
        }).catch((error) => {
            console.log(error);
            setMessage("Invalid request or expired link");
        })
    }


    return (
       <div>
           <h1>Reset Password</h1>
              <p>
                    <label>New Password:</label>
                    <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
            </p>
            <p>
                <button onClick={handleResetPassword}>Reset Password</button>
            </p>
            {success && <p>{message}</p>}
       </div>
    );
}