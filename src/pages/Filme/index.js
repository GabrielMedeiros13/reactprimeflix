import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import './filme-info.css'

import api from '../../services/api';

function Filme(){
    const { id } = useParams();
    const navigation = useNavigate();
    const [ filme, setFilme ] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: 'f7b2c8034d48023fcf4ca01686e05e66',
                    language: 'pt-BR',
                }
            })
            .then((response)=>{
                setFilme(response.data)
                setLoading(false);
            })
            .catch(()=>{
                console.log("Filme não encontrado!");
                navigation("/", { replace: true })
            })
        }

        loadFilme();

        return () => {
            console.log("COMPONENTE FOI DESMONTADO")
        }
    }, [navigation, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id == filme.id)

        if(hasFilme){
            alert("Esse filme já está la lista")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        alert("Filme salvo como sucesso!")

    }
    
    if(loading){
        <div className="filme-info">
            <h1>Carregando detalhes..</h1>
        </div>
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} /10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}> Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                </button>
            </div>

        </div>
    )
}

export default Filme;