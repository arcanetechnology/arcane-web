

# TODO
- [] ability to update profile on profile view page
- [] fix the token refresh problem
- [] custodies for crypto accounts


# Transaction Templates

## Domain
- Account = StakeholderFiatAccount | StakeholderCryptoAccount
- CustodyAcount
- VirtualAccount

## Compound
- AnyAccount = Account | CustodyAccount | VirtualAccount

## operation
- Operation = {account: AnyAccount, amount: number}

-----------------
Fundin(Account) => [CustodyAccount, VirtualAccount, Account]
Fundout(Account) => [CustodyAccount, VirtualAccount, Account]
FX(Account1, Account2, Fee) => [CustodyAccount1, CustodyAccount2, CustodyAccount3, VirtualAccount1, VirtualAccount2, VirtualAccount3, Account1, Account2, Fee]

