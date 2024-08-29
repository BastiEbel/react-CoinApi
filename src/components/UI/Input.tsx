import { InputHTMLAttributes } from "react";

type InputProps = {
  style?: string;
  placeholder: string;
  value: number | undefined;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ style, placeholder, value }: InputProps) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      className={style}
      type="text"
    />
  );
}
