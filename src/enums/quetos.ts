export enum QuetosENUM {
  PENDING_QUETOS = 'Pending Quote',
  QUETOS_RECEIVED = 'Quotes Received',
  DECLINE_QUETOS = 'Decline Quotes',
}

/* This code snippet is defining an enum named `QuetosTypeEnum` with two members: `ONE_WAY` and
`ROUND_TRIP`. Each member is assigned a string value - `'oneWay'` for `ONE_WAY` and `'Round Trip'`
for `ROUND_TRIP`. Enums in TypeScript allow you to define a set of named constants, making it easier
to work with a fixed set of values. In this case, `QuetosTypeEnum` is defining types for different
types of quotes - one-way and round trip. */
export enum QuetosTypeEnum {
  ONE_WAY = 'oneWay',
  ROUND_TRIP = 'Round Trip',
}

/* The code snippet is defining an enum named `QuotationStatus` with a single member `ACCEPTED`, which
is assigned the string value `'accepted'`. This enum is used to represent the status of a quotation
being accepted. By exporting this enum, it makes the `QuotationStatus` enum available for use in
other parts of the codebase or in other files that import it. */
export enum QuotationStatus {
  ACCEPTED = 'accepted',
  REJECTED = 'reject',
}
