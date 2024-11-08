import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type Pokemon = {
  id: string;
  name: string;
  number: string;
  types: string[];
  image: string;
  classification: string;
  fleeRate: number;
  height: Height;
  maxCP: number;
  maxHP: number;
  resistant: string[];
  weaknesses: string[];
  weight: Weight;
};

interface Height {
  maximum: string;
  minimum: string;
}

interface Weight {
  maximum: string;
  minimum: string;
}

export type PokemonOption = {
  value: Pokemon['id'];
  label: Pokemon['name'];
};

export const GET_POKEMONS = gql`
query pokemons($first: Int!){
  pokemons(first: $first){
    id
    number
    name
    types
    resistant
    image
  }
}
`;

export const useGetPokemons = () => {
  const { data, ...queryRes } = useQuery(GET_POKEMONS, {
    variables: {
      first: 151, // Keep hard coded
    },
  });

  const pokemons: Pokemon[] = useMemo(() => data?.pokemons || [], [data]);

  const pokemonOptions: PokemonOption[] = useMemo(
    () => pokemons.map((p: Pokemon) => ({ value: p.id, label: p.name })),
    [pokemons]
  );

  return {
    pokemons,
    pokemonOptions,
    ...queryRes,
  };
};
