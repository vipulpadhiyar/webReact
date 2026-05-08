/* most common used regex constant */

export const AppRegex = {
  EMAIL:
    /^[A-Z0-9a-z]+([._%+-][A-Z0-9a-z]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/,
  NUMBER: /^[0-9]+$/gi,
  EMPTY_SPACE: /^\S/,
  NOT_EMPTY_STRING: /^\s*\S.*\S\s*$/,
  NO_NUM_SPECIAL_CHAR: /^[A-Za-z-]+(?: [A-Za-z-]+)*$/,
  HORSE_HEIGHT: /^(1[2-7](\.\d{1,2})?|18(\.0{1,2})?)$/,
  // PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~])[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?~]{8,20}$/,

  // EIGHT_CHAR_PASSWORD_VALIDATION: /^(?!\s{8,})\S{8,}$/,
  // AT_LEAST_ONE_UPPER_CASE: /(?=.*[A-Z])(?!\s+$)\S+/,
  // AT_LEAST_ONE_LOWER_CASE: /(?=.*[a-z])(?!\s+$)\S+/,
  // AT_LEAST_ONE_NUMBER: /(?=.*\d)(?!\s+$)\S+/,
  BIRTH_YEAR: /^(19[\d]{2}|20[0-4][0-9])$/,
  FILE_NAME_WITHOUT_EXT: /([^/]+)(?=\.[^/.]+$)/,
  PASSWORD_REG:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~])[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?~]{8,20}$/,
  STRING_ONLY: /^[A-Za-z-]+(?: [A-Za-z-]+)*$/,
  NO_WHITE_SPACE: /^[^\s].+[^\s]$/,
  // STRING_ONLY:/^[a-zA-Z]+$/,
  EMAIL_ONLY: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
};
