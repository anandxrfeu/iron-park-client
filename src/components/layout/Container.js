import "./Container.css"
import Navbar from "./Navbar"

const Container  = (props) => {
    return(
        <div className="container">
                <Navbar />
                <>{props.children}</>
        </div>
    )
}

export default Container