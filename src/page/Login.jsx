import '../App.css';

function Login(desabilitado, disable) { 
    console.log(disable)
  return (
    <main>
   <h1>login</h1>
   <label htmlFor="chave">
    <p data-testid='msgLogin'>coloque sua chave de segurança</p>
    <input type="chave" name="chave" data-testid="inputLogin" onChange={({target})=>{}} />
    </label>
    <button data-testid='entrar' disabled>Login</button>
      </main>
  );
}

export default Login;
