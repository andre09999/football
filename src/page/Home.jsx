import { useHistory } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
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

  const[ grafico, setGrafico]= useState( [
   {name: '0-15', gols: 4},
    {name: '16-30', gols: 17},
   {name: '31-45', gols: 11},
    {name: '46-60', gols: 13},
   {name: '61-75', gols: 10},
{name: '76-90', gols: 8},
    {name: '90-105', gols: 3},
    {name: '106-120', gols: null}
  ])

  const aaa = [{"0-15": {
    "total": 37,
    "percentage": "6.06%"
    },
    "16-30": {
    "total": 1,
    "percentage": "25.76%"
    },
    "31-45": {
    "total": 20,
    "percentage": "16.67%"
    },
    "46-60": {
    "total": 70,
    "percentage": "19.70%"
    },
    "61-75": {
    "total": 0,
    "percentage": "15.15%"
    },
    "76-90": {
    "total": 4,
    "percentage": "12.12%"
    },
    "91-105": {
    "total": 3,
    "percentage": "4.55%"
    },
    "106-120": {
    "total": null,
    "percentage": null
    }}]
  const history = useHistory();
 
  const chave = async () => {
    await setCode(localStorage.getItem('key'))
       if(!localStorage.getItem('key')){
         history.push('/')
       }
   }

useEffect(()=> {
  chave()
  const sano = async () =>{
    await api.get("/leagues/seasons",{
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key':  code,
        }
      }).then((res)=> {
        SetAno(res.data)
      }).catch((error) => {
        console.error(error)
      })
    }
    sano()
},[code])

  useEffect(()=> {
    const country = async  () => {
      if(escolhaTemporada?.length > 0){
        await api.get("/countries",{
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key':  code,
          }
        }).then((res)=> {
          SetPaises(res.data.response)   
        }).catch((error) => {
          console.log(error.response)
        })
      }
    }
    country()
    
  },[escolhaTemporada, code])

  useEffect(()=> {

    if(escolhapaises?.length > 0){
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
  },[escolhapaises])

  useEffect(()=> {
    if(escolhaliga?.length > 0){
      const all = liga?.response?.filter((a) =>  a.league.name === escolhaliga )
      Setescolhaliga(all[0]?.league?.id)
      api.get(`/teams?league=${all[0]?.league?.id}&season=${escolhaTemporada}`,{
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
  },[escolhaliga])

  useEffect(()=> {
    if(escolhatime?.length > 0){
      const all = time?.response?.filter((a) =>  a.team.name === escolhatime)
      Setescolhatime(all[0]?.team?.id)
      api.get(`/players?team=${all[0]?.team?.id}&league=${escolhaliga}&season=${escolhaTemporada}`,{
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
  },[escolhatime])
  useEffect(()=>{
    if(formação?.response?.length > 0){

      api.get(`/teams/statistics?season=${escolhaTemporada}&team=${escolhatime}&league=${escolhaliga}`,{
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key':  code,
        }
      }).then((res)=> {
        setestatiticas(res.data)
        Setminutos(res.data.response.goals.for.minute)
        let golos = Object.assign({}, Object.values(res?.data?.response?.goals.for.minute).map((a,i)=>{
          if(a.total === null) return 0
          return a.total
        }))
        Object.keys(golos).forEach((a)=> {
          let newKwy = Object.keys(res?.data?.response?.goals?.for?.minute)[a]
          setGrafico()
          const ab = { name : golos[newKwy], gols: golos[a] }
          setGrafico(grafico,ab)
          delete golos[a]
        })        
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
            <option key={i}>{i}</option>
          ))
        }
        </select>
        <select name="pais" id="" onChange={({target})=> Setescolhapaises(target.value)}>
        {
          paises?.map((i,a)=> (
            <option key={i.name}>{i.name}</option>
          ))
        }</select>
         <select name="liga" id="" onChange={({target})=> Setescolhaliga(target.value)}>
        {
          liga?.response?.map((i,a)=> (
           <option key={i.league.id}>{i.league.name}</option>
          ))
        }</select>
        <select name="time" id="" onChange={({target})=> Setescolhatime(target.value)}>
        {
          time?.response?.map((i,a)=> (
            <option key={i.team.id}>{i.team.name}</option>
          ))
        }
         </select>
         </div>
        <div className='conteudoPrincipal'>
       
         <div className='estatitic'>
              <h2>formações utilizadas foram </h2>
              { estatiticas?.response?.lineups?.map((b=> (
                <div className='forma'>
                  <h3>A formação {b.formation} foi jogado </h3>
                  <h3> {b.played} partidas</h3>
                </div>
              )))} 
              <h3>Jogou total de :{ estatiticas?.response?.fixtures.played.total} partidas</h3>
              <h3>Ganhou : { estatiticas?.response?.fixtures.wins.total}</h3>
              <h3>Empatou: { estatiticas?.response?.fixtures.draws.total}</h3>
              <h3>Perdeu:  { estatiticas?.response?.fixtures.loses.total}</h3>
              
            </div>
        
        <table>
          <thead>
            <tr id='cabecalho'>
              <th>Nome do Jogador</th>
              <th>Idade do jogador</th>
              <th>Foto</th>
            </tr>
          </thead>
          <tbody >
          {
          formação?.response?.map((a)=> (
            <tr key={a.player.id} >
            <td>{a.player.name} {a.player.firstname} {a.player.lastname}</td>
            <td>{a.player.age}</td>
            <td> <img src={a.player.photo} alt={ `foto do jogador ${a.player.name}` }/></td>
            </tr>
          ))
        }
        
          </tbody>
        </table>
        </div>
        <div className='container-grafico-celular'>
       <LineChart 
        width={300}
        height={150}
        data={grafico}
        className='grafico'
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
        <Line
          type='linear'
          dataKey='gols'
          stroke='black'
          activeDot={{ stroke: 'red', strokeWidth: 2, r: 10 }}
          />
        <CartesianGrid strokeDasharray='3 3'/>
        <Tooltip/>
        <YAxis tick={{stroke: 'brown', strokeWidth: 1}}/>
        <XAxis dataKey='name' tick={{stroke: 'brown', strokeWidth: 1}}/>
        <Legend />
      </LineChart>
      </div>
      <div className='container-grafico-computador'>
       <LineChart 
        width={600}
        height={300}
        data={grafico}
        className='grafico'
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
        <Line
          type='linear'
          dataKey='gols'
          stroke='black'
          activeDot={{ stroke: 'red', strokeWidth: 2, r: 10 }}
          />
        <CartesianGrid strokeDasharray='3 3'/>
        <Tooltip/>
        <YAxis tick={{stroke: 'brown', strokeWidth: 1}}/>
        <XAxis dataKey='name' tick={{stroke: 'brown', strokeWidth: 1}}/>
        <Legend />
      </LineChart>
      </div>
      </main>
  );
}

export default Home;
