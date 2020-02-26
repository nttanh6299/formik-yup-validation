import React from 'react';
import { Formik, Field, FieldArray, Form, useField } from 'formik';
import * as yup from 'yup';

const initialValues = {
  firstName: '',
  lastName: '',
  sex: 'male',
  knowledge: [],
  friend: [{ id: 1, name: '', sex: 'male' }],
  ok: false
};

const CustomTextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <div>
      <input
        style={{ border: `${errorText ? '1px solid #f00' : ''}` }}
        placeholder={placeholder}
        {...field}
      />
      {errorText ? <div style={{ color: '#f00' }}>{errorText}</div> : null}
    </div>
  );
};

const App1 = () => {
  const onSubmit = (data, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    setTimeout(() => {
      console.log(data);
      setSubmitting(false);
      resetForm();
    }, 2000);
  };
  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required('This field is required')
      .min(6, 'This field min 6 characters')
      .max(10, 'This field max 10 characters'),
    lastName: yup
      .string()
      .required('This field is required')
      .min(6, 'This field min 6 characters')
      .max(10, 'This field max 10 characters'),
    knowledge: yup.array().min(1, 'You must have at least 1 knowlegde'),
    ok: yup.boolean().oneOf([true], 'Must be ok')
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="">Firstname:</label>
            <CustomTextField
              placeholder="First name"
              name="firstName"
              type="input"
            />
          </div>
          <div>
            <label htmlFor="">Lastname:</label>
            <CustomTextField
              placeholder="Last name"
              name="lastName"
              type="input"
            />
          </div>
          <div>
            <div>Sex:</div>
            <div>
              <label>
                <Field type="radio" name="sex" value="male" />
                Male
              </label>
            </div>
            <div>
              <label>
                <Field type="radio" name="sex" value="female" />
                Female
              </label>
            </div>
            <div>
              <label>
                <Field type="radio" name="sex" value="other" />
                Other
              </label>
            </div>
          </div>
          <div>
            Knowledge:
            <div>
              <label>
                <Field name="knowledge" type="checkbox" value="html" />
                HTML
              </label>
            </div>
            <div>
              <label>
                <Field name="knowledge" type="checkbox" value="css" />
                CSS
              </label>
            </div>
            <div>
              <label>
                <Field name="knowledge" type="checkbox" value="js" />
                Javascript
              </label>
            </div>
            <div>
              <label>
                <Field name="knowledge" type="checkbox" value="java" />
                Java
              </label>
            </div>
          </div>
          <div>
            <FieldArray name="friend">
              {arrayHelpers => (
                <div>
                  Friend:
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          id: values.friend.length + 1,
                          name: '',
                          sex: 'male'
                        })
                      }
                    >
                      Add friend
                    </button>
                    <div>
                      {values.friend.map((friend, index) => (
                        <div key={friend.id}>
                          Friend {index + 1}
                          <CustomTextField
                            placeholder="Name"
                            name={`friend.${index}.name`}
                          />
                          <Field name={`friend.${index}.sex`} as="select">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </Field>
                          <button onClick={() => arrayHelpers.remove(index)}>
                            Remove this friend
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </FieldArray>
          </div>
          <br />
          <div>
            <label>
              <Field name="ok" type="checkbox" />
              Are you sure?
            </label>
          </div>
          <div>
            <button disabled={isSubmitting} type="submit">
              Submit
            </button>
          </div>
          <div>{JSON.stringify(values, null, 2)}</div>
          <div>{JSON.stringify(errors, null, 2)}</div>
        </Form>
      )}
    </Formik>
  );
};

export default App1;
