import './App.css';
import Routes from './configs/router';
import {Provider} from 'react-redux';
import {store} from './configs/store';

function App() {
  return (
    <div className="App">
        <Provider store={store}>
          <Routes></Routes>
        </Provider>
    </div>
  );
}

export default App;
