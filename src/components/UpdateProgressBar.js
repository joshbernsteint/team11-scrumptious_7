import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, child, get, update } from "firebase/database";
import ProgressBar from "./ProgressBar";
import '../App.css';
  
function UpdateProgressBar() {
    let steps = [
                    "Customer must sign paperwork so that the project may formally begin.", 
                    "Collect down payment from customer.", 
                    "Scrumptious Solar Services is currently coordinating with construction crews so that construction may begin.",
                    "Solar panels are currently being installed!", 
                    "Construction has finished! Inspection compnay will ensure everything involved is working correctly and safe.", 
                    "Your project is complete!"
                ]

    const [uid, setUid] = useState("");
    const [currentStep, setCurrentStep] = useState(1);
    const [percentage, setPercentage] = useState(0);
    const [userType, setUserType] = useState("");
    const [manager, setManager] = useState(false);
    
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if(user){  
            setUid(user.uid);
        } else {
            console.log("User not signed in");
        }
    });

    console.log(uid)

    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${uid}`)).then((snapshot) => {
        if(snapshot.exists()){
            setCurrentStep(snapshot.val().step)
            setPercentage(parseInt(currentStep)/steps.length * 100)
            setUserType(snapshot.val().userType)
        } else {
            console.log("User not found")
        }
    }).catch((error) => {
        console.log(error);
    })

    if(userType === "manager"){
        setManager(true);
    }

    function updateStep(uid, step){
        if(step < 6){
            const db = getDatabase();

            var updates = {};
            updates['/users/' + uid + '/step'] = step + 1;

            update(ref(db), updates);
        }
        window.location.reload();
        return
    }

    let step_description = steps[parseInt(currentStep) - 1]

    const [completed, setCompleted] = useState(0); 

    useEffect(() => {
        setCompleted(percentage.toFixed(2));
    }, [percentage, currentStep]);
    return (
        <div className="App">
            <br/>
            <p>You are currently at step {currentStep} in the project process.</p>
            <p>Step {currentStep}: {step_description}</p>
            <ProgressBar bgcolor={"#008000"} completed={completed} />
            <br/>
            <div className="steps">
                <p>The total steps in the process are as follows:</p>
                <p>Step 1: {steps[0]}</p>
                <p>Step 2: {steps[1]}</p>
                <p>Step 3: {steps[2]}</p>
                <p>Step 4: {steps[3]}</p>
                <p>Step 5: {steps[4]}</p>
                <p>Step 6: {steps[5]}</p>
            </div>
            <br/>
            <br/>
            <button onClick={() => updateStep(uid, currentStep)}>Click</button>
        </div>
    ) ;
}

export default UpdateProgressBar