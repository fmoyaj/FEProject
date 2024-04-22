import { HTMLAttributes, useEffect } from "react";
import { Option } from "../lib/types";
import { useDisclosure, useMouseOverElem } from "../utils/hooks";
import { DownCaretIcon } from "./down-caret";
import { ExpandableLabel } from "./expandableLabel";

interface Props<T> {
  options: Option<T>[];
  onSelect: (option: Option<T>) => void;
  selected: Option<T>;
}

export function Dropdown<T>({ options, onSelect, selected }: Props<T>) {
  const { isOpen, toggleOpen, open, close } = useDisclosure();
  const [buttonRef, isOverButton] = useMouseOverElem();
  const [optionsRef, isOverOptions] = useMouseOverElem();

  useEffect(() => {
    if (!isOverButton && !isOverOptions) close();
  }, [isOverButton, isOverOptions, close])

  return <div className='dropdown' onMouseEnter={open} ref={buttonRef}>
    <ExpandableLabel
      label={{ open: selected.label, closed: selected.label, isEnd: false }}
      isOpen={isOpen}
      toggleOpen={toggleOpen}
      indicator={(style) => <DownCaretIcon style={style as HTMLAttributes<SVGAElement>} />}
    />
    {
      isOpen &&
      <ul ref={optionsRef}>
        {
          options.map((option) =>
            <li
              key={option.id}
              className={option.id === selected.id ? 'text-bold' : ''}
              onClick={() => onSelect(option)}>{option.label}
            </li>)
        }
      </ul>
    }
  </div>
}
