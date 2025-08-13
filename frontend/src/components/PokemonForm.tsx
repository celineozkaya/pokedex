import { useState, type JSX } from "react";
import styles from "../styles/Form.module.css";
import searchLogo from "../assets/searchIcon.png"
import axios from "axios";
import PokemonDisplay from "./PokemonDisplay";
import type { IPokemon } from "../interfaces/IPokemon";

interface PokemonFormProps {
    
}

export default function PokemonForm({} : PokemonFormProps) : JSX.Element{
    const [pokemon, setPokemon] = useState<IPokemon | null>(null);
    const [hasSearched, setHasSearched] = useState(false); // pas d'affichage tant qu'il n'y a pas eu de req
    
    // retire tout sauf chiffres
    function sanitizeId(value: string): string {
        return value.replace(/[^0-9]/g, ""); 
    }

    function search(formData : FormData){
        const rawId = String(formData.get("id") || "");
        const cleanId = sanitizeId(rawId);

        axios
        .get(`http://localhost:3000/pokemons/${cleanId}`)
        .then(res => {
            console.log("Pokemon :", res.data);
            setPokemon(res.data);
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
                <input 
                    name="id" 
                    className={styles.input} 
                    placeholder="Entrez un id pour visualiser un Pokemon"
                    pattern="[0-9]+"
                    title="Chiffres uniquement"
                />
                <button type="submit"><img src={searchLogo} className={styles.searchLogo}/></button>
            </form>
            {hasSearched && <PokemonDisplay data={pokemon}/>}
        </>
    );
}