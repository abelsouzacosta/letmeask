import { ButtonHTMLAttributes } from 'react';
import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: false, 
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return <button className="button" {...props} />
}