import { Route, Switch, Redirect } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './page/Home';
import Login from './page/Login'
import './App.css';

function App() {
  const [disable, setDiseble] = useState(true)
  const  desabilitado = ((a)=>{
    if(a.value > 10){
      setDiseble(false)
    }
    if(a.value < 10){
      setDiseble(true)
    }
  })
  return (
    <main>
    <Header/>
    <Switch>
        <Route exact path='/'  >
          <Redirect to='/Login'/>
        </Route>
        <Route path='/home' component={  Home } />
        <Route path='/Login'  render={(props)=> <Login {...props}/>} desabilitado={desabilitado} disable={disable} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Switch>
      <Footer/>
      </main>
  );
}

export default App;
