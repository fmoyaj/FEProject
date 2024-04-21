interface Props {
  placeholder?: string;
  query: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export default function SearchBar({ query, onChange, placeholder, onSubmit }: Props) {
  return <div className='search-bar flex-row'>
    <input type='text' id='search-bar' value={query} onChange={onChange} placeholder={placeholder} autoComplete='off' />
    <button type='button' className='primary-button' onClick={onSubmit}>Search</button>
  </div>
}
