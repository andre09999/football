import { useHistory } from 'react-router-dom';
import { BarChart, Bar,  XAxis,  YAxis,  CartesianGrid,  Tooltip,  Legend} from 'recharts';
import { useState, useEffect } from 'react';
import api from '../service/Api';
import '../App.css';

function Home() {
  const[paises, SetPaises] = useState()
  const[ano, SetAno] = useState()
  const [liga, setLiga] = useState()
  const [time,setTime ] =useState()
  const [formação,setformação ] =useState()
  const [estatiticas,setestatiticas ] =useState()
  const[escolhaTemporada, SetescolhaTemporada] = useState()
  const[escolhapaises, Setescolhapaises] = useState()
  const[escolhaliga, Setescolhaliga] = useState()
  const[escolhatime, Setescolhatime] = useState()
  const[minutos, Setminutos] = useState()
  const [code, setCode] = useState()
  const history = useHistory();

useEffect(()=> {
  setCode(localStorage.getItem('key'))
    if(!localStorage.getItem('key')){
      history.push('/')
    }
  api.get("/https://v3.football.api-sports.io/leagues/seasons",{
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key':  code,
    }
  }).then((res)=> {
    SetAno(res.data)
  }).catch((error) => {
    console.error(error)
  })
},[])

  useEffect(()=> {
    if(ano?.length > 0){
      api.get("/countries",{
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key':  code,
        }
      }).then((res)=> {
        SetPaises(res.data)
      }).catch((error) => {
        console.log(error.response)
      })
    }
  },[ano])

  useEffect(()=> {
    if(paises?.length > 0){
      api.get(`/leagues?country=${escolhapaises}&season=${escolhaTemporada}`,{
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key':  code,
  
        }
      }).then((res)=> {
        setLiga(res.data)
      }).catch((error) => {
        console.log(error.response)
      })
    }
  },[paises])

  useEffect(()=> {
    if(liga?.length > 0){
      api.get(`/teams?league=${escolhaliga}&season=${escolhaTemporada}`,{
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key':  code,
        }
      }).then((res)=> {
        setTime(res.data)
      }).catch((error) => {
        console.log(error.response)
      })
    }
  },[liga])

  useEffect(()=> {
    if(time?.length > 0){
      api.get(`/players?team=${time}&league=${escolhaliga}&season=${escolhaTemporada}`,{
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key':  code,
        }
      }).then((res)=> {
        setformação(res.data)
      }).catch((error) => {
        console.log(error)
      })
    }
  },[time])
  useEffect(()=>{
    if(formação?.length > 0){

      api.get(`/teams/statistics?season=${escolhaTemporada}&team=${escolhatime}&league=${escolhaliga}}`,{
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key':  code,
        }
      }).then((res)=> {
        setestatiticas(res.data)
        console.log(res.data.response.gols)
        Setminutos(res.data.response.gols)
      }).catch((error) => {
        console.log(error)
      })
    }
  },[formação])

  return (
    <main>
       <div className='container_select'>
        <select name="ano" id="" onChange={({target})=> SetescolhaTemporada(target.value)} >
        {
          ano?.response?.map((i)=> (
            <option key={i.code}>{i.name}</option>
          ))
        }
        </select>
        <select name="pais" id="" onChange={({target})=> Setescolhapaises(target.value)}>
        {
          paises?.response?.map((i,a)=> (
            <option key={i.code}>{i}</option>
          ))
        }</select>
         <select name="liga" id="" onChange={({target})=> Setescolhaliga(target.value)}>
        {
          liga?.response?.map((i,a)=> (
            <option key={i.code}>{i}</option>
          ))
        }</select>
        <select name="time" id="" onChange={({target})=> Setescolhatime(target.value)}>
        {
          time?.response?.map((i,a)=> (
            <option key={i.code}>{i}</option>
          ))
        }
         </select>
         </div>
        <div className='conteudoPrincipal'>
        <h3 className='escala'>Escalação</h3>
        {
          estatiticas?.response?.map((a,key)=> (
            <div key={a.team.id}>
              <p>formações utilizadas foram </p>
              {a.lineups.map((b=> (
                <div>
                  <p>{b.formation}</p>
                  <p>{b.played}</p>
                </div>
              )))} 
              <p>jogou :{a.fixtures.played.total} partidas</p>
              <p>ganhou : {a.fixtures.wins.total}</p>
              <p>empatou: {a.fixtures.draws.total}</p>
              <p>perdeu: {a.fixtures.loses.total}</p>
              <BarChart width={600} height={300} data={minutos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={minutos} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="gols" fill="#8884d8" />
              </BarChart>
            </div>
          ))
        }
        <table>
          <thead>
            <tr id='cabecalho'>
              <th>Nome do Jogador</th>
              <th>Idade do jogador</th>
              <th>Posição</th>
              <th>Numero</th>
              <th>Foto</th>
            </tr>
          </thead>
          <tbody >
          {
          formação?.response?.map((a,key)=> (
            <tr key={key} >
            <td>{a.name}</td>
            <td>{a.age}</td>
            <td>{a.position}</td>
            <td>{a.number}</td>

            <td> <img src={a.photo} alt={ `foto do jogador ${a.name}` }/></td>
            </tr>
          ))
        }
        
          </tbody>
        </table>
        </div>
      
      </main>
  );
}

export default Home;
