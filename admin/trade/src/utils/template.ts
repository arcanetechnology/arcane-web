/** @format */

export class StakeholderFiatAccount {
  readonly _tag = 'StakeholderFiat';
  constructor(readonly amount: number, readonly id: string) {}
}

export class StakeholderCryptoAccount {
  readonly _tag = 'StakeholderCrypto';
  constructor(readonly amount: number, readonly id: string) {}
}
