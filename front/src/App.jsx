import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './App.css';
import axios from "axios";

function App() {
  const nav = useNavigate();
  const dadosDefault = {
    nome: "",
    password: ""
  }
  const [dados, setDados] = useState(dadosDefault);
  const submitChange = (e) => {
    e.preventDefault();
    console.log(dados);
    if(dados.nome === "" || dados.password === "") {
      window.alert("Preencha os campos.");
    } else {
      axios.post("http://127.0.0.1:3001/login", {
        username: dados.nome,
        password: dados.password
      })
      .then(response => {
        if(response.data["msg"] === "Autenticate") {
          nav("/home");          
        } else {
          window.alert(response.data["msg"]);
        }
      })
      .catch(err => {
        window.alert(err);
      });
    }
    setDados(dadosDefault);
  }
  return (
    <div className="App">
      <div>
        <h1>Login.</h1>
        <form action="#" onSubmit={submitChange}>
          <input type="text" placeholder='username' value={dados.nome} onChange={e => setDados({...dados, nome: e.target.value})}/>
          <input type="password" placeholder='password' value={dados.password} onChange={e => setDados({...dados, password: e.target.value})}/>
          <div style={{display: "flex", justifyContent: "right"}}>
            <button type='submit'>Login</button>
          </div>
        </form>
        <Link to="/criar">Criar conta</Link>
      </div>
    </div>
  );
}

export default App;
