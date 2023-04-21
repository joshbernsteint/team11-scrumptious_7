import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, child, get, update } from "firebase/database";
import ProgressBar from "./ProgressBar";
import '../App.css';
import { useParams, Link } from "react-router-dom";

function UpdateProgressBar() {
    const steps = [
                    "Customer must sign paperwork so that the project may formally begin.", 
                    "Collect down payment from customer.", 
                    "Scrumptious Solar Services is currently coordinating with construction crews so that construction may begin.",
                    "Solar panels are currently being installed!", 
                    "Construction has finished! Inspection compnay will ensure everything involved is working correctly and safe."
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
        setStepDescription(steps[parseInt(currentStep) - 1])
        setCompleted(percentage.toFixed(2));
    }, [percentage, currentStep]);

    if((uid === id.id || manager === true) && projectManager !== ""){
        if(loading){
            return <div><h2>loading...</h2></div>
        }else{
            return (
                <div className="App">
                    <br/>
                    <p>Hi {signedInUser ? signedInUser.firstName : "must sign in"}</p>
                    { stepDescription ?
                        <div>
                            {manager && <p>This project is for user {id.id}</p>}
                            <p>This project is currently at step {currentStep} in the project process.</p>
                            <p>Step {currentStep}: {stepDescription}</p>
                        </div> 
                        : 
                        <p>All done!</p>
                    }
                    <ProgressBar bgcolor={"#008000"} completed={completed} />
                    <br/>
                    <div className="steps">
                        <p>The total steps in the process are as follows:</p>
                        <p>Step 1: {steps[0]}</p>
                        <p>Step 2: {steps[1]}</p>
                        <p>Step 3: {steps[2]}</p>
                        <p>Step 4: {steps[3]}</p>
                        <p>Step 5: {steps[4]}</p>
                    </div>
                    <br/>
                    <br/>

                    {manager && uid === projectManager && <button onClick={() => updateStep(uid, currentStep)}>Next Step</button>}
                </div>
            );
        }
    } else {
        if(projectManager === "") {
            return (
                <div>
                <p>Hi {signedInUser ? signedInUser.firstName : "must sign in"}</p>
                <p>You're project has not yet begun! You'll have to wait for a manager to start your project to see your project progress.</p>
                </div>
            )
        } else {
            return (
                <div>
                <p>Hi {signedInUser ? signedInUser.firstName : "must sign in"}</p>
                <p>This is not your progress page! To see your project progress, go to your page.</p>
                <p>Your project progress page can be found <Link to={'/progress/'+uid}>here</Link></p>
                </div>
            )
        }
    }
}

export default UpdateProgressBar