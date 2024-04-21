

interface Props {
  label: string;
  info: string;
}

export function MainInfoRow({ label, info }: Props) {
  return <tr className='info-row'>
    <td className='label'>{label}</td>
    <td className='info'>{info}</td>
  </tr>
}
