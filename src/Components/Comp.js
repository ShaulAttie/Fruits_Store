import './Comp.css';

function Card(props) {
  return (<div className="card"> {props.children}  </div>
  )
}
function CardHeader(props) {
  return (<div className="cardHeader">{props.children}  </div>
  )
}
function CardContent(props) {
  return (<div className="cardContent">{props.children}</div>
  )
}
function CardFooter(props) {
  return (<div className="cardFooter">{props.children}</div>
  )
}

export { Card, CardHeader, CardContent, CardFooter }