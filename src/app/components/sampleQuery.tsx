
interface Props {
  title: string;
  description: string;
  value: string;
  onClick: (query: string) => void;
}

export function SampleQuery({ title, description, value, onClick }: Props) {
  return <button type='button' onClick={() => onClick(value)} className='sample-query'>
    <div className='query-title'>{title}</div>
    <div className='query-description'>
      {description}
    </div>
  </button>
}
