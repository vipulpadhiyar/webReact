export enum TripStatusAll {
  //Created
  UPCOMING = 'upcoming',
  CANCEL = 'cancel',

  //Commission Done
  CONFIRM = 'confirm',

  //ONGOING
  PICKUP = 'pickup',
  IN_TRANSIT = 'inTransit',
  ARRIVED = 'arrived',
  DROP_OFF = 'dropOff',

  COMPLETED = 'completed',
  INITIAL_COMPLETE = 'initial complete',

  HALT = 'halt',
  ONGOING = 'ongoing',
}

export enum TripType {
  ONE_WAY = 'oneWay',
  ROUNDTRIP = 'roundTrip',
}
