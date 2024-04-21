import { useState } from "react";

export function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  function close() {
    setIsOpen(false);
  }

  function open() {
    setIsOpen(true);
  }

  return { isOpen, toggleOpen, close, open };
}
