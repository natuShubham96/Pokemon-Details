import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon, useGetPokemons } from '../../hooks/useGetPokemons';
import PokemonDetail from './PokemonDetail';

export const PokemonList = () => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState<string>('');
  const { pokemons, loading } = useGetPokemons();
  const [searchedPkmnList, setSearchedPkmnList] = useState<Pokemon[]>([]);

  useEffect(() => {
    setSearchedPkmnList(pokemons);
  }, [pokemons]);

  useEffect(() => {
    setSearchedPkmnList(
      pokemons.filter((pkmn) =>
        pkmn.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue]);

  const onSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className={classes.root}>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <div>
            <input
              type="text"
              placeholder="Search Pokemon by name"
              className={classes.pokemonSearch}
              value={searchValue}
              onChange={(e) => onSearchValueChange(e)}
            />
          </div>
          <table>
            {['name', 'number', 'types', 'image'].map((title) => (
              <th key={title}>{title}</th>
            ))}
            {searchedPkmnList.map((pkmn) => (
              <PokemonDetail pkmnDetail={pkmn} key={pkmn.id} />
            ))}
          </table>
        </>
      )}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '56px',
    },
    pokemon: {
      cursor: 'pointer',
    },
    pokemonSearch: {
      width: '50%',
      color: 'black',
    },
  },
  { name: 'PokemonList' }
);
