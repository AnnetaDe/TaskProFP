import { ErrorMessage, Formik } from "formik"
import { Form } from "react-router-dom";

import s from './ModalBoard.module.css';


const BoardModal = () => {
  const initialValues = {
    name: '',
  };
  return (
    <>
       <h2 className={s.title}>New board</h2>
      <Formik
        initialValues={initialValues}
      >
        <Form className={s.form}>
          <label className={s.label} htmlFor="name">
            <input
              className={s.input}
              type="text"
              name="name"
              placeholder="Title"
              minLength="4"
              maxLength="12"
            />
            <ErrorMessage
              name="name" 
              component="div"
              style={{
                color: 'red',
                fontSize: 14,
              }}
            />
          </label>
        </Form>
      </Formik>
    </>
  )
}

export default BoardModal
