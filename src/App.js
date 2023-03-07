import './App.css';
import CameraAccess from './components/CameraAccess';
import RegisterForm from './components/registerForm';
import Login from './components/loginForm';
import AuthDetails from './components/AuthDetails';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login />
        <AuthDetails />
        <RegisterForm />
      </header>
    </div>
  );
}

export default App;
