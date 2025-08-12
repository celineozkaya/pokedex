import type { JSX } from "react";
import styles from "../styles/Form.module.css";
import searchLogo from "../assets/searchIcon.png"

interface PokemonFormProps {
    
}

export default function PokemonForm({} : PokemonFormProps) : JSX.Element{
    function search(formData : FormData){
       
    }
    
    return (
            <form action={search} className={styles.form}>
                <input name="id" className={styles.input} placeholder="Entrez un id pour visualiser un Pokemon"/>
                <button type="submit"><img src={searchLogo} className={styles.searchLogo}/></button>
            </form>
    );
}