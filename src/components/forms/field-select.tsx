import FieldBase, { FieldBaseArguments, FieldBaseProps } from './field-base';

interface FieldProps extends FieldBaseProps {
}

class DropDown extends FieldBase {
  constructor(props: FieldProps) {
    super(props);
    this.state = {
      ...this.state,
      props: {
        ...this.state.props,
        classNameInput: 'form-field-select',
        ...props,
      }
    };
  }
  handleSelectChange = (event: any) => {
    const value = event.target.value;
    this.changeValue(value);
  }
  field = ({classNameInput, focus} : FieldBaseArguments) => {
    return (
      <select
        name={this.state.props.name}
        id={this.state.props.name}
        value={this.props.value.toString()}
        placeholder={this.state.props.placeholderHideOnFocus && focus
          ? ''
          : this.state.props.placeholder}
        className={classNameInput}
        style={this.state.props.styleInput}
        disabled={this.state.props.disabled}
        required={this.state.props.required}
        onChange={this.handleSelectChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      >
        {Object.keys(this.state.props.options).map((key) => (
          <option value={key} key={key}>
            {this.state.props.options[key]}
          </option>
        ))}
      </select>
    );
  };
}

export default DropDown;
