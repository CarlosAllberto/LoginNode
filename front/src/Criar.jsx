import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './App.css';
import axios from "axios";

function Criar() {
  const nav = useNavigate();
  const dadosDefault = {
    nome: "",
    email: "",
    password: "",
    passwordConfirme: ""
  }
  const [dados, setDados] = useState(dadosDefault);
  const submitChange = (e) => {
    e.preventDefault();
    if(dados.password === dados.passwordConfirme) {
      axios.post("http://127.0.0.1:3001/create", {
        username: dados.nome,
        email: dados.email,
        password: dados.password
      })
      .then(response => {
        if(response.data["msg"] === "created"){
          setDados(dadosDefault);
          nav("/");
        } else {
          window.alert(response.data["msg"]);
        }
      })
      .catch(err => {
        window.alert(err);
      });
      setDados(dadosDefault);
    } else {
      window.alert("campos de senha não são iguais");
    }
  }
  return (
    <div className="App">
      <div>
        <h1>Criar.</h1>
        <form action="#" onSubmit={submitChange}>
          <input 
            type="text" 
            placeholder='username' 
            value={dados.nome} 
            onChange={e => setDados({...dados, nome: e.target.value})}
          />
          <input 
            type="email" 
            name="email" 
            id="email" 
            placeholder="email" 
            value={dados.email} 
            onChange={e => setDados({...dados, email: e.target.value})} 
          />
          <input 
            type="password" 
            placeholder='password' 
            value={dados.password} 
            onChange={e => setDados({...dados, password: e.target.value})}
          />
          <input 
            type="password" 
            placeholder='confirme o password' 
            value={dados.passwordConfirme} 
            onChange={e => setDados({...dados, passwordConfirme: e.target.value})}
          />
          <div style={{display: "flex", justifyContent: "right"}}>
            <button type='submit'>Criar</button>
          </div>
        </form>
        <Link to="/">Fazer login</Link>
      </div>
    </div>
  );
}

export default Criar;