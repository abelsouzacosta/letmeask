type ButtonProps = {
  text: string;
}

const Button: React.FC<{text: string}> = ({text}: ButtonProps) => {
  return <button>{text}</button>;
};

export { Button }