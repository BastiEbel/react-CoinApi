import { InputHTMLAttributes } from "react";

type InputProps = {
  style?: string;
  placeholder: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ style, placeholder }: InputProps) {
  return <input placeholder={placeholder} className={style} type="text" />;
}
