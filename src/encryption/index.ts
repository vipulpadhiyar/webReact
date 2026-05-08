import CryptoJS from 'react-native-crypto-js';

import {AppEnvironment} from '~/constants';
import {log} from '~/utils';

// Password that we used for encryption.
const password = AppEnvironment.secure.encryption_password;
const encryptionOn = AppEnvironment.secure.encryption_on;

/**
 * Function to encrypt the text.
 * @param text - Text.
 * @returns - Encrypted text.
 */
const encrypt = (text: string) => {
  const key = CryptoJS.enc.Utf8.parse(password); // Convert key into WordArray (using Utf8)
  const iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]); // Use zero vector as IV
  const encrypted = CryptoJS.AES.encrypt(text, key, {iv: iv}); // Encrypt using AES with CBC, PKCS7
  return encrypted.toString(); // Convert ciphertext to string
};

/**
 * Function to decrypt the text.
 * @param text - Text.
 * @returns - Decrypted text.
 */
const decrypt = (text: string) => {
  // Base64 encoded ciphertext, 32 bytes string as key
  const key = CryptoJS.enc.Utf8.parse(password); // Convert into WordArray (using Utf8)
  const iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]); // Use zero vector as IV
  const decrypted = CryptoJS.AES.decrypt(text, key, {iv: iv}); // By default: CBC, PKCS7
  return decrypted.toString(CryptoJS.enc.Utf8); // Convert into string (using Utf8)
};

/**
 * This method is used to process the data with decryption if encryption flag is enabled.
 *
 * @param data
 * @returns Data.
 * @exports Function to process the data
 */
export const processDecryption = (data: string) => {
  log('encryptionOn', encryptionOn);
  if (encryptionOn === 'true') {
    // Decrypt data here
    return decrypt(data);
  } else {
    // Return data as it is without decryption
    return data;
  }
};

/**
 * This method is used to encrypt the data if encryption flag is enabled.
 *
 * @param data
 * @returns
 */
export const processEncryption = (data: string) => {
  //@note Please keep this condition for now
  if (encryptionOn === 'true') {
    // Encrypt data here
    return encrypt(data);
  } else {
    // Return data as it is without encryption.
    return data;
  }
};
