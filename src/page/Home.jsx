import { Route, Switch, Redirect, link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../service/Api';
import '../App.css';

function Home() {
  const[paises, SetPaises] = useState()
  const [code, setCode] = useState()
  
  useEffect(()=> {
    setCode(localStorage.getItem('key'))
    api.get("/countries",{
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key':  code,
      }
    }).then((res)=> {
      SetPaises(res.data.response)
    }).catch((error) => {
      console.log(error)
    })
  },[])
  return (
    <main>
        <h1>home</h1>
      </main>
  );
}

export default Home;
