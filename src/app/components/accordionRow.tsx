import Image from "next/image";
import { PropsWithChildren } from "react";
import { useDisclosure } from '../utils/hooks';
import { ExpandableLabel } from "./expandableLabel";

interface Props {
  label: string;
}

export function AccordionRow({ label, children }: PropsWithChildren<Props>) {
  const { isOpen, toggleOpen } = useDisclosure();

  const button = <ExpandableLabel
    label={{ open: label, closed: label, isEnd: true, className: 'info-row.label' }}
    isOpen={isOpen} toggleOpen={toggleOpen}
    indicator={(style) => <Image src='/caret-right.svg' alt='caret' width={16} height={16} style={style} />}
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
