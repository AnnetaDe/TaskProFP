import { useParams } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
import { LoginSchame, RegistrationSchame } from '../../schames/AuthSchames';
import { loginThunk, registerThunk } from '../../redux/user/userOperations';

export const AuthPage = () => {
  const { type } = useParams();

  return (
    <div>
      {type === 'login' ? (
        <AuthForm
          loginForm
          key="login"
          scheme={LoginSchame}
          onSubmitThunk={loginThunk}
        />
      ) : (
        <AuthForm
          registerForm
          key="register"
          scheme={RegistrationSchame}
          onSubmitThunk={registerThunk}
        />
      )}
    </div>
  );
};
export default AuthPage;

// import { useParams } from 'react-router-dom';
// import LoginForm from '../../components/LoginForm/LoginForm';
// import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

// export const AuthPage = () => {
//   const { type } = useParams();
//   console.log(type);
//   return <div>{type === 'login' ? <LoginForm /> : <RegistrationForm />}</div>;
// };
// export default AuthPage;
