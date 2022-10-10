

# TODO
- [] Transaction Template CRUD
- [] Transaction CRUD
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
Fundin(Account) => [CustodyOperation, AccountOperation, VirtualOperation]


## Algorithms

1 - getOperations - gets operations from the field values
2 - getCustodyOperations - get operations from the custody acc from the field values
3 - // optional pruneOperations - removes duplicate custody accounts.