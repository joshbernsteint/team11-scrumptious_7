import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, child, get, update } from "firebase/database";
import ProgressBar from "./ProgressBar";
import '../App.css';
import { useParams, Link } from "react-router-dom";

function ManagerProjects() {
    const [uid, setUid] = useState(undefined);
    const [userType, setUserType] = useState(undefined);
    const [manager, setManager] = useState(false);
    const [signedInUser, setSignedInUser] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [loadingUser, setLoadingUser] = useState(true);
    const [myUsers, setMyUsers] = useState([]);
    const auth = getAuth();

    const getUserFromDb = async () => {
        const dbRef = ref(getDatabase());
        try{
            const snapshot = await get(child(dbRef, `users/${uid}`));
            if(snapshot.exists()) {
                setSignedInUser(snapshot.val())
            }
            setLoadingUser(true);
        } catch(e) {
            console.log(e);
            console.log("user not found")
        }
    }

    const getAllUsers = async () => {
        const dbRef = ref(getDatabase());
        try {
          const snapshot = await get(child(dbRef, "users"));
          if (snapshot.exists()) {
            setUsers(snapshot.val());
          }
        } catch (e) {
          console.log(e);
        }
      };

      const getYourProjects = async(users) => {
        let list = document.getElementById("projectList")
        let keys = Object.keys(users);
        let temp = [];
        keys.forEach(key => {
            if(users[key].projectManager === uid){
                temp.push(users[key].uid)
                /*let link = document.createElement("a")
                let linkText = document.createTextNode(users[key].uid);
                link.appendChild(linkText);
                link.href="/progress/"+users[key].uid;
                let li = document.createElement('li');
                li.appendChild(link);
                list.appendChild(li);*/
            }
        })
        setMyUsers(temp);
      }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if(user){  
                setUid(user.uid)
                setLoading(false);
            } else {
                console.log("User not signed in");
            }
        });
    }, [auth, uid])

    useEffect(()=>{
        if(uid){
            getUserFromDb();
        }
        if(signedInUser) {
            setUserType(signedInUser.userType);
            if(userType === "manager") {
                setManager(true);
            }
            if(manager) {
                getAllUsers();
                getYourProjects(users)
            } 
        }
    }, [uid, signedInUser])

    if(loading){
        return <div>Loading...</div>
    } else {
        if(!manager){
            return <div>You must sign in as a manager to see the projects assigned to you</div>
        } else {
            return (
                <div>
                    <ul id="projectList">
                        {myUsers.map((element) => <li><Link to={'/progress/'+element}>{element}</Link></li>)}
                        <li><Link to="/new-project">New Project</Link></li>
                    </ul>
                </div>
            )
        }
    }
}

export default ManagerProjects;