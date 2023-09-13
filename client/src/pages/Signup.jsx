import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Header from '../components/Header';
import sportsbg from '../assets/sportsbg.jpeg';
import { createNewPlayer } from '../redux/players/playersSlice';


function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [firstNameInput, setFirstNameInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordConfirmationInput, setPasswordConfirmationInput] = useState("");
    const [errors, setErrors] = useState(null);

    const handleSignup = async(e) => {
        const newPlayer = {
            first_name: firstNameInput,
            last_name: lastNameInput,
            email: emailInput,
            password: passwordInput,
            passwordConfirmation: passwordConfirmationInput
        };
        try {
            e.preventDefault();
            await dispatch(createNewPlayer(newPlayer));
            navigate('/welcome')
        } catch (err) {
            setErrors("Invalid information")
        }
    }

  return (
    <Container>
        <div className="bg-image" style={{backgroundImage: `url(${sportsbg})`, backgroundSize: 'cover'}}>
            <div className="content">
                <Header login/>
                <div class="card">
                    <h2 class="signup">Sign Up</h2>
                    <form onSubmit={handleSignup}>
                        <div class="inputBox1">
                            <input type="text" required="required" alue={firstNameInput} 
                            onChange={(e) => setFirstNameInput(e.target.value)} />
                            <span class="user">First Name</span>
                        </div><br></br><br></br>

                        <div class="inputBox">
                            <input type="text" required="required" value={lastNameInput} 
                            onChange={(e) => setLastNameInput(e.target.value)} />
                            <span>Last Name</span>
                        </div><br></br><br></br>

                        <div class="inputBox">
                            <input type="email" required="required" value={emailInput} 
                            onChange={(e) => setEmailInput(e.target.value)} />
                            <span>Email</span>
                        </div><br></br><br></br>

                        <div class="inputBox">
                            <input type="password" required="required" value={passwordInput} 
                            onChange={(e) => setPasswordInput(e.target.value)} />
                            <span>Password</span>
                        </div><br></br><br></br>

                        <div class="inputBox">
                            <input type="password" required="required" value={passwordConfirmationInput} 
                            onChange={(e) => setPasswordConfirmationInput(e.target.value)} />
                            <span>Confirm Password</span>
                        </div><br></br><br></br>

                        <button class="enter">Enter</button>
                    </form>
                    {errors && <p className="error-message">{errors}</p>}
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
        background-color: #0000007f;
    }
    .card {
        position: absolute;
        top: 55%;
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
    .signup {
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
`;


export default Signup