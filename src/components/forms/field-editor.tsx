import { Editor } from '@tinymce/tinymce-react';
import FieldBase, { FieldBaseArguments, FieldBaseProps } from './field-base';

interface FieldProps extends FieldBaseProps {
}

class InputEditor extends FieldBase {
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
  doChange = (content: string, editor: any) => {
    this.changeValue(content);
  }
  // uploadImage = (blobInfo: any, progress: any) => {
  //   const formdata = new formdata();
  //   formdata.append('file', blobinfo.blob(), blobinfo.filename());

  //   // send your data to the server here ...
  //   // server must return the image url,
  //   // then you must call resolve() with the url 
  //     .then(response => {
  //       resolve(response.fileurl)
  //     }).catch(error => {
  //       console.log('error:', error)
  //     })
  // }
  field = ({classNameInput, focus} : FieldBaseArguments) => {
    return (
      // <input
      //   name={this.state.props.name}
      //   id={this.state.props.name}
      //   type={this.state.props.type}
      //   placeholder={this.state.props.placeholderHideOnFocus && focus
      //     ? ''
      //     : this.state.props.placeholder}
      //   className={classNameInput}
      //   style={this.state.props.styleInput}
      //   value={this.state.value}
      //   disabled={this.state.props.disabled}
      //   readOnly={this.state.props.readonly}
      //   required={this.state.props.required}
      //   onChange={this.handleChange}
      //   onFocus={this.onFocus}
      //   onBlur={this.onBlur}
      // />
      <Editor
        apiKey='hekmsne7x7h0ql7lgr1aj8cgh8zy9uki3fke768f13vcwo0d'
        value={this.state.value}
        init={{
          placeholder: this.state.props.placeholder,
          filePickerTypes: 'image',
          menubar: false,
          block_unsupported_drop: true,
          image_file_types: 'jpeg,jpg,jpe,jfi,jif,jfif,png,gif,bmp,webp',
          automatic_uploads: true,
          readonly: this.props.readonly,
          ai_request: (request: any, respondWith: any) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
          plugins: [
            'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
            'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
            'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
          ],
          paste_data_images: true,
          toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'link image media | ' +
            'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          // images_upload_handler: this.uploadImage,
        }}
        disabled={this.props.disabled}
        id={this.state.props.name}
        textareaName={this.state.props.name}
        onEditorChange={this.doChange}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
      />
    );
  };
}

export default InputEditor;
