import { HTMLAttributes, PropsWithChildren } from "react";
import { useDisclosure } from '../utils/hooks';
import { ExpandableLabel } from "./expandableLabel";
import { RightCaretIcon } from "./rightCaret";

interface Props {
  label: string;
}

export function AccordionRow({ label, children }: PropsWithChildren<Props>) {
  const { isOpen, toggleOpen } = useDisclosure();

  const button = <ExpandableLabel
    label={{ open: label, closed: label, isEnd: true, className: 'info-row.label' }}
    isOpen={isOpen} toggleOpen={toggleOpen}
    indicator={(style) => <RightCaretIcon style={style as HTMLAttributes<SVGAElement>} />}
    buttonClassName='accordion-button'
    indicatorRotationDegrees={90}
  />

  return <div>
    <div>
      {button}
    </div>
    {
      isOpen &&
      <div>
        {children}
      </div>
    }
  </div>
}
