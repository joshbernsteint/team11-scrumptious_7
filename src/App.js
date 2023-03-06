import './App.css';
import CameraAccess from './components/CameraAccess';
import MaterialNotification from './components/MaterialNotification';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CameraAccess></CameraAccess>
        <MaterialNotification></MaterialNotification>
      </header>
    </div>
  );
}

export default App;
