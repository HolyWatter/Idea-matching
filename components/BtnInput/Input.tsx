import { FC } from "react";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  value: string;
  name: string;
}

export const Input: FC<Props> = ({
  onChange,
  placeholder,
  type,
  value,
  name,
}) => {
  return (
    <input
      onChange={onChange}
      className="h-12 w-96 rounded-md border pl-3 shadow-md focus:border-2 focus:border-origin focus:outline-none"
      placeholder={placeholder}
      type={type}
      value={value}
      name={name}
      required
    />
  );
};
