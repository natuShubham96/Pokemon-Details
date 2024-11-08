import { createUseStyles } from 'react-jss';
import { Pokemon } from '../../hooks/useGetPokemons';
import { useNavigate } from 'react-router-dom';

interface Props {
  pkmnDetail: Pokemon;
}

const PokemonDetail = ({ pkmnDetail }: Props) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const onClickingPokemon = () => {
    navigate(`/pokemon/${pkmnDetail.id}/${pkmnDetail.name}`);
  }

  return (
    <tr className={classes.pokemon} onClick={onClickingPokemon}>
      <td>{pkmnDetail.name}</td>
      <td>{pkmnDetail.number}</td>
      <td>{pkmnDetail.types.join()}</td>
      <td>
        <img src={pkmnDetail.image} />
      </td>
    </tr>
  );
};

const useStyles = createUseStyles(
  {
    pokemon: {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'darkblue',
      },
    },
  },
  { name: 'PokemonDetail' }
);

export default PokemonDetail;
