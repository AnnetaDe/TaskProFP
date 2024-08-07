import { useParams } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

export const AuthPage = () => {
  const { type } = useParams();
  console.log(type);
  return <div>{type === 'login' ? <LoginForm /> : <RegistrationForm />}</div>;
};
export default AuthPage;
