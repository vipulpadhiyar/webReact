import {act} from 'react-test-renderer';
import {fireEvent, RenderResult} from '@testing-library/react-native';

import {AppScreens, SignUpTestKeys} from '~/constants';
import {SignUpScreen} from '~/screens/Auth/SignUpScreen';

import {renderWithProviders} from '../utils/TestUtils';

describe('Create Account Screen Test Suit', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    wrapper = renderWithProviders([
      {name: AppScreens.SignUpScreen, screen: SignUpScreen},
    ]);
  });

  it('Create Account Render', () => {
    expect(
      wrapper.queryByTestId(SignUpTestKeys.CREATE_ACCOUNT_SCREEN),
    ).toBeTruthy();
  });

  describe('All input fields are rendered', () => {
    it('First name input field Render', () => {
      expect(wrapper.queryByTestId(SignUpTestKeys.FIRST_NAME)).toBeTruthy();
    });
    it('Last name input field Render', () => {
      expect(wrapper.queryByTestId(SignUpTestKeys.LAST_NAME)).toBeTruthy();
    });
    it('Email input field Render', () => {
      expect(wrapper.queryByTestId(SignUpTestKeys.EMAIL)).toBeTruthy();
    });

    it('Password input field Render', () => {
      expect(wrapper.queryByTestId(SignUpTestKeys.PASSWORD)).toBeTruthy();
    });
    it('Confirm Password input field Render', () => {
      expect(
        wrapper.queryByTestId(SignUpTestKeys.CONFIRM_PASSWORD),
      ).toBeTruthy();
    });
  });

  describe('All input fields are interactive', () => {
    it('Email input field Interaction', () => {
      const emailInput = wrapper.queryByTestId(SignUpTestKeys.EMAIL);
      expect(emailInput?.props.value).toBe('');
      expect(emailInput?.props.onChangeText).toBeTruthy();
    });

    it('Password input field Interaction', () => {
      const passwordInput = wrapper.queryByTestId(SignUpTestKeys.PASSWORD);
      expect(passwordInput?.props.value).toBe('');
      expect(passwordInput?.props.onChangeText).toBeTruthy();
    });
  });

  describe('Check Email and Password validation', () => {
    it('Email input field validation in button click', async () => {
      const btnCreateAccount = wrapper.getByTestId(
        SignUpTestKeys.CREATE_ACCOUNT,
      );

      // Create Account button press
      await act(() => {
        return fireEvent.press(btnCreateAccount);
      });

      expect(
        wrapper.getByTestId(SignUpTestKeys.INPUT_EMAIL_ERROR),
      ).toBeTruthy();

      expect(
        wrapper.getByTestId(SignUpTestKeys.INPUT_PASSWORD_ERROR),
      ).toBeTruthy();

      expect(
        wrapper.queryByTestId(SignUpTestKeys.INPUT_EMAIL_ERROR),
      ).toBeTruthy();
    });
  });

  describe('Create button is rendered', () => {
    it('SIGN_IN button Render', () => {
      expect(wrapper.queryByTestId(SignUpTestKeys.CREATE_ACCOUNT)).toBeTruthy();
    });
  });
});
