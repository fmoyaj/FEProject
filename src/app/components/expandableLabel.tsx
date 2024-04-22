import { CSSProperties, LegacyRef } from "react";

interface Props {
  label: {
    open: string;
    closed: string;
    isEnd?: boolean;
    className?: string;
  }
  isOpen: boolean;
  toggleOpen: () => void;
  indicator: (style: CSSProperties) => React.ReactNode;
  buttonClassName?: string;
  indicatorRotationDegrees?: 90 | 180;
  ref?: LegacyRef<HTMLButtonElement>
}

export function ExpandableLabel(
  { label: { open, closed, isEnd = false },
    isOpen,
    toggleOpen,
    indicator,
    indicatorRotationDegrees = 180,
    buttonClassName = 'text-button',
    ref }: Props) {
  const indicatorStyle = {
    transform: isOpen ? `rotate(${indicatorRotationDegrees}deg)` : '',
    transition: 'transform 150ms ease',
  };
  const labelElem = <span>{isOpen ? open : closed}</span>;
  const indicatorElem = indicator(indicatorStyle);

  return <button type="button" className={buttonClassName} onClick={toggleOpen} ref={ref}>
    {
      !isEnd && labelElem
    }
    {
      indicatorElem
    }
    {
      isEnd && labelElem
    }
  </button>;
}
