import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, child, get, update } from "firebase/database";
import ProgressBar from "./ProgressBar";
import '../App.css';
import { useParams, Link } from "react-router-dom";

function UpdateProgressBar(props) {
    const steps = [
                    "Customer must sign paperwork so that the project may formally begin.", 
                    "Collect down payment from customer.", 
                    "Scrumptious Solar Services is currently coordinating with construction crews so that construction may begin.",
                    "Solar panels are currently being installed!", 
                    "Construction has finished! Inspection compnay will ensure everything involved is working correctly and safe."
                ]
    const pasos = [
                    "El cliente debe firmar el papeleo para que el proyecto pueda comenzar formalmente.",
                    "Cobrar el anticipo del cliente.",
                    "Scrumptious Servicios Solares se está coordinando actualmente con los equipos de construcción para que la construcción pueda comenzar.",
                    "¡Actualmente se están instalando paneles solares!",
                    "¡La construcción ha terminado! La compañía de inspección se asegurará de que todo lo involucrado funcione correctamente y de manera segura."
                ]
    let id = useParams();

    const [uid, setUid] = useState(undefined);
    const [currentStep, setCurrentStep] = useState(1);
    const [percentage, setPercentage] = useState(0);
    const [userType, setUserType] = useState(undefined);
    const [manager, setManager] = useState(false);
    const [signedInUser, setSignedInUser] = useState(undefined)
    const [stepDescription, setStepDescription] = useState(steps[parseInt(currentStep) - 1]);
    const [loading, setLoading] = useState(true);
    const [completed, setCompleted] = useState(0); 
    const [projectManager, setProjectManager] = useState("");
    const spanishTranslation = props.spaTranslation;
    const auth = getAuth();

    const getUserFromDb = async () => {
        const dbRef = ref(getDatabase());
        try{
            const snapshot = await get(child(dbRef, `users/${uid}`));
            if(snapshot.exists()) {
                setSignedInUser(snapshot.val())
            }
        } catch(e) {
            console.log(e);
            console.log("user not found")
        }
    }
    
    const getprojectManager = async (id) => {
        const dbRef = ref(getDatabase());
        try{
            const snapshot = await get(child(dbRef, `users/${id}`));
            if(snapshot.exists()) {
                setProjectManager(snapshot.val().projectManager)
            }
        } catch(e) {
            console.log(e);
            console.log("user not found")
        }
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if(user){  
                setLoading(false)
                setUid(user.uid)
            } else {
                console.log("User not signed in");
            }
        });
    }, [auth, uid])

    useEffect(()=>{
        if(uid) {
            getUserFromDb();
        }
        if(signedInUser) {
            setCurrentStep(signedInUser.step);
            setPercentage(parseInt(currentStep-1)/steps.length * 100);
            setUserType(signedInUser.userType);
            getprojectManager(id.id);
            if(userType === "manager") {
                setManager(true);
            }
        }
    }, [uid, currentStep, signedInUser])

    function updateStep(uid, step){
        if(step < steps.length + 1){
            const db = getDatabase();

            let updates = {};
            updates['/users/' + uid + '/step'] = step + 1;
            update(ref(db), updates);

            setPercentage(parseInt(currentStep)/steps.length * 100);
            setCurrentStep((prev) => prev+1);
        }
        return
    }

    useEffect(() => {
        let description;
        if(!spanishTranslation){
            description = steps[parseInt(currentStep) - 1]
        }else{
            description = pasos[parseInt(currentStep) - 1]
        }
        setStepDescription(description)
        setCompleted(percentage.toFixed(2));
    }, [percentage, currentStep, props]);

    if((uid === id.id || manager === true) && projectManager !== ""){
        if(loading){
            return <div><h2>{!spanishTranslation?"loading":"cargando"}...</h2></div>
        }else{
            return (
                <div className="App">
                    <br/>
                    <p>{!spanishTranslation?"Hi":"Hola"}{signedInUser ? " "+signedInUser.firstName : (!spanishTranslation?", you must sign in":", debes iniciar sesión")}</p>
                    { stepDescription ?
                        <div>
                            {manager && <p>{!spanishTranslation?"This project is for user ":"Este proyecto es para "}{id.id}</p>}
                            <p>{!spanishTranslation?"This project is currently at step":"Paso actual es número "} {currentStep} {!spanishTranslation?"in the project process":"del proyecto"}.</p>
                            <p>{!spanishTranslation?"Step":"Paso"} {currentStep}: {stepDescription}</p>
                        </div> 
                        : 
                        <p>{!spanishTranslation?"All done!":"¡Todo listo!"}</p>
                    }
                    <ProgressBar bgcolor={"#008000"} completed={completed} />
                    <br/>
                    <div className="steps">
                        <p>{!spanishTranslation?"The total steps in the process are as follows":"Todos los pasos del proyecto son los siguientes"}:</p>
                        <p>{!spanishTranslation?"Step":"Paso"} 1: {!spanishTranslation?steps[0]:pasos[0]}</p>
                        <p>{!spanishTranslation?"Step":"Paso"} 2: {!spanishTranslation?steps[1]:pasos[1]}</p>
                        <p>{!spanishTranslation?"Step":"Paso"} 3: {!spanishTranslation?steps[2]:pasos[2]}</p>
                        <p>{!spanishTranslation?"Step":"Paso"} 4: {!spanishTranslation?steps[3]:pasos[3]}</p>
                        <p>{!spanishTranslation?"Step":"Paso"} 5: {!spanishTranslation?steps[4]:pasos[4]}</p>
                    </div>
                    <br/>
                    <br/>

                    {manager && uid === projectManager && <button onClick={() => updateStep(uid, currentStep)}>{!spanishTranslation?"Next Step":"Próximo paso"}</button>}
                </div>
            );
        }
    } else {
        if(projectManager === "") {
            return (
                <div>
                <p>{!spanishTranslation?"Hi":"Hola"}{signedInUser ? " "+signedInUser.firstName : (!spanishTranslation?", you must sign in":", debes iniciar sesión")}</p>
                <p>{!spanishTranslation?"You're project has not yet begun! You'll have to wait for a manager to start your project to see your project progress.":"¡Tu proyecto aún no ha comenzado! Tendrá que esperar a que un administrador inicie su proyecto para ver su progreso."}</p>
                </div>
            )
        } else {
            return (
                <div>
                <p>{!spanishTranslation?"Hi":"Hola"}{signedInUser ? " "+signedInUser.firstName : (!spanishTranslation?", you must sign in":", debes iniciar sesión")}</p>
                <p>{!spanishTranslation?"This is not your progress page! To see your project progress, go to your page.":"¡Esta no es tu página de progreso! Para ver el progreso de su proyecto, vaya a su página."}</p>
                <p>{!spanishTranslation?"Your project progress page can be found":"La página de progreso de su proyecto se puede encontrar"} <Link to={'/progress/'+uid}>{!spanishTranslation?"here":"aquí"}</Link></p>
                </div>
            )
        }
    }
}

export default UpdateProgressBar