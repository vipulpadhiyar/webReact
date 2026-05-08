type EnvironmentType = {
  secure: SecureType;
  env: string;
  map_api_key: string;
};

type SecureType = {
  base_url: string;
  media_url: string;
  storage_key: string;
  storage_id: string;
  encryption_on: string;
  encryption_password: string;
};
