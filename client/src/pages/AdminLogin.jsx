import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import { useDispatch } from 'react-redux';
import sportsbg from '../assets/sportsbg.jpeg';
import { adminLogin } from '../redux/admin/adminsSlice';


function AdminLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null)


    const handleAdminLogin = async(e) => {
        try {
            e.preventDefault();
            const data = { email, password };
            await dispatch(adminLogin(data));
            navigate(`/management`);
        } catch (err) {
            setError('Incorrect email or password')
        }
    }

  return (
    <Container>
        <div className="bg-image" style={{backgroundImage: `url(${sportsbg})`, backgroundSize: 'cover'}}>
            <div className="content">
                <Header isAdmin={true}/> 
                <div class="card">
                    <h2 className="admin-login-header">Admin Log in</h2>
                    <form onSubmit={handleAdminLogin}>
                        <div class="inputBox1">
                            <input type="email" required="required" value={email} 
                            onChange={(e) => setEmail(e.target.value)} />
                            <span class="user">Email</span>
                        </div><br></br><br></br>
                        <div class="inputBox">
                            <input type="password" required="required" value={password} 
                            onChange={(e) => setPassword(e.target.value)} />
                            <span>Password</span>
                        </div><br></br><br></br>
                        <button class="enter">Enter</button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </div>
    </Container>
  )
}

const Container = styled.div`
    .content {
            position: absolute;
            top: 0;
            bottom: 0;
            height: 100vh;
            width: 100vw;
            background-color: #0000007f
    }
    .card {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 20rem;
        width: 30rem;
        flex-direction: column;
        gap: 2rem;
        background: #e3e3e3;
        box-shadow: 16px 16px 32px #c8c8c8,
                -16px -16px 32px #fefefe;
        border-radius: 8px; 
    }
    .login-header {
        color: #000;
        text-transform: uppercase;
        letter-spacing: 2px;
        display: block;
        font-weight: bold;
        font-size: x-large;
        margin-top: 1.5em;
    }
    .error-message {
        color: red;
        font-size: 1.2rem;
    }
`

export default AdminLogin