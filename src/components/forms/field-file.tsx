import { createRef } from 'react';
import { FieldBaseArguments, FieldBaseProps } from './field-base';
import Input from './field-input';
import { Button } from '.';

interface FieldProps extends FieldBaseProps {
}

class FileInput extends Input {
  private fileUploadRef = createRef();
  private types: string[] = [];
  constructor(props: FieldProps) {
    super(props);
    this.state = {
      ...this.state,
      props: {
        ...this.state.props,
        type: 'file',
        ...props,
      }
    };
  }
  handleChange = (event: any) => {
    if (!event.target.files[0]) {
      return;
    }
    if (this.state.props.types.length > 0) {
      let valid = false;
      this.state.props.types.forEach((type: string) => {
        if (type === 'image' && (event.target.files[0].type === 'image' || event.target.files[0].type.indexOf('image') === 0)) {
          valid = true;
        } else if (event.target.files[0].type === type || event.target.files[0].type.indexOf(type) === 0) {
          valid = true;
        }
      });
      if (!valid) {
        return;
      }
    }
    const value = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(value);
    reader.onload = (e: any) => {
      const fileData = {
        lastModified: value.lastModified,
        lastModifiedDate: value.lastModifiedDate,
        name: value.name,
        type: value.type,
        size: value.size,
        data: e.target.result,
      }
      this.changeValue(fileData);
    };
  }

  openUpload = () =>
    (this.fileUploadRef.current as HTMLInputElement)?.click();

  deleteFile = () =>
    this.changeValue(null);

  uploadFileButton = (focus: any) => (
    <Button className='form-field-file-upload-button' onClick={this.openUpload}>
      {this.state.props.placeholderHideOnFocus && focus
        ? ''
        : this.state.props.placeholder}
    </Button>
  )

  deleteFileButton = () => (
    <Button className='form-field-file-delete-button' onClick={this.deleteFile}>
      Delete
    </Button>
  )

  displayFile = (focus: any) => {
    if (this.state.value?.type === 'image' || this.state.value?.type?.indexOf('image') === 0) {
      return (
        <div className='form-field-file-display form-field-file-image'>
          <div className='form-field-file-image-wrapper'>
            <img src={this.state.value?.data} alt={this.state.value?.name} onClick={this.openUpload} />
          </div>
          {this.uploadFileButton(focus)}
          {this.state.props.required ? '' : this.deleteFileButton()}
        </div>
      );
    } else if (this.state.value?.type) {
      return (
        <div className='form-field-file-display form-field-file-not-image'>
          <div className='form-field-file-text' onClick={this.openUpload}>
            <span>File:</span> {this.state.value?.name}
          </div>
          {this.uploadFileButton(focus)}
          {this.state.props.required ? '' : this.deleteFileButton()}
        </div>
      );
    } else {
      return (
        <div className='form-field-file-display form-field-file-empty'>
          {this.uploadFileButton(focus)}
        </div>
      );
    }
  }

  field = ({classNameInput, focus} : FieldBaseArguments) => {
    const inputClasses = ['form-field-input-file-container'];
    if (!this.state.value) {
      inputClasses.push('empty');
    }
    return (
      <div className={inputClasses.join(' ')}>
        {this.displayFile(focus)}
        <input
          ref={this.fileUploadRef as React.RefObject<HTMLInputElement>}
          name={this.state.props.name}
          id={this.state.props.name}
          type={this.state.props.type}
          placeholder={this.state.props.placeholderHideOnFocus && focus
            ? ''
            : this.state.props.placeholder}
          className={classNameInput}
          style={this.state.props.styleInput}
          disabled={this.state.props.disabled}
          readOnly={this.state.props.readonly}
          required={this.state.props.required}
          onChange={this.handleChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      </div>
    );
  };
}

export default FileInput;
