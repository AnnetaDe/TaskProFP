import { NavLink, useParams } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
import { LoginSchame, RegistrationSchame } from '../../schames/AuthSchames';
import { loginThunk, registerThunk } from '../../redux/user/userOperations';
import css from './AuthPage.module.css';
import DocumentTitle from '../../components/Title/Title';
import { useState } from 'react';

export const AuthPage = () => {
  const { type } = useParams();
  const defaultValues = { email: '', password: '' };
  const testValues = { email: 'danipem600@biscoine.com', password: 'aaAA1111' };

  const [choosenValues, setChoosenValues] = useState(defaultValues);

  const handleCheckboxChange = checked => {
    if (checked) {
      setChoosenValues(testValues);
    } else {
      setChoosenValues(defaultValues);
    }
  };
  return (
    <>
      <DocumentTitle>
        {type === 'login'
          ? 'Log in to your account and start using our service'
          : 'Register and start using our service'}
      </DocumentTitle>

      <div className={css.background}>
        {/* {isLoading && <Loader />} */}
        <div className={css.formWrapper}>
          <ul className={css.authNav}>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? css.authLink
                    : `${css.activeAuthLink} ${css.authLink}`
                }
                to="/auth/register"
              >
                Registration
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? css.authLink
                    : `${css.activeAuthLink} ${css.authLink}`
                }
                to="/auth/login"
              >
                Log in
              </NavLink>
            </li>
          </ul>
          {type === 'login' ? (
            <AuthForm
              loginForm
              key="login"
              scheme={LoginSchame}
              onSubmitThunk={loginThunk}
              handleCheckboxChange={handleCheckboxChange}
              choosenValues={choosenValues}
            />
          ) : (
            <AuthForm
              registerForm
              key="register"
              scheme={RegistrationSchame}
              onSubmitThunk={registerThunk}
              choosenValues={{ email: '', password: '', username: '' }}
              handleCheckboxChange={handleCheckboxChange}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default AuthPage;
