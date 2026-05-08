/**
 * The type `IQuetosListRequest` defines the structure of a request object for fetching a list of
 * quotes with optional search, sorting, pagination parameters.
 */
type IQuetosListRequest = {
  page: number;
  limit: number;
  search?: string;
  sortOrder?: string;
  sortBy?: string;
};
/**
 * The type `IQuetosDetails` defines the structure of an object representing details of a quotation for
 * a trip.
 */
type IQuetosDetails = {
  _id: string;
  name: string;
  pickUpDate: string;
  lastPickUpDate: string;
  returnDate: string;
  totalHorses: number;
  totalQuotations: number;
  tripType: string;
  isFlexiblePickUpDate: boolean;
  isFlexibleReturnDate: boolean;
};
/**
 * The type QuetosListResponse represents a response containing a list of non-quotation trips and the
 * total number of records.
 */
type QuetosListResponse = {
  nonQuotationTrip: IQuetosDetails[];
  totalRecords: number;
};
/**
 * The type `QuetosReceivedResponse` contains an array of `IQuetosDetails` and a total number of
 * records.
 */
type QuetosReceivedResponse = {
  quotationTrip: IQuetosDetails[];
  totalRecords: number;
};
/**
 * The QuetosDeclineResponse type includes an array of IQuetosDetails for halted trips and the total
 * number of records.
 */
type QuetosDeclineResponse = {
  haltTrips: IQuetosDetails[];
  totalRecords: number;
};
/**
 * The type `IQuetosDetailReq` defines a request object with an `_id` property of type string.
 * @property {string} _id - The `_id` property in the `IQuetosDetailReq` type represents a unique
 * identifier for a specific item or entity. It is typically used to uniquely identify and reference a
 * particular record in a database or system.
 */
type IQuetosDetailReq = {
  _id: string;
};
