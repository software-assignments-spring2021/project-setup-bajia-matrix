import classes from './App.module.css';
import { BrowserRouter, withRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <button className={classes.Button}>hello</button>
      </div>
    </BrowserRouter>
  );
}

export default withRouter(App);
