import "./Navbar.css"
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Link } from 'react-router-dom';

const Navbar = (props) => {


    const authContext = useContext(AuthContext);
    const isLoggedIn = authContext.loggedInUser.token !== ""
    const user = authContext.loggedInUser.user

    const logoutHandler = () => {
        localStorage.removeItem("loggedInUser")
        authContext.setLoggedInUser({ token: "", user: {} })
    }

    return (
            <div className="navbar-wrapper">
                <div className="navbar">
                    
                    <div className="nav-logo">
                        <p><a href="/">Iron Park</a></p>
                    </div>


                    <div className="nav-links"> 

                        {!isLoggedIn && (  
                            <Link className="nav-link" to='/auth/login'>login</Link>
                        )
                        }

                        {isLoggedIn && (  
                            <>
                            <Link className="nav-link" to='/user/profile'><span id="nav-link-text">Hi, </span>{user.name}</Link>
                            <img className="nav-link-img" src={user.profileImageUrl} alt="profile"/>
                            </>
                        )
//<Link className="nav-link" to='/user/profile'><span id="nav-link-text">Hi, </span>{user.name}</Link>

                        }

                        {isLoggedIn && (  
                            <p className="nav-link" onClick={logoutHandler}>logout</p>
                        )
                        }
                        
                    </div>
                    
                </div>
            </div>
    )

}

export default Navbar;