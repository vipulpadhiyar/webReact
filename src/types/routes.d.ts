/**
 * Represents the parameter list for the initial stack navigator.
 */
type InitialStackParamList = {
  OnboardingScreen: {}; // Parameter for the OnboardingScreen route
};

/**
 * Represents the parameter list for the authentication stack navigator.
 */
type AuthStackParamList = {
  OnboardingScreen: {};
  AuthScreen: {initialTab: InitialAuthTab};
  ForgotPasswordScreen: {}; // Parameter for the   ForgotPasswordScreen route
  TermsAndConditionScreen: {};
  PrivacyPolicyScreen: {};
};

/**
 * Represents the parameter list for the main stack navigator.
 */
type MainStackParamList = {
  MainScreen: {}; // Parameter for the MainScreen route
};
/**
 * Represents the parameter list for the home stack navigator.
 */
type HomeScreenStackParamList = {
  HomeScreen: {}; // Parameter for the MainScreen route
  NotificationScreen: {}; // Parameter for the Notification route
  AddHorseProfileScreen: {
    from?: string;
  };
  ReviewHorseDetailsScreen: {
    horse: AddHorseProfile | EditHorseProfile;
  };
};

type BottomTabStackParamList = {
  HorseProfile: HorseProfileStackParamList;
  Profile: ProfileStackParamList;
  HomeStack: HomeScreenStackParamList;
  Quotes: QuotesStackParamList;
  MyTrips: MyTripsStackParamList;
};

type QuotesStackParamList = {
  QuotesScreen: {};
  QuetosDetailsScreen: {id: string};
  EditTripDetails: {id: string};
  AddHorseProfileScreen: {
    from?: string;
  };
  ReviewHorseDetailsScreen: {
    horse: AddHorseProfile | EditHorseProfile;
  };
};

type MyTripsStackParamList = {
  MyTripsScreen: {};
  MyTripDetailScreen: {
    trip: TripDetailResponseType;
  };
  TripStatusScreen: {
    trip: TripDetailResponseType;
  };
  ReviewScreen: {
    id: string;
  };
};
type HorseProfileScreen = {
  horse: HorseProfile;
};
type HorseProfileStackParamList = {
  HorseProfileScreen: HorseProfileScreen;
  AddHorseProfileScreen: {
    from?: string;
  };
  ReviewHorseDetailsScreen: {
    horse: AddHorseProfile | EditHorseProfile;
  };
  EditHorseProfileScreen: {
    horse: AddHorseProfile | EditHorseProfile;
  };
  HorseProfileDetailsScreen: {
    horse: HorseProfile;
  };
};

type ProfileStackParamList = {
  ProfileScreen: {};
  ChangePasswordScreen: {};
  TermsAndConditionScreen: {};
  PrivacyPolicyScreen: {};
  FAQScreen: {};
  EditProfileScreen: {userData: UserProfileResponse | undefined};
  AppPermissionScreen: {};
};
