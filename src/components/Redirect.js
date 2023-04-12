import "../App.css"
import { Stack,Button } from "react-bootstrap"

export function Redirect(props) {
    return (
        <div className="redirect">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className = "redirect-square">
                <br/>
                <h1 className="redirect-square-items" style={{textDecoration: "underline"}}>Attention!</h1>
                <p className="redirect-square-items"><b>You are being redirected to an exterior site (<a href={props.link}>{props.link}</a>)</b> 
                <br/><br/>Please be advised that while we trust the owners of the domain we are sending you to, we do not have control 
                over their cybersecurity practices.</p>
                    <Button variant="primary" href={props.link}>
                        Proceed to the Link
                    </Button>
                <br/>
                <p className="redirect-square-items">If you do not wish to travel to this link, please exit out of this tab and return to the normal web page.
                <br/>
                <br/>
                <i>~Scrumptious Solar Services Team</i>
                </p>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}