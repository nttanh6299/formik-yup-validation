import React from 'react';
import { Formik, Field, Form, useField, FieldArray } from 'formik';
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import * as yup from 'yup';

const MyRadio = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel label={label} {...field} control={<Radio />} />;
};

const MyTextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...field}
      helperText={errorText}
      placeholder={placeholder}
      error={!!errorText}
    />
  );
};

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required()
    .max(10),
  pets: yup.array().of(
    yup.object({
      name: yup.string().required()
    })
  )
});

const App = () => {
  return (
    <div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          isTall: false,
          cookies: [],
          yogurt: '',
          pets: [{ id: Math.random(), type: 'cat', name: 'jarvis' }]
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          setTimeout(() => {
            console.log(data);
            setSubmitting(false);
            resetForm();
          }, 2000);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <div>
              <MyTextField placeholder="First name" name="firstName" />
            </div>
            <div>
              <Field
                placeholder="Last name"
                name="lastName"
                type="input"
                as={TextField}
              />
            </div>
            <div>
              <Field name="isTall" type="checkbox" as={Checkbox} />
              Are you tall ?
            </div>
            <div>
              <p>Cookies: </p>
              <Field
                name="cookies"
                type="checkbox"
                value="chocolate chip"
                as={Checkbox}
              />
              <Field
                name="cookies"
                type="checkbox"
                value="snicker doodle"
                as={Checkbox}
              />
              <Field
                name="cookies"
                type="checkbox"
                value="sugar"
                as={Checkbox}
              />
            </div>
            <div>
              <p>Yogurt:</p>
              <MyRadio
                name="yogurt"
                type="radio"
                value="blueberry"
                label="blueberry"
              />
              <MyRadio name="yogurt" type="radio" value="apple" label="apple" />
              <MyRadio name="yogurt" type="radio" value="milk" label="milk" />
            </div>
            <div>
              <FieldArray name="pets">
                {arrayHelpers => (
                  <div>
                    <Button
                      onClick={() =>
                        arrayHelpers.push({
                          id: Math.random(),
                          type: 'cat',
                          name: ''
                        })
                      }
                    >
                      Add pet
                    </Button>
                    {values.pets.map((pet, index) => (
                      <div key={pet.id}>
                        <MyTextField
                          placeholder="Pet name"
                          name={`pets[${index}].name`}
                        />
                        <Field
                          name={`pets[${index}].type`}
                          type="select"
                          as={Select}
                        >
                          <MenuItem value="cat">Cat</MenuItem>
                          <MenuItem value="dog">Dog</MenuItem>
                          <MenuItem value="frog">Frog</MenuItem>
                        </Field>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>
            </div>
            <div>
              <Button disabled={isSubmitting} type="submit">
                Submit
              </Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
