import { Link } from "react-router-dom";


const Home = () => {
    return(
        <div className="App__home"> 
            <div>
            <h1>Home.</h1>
            <h3>bem vindo</h3>
            <img src="https://i.pinimg.com/236x/d9/a4/ac/d9a4ac76ad7d5b888715c0e1a517f153.jpg" alt="..." />
            <Link className="link" to="/home/listar">Listar</Link>
            <Link className="link" to="/home/criar">Criar</Link>
            <Link className="link" to="/home/deletar">Deletar</Link>
            <Link className="link" to="/logout">Logout</Link>
            </div>
        </div>
    )
}

export default Home;