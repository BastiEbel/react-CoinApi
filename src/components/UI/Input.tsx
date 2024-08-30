import { InputHTMLAttributes } from "react";

type InputProps = {
  style?: string;
  placeholder: string;
  value: number | undefined;
  disable: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  style,
  placeholder,
  value,
  disable,
}: InputProps) {
  return (
    <input
      value={value}
      disabled={disable}
      placeholder={placeholder}
      className={`${style} bg-glass`}
      type="text"
    />
  );
}
