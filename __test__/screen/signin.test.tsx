import {act} from 'react-test-renderer';
import {fireEvent, RenderResult} from '@testing-library/react-native';

import {AppScreens, SignInTestKeys} from '~/constants';
import {SignInScreen} from '~/screens/Auth/SignInScreen';

import {renderWithProviders} from '../utils/TestUtils';

describe('SignIn Screen Test Suit', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    wrapper = renderWithProviders([
      {name: AppScreens.SignInScreen, screen: SignInScreen},
    ]);
  });

  it('SIGN_IN_SCREEN Render', () => {
    expect(wrapper.queryByTestId(SignInTestKeys.SIGN_IN_SCREEN)).toBeTruthy();
  });

  describe('All input fields are rendered', () => {
    it('EMAIL input field Render', () => {
      expect(wrapper.queryByTestId(SignInTestKeys.EMAIL)).toBeTruthy();
    });

    it('PASSWORD input field Render', () => {
      expect(wrapper.queryByTestId(SignInTestKeys.PASSWORD)).toBeTruthy();
    });
  });

  describe('All input fields are interactive', () => {
    it('EMAIL input field Interaction', () => {
      const emailInput = wrapper.queryByTestId(SignInTestKeys.EMAIL);
      expect(emailInput?.props.value).toBe('');
      expect(emailInput?.props.onChangeText).toBeTruthy();
    });

    it('PASSWORD input field Interaction', () => {
      const passwordInput = wrapper.queryByTestId(SignInTestKeys.PASSWORD);
      expect(passwordInput?.props.value).toBe('');
      expect(passwordInput?.props.onChangeText).toBeTruthy();
    });
  });

  describe('Sign In button is rendered', () => {
    it('SIGN_IN button Render', () => {
      expect(wrapper.queryByTestId(SignInTestKeys.SIGN_IN)).toBeTruthy();
    });
  });

  describe('Check Email and Password validation', () => {
    it('Form Without Edit Error', async () => {
      const btnSignin = wrapper.getByTestId(SignInTestKeys.SIGN_IN);

      // Sign In button press
      await act(() => {
        return fireEvent.press(btnSignin);
      });

      expect(
        wrapper.getByTestId(SignInTestKeys.INPUT_EMAIL_ERROR),
      ).toBeTruthy();

      expect(
        wrapper.getByTestId(SignInTestKeys.INPUT_PASSWORD_ERROR),
      ).toBeTruthy();
    });

    it('Form After Invalid Input', async () => {
      const inputEmail = wrapper.getByTestId(SignInTestKeys.EMAIL);
      const inputPassword = wrapper.getByTestId(SignInTestKeys.PASSWORD);
      const btnSignin = wrapper.getByTestId(SignInTestKeys.SIGN_IN);

      // Sign In button press)
      await act(() => {
        fireEvent.changeText(inputEmail, 'abc');
        fireEvent.changeText(inputPassword, '123');
        fireEvent.press(btnSignin);
      });

      expect(
        wrapper.queryByTestId(SignInTestKeys.INPUT_EMAIL_ERROR),
      ).toBeTruthy();
      expect(
        wrapper.queryByTestId(SignInTestKeys.INPUT_PASSWORD_ERROR),
      ).toBeTruthy();
    });
  });
});
