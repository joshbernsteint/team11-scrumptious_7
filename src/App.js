import './App.css';
import CameraAccess from './components/CameraAccess';
import RegisterForm from './components/registerForm';
import Login from './components/loginForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login />
      </header>
    </div>
  );
}

export default App;
