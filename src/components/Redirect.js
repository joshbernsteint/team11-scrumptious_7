import "../App.css"
import { Stack,Button } from "react-bootstrap"

export function Redirect(props) {
    const spanishTranslation = props.spaTranslation;
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
                <h1 className="redirect-square-items" style={{textDecoration: "underline"}}>{!spanishTranslation?"Attention!":"¡Atención!"}</h1>
                <p className="redirect-square-items"><b>{!spanishTranslation?"You are being redirected to an exterior site":"Estás siendo redirigido a un sitio externo"} (<a href={props.link}>{props.link}</a>)</b> 
                <br/><br/>{!spanishTranslation?"Please be advised that while we trust the owners of the domain we are sending you to, we do not have control over their cybersecurity practices.":
                "Tenga en cuenta que aunque confiamos en los propietarios del dominio al que lo enviamos, no tenemos control sobre sus prácticas de ciberseguridad."}</p>
                    <Button variant="primary" href={props.link}>
                       {!spanishTranslation?"Proceed to the Link":"Continuar"}
                    </Button>
                <br/>
                <p className="redirect-square-items">{!spanishTranslation?
                "If you do not wish to travel to this link, please exit out of this tab and return to the normal web page.":
                "Si no desea viajar a este enlace, salga de esta pestaña y regrese a la página web normal."}
                <br/>
                <br/>
                <i>{!spanishTranslation?"~Scrumptious Solar Services Team":"~Scrumptious Servicios Solares"}</i>
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