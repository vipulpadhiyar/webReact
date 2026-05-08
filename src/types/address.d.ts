/* The `AddressComponent` type represents a component of an address. */
type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

/* The `CurrentOpeningHours` type represents the current opening hours of a place. */
type CurrentOpeningHours = {
  open_now: boolean;
  periods: Period[];
  weekday_text: string[];
};

/* The `Period` type represents a period during which a place is open or closed. */
type Period = {
  close: Close;
  open: Open;
};

/* The `Close` type represents the closing time of a period. */
type Close = {
  date: string;
  day: number;
  time: string;
  truncated: boolean;
};

/* The `Open` type represents the opening time of a period. */
type Open = {
  date: string;
  day: number;
  time: string;
  truncated: boolean;
};

/* The `Geometry` type represents the geographical information of a place. */
type Geometry = {
  location: GoogleLocation;
  viewport: Viewport;
};

/* The `GoogleLocation` type represents the latitude and longitude of a location. */
type GoogleLocation = {
  lat: number;
  lng: number;
};

/* The `Viewport` type represents the viewport of a location. */
type Viewport = {
  northeast: Northeast;
  southwest: Southwest;
};

/* The `Northeast` type represents the northeast corner of the viewport. */
type Northeast = {
  lat: number;
  lng: number;
};

/* The `Southwest` type represents the southwest corner of the viewport. */
type Southwest = {
  lat: number;
  lng: number;
};

/* The `OpeningHours` type represents the opening hours of a place. */
type OpeningHours = {
  open_now: boolean;
  periods: Period2[];
  weekday_text: string[];
};

/* The `Period2` type represents a period during which a place is open. */
type Period2 = {
  open: Open2;
};

/* The `Open2` type represents the opening time of a period. */
type Open2 = {
  day: number;
  time: string;
};

/* The `Photo` type represents a photo of a place. */
type Photo = {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
};

/* The `PlusCode` type represents a plus code for a place. */
type PlusCode = {
  compound_code: string;
  global_code: string;
};

/* The `Review` type represents a review of a place. */
type Review = {
  author_name: string;
  author_url: string;
  language: string;
  original_language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated: boolean;
};

/* The `GeocodeResponse` type represents a response from a geocoding API. */
type GeocodeResponse = {
  status: string;
  error_message?: string;
  results: {
    address_components: {
      long_name: string;
      types: string[];
    }[];
  }[];
};

/* The `AddressDetailObj` type represents detailed information about an address. */
type AddressDetailObj = {
  address_components: AddressComponent[];
  adr_address: string;
  business_status: string;
  current_opening_hours: CurrentOpeningHours;
  formatted_address: string;
  formatted_phone_number: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  international_phone_number: string;
  name: string;
  opening_hours: OpeningHours;
  photos: Photo[];
  place_id: string;
  plus_code: PlusCode;
  rating: number;
  reference: string;
  reviews: Review[];
  types: string[];
  url: string;
  user_ratings_total: number;
  utc_offset: number;
  vicinity: string;
  website: string;
  wheelchair_accessible_entrance: boolean;
};
