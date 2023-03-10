import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, child, get, update } from "firebase/database";
import ProgressBar from "./ProgressBar";
  
function UpdateProgressBar() {
    const [uid, setUid] = useState("");
    const [currentStep, setCurrentStep] = useState(1);
    const [percentage, setPercentage] = useState(0);
    
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if(user){  
            setUid(user.uid);
        } else {
            console.log("User not signed in");
        }
    });

    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${uid}`)).then((snapshot) => {
        if(snapshot.exists()){
            setCurrentStep(snapshot.val().step)
            setPercentage(parseInt(currentStep)/4 * 100)
        } else {
            console.log("User not found")
        }
    }).catch((error) => {
        console.log(error);
    })

    function updateStep(uid, step){
        if(step < 4){
            console.log("click");
            const db = getDatabase();

            var updates = {};
            updates['/users/' + uid + '/step'] = step + 1;

            update(ref(db), updates);
        }
        window.location.reload();
        return
    }

    const [completed, setCompleted] = useState(0); 

    useEffect(() => {
        setCompleted(percentage);
    }, [percentage, currentStep]);
    return (
        <div className="App">
            <br/>
            <p>You are currently at step {currentStep} in the project process.</p>
            <ProgressBar bgcolor={"#008000"} completed={completed} />
            <div>
                The total steps in the process are as follows:
            </div>
            <br/>
            <div>
                <p>Step 1</p>
                <p>Step 2</p>
                <p>Step 3</p>
                <p>Step 4</p>
            </div>
            <br/>
            <br/>
            <button onClick={() => updateStep(uid, currentStep)}>Click</button>
        </div>
    ) ;
}

export default UpdateProgressBar