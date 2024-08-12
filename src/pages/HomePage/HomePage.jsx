import { Board } from '../../components/Board/Board';
import Modal from '../../components/Modal/Modal';
import CardForm from '../../components/CardForm/CardForm'
import ColumnForm from '../../components/ColumnForm/ColumnForm';

export const Home = () => {
  
  return (
    <>
      <h1>Home</h1>

          <Modal title='Add column' isOpen={true}>

    <ColumnForm type='create'/>
    </Modal>
    </>
  );
};
export default Home;
