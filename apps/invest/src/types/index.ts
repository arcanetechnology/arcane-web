/** @format */

export type InvestorType =
  | 'PROFESSIONAL'
  | 'ELECTIVE_PROFESSIONAL'
  | 'NON_PROFESSIONAL';

export interface PhoneNumber {
  countryCode: string;
  nationalNumber: string;
}

export interface FundInfoOptional {
  company: string;
  name: string;
  phoneNumber: PhoneNumber;
  // cca3 code enum, update it later
  countryCode: string;
  fundName: string;
}

export interface FundInfo extends Partial<FundInfoOptional> {
  investorType: InvestorType;
}
