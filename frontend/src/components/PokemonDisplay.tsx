import type { JSX } from "react";

interface PokemonDisplayProps {
    data : any | null;
}

export default function PokemonDisplay({data} : PokemonDisplayProps) : JSX.Element{
    if (!data) {
        return <div>Aucun Pokémon n'a été trouvé</div>;
    }
    
    return (
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      );
}