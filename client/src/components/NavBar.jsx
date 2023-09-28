import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import pnplogo from '../assets/pnplogo.png';
import styled from 'styled-components';
import { logOut, selectLoggedInPlayer } from '../redux/players/playersSlice';
import { adminLogout } from '../redux/admin/adminsSlice';


function NavBar({ setSportFieldToggle, isHome, isAdmin, handleFormToggle, isInfoPage }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [iconToggle, setIconToggle] = useState(false);
    const loggedInPlayer = useSelector(selectLoggedInPlayer);


    
    const handleProfileMenuOpen = () => {
        setIconToggle(!iconToggle);
      };

     // Logout function 
     async function handleLogout(){
        await dispatch(logOut());
        navigate('/');
    }

    // Admin Logut function
    const handleAdminLogout = async() => {
        await dispatch(adminLogout());
        navigate('/admin_login');
    };

    //nav bar links
    const links = [
        {name: 'Sports', value: true},
        {name: 'Fields', value: false},
    ]
    
    const [showMobileDropdown, setShowMobileDropdown] = useState(false);
    const toggleMobileDropdown = () => {
        setShowMobileDropdown(!showMobileDropdown)
    }

  return (
    <Container>
        <nav className={`flex j-between ${showMobileDropdown ? 'mobile-dropdown' : ''}`}>
            <div className="left flex a-center">
                <div className="brand flex a-center j-center">
                    <img className="header-logo" src={pnplogo} alt='logo' />
                </div>
                {isAdmin ? null : <ul className="links flex">
                    {isHome ? links.map(({name, value, link}) =>{
                        return (
                            <li onClick={() => setSportFieldToggle(value)} key={name}>
                                <h4 to={link} >{name}</h4>
                            </li>
                        )
                    }): <h4 onClick={() => navigate(`/locations/${loggedInPlayer?.location.id}`)}>Home</h4>}
                </ul>}
            </div>
            <div className="right flex a-center">
                {/* Button to toggle mobile dropdown */}
                <div className="background" onClick={toggleMobileDropdown}>
                    <button className="menu__icon" >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    {showMobileDropdown ? <div className="mobile-dropdown-content">
                        {isHome ? null : <a href={`/locations/${loggedInPlayer?.location.id}`}>Home</a> }
                        {isHome ? <a href="#" onClick={() => setSportFieldToggle(true)}>Sports</a> : null}
                        {isHome ? <a href="#" onClick={() => setSportFieldToggle(false)}>Fields</a> : null}
                        <a href="/requests">Requests</a>
                        {isInfoPage ? <a href="#" onClick={handleFormToggle}>Create</a> : null}
                    </div> : null}
                </div>
                {isInfoPage ? <button className={`request ${window.innerWidth >= 768 ? '' : 'hide'}`} onClick={handleFormToggle}>
                    <span>Create New Meetup</span>
                </button> : null}
                {isAdmin ? null : <button className={`request ${window.innerWidth >= 768 ? '' : 'hide'}`} onClick={() => navigate('/requests')}>
                    <span>Request Sport or Field</span>
                </button>}
                <div className="account-icon">
                    <MenuItem onClick={handleProfileMenuOpen}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                        >
                        <AccountCircle />
                            {iconToggle ? <div>
                                {isAdmin ? null : <MenuItem onClick={() => {
                                    navigate('/profile')
                                    window.location.reload()
                                }}>Profile</MenuItem>}
                                <MenuItem type="button" onClick={isAdmin? () => handleAdminLogout() : () => handleLogout()}>Logout</MenuItem>
                            </div>: null}
                        </IconButton>
                    </MenuItem>
                </div>
            </div>
        </nav>
    </Container>
  )
}


const Container = styled.div`
    nav {
        background-color: white;
        position: sticky;
        top: 0;
        height: 6rem;
        width: 100vw;
        top: 0;
        z-index: 2;
        padding: 0 -6rem;
        align-items: center;
        transition: 0.3s ease-in-out;
        .left {
            position: relative;
            right: 4rem;
            /* gap: 0.5rem; */
            .brand {
                img {
                    bottom: 0.3rem;
                    height: 5rem;
                    width: 100%;
                }
            }
            .links {
                cursor: pointer;
                list-style-type: none;
                gap: 2rem;
                li {
                    h4 {
                        color: black;
                        text-decoration: none;
                    }
                }
            }
            @media (max-width: 768px) {
                .links {
                    display: none;
                }
            }
        }
        .right {
            .account-icon {
                padding-right: 2rem;
            }
            .request {
                display: inline-block;
                border-radius: 4px;
                background-color: #3d405b;
                border: none;
                color: #FFFFFF;
                text-align: center;
                font-size: 17px;
                padding: 16px;
                width: 15rem;
                transition: all 0.5s;
                cursor: pointer;
                margin: 5px;
                }

            .request span {
                cursor: pointer;
                display: inline-block;
                position: relative;
                transition: 0.5s;
            }

            .request span:after {
                content: '»';
                position: absolute;
                opacity: 0;
                top: 0;
                right: -15px;
                transition: 0.5s;
            }

            .request:hover span {
                padding-right: 15px;
            }

            .request:hover span:after {
                opacity: 1;
                right: 0;
            }
            @media (max-width: 768px) {
                .hide {
                    display: none;
                }
            }
        }
        .menu__icon, .mobile-dropdown-content{
            display: none;
        }
        
        @media (max-width: 768px) {
            /* <reset-style> ============================ */
            button {
                border: none;
                background: none;
                padding: 0;
                margin: 0;
                cursor: pointer;
                font-family: inherit;
            }
            /* ============================ */
            /* <style for bg> ======== */
            .background {
                border-radius: 16px;
                border: 1px solid #1a1a1a;
                background: rgba(74, 74, 74, 0.39);
                mix-blend-mode: luminosity;
                box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.20);
                backdrop-filter: blur(15px);
                width: 7vw;
                height: 7vw;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            /* <style for menu__icon> ======== */
            .menu__icon {
                width: 28px;
                height: 28px;
                padding: 3px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
            }

            .menu__icon span {
                width: 100%;
                height: 0.125rem;
                border-radius: 0.125rem;
                background-color: rgb(0, 122, 255);
                box-shadow: 0 .5px 2px 0 hsla(0, 0%, 0%, .2);
                transition: transform .4s, background-color .4s, width .4s, opacity .4s;
            }

            .menu__icon span:nth-child(2) {
                width: 60%;
            }

            .mobile-dropdown-content {
                position: absolute;
                top: 100%;
                background-color: #3d405b;
                box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
                z-index: 1;
                display: flex;
                flex-direction: column;
                row-gap: 0.5rem;
                text-align: center;
                border-radius: 5px;
                width: 20vw;
                height: 15vw;
                a {
                    text-decoration: none;
                    color: white;
                    margin-top: 5%;
                }
            }
        }
    }
 `

export default NavBar;