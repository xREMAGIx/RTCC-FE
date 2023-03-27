import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import Button from 'components/atoms/Button';
import Heading from 'components/atoms/Heading';
import Input from 'components/atoms/Input';
import Text from 'components/atoms/Text';
import Container from 'components/organisms/Container';
import { registerUserService } from 'services/user';
import { TOAST_ERROR_MESSAGE, TOAST_SUCCESS_MESSAGE } from 'utils/constants';
import { userKeys } from 'utils/queryKeys';

type RegisterFormTypes = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export const schema = yup.object({
  email: yup.string().email().required('Email is required'),
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password'), ''], 'Password and confirm password not match!'),

});

const Register: React.FC = () => {
  //* Hooks
  const navigate = useNavigate();

  //* React hook form
  const method = useForm<RegisterFormTypes>({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  //* React-query
  const {
    mutate: registerMutate,
    isLoading: registerLoading,
  } = useMutation(
    userKeys.register(),
    registerUserService,
    {
      onSuccess: () => {
        method.reset();
        toast.success(TOAST_SUCCESS_MESSAGE.REGISTER);
      },
      onError: () => {
        toast.error(TOAST_ERROR_MESSAGE.INVALID);
      },
    }
  );

  //* Functions
  const customSubmit = (data: RegisterFormTypes) => {
    const { username, email, password } = data;
    registerMutate({ username, email, password });
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
                <div className="p-register_form_confirm_password u-mt-16">
                  <Controller
                    name="confirmPassword"
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        id="confirm-password"
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
                    loading={registerLoading}
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
