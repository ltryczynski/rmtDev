import { SidebarType } from "../lib/types";

export default function Sidebar({ children }: SidebarType) {
  return <div className="sidebar">{children}</div>;
}

export function SidebarTop({ children }: SidebarType) {
  return <div className="sidebar__top">{children}</div>;
}
