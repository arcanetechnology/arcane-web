/** @format */

export type InvestorType =
  | 'PROFESSIONAL'
  | 'ELECTIVE_PROFESSIONAL'
  | 'UNQUALIFIED';

export interface PhoneNumber {
  countryCode: string;
  nationalNumber: string;
}

export interface FundInfoOptional {
  company: string;
}

export interface FundInfo extends Partial<FundInfoOptional> {
  investorType: InvestorType;
  name: string;
  phoneNumber: PhoneNumber;
  // cca3 code enum, update it later
  countryCode: string;
  fundName: string;
}
