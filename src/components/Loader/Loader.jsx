import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loaderwrapper}>
      <RotatingLines
        height="80"
        width="80"
        strokeWidth="5"
        animationDuration="0.75"
        visible={true}
        color="black"
        ariaLabel="loading"
        strokeColor="#818a94"
      />
    </div>
  );
};

export default Loader;