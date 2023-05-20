import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './page/Home';
import Login from './page/Login'
import './App.css';

function App() {
  let location = useLocation();
  
  return (
    <main id='main-principal'>
      {location.pathname === '/Login'?
      <div/>:
      <Header/>
      }
    <Switch>
        <Route exact path='/'  >
          <Redirect to='/Login'/>
        </Route>
        <Route path='/home' component={  Home } />
        <Route path='/Login'  render={(props)=> <Login {...props}/>} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Switch>
      {location.pathname === '/Login'?
      <div/>:
      <Footer/>
      }
      </main>
  );
}

export default App;
