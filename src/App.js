// Redux
import store from './app/store';
import { Provider } from 'react-redux';

// Styles
import './App.css';

// Components
import AppRouter from './routers/AppRouter';

const App = () => {
  return (
    <Provider store={ store }>
      <AppRouter />
    </Provider>
  );
}

export default App;
