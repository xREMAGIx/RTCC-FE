import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from 'components/atoms/Button';
import Heading from 'components/atoms/Heading';
import Input from 'components/atoms/Input';
import Text from 'components/atoms/Text';
import Container from 'components/organisms/Container';
import { EMAIL_REGEX } from 'utils/constants';

type RegisterFormTypes = {
  email: string;
  username: string;
  password: string;
};

const Register: React.FC = () => {
  //* Hooks
  const navigate = useNavigate();

  //* React hook form
  const method = useForm<RegisterFormTypes>({
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  });

  //* Functions
  const customSubmit = (data: RegisterFormTypes) => {
    console.log(data);
  };

  return (
    <Container>
      <div className="p-register">
        <div className="p-register_content">
          <div className="p-register_title">
            <Heading modifiers={['32x42', 'eerieBlack', 'center', '700']} content="Register" />
          </div>
          <div className="p-register_description u-mt-16">
            <Text
              modifiers={['16x24', 'stormcloud', 'center', '500']}
              content="Register to create room and access to many more features."
            />
          </div>
          <div className="p-register_form u-mt-32">
            <FormProvider {...method}>
              <form
                noValidate
              >
                <div className="p-register_form_email u-mt-24">
                  <Controller
                    name="email"
                    rules={{
                      required: 'Email is required',
                      pattern: {
                        value: new RegExp(EMAIL_REGEX),
                        message: 'Email must have valid format',
                      }
                    }}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        label="Email"
                        placeholder="Email"
                        id="email"
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                </div>
                <div className="p-register_form_username u-mt-16">
                  <Controller
                    name="username"
                    rules={{
                      required: 'Username is required'
                    }}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        label="Username"
                        placeholder="Username"
                        id="username"
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                </div>
                <div className="p-register_form_password u-mt-16">
                  <Controller
                    name="password"
                    rules={{
                      required: 'Password is required'
                    }}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        label="Password"
                        placeholder="Password"
                        id="password"
                        type="password"
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                </div>
                <div className="p-register_form_submit u-mt-24">
                  <Button
                    modifiers={['primary', 'lg']}
                    type="submit"
                    loading={false}
                    onClick={method.handleSubmit(customSubmit)}
                  >
                    <Text modifiers={['16x24', '600', 'white', 'center']} content="Register" />
                  </Button>
                </div>
              </form>
            </FormProvider>
            <div className="p-register_back_btn u-mt-24">
              <Button
                modifiers={['outlineGreen', 'lg']}
                type="button"
                onClick={() => { navigate(-1); }}
              >
                <Text modifiers={['16x24', '600', 'crayola', 'center']} content="Go back" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Register;
