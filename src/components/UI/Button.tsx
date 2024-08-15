import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
  style?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ onClick, style, children }: ButtonProps) {
  return (
    <button className={style} onClick={onClick}>
      {children}
    </button>
  );
}
