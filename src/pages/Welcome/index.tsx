import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from 'components/atoms/Button';
import Heading from 'components/atoms/Heading';
import Input from 'components/atoms/Input';
import Text from 'components/atoms/Text';
import Container from 'components/organisms/Container';
import { ROUTES } from 'utils/constants';

type FormTypes = {
  code: string;
};

const Welcome: React.FC = () => {
  //* Hooks
  const navigate = useNavigate();

  //* React hook form
  const method = useForm<FormTypes>({
    defaultValues: {
      code: '',
    },
  });

  //* Functions
  const handleLogin = () => {
    navigate(`/${ROUTES.LOGIN}`);
  };

  const handleRegister = () => {
    navigate(`/${ROUTES.REGISTER}`);
  };

  const handleFormSubmit = (data: FormTypes) => {
    console.log(data);
  };

  return (
    <Container>
      <div className="p-welcome">
        <div className="p-welcome_content">
          <div className="p-welcome_title">
            <Heading
              modifiers={['32x42', 'eerieBlack', 'center', '700']}
              content="Welcome to Realtime Collaborative Code"
            />
          </div>
          <div className="p-welcome_description u-mt-16">
            <Text
              modifiers={['16x24', 'stormcloud', 'center', '500']}
              content="You can enter room code to join a collaborative code room immediately."
            />
          </div>
          <div className="p-welcome_form u-mt-24">
            <FormProvider {...method}>
              <form
                noValidate
              >
                <div className="p-welcome_form_code">
                  <Controller
                    name="code"
                    rules={{
                      required: 'Room code is required'
                    }}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        label="Room code"
                        placeholder="Enter room code"
                        id="room-code"
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                </div>
                <div className="p-welcome_form_submit u-mt-24">
                  <Button
                    modifiers={['primary', 'lg']}
                    type="submit"
                    loading={false}
                    onClick={method.handleSubmit(handleFormSubmit)}
                  >
                    <Text modifiers={['16x24', '600', 'white', 'center']} content="Join" />
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
          <div className="p-welcome_auth_description u-mt-24">
            <div className="p-welcome_auth_divider" />
            <div className="p-welcome_auth_or">
              <Text
                modifiers={['16x24', 'stormcloud', 'center', '500']}
                content="OR"
              />
            </div>
            <div className="p-welcome_auth_divider" />
          </div>
          <div className="p-welcome_auth_description u-mt-24">
            <Text
              modifiers={['16x24', 'stormcloud', 'center', '500']}
              content="Join with account to access more features."
            />
          </div>
          <div className="p-welcome_auth_btns u-mt-24">
            <div className="p-welcome_auth_btn">
              <Button
                modifiers={['outlineGreen', 'lg']}
                type="button"
                onClick={handleRegister}
              >
                <Text modifiers={['16x24', '600', 'crayola', 'center']} content="Register" />
              </Button>
            </div>
            <div className="p-welcome_auth_btn">
              <Button
                modifiers={['outlineGreen', 'lg']}
                type="button"
                onClick={handleLogin}
              >
                <Text modifiers={['16x24', '600', 'crayola', 'center']} content="Login" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Welcome;
