import { HTMLAttributes } from "react"

interface Props {
  style?: HTMLAttributes<SVGAElement>
}

export function DownCaretIcon({ style }: Props) {
  return <svg style={style} xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="#5356B6" x="0px" y="0px" viewBox="2.77 4.77 10.47 6.48"><path alignmentBaseline="baseline" d="M4.53 5.47a.75.75 0 0 0-1.06 1.06l4 4a.75.75 0 0 0 1.054.007l4-3.903a.75.75 0 0 0-1.048-1.073l-3.47 3.385L4.53 5.47Z"></path></svg>
}
