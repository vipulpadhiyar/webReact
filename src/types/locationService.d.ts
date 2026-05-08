/**
 * Prediction type representing the structure of an autocomplete prediction result.
 */
type Prediction = {
  description: string;
  matched_substrings: {length: number; offset: number}[];
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: {length: number; offset: number}[];
    secondary_text: string;
  };
  terms: {
    offset: number;
    value: string;
  }[];
  types: string[];
};

/**
 * AutoCompleteResponseType type representing the structure of an AutoCompleteResponseType result.
 */
type AutoCompleteResponseType = {
  predictions: Prediction[];
  status: string;
  error_message?: string;
};

/**
 * type AddressDetailsResponseType type representing the structure of an AutoCompleteResponseType result.
 */
type AddressDetailsResponseType = {
  result: AddressDetailObj;
  status: string;
  error_message?: string;
};
