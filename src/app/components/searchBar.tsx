import { Loader } from "./loader";

interface Props {
  placeholder?: string;
  query: string;
  isSearchPending: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export default function SearchBar({ query, onChange, placeholder, onSubmit, isSearchPending }: Props) {
  return <div className='search-bar flex-row'>
    <input type='text' id='search-bar' value={query} onChange={onChange} placeholder={placeholder} autoComplete='off' />
    {
      isSearchPending &&
      <Loader />
    }
    <button type='button' className='primary-button' onClick={onSubmit}>Search</button>
  </div>
}
