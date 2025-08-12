import type { JSX } from "react";
import PokemonForm from "../components/PokemonForm";
import logo from "../assets/pokedexTitle.png"
import styles from "../styles/Home.module.css"

interface PropsHome{

}

export default function Home({} : PropsHome) : JSX.Element {
    return (
        <div className={styles.home}>
            <img src={logo} className={styles.logo}/>
            <PokemonForm/>
        </div>
    );
}