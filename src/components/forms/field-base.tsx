import React, { Component } from 'react';

export interface FieldOnChangeArguments {
  field: string;
  value: any;
}

export interface FieldBaseProps {
  label: string;
  name: string;
  type?: string;
  types?: string[];
  value?: any;
  rows?: number;
  cols?: number;
  options?: {[key: string]: string};
  wrap?: ['hard' | 'soft'];
  maxlength?: number;
  placeholder?: string;
  placeholderHideOnFocus?: boolean;
  tooltip?: string;
  className?: string;
  classNameLabel?: string;
  classNameInput?: string;
  classNameInvalid?: string;
  classNameLabelContainer?: string;
  classNameTooltip?: string;
  classNameInputContainer?: string;
  style?: React.CSSProperties;
  styleLabel?: React.CSSProperties;
  styleInput?: React.CSSProperties;
  styleLabelContainer?: React.CSSProperties;
  styleTooltip?: React.CSSProperties;
  styleInputContainer?: React.CSSProperties;
  disabled?: boolean;
  readonly?: boolean;
  emptyInvalid?: boolean;
  preventDefault?: boolean;
  required?: boolean;
  validate?: (value: string) => boolean;
  onChange?: (data: FieldOnChangeArguments) => void;
  onBlur?: (data: FieldOnChangeArguments) => void;
  onFocus?: (data: FieldOnChangeArguments) => void;
  afterValidate?: (field: string, pass: boolean) => void;
  invalidMessage?: string;
}

export interface FieldBaseArguments {
  classNameInput: string;
  focus: boolean;
  invalid: boolean;
}

class FieldBase extends Component<FieldBaseProps, any> {
  constructor(props: FieldBaseProps) {
    super(props);
    const invalid = props.required && !props.value && props.emptyInvalid
    this.state = {
      value: props.value || '',
      invalid,
      focus: false,
      props: {
        placeholderHideOnFocus: true,
        className: 'form-field',
        classNameLabel: 'form-field-label',
        classNameInput: 'form-field-input',
        classNameInvalid: 'form-field-invalid',
        classNameLabelContainer: 'form-field-label-container',
        classNameTooltip: 'form-field-tooltip',
        classNameInputContainer: 'form-field-input-container',
        style: {},
        styleLabel: {},
        styleInput: {},
        styleLabelContainer: {},
        styleTooltip: {},
        styleInputContainer: {},
        options: {},
        types: [],
        disabled: false,
        readonly: false,
        required: false,
        emptyInvalid: false,
        preventDefault: true,
        ...props,
      }
    };
  }

  setValue = (value: string) => {
    this.setState({ value });
  }

  setInvalid = (invalid: boolean) => {
    this.setState({ invalid });
  }

  setFocus = (focus: boolean) => {
    this.setState({ focus });
  }

  onFocus = () => {
    if (this.state.props.onFocus) {
      this.state.props.onFocus({
        field: this.state.props.name,
        value: this.state.value
      });
    }
    this.setFocus.bind(this, true)
  }

  onBlur = () => {
    if (this.state.props.onBlur) {
      this.state.props.onBlur({
        field: this.state.props.name,
        value: this.state.value
      });
    }
    this.setFocus.bind(this, false)
  }

  changeValue = (value: any) => {
    this.setValue(value);
    if (this.props.onChange) {
      this.props.onChange({
        field: this.state.props.name,
        value: value
      });
    }
    if (this.props.validate) {
      const reqNotValid = !!this.state.props.required && !value;
      const validate = this.props.validate(value);
      const pass = !(reqNotValid || !validate);
      if (this.props.afterValidate) {
        this.props.afterValidate(this.state.props.name, pass);
      }
      if (this.state.props.emptyInvalid) {
        this.setInvalid(!pass);
      } else {
        this.setInvalid(!pass && ((typeof value === 'string' && value.length > 0) || (typeof value !== 'string' && (value || value === 0 || value === false))));
      }
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.preventDefault) {
      e.preventDefault();
    }
    this.changeValue(e.target.value);
  };

  field = ({classNameInput, focus} : FieldBaseArguments) => {
    return (
      <div>Base Field Type</div>
    );
  };

  render() {
    const { invalid, focus } = this.state;

    let className = this.state.props.className;
    let classNameLabel = this.state.props.classNameLabel;
    let classNameInput = this.state.props.classNameInput;

    if (invalid) {
      className += ' invalid';
      classNameLabel += ' invalid';
      classNameInput += ' invalid';
    }

    if (focus) {
      className += ' focus';
      classNameLabel += ' focus';
      classNameInput += ' focus';
    }

    return (
      <div
        className={className}
        style={this.state.props.style}
      >
        <div
          className={this.state.props.classNameLabelContainer}
          style={this.state.props.styleLabelContainer}
        >
          <label
            htmlFor={this.state.props.name}
            className={classNameLabel}
            style={this.state.props.styleLabel}
          >
            {this.state.props.label}
          </label>
          {invalid && !focus && this.state.props.invalidMessage && (
            <span
              className={this.state.props.classNameInvalid}
            >
              {this.state.props.invalidMessage}
            </span>
          )}
        </div>
        <div
          className={this.state.props.classNameInputContainer}
          style={this.state.props.styleInputContainer}
        >
          {this.field({classNameInput, focus, invalid})}
          {this.state.props.tooltip && !focus && (
            <span
              className={this.state.props.classNameTooltip}
              style={this.state.props.styleTooltip}
            >
              {this.state.props.tooltip}
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default FieldBase;
