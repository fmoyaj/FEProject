import { HTMLAttributes } from "react";
import { Option } from "../lib/types";
import { useDisclosure } from "../utils/hooks";
import { DownCaretIcon } from "./down-caret";
import { ExpandableLabel } from "./expandableLabel";

interface Props<T> {
  label: string;
  options: Option<T>[];
  onSelect: (option: Option<T>) => void;
  selected: Option<T>;
}

export function Dropdown<T>({ label, options, onSelect, selected }: Props<T>) {
  const { isOpen, toggleOpen, open, close } = useDisclosure();
  return <div className='dropdown' onMouseLeave={close} onMouseEnter={open}>
    <ExpandableLabel
      label={{ open: selected.label, closed: selected.label, isEnd: false }}
      isOpen={isOpen}
      toggleOpen={toggleOpen}
      indicator={(style) => <DownCaretIcon style={style as HTMLAttributes<SVGAElement>} />}
    />
    {
      isOpen &&
      <ul>
        {
          options.map((option) =>
            <li key={option.id} onClick={() => onSelect(option)}>{option.label}</li>)
        }
      </ul>
    }
  </div>
}
