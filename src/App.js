import WelNameEntry from './components/NameEntryComp/index.js'
import GameBoard from './components/GameBoardComp/index.js'
import SuccComp from './components/SuccessComp/index.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<WelNameEntry />} />
        <Route path='/game' element={<GameBoard />} />
        <Route path='/result' element={<SuccComp />} />
      </Routes>
    </Router>
    // <WelNameEntry />
  );
}

export default App;
