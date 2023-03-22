import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from 'components/atoms/Button';
import Heading from 'components/atoms/Heading';
import Input from 'components/atoms/Input';
import Text from 'components/atoms/Text';
import Container from 'components/organisms/Container';

export type LoginFormTypes = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  //* Hooks
  const navigate = useNavigate();

  //* React hook form
  const method = useForm<LoginFormTypes>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  //* Functions
  const customSubmit = (data: LoginFormTypes) => {
    console.log(data);
  };

  return (
    <Container>
      <div className="p-login">
        <div className="p-login_content">
          <div className="p-login_title">
            <Heading modifiers={['32x42', 'eerieBlack', 'center', '700']} content="Login" />
          </div>
          <div className="p-login_description u-mt-16">
            <Text
              modifiers={['16x24', 'stormcloud', 'center', '500']}
              content="Login to create room and access to many more features."
            />
          </div>
          <div className="p-login_form u-mt-32">
            <FormProvider {...method}>
              <form
                noValidate
              >
                <div className="p-login_form_username">
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
                <div className="p-login_form_password u-mt-24">
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
                <div className="p-login_form_submit u-mt-24">
                  <Button
                    modifiers={['primary', 'lg']}
                    type="button"
                    loading={false}
                    onClick={method.handleSubmit(customSubmit)}
                  >
                    <Text modifiers={['16x24', '600', 'white', 'center']} content="Login" />
                  </Button>
                </div>
              </form>
            </FormProvider>
            <div className="p-login_back_btn u-mt-24">
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

export default Login;
