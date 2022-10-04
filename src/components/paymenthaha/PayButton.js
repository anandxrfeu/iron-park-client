const PayButton = (props) => {

    const {reservation} = props

    const onCheckOutHandler = () => {
        console.log(reservation)
    }

    return(
        <>
            <button onClick={onCheckOutHandler}>Check Out</button>
        </>
    )

}

export default PayButton;