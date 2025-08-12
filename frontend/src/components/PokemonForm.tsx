import { useState, type JSX } from "react";
import styles from "../styles/Form.module.css";
import searchLogo from "../assets/searchIcon.png"
import axios from "axios";
import PokemonDisplay from "./PokemonDisplay";

interface PokemonFormProps {
    
}

export default function PokemonForm({} : PokemonFormProps) : JSX.Element{
    const [pokemon, setPokemon] = useState<any | null>(null);
    const [hasSearched, setHasSearched] = useState(false); // pas d'affichage tant qu'il n'y a pas eu de req
    
    function search(formData : FormData){
        axios
        .get(`http://localhost:3000/pokemons/${formData.get("id")}`)
        .then(res => {
            console.log("Pokemon :", res.data);
            setPokemon(res.data);
            setHasSearched(true);
            setHasSearched(true);
        })
        .catch(err => {
            console.error("Erreur :", err);
            setPokemon(null);
            setHasSearched(true);
        })
    }
    
    return (
        <>
            <form action={search} className={styles.form}>
                <input name="id" className={styles.input} placeholder="Entrez un id pour visualiser un Pokemon"/>
                <button type="submit"><img src={searchLogo} className={styles.searchLogo}/></button>
            </form>
            {hasSearched && <PokemonDisplay data={pokemon} />}
        </>
    );
}