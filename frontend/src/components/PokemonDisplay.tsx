import type { JSX } from "react";
import styles from "../styles/PokemonDisplay.module.css"
import InfoBox from "./InfoBox";
import type { IPokemon } from "../interfaces/IPokemon";



function capitalize(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

interface PokemonDisplayProps {
    data : IPokemon | null;
}

//association d'une couleur a chaque stat
const statColors: Record<string, string> = {
    hp: "#DF2140",
    attack: "#FF994D",
    defense: "#EECD3D",
    "special-attack": "#85DDFF",
    "special-defense": "#96DA83",
    speed: "#FB94A8"
};

// abreviations des stats
const statAbbr: Record<string, string> = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SpA",
    "special-defense": "SpD",
    speed: "SPD"
};

export default function PokemonDisplay({data} : PokemonDisplayProps) : JSX.Element{
    if (!data) {
        return <div>Aucun Pokémon n'a été trouvé.</div>;
    }
    
    return (
        <div className={styles.card}>
            {/* coté gauche : les images */}
            <div className={styles.images}>
                <div className={styles.mainImage}>
                    <img src={data.sprites.front} alt={`${data.name} front`}/>
                </div>
                <div className={styles.otherImages}>
                    <img src={data.sprites.back} alt={`${data.name} back`}/>
                    <img src={data.sprites.front_shiny} alt={`${data.name} front shiny`}/>
                    <img src={data.sprites.back_shiny} alt={`${data.name} back shiny`}/>
                </div>
            </div>

            {/* côté droit : les infos  */}
            <div className={styles.infos}>
                <div className={styles.head}>
                    <div className={styles.name}>{capitalize(data.name)}</div>
                    <div className={styles.id}>#{data.id}</div>
                </div>

                {/* types */}
                <div className={styles.types}>
                    {data.types.map((type, index) => (
                        <div key={index} className={styles.type}>{capitalize(type)}</div>
                    ))}
                </div>
                
                {/* taille et poids */}
                <div className={styles.infoGrid}>
                    <InfoBox title="Height" data={data.height} color="#BFC66B"/>
                    <InfoBox title="Weight" data={data.weight} color="#BFC66B"/>

                </div>

                {/* stats */}
                <div className={styles.title}>Stats</div>
                <div className={styles.infoGrid}>
                    {data.stats.map((stat, index) => {
                        const color = statColors[stat.name];
                        const title = statAbbr[stat.name] || stat.name; // nom complet si non trouvé
                        
                        return (
                            <InfoBox key={index} title={title} data={stat.base} color={color}/>
                        );
                    })}
                </div>

                {/* abilities */}
                <div className={styles.title}>Abilities</div>
                <div className={styles.infoGrid}>
                    {data.abilities.map((ability, index) => (
                        <InfoBox key={index} title={capitalize(ability)} color="#BFC66B"/>
                    ))}
                </div>
            </div>
        </div>
      );
    }