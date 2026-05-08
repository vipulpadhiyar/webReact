type HorseProfile = {
  _id: string;
  name: string;
  barnName: string;
  birthYear: number;
  breed: string;
  gender: string;
  color: string;
  height: number;
  note: string;
  images: string[];
};

type HorseListRequestType = {
  page: number;
  limit: number;
  search: string;
  sortOrder: string;
  sortBy: string;
};

type DataHorse = {
  listHorse: HorseProfile[];
  total_records: number;
};

type HorseListResponseType = {
  listHorse: HorseProfile[];
  total_records: number;
};
/**
 * Response type for HorseListTripResponseType
 */
type HorseListTripResponseType = {
  horses: HorseProfileTrip[];
  total_records: number;
};

type HorseListPaginateType = PaginationData<HorseProfile[]>;

type AddHorseProfile = {
  _id?: string;
  name: string;
  barnName: string;
  birthYear: string;
  breed: string;
  gender: string;
  color: string;
  height: number | string;
  note: string;
  images: FileType[];
};

type AddHorseRequest = {
  name: string;
  barnName: string;
  birthYear: number;
  breed: string;
  gender: string;
  color: string;
  height: number;
  note: string;
  images: string[];
};

type AddHorseResponse = {
  message: string;
  statusCode: number;
  data: HorseProfile;
};

type EditHorseProfile = {
  _id: string;
  name: string;
  barnName: string;
  birthYear: string;
  breed: string;
  gender: string;
  color: string;
  height: number | string;
  note: string;
  images: string[] | FileType[];
};

type EditHorseRequest = {
  _id: string;
  name: string;
  barnName: string;
  birthYear: number;
  breed: string;
  gender: string;
  color: string;
  height: number;
  note: string;
  images: string[];
};

type EditHorseResponse = {
  message: string;
  statusCode: number;
  data: HorseProfile;
};

type DeleteHorseRequest = {
  _id: string;
};

type DeleteHorseResponse = {
  message: string;
  statusCode: number;
};
/**
 * The type `HorseListTripRequestType` represents a request for a horse trip with specified dates and
 * trip details.
 * @property {string | undefined} pickUpDate - The `pickUpDate` property in the
 * `HorseListTripRequestType` type represents the date when the trip is scheduled to pick up the
 * horses. It is a string type that can be either a valid date string or `undefined`.
 * @property {string | undefined} lastPickUpDate - The `lastPickUpDate` property in the
 * `HorseListTripRequestType` type represents the date of the last pick-up for a trip involving a list
 * of horses. This date is optional and can be either a string or undefined.
 * @property {string | undefined} returnDate - The `returnDate` property in the
 * `HorseListTripRequestType` type represents the date when the trip is scheduled to return. It is an
 * optional property indicated by the `?` symbol, meaning it may or may not be present in the object of
 * this type. The value of `
 * @property {string | undefined} lastReturnDate - The `lastReturnDate` property in the
 * `HorseListTripRequestType` type represents the last possible return date for a trip. It is an
 * optional property, indicated by the `?` symbol, which means it may or may not be present in an
 * object of type `HorseList
 * @property {string} tripType - The `tripType` property in the `HorseListTripRequestType` type
 * represents the type of trip being requested, such as "one-way" or "round-trip". It is a required
 * property in the type definition.
 * @property {string} tripId - The `tripId` property in the `HorseListTripRequestType` type represents
 * the unique identifier for a trip. It is optional, meaning it may or may not be provided when
 * creating a trip request.
 */
type HorseListTripRequestType = {
  pickUpDate: string | undefined;
  lastPickUpDate: string | undefined;
  returnDate?: string | undefined;
  lastReturnDate?: string | undefined;
  tripType: string;
  tripId?: string;
};

/**
 * The type `HorseProfileTrip` defines the structure of an object representing a horse profile trip
 * with properties `_id` and `name`.
 * @property {string} _id - The `_id` property in the `HorseProfileTrip` type represents a unique
 * identifier for a horse profile trip. It is typically a string value used to uniquely identify a
 * specific trip for a horse profile.
 * @property {string} name - The `name` property in the `HorseProfileTrip` type represents the name of
 * a horse.
 */
type HorseProfileTrip = {
  _id: string;
  name: string;
};
