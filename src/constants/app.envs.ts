import Keys from 'react-native-keys';

export const AppEnvironment: EnvironmentType = {
  secure: {
    base_url: Keys.secureFor('base_url'),
    media_url: Keys.secureFor('media_url'),
    storage_id: Keys.secureFor('storage_id'),
    storage_key: Keys.secureFor('storage_key'),
    encryption_password: Keys.secureFor('encryption_password'),
    encryption_on: Keys.secureFor('encryption_on'),
  },
  env: Keys.env,
  map_api_key: Keys.map_api_key,
};
