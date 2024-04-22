interface Props {
  onClick: () => void;
}

export function CloseButton({ onClick }: Props) {
  return <button type="button" className='icon-button' onClick={onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40" width="22" height="22" stroke="#2e414f" fill="##2e414f" x="0px" y="0px">
      <g><path d="M17.41,16l8.29-8.29a1,1,0,0,0-1.41-1.41L16,14.59,7.71,6.29A1,1,0,0,0,6.29,7.71L14.59,16,6.29,24.29a1,1,0,1,0,1.41,1.41L16,17.41l8.29,8.29a1,1,0,0,0,1.41-1.41Z" /></g></svg>
  </button>
}
