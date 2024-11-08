import Modal from 'react-modal';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPokemonDetails } from '../../hooks/useGetPokemonDetails';
import { createUseStyles } from 'react-jss';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const PokemonModal = () => {
  const { pokemonId, pokemonName } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const { pokemonDetail, loading } = useGetPokemonDetails(
    pokemonId || '',
    pokemonName || ''
  );

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <div className="modal">
      {loading && <div>Loading...</div>}
      {!loading && <Modal
        isOpen={true}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2 className={classes.title}>
          Pokémon Details for ID: {pokemonId} and Name: {pokemonName}
        </h2>
        <ul>
            <li className={classes.detail}>Classification: {pokemonDetail.classification}</li>
            <li className={classes.detail}>Flee Rate {pokemonDetail.fleeRate}</li>
            <li className={classes.detail}>Max Height: {pokemonDetail.height.maximum}</li>
            <li className={classes.detail}>Min Height: {pokemonDetail.height.minimum}</li>
            <li className={classes.detail}>Max CP: {pokemonDetail.maxCP}</li>
            <li className={classes.detail}>Max HP: {pokemonDetail.maxHP}</li>
            <li className={classes.detail}>Resistant: {pokemonDetail.resistant.join()}</li>
            <li className={classes.detail}>Weaknesses: {pokemonDetail.weaknesses.join()}</li>
            <li className={classes.detail}>Max Weight: {pokemonDetail.weight.maximum}</li>
            <li className={classes.detail}>Min Weight: {pokemonDetail.weight.minimum}</li>
        </ul>
        <button onClick={closeModal} className={classes.title}>Close</button>
      </Modal>}
    </div>
  );
};

const useStyles = createUseStyles(
    {
      title: {
        color: 'black',
        fontSize: '15px'
      },
      detail: {
        fontStyle: 'italic',
        color: 'black'
      }
    },
    { name: 'PokemonExtraDetails' }
  );

export default PokemonModal;
