import FieldBase, { FieldBaseArguments, FieldBaseProps } from './field-base';

interface FieldProps extends FieldBaseProps {
}

class Input extends FieldBase {
  constructor(props: FieldProps) {
    super(props);
    this.state = {
      ...this.state,
      props: {
        ...this.state.props,
        type: 'text',
        ...props,
      }
    };
  }
  field = ({classNameInput, focus} : FieldBaseArguments) => {
    return (
      <input
        name={this.props.name}
        id={this.props.name}
        type={this.state.props.type}
        placeholder={this.state.props.placeholderHideOnFocus && focus
          ? ''
          : this.state.props.placeholder}
        className={classNameInput}
        style={this.state.props.styleInput}
        value={this.state.value}
        disabled={this.props.disabled}
        readOnly={this.props.readonly}
        required={this.props.required}
        onChange={this.handleChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />
    );
  };
}

export default Input;
