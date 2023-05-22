import '../App.css';
import { useHistory } from 'react-router-dom';
import logs from './66bfc5ec4227a89006ec7431f8f2fb20-removebg-preview.png'
import { useState, useEffect } from 'react';

function Header() {
  const history = useHistory();
  const [account, setAccount] = useState( )
  useEffect(()=> {
    const countJson= localStorage.getItem('count')
    setAccount(JSON.parse(countJson))
  },[])
  const logout = (()=> {
    localStorage.clear()
    history.push('/')
  })
    return (
      <header>
     <img className="logo" src={logs}alt="logo football" />
     <div className='container_header'>
      <div>

      <h3>Usuario: {account?.firstname} {account?.lastname}</h3>
      <h3 className='email'>Email: {account?.email}</h3>
      </div>
     <button onClick={()=> logout()} className='logout'> Logout</button>
     </div>
        </header>
    );
  }
  
  export default Header;
  