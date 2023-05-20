import '../App.css';
import logs from './66bfc5ec4227a89006ec7431f8f2fb20-removebg-preview.png'
import { useState, useEffect } from 'react';

function Header() {
  const [account, setAccount] = useState( )
  useEffect(()=> {
    const countJson= localStorage.getItem('count')
    setAccount(JSON.parse(countJson))
  },[])
  console.log()
    return (
      <header>
     <img className="logo" src={logs}alt="logo football" />
     <div>
      <h3>User: {account?.firstname} {account?.lastname}</h3>
      <h3>Email: {account?.email}</h3>
     </div>
        </header>
    );
  }
  
  export default Header;
  