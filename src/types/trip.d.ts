/*
 * Address type representing a structured address information.
 */
type Address = {
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  lng: number;
  lat: number;
};

/*
 * TripRequestParams type representing parameters for a trip request.
 */
type TripRequestParams = {
  horses: string[];
  name: string;
  tripType: string;
  pickUpDate: string;
  lastPickUpDate: string;
  pickUp: Address;
  dropOff?: Address;
  returnDate?: string;
  lastReturnDate: string;
  returnPickUp?: Address;
  returnDropOff?: Address;
  fullAddressRound: string;
  fullDropOffAddressRound: string;
  trailer: string;
  notes: string;
  fullAddress?: string;
  fullDropOffAddress?: string;
  horseList?: [{horseName?: ''}];
  trailerList?: [{trailerName?: ''}];
};

/*
 * AddressObjType representing a detailed address object.
 */
type AddressObjType = {
  fullAddress: string;
  state: string;
  city: string;
  landmark: string;
  addressLine1: string;
  addressLine2: string;
  pinCode: string;
  latitude: number;
  longitude: number;
};

type CreateTripRequest = {
  tripId?: string;
  horses: string[];
  name: string;
  tripType: string;
  pickUpDate: string;
  lastPickUpDate: string;
  pickUp: Address;
  dropOff?: Address;
  returnDate?: string;
  lastReturnDate?: string;
  returnPickUp?: Address;
  returnDropOff?: Address;
  trailer: string[];
  notes: string;
  isFlexiblePickUpDate: boolean;
  isFlexibleReturnDate?: boolean;
};

type TripListRequestType = {
  status?: string;
  search?: string;
};

type TripListResponseType = {
  tripList: TripItem[];
  totalRecords: number;
};

type TripItem = {
  _id: string;
  tripType: string;
  pickUpDate: Date;
  lastPickUpDate: Date;
  pickUp: Location;
  dropOff: Location;
  returnPickUp: Location;
  returnDropOff: Location;
  returnDate: Date;
  lastReturnDate: Date;
  status: string;
  name: string;
  isFlexiblePickUpDate: boolean;
  isFlexibleReturnDate: boolean;
  roundTripCount: number;
};

type Location = {
  city: string;
  address: string;
  state: string;
  lat: number;
  lng: number;
  country: string;
  pincode: string;
};

type TripDetailRequestType = {
  _id: string;
};

/** The current status of the entity. */
type StatusHistory = {
  status: string;
  location: Location;
  timeStamp: Date;
};

type TripDetailResponseType = {
  _id: string;
  horses: Horse[];
  incident: null;
  pickUpDate: Date;
  statusHistory?: StatusHistory[];
  companyOwnerName: null;
  lastPickUpDate: Date;
  pickUp: Location;
  dropOff: Location;
  notes: string;
  name: string;
  status: string;
  returnDate: Date;
  lastReturnDate: Date;
  tripType: string;
  returnPickUp: Location;
  returnDropOff: Location;
  trailer: string[];
  transportCompany: null;
  tcPhoneNo: null;
  tcEmail: null;
  driverName: null;
  myReview: MyReview;
  amount: null;
  averageReview: number;
  isFlexiblePickUpDate: boolean;
  isFlexibleReturnDate: boolean | null;
  roundTripCount: number;
  chatRoom: string;
};

type Horse = {
  horseName: string;
  _id: string;
};

/**
 * Represents a review with a rating and review text.
 */
type MyReview = {
  rating: string;
  review: string;
};

type TripCancelRequestType = {
  _id: string;
};

type TripTabOptions = {
  key: string;
  title: string;
  tripTitle: string;
  value: string;
};
type Quotation = {
  _id: string | null;
  company: string | null;
  cost: number | null;
  ratings: number;
  status: string | null;
  yearsInBusiness: number | null;
};

/* The `TripDetailsResponse` interface is defining the structure of an object that represents details
of a trip. It includes the following properties: */
type TripDetailsResponse = {
  _id: string;
  dropOff: Address;
  horses: string[];
  name: string;
  notes: string;
  pickUp: Address;
  pickUpDate: string;
  quotations: Quotation[];
  returnDate: string | null;
  lastReturnDate: string | null;
  returnDropOff: Address | null;
  returnPickUp: Address | null;
  totalHorses: number;
  trailer: string[];
  tripType: string;
  isFlexiblePickUpDate: boolean;
  isFlexibleReturnDate: boolean;
  lastPickUpDate: string;
};

/**
 * Represents the request payload for creating feedback.
 *
 * @typedef {Object} CreateFeedbackRequest
 * @property {string} review - The text of the review provided by the user. This contains the user's feedback or comments about the trip.
 * @property {number} rating - The rating given by the user. This is a numeric value representing the user's rating of the trip.
 * @property {string} tripId - The unique identifier of the trip for which the feedback is being provided. This links the feedback to a specific trip.
 */
type CreateFeedbackRequest = {
  review: string;
  rating: number;
  tripId: string;
};

type SocketTripData = {
  destination: SocketCoords;
  driverLocation: SocketCoords;
  trip: TripDetailResponseType;
};

type SocketCoords = {
  lat: string;
  lng: string;
};
