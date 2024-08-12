import { Board } from '../../components/Board/Board';
import Modal from '../../components/Modal/Modal';
import CardForm from '../../components/CardForm/CardForm'

export const Home = () => {
  
  return (
    <>
      <h1>Home</h1>

          <Modal isOpen={true}>

    <CardForm type='create'/>
    </Modal>
    </>
  );
};
export default Home;
