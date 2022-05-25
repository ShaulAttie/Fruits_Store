

function CunrrencyButton(props) {
    return (
        <button value={props.currency} onClick={props.onClick}>{props.currency}</button>
    )
}

export default CunrrencyButton