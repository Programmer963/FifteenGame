import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FifteenPuzzle from './pages/fifteen-puzzle'
import Forms from './pages/Forms'

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/forms" element={<Forms/>}></Route>
      <Route path="/game" element={<FifteenPuzzle/>}></Route>
    </Routes>
  </Router>
  
  );
}

export default App;
