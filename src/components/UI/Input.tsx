import { InputHTMLAttributes } from "react";

type InputProps = {
  style?: string;
  placeholder: string;
  disable: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  style,
  placeholder,
  value,
  onChange,
  disable,
}: InputProps) {
  return (
    <input
      value={value}
      onChange={onChange}
      disabled={disable}
      placeholder={placeholder}
      className={`${style} bg-glass`}
      type="number"
    />
  );
}
