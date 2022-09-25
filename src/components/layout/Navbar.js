import "./Navbar.css"

const Navbar = (props) => {

    return (
            <div className="navbar-wrapper">
                <div className="navbar">
                    <div className="nav-logo">
                        <p><a href="/">Iron Park</a></p>
                    </div>
                    <div className="nav-links">
                        <p><a href="/auth/login">login</a></p>
                    </div>
                </div>
            </div>
    )

}

export default Navbar;