// import React, { Component } from 'react';
import FieldBase, { FieldBaseArguments, FieldBaseProps } from './field-base';

interface FieldProps extends FieldBaseProps {
}

class TextArea extends FieldBase {
  constructor(props: FieldProps) {
    super(props);
    this.state = {
      ...this.state,
      props: {
        ...this.state.props,
        classNameInput: 'form-field-textarea',
        ...props,
      }
    };
  }

  textAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    this.handleChange(e as any);

  field = ({classNameInput, focus} : FieldBaseArguments) => {
    return (
      <textarea
        id={this.state.props.name}
        name={this.state.props.name}
        className={classNameInput}
        value={this.state.value}
        rows={this.state.props.rows}
        cols={this.state.props.cols}
        maxLength={this.state.props.maxlength}
        wrap={this.state.props.wrap}
        placeholder={this.state.props.placeholderHideOnFocus && focus
          ? ''
          : this.state.props.placeholder}
        disabled={this.state.props.disabled}
        readOnly={this.state.props.readonly}
        onChange={this.textAreaChange}
        onFocus={() => {
          if (this.state.props.onFocus) {
            this.state.props.onFocus({
              field: this.state.props.name,
              value: this.state.value
            });
          }
          this.setFocus.bind(this, true)
        }}
        onBlur={super.onBlur}
        style={this.state.props.styleInput}
      />
    )
  }

}

export default TextArea;
