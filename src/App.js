import './App.css';
import CameraAccess from './components/CameraAccess';
import RegisterForm from './components/registerForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CameraAccess></CameraAccess>
        <RegisterForm/>
      </header>
    </div>
  );
}

export default App;
