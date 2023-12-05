import FieldBase, { FieldBaseArguments, FieldBaseProps } from './field-base';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface FieldProps extends FieldBaseProps {
}

class DatePick extends FieldBase {
  constructor(props: FieldProps) {
    super(props);
    this.state = {
      ...this.state,
      props: {
        ...this.state.props,
        type: 'text',
        classNameInput: 'form-field-datepicker',
        ...props,
      }
    };
  }
  handleChangeDate = (date: any, event: any) => {
    if (date !== null) {
      const timestamp = (date.getTime());
      this.changeValue(timestamp);
    }
  }
  handleSelect = (date: any, event: any) => {
    this.handleChangeDate(date, event);
  }

  field = ({classNameInput, focus} : FieldBaseArguments) => {
    return (
      <DatePicker
        className={classNameInput}
        name={this.state.props.name}
        id={this.state.props.name}
        selected={this.state.value}
        value={this.state.value}
        placeholderText={this.state.props.placeholderHideOnFocus && focus
          ? ''
          : this.state.props.placeholder}
        onChange={this.handleChangeDate}
        onSelect={this.handleSelect}
        disabled={this.state.props.disabled}
        readOnly={this.state.props.readonly}
        required={this.state.props.required}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />
    );
  };
}

export default DatePick;
