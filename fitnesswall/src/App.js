import './App.css';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { Authentiction } from './components/Authentication/Authentiction';

function App() {
  return (
    <div className="">

      <Routes>
        <Route path="/" element={true?<HomePage/>:<Authentiction/>}>

        </Route>
      </Routes>

    </div>
  );
}

export default App;
