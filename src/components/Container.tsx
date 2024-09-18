import { ContainerType } from "../lib/types";

export default function Container({ children }: ContainerType) {
  return <div className="container">{children}</div>;
}
