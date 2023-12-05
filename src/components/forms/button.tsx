import React from 'react';

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  className?: string;
  style?: React.CSSProperties;
  text?: string;
  preventDefault?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  type = 'submit',
  className = 'form-button',
  style = {},
  text = '',
  preventDefault = true,
  onClick = () => {},
  disabled = false,
  children = null,
}) => {
  const buttonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (preventDefault) {
      e.preventDefault();
    }
    onClick();
  };

  if (!text && !children) {
    text = 'Submit';
  }

  return (
    <button
      type={type}
      className={className}
      style={style}
      onClick={buttonClick}
      disabled={disabled}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
