/**
 * Enum defining the names of all stacks and screens in the app.
 *
 * @exports AppScreens - Enum containing app stack and screen names.
 */
export enum AppScreens {
  // Initial onboarding Stack
  InitialStack = 'InitialStack',
  OnboardingScreen = 'OnboardingScreen',
  SplashScreen = 'SplashScreen',
  WelcomeScreen = 'WelcomeScreen',

  // Auth Stack
  AuthStack = 'AuthStack',
  AuthScreen = 'AuthScreen',
  SignInScreen = 'SignInScreen',
  SignUpScreen = 'SignUpScreen',
  ForgotPasswordScreen = 'ForgotPasswordScreen',

  // Hose Add Stack
  HorseAddStack = 'HorseAddStack',

  // Main Stack
  MainStack = 'MainStack',
  MainScreen = 'MainScreen',

  //Tab
  AppTab = 'AppTab',
  HorseProfile = 'HorseProfile',
  Profile = 'Profile',
  HomeStack = 'HomeStack',
  Quotes = 'Quotes',
  MyTrips = 'MyTrips',

  //Quotes
  QuotesScreen = 'QuotesScreen',
  QuetosDetailsScreen = 'QuetosDetailsScreen',
  EditTripDetails = 'EditTripDetails',

  //MyTrips
  MyTripsScreen = 'MyTripsScreen',
  MyTripDetailScreen = 'MyTripDetailScreen',
  TripStatusScreen = 'TripStatusScreen',
  ReviewScreen = 'ReviewScreen',

  //HorseProfile
  HorseProfileScreen = 'HorseProfileScreen',
  AddHorseProfileScreen = 'AddHorseProfileScreen',
  ReviewHorseDetailsScreen = 'ReviewHorseDetailsScreen',
  EditHorseProfileScreen = 'EditHorseProfileScreen',
  HorseProfileDetailsScreen = 'HorseProfileDetailsScreen',

  //ProfileScreen
  ProfileScreen = 'ProfileScreen',
  ChangePasswordScreen = 'ChangePasswordScreen',
  FAQScreen = 'FAQScreen',
  EditProfileScreen = 'EditProfileScreen',
  AppPermissionScreen = 'AppPermissionScreen',
  TermsAndConditionScreen = 'TermsAndConditionScreen',
  PrivacyPolicyScreen = 'PrivacyPolicyScreen',

  //Home Tab
  HomeScreen = 'HomeScreen',
  NotificationScreen = 'NotificationScreen',
}
