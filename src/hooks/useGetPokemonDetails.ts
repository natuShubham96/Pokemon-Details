import { gql, useQuery } from "@apollo/react-hooks";
import { Pokemon } from "./useGetPokemons";
import { useMemo } from "react";

export const GET_POKEMON_DETAILS = gql`
query pokemon($id: String, $name: String){
  pokemon(id: $id, name: $name){
    id
    number
    name
    weight{
      minimum
      maximum
    }
    height{
      minimum
      maximum
    }
    classification
    types
    resistant
    weaknesses
    fleeRate
    maxCP
    maxHP
    image
  }
}
`;

export const useGetPokemonDetails = (pokemonId: string, pokemonName: string) => {
    const { data, ...queryRes } = useQuery(GET_POKEMON_DETAILS, {
      variables: {
        id: pokemonId,
        name: pokemonName,
      },
    });
    
    const pokemonDetail: Pokemon = useMemo(() => data?.pokemon || [], [data]);
  
    return {
        pokemonDetail,
      ...queryRes,
    };
  };