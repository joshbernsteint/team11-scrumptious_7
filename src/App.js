import logo from './logo.svg';
import './App.css';
import MaterialNotification from './components/MaterialNotification';
import RequirePhotos from './components/RequirePhotos';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MaterialNotification></MaterialNotification>
        <RequirePhotos></RequirePhotos>
      </header>
    </div>
  );
}

export default App;
