import { HeaderType } from "../lib/types";

export default function Header({ children }: HeaderType) {
  return <header className="header">{children}</header>;
}

export function HeaderTop({ children }: HeaderType) {
  return <div className="header__top">{children}</div>;
}
