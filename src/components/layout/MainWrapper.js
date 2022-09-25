const MainWrapper = (props) => {

    return(
        <div className="main-container">
            <div className="main-wrapper">
                {props.children}
            </div>
        </div>
    )

}

export default MainWrapper;