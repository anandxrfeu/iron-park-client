import "./Container.css"
import Navbar from "./Navbar"

const Container  = (props) => {
    return(
        <div className="container">
                <Navbar />
                <main>{props.children}</main>
        </div>
    )
}

export default Container