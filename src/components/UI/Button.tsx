import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
  style?: string;
  disable: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  onClick,
  disable,
  style,
  children,
}: ButtonProps) {
  return (
    <button disabled={disable} className={style} onClick={onClick}>
      {children}
    </button>
  );
}
