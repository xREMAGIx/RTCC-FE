import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from 'components/atoms/Button';
import Heading from 'components/atoms/Heading';
import Input from 'components/atoms/Input';
import Text from 'components/atoms/Text';
import Container from 'components/organisms/Container';
import { setAccessToken } from 'services/common/storage';
import { loginUserService } from 'services/user';
import { ROUTES, TOAST_ERROR_MESSAGE, TOAST_SUCCESS_MESSAGE } from 'utils/constants';
import { userKeys } from 'utils/queryKeys';

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

  //* React-query
  const {
    mutate: loginMutate,
    isLoading: loginLoading,
  } = useMutation(
    userKeys.login(),
    loginUserService,
    {
      onSuccess: (res) => {
        method.reset();
        toast.success(TOAST_SUCCESS_MESSAGE.LOGIN);
        setAccessToken(res.token);
        navigate(`/${ROUTES.HOME}`);
      },
      onError: () => {
        toast.error(TOAST_ERROR_MESSAGE.INVALID);
      },
    }
  );

  //* Functions
  const customSubmit = (data: LoginFormTypes) => {
    loginMutate(data);
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
                <div className="p-login_form_username u-mt-24">
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
                <div className="p-login_form_password u-mt-16">
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
                    type="submit"
                    loading={loginLoading}
                    onClick={method.handleSubmit(customSubmit)}
                  >
                    <Text modifiers={['16x24', '600', 'white', 'center']} content="Login" />
                  </Button>
                </div>
              </form>
            </FormProvider>
            <div className="p-login_back_btn u-mt-24">
              <Button
                modifiers={['outline', 'lg']}
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
