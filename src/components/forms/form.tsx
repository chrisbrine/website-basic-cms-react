import React from 'react';
import './form.css';

type FormProps = {
  className?: string;
  style?: React.CSSProperties;
  formRef?: React.Ref<HTMLFormElement>;
  children: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  action?: string;
};

const Form: React.FC<FormProps> = ({
  className = 'form',
  formRef,
  style = {},
  onSubmit,
  action,
  children,
}) => {
  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      action={action}
      className={className}
      style={style as React.CSSProperties}
    >
      {children}
    </form>
  );
}

export default Form;