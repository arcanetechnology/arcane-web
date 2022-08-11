/** @format */

import { Input } from '@arcane-web/alchemy-solid';
import { Setter, VoidComponent } from 'solid-js';

type SearchAccountsProps = {
  onChange: (e: Event) => void;
  onFocus: Setter<boolean>;
  id: string;
  name: string;
};

const SearchAccounts: VoidComponent<SearchAccountsProps> = (props) => {
  return (
    <Input
      style={{
        flex: 1,
      }}
      placeholder="Search accounts"
      id={props.id}
      onFocus={(e) => props.onFocus(true)}
      onInput={(e) => props.onChange(e)}
      name={props.name}
    />
  );
};

export default SearchAccounts;
