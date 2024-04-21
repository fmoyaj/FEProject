import Image from "next/image";

export function Header() {
  return <div className="header">
    <div className="logo">
      <Image src='/logo.svg' alt="CyprisLite logo" width={100} height={25} />
      <p>lite</p>
    </div>
  </div>
}
