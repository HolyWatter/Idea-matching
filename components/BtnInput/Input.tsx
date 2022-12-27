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
      className="w-96 h-12 border rounded-md pl-3 pt-2 shadow-md focus:outline-none focus:border-gray-500"
      placeholder={placeholder}
      type={type}
      value={value}
      name={name}
      required
    />
  );
};
