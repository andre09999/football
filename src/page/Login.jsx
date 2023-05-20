import '../App.css';
import {Redirect, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../service/Api';

function Login() { 
  const [disable, setDiseble] = useState(true)
  const [user, setUser] = useState('')
  const [msg, setMsg] = useState()
  const [code, setCode] = useState()
  
const history = useHistory();

  const  desabilitado = ((a)=>{
    if(a.value.length >= 10){
      setDiseble(false);
      setCode(a.value)
    }
    if(a.value.length < 10){
      setDiseble(true)
      setCode()
    }
  })
  const fetchs = (()=> {

    api.get("/status",{
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key':  code,
      }
    }).then((res)=> {
      setUser(res.data)
    }).catch((error) => {
      console.error(error)
    })
  })
const redicionar = ( () => {
  return history.push('/home')
})

  useEffect(()=>{
    
    if(user?.results === 1){
      localStorage.setItem('key', code)
      localStorage.setItem('count', JSON.stringify(user.response.account))
      setMsg()
      redicionar()
    }else if(user?.results === 0 && user !== '') {
      return setMsg(false)
    }
  },[user])

  return (
    <main className='main_login'>
   <label htmlFor="chave" className='labels'>
    <h1 data-testid='msgLogin' className='h1_Login'>Coloque sua chave de segurança:</h1>
    <input type="chave" name="chave" data-testid="inputLogin" className='inputLogin' onChange={({target})=>desabilitado(target)} />
    </label>
    <button data-testid='entrar' className='butLogin' disabled={disable} onClick={()=> {fetchs()} }>Login</button>
    {msg === false ?
      <p className='erro'>Codigo incorreto </p> :
      <div/>
      }
      </main>
  );
}

export default Login;
