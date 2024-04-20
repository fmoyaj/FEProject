interface Props {
    placeholder?: string;
    query: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ query, onChange, placeholder }: Props) {
    return <input type='text' id='search-bar' value={query} onChange={onChange} className="search-bar" placeholder={placeholder} autoComplete='off' />
}