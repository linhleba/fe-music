import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Paths from './Paths';
import Snackbar from './components/SnackBar/SnackBar';

function App() {
  return (
    <Router>
      <Snackbar />
      <Paths />
    </Router>
  );
}

export default App;
