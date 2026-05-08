import {RenderResult} from '@testing-library/react-native';

import {AppScreens, ForgotPasswordTestKeys} from '~/constants';
import {ForgotPasswordScreen} from '~/screens';

import {renderWithProviders} from '../utils/TestUtils';

describe('Forgot Password Screen Test Suit', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    wrapper = renderWithProviders([
      {name: AppScreens.ForgotPasswordScreen, screen: ForgotPasswordScreen},
    ]);
  });

  it('FORGOT_PASSWORD_SCREEN Render', () => {
    expect(
      wrapper.queryByTestId(ForgotPasswordTestKeys.FORGOT_PASSWORD_SCREEN),
    ).toBeTruthy();
  });

  it('EMAIL input field Render', () => {
    expect(wrapper.queryByTestId(ForgotPasswordTestKeys.EMAIL)).toBeTruthy();
  });

  it('FORGOT_PASSWORD_BUTTON Render', () => {
    expect(wrapper.queryByTestId(ForgotPasswordTestKeys.CONTINUE)).toBeTruthy();
  });
});
