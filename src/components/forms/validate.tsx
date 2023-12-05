class Validate {
  emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  phoneNumberRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  urlSlugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  email = (value: string): boolean =>
    this.emailRegex.test(value);

  password = (psswd: string): boolean =>
    this.passwordRegex.test(psswd);

  phone = (value: string): boolean =>
    this.phoneNumberRegex.test(value);

  url = (value: string): boolean => {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  }

  isSlug = (value: string): boolean =>
    this.urlSlugRegex.test(value);

  isImage = (value: any): boolean =>
    value && value.type && value.type.includes('image');

  equalTo = (value1: string, value2: string): boolean =>
    value1 === value2

  notEmpty = (value: string): boolean =>
    value.length > 0

  minLength = (value: string, length: number): boolean =>
    value.length >= length

  maxLength = (value: string, length: number): boolean =>
    value.length <= length

  isNumber = (value: string): boolean =>
    !isNaN(Number(value))

  isString = (value: string): boolean =>
    typeof value === 'string'

  minMax = (value: string, min: number, max: number): boolean =>
    Number(value) >= min && Number(value) <= max

  validate = (value: any, rules: string[]): boolean => {
    let valid = true;
    rules.forEach((rule) => {
      if (rule === 'email') {
        valid = this.email(value);
      } else if (rule === 'password') {
        valid = this.password(value);
      } else if (rule === 'phone') {
        valid = this.phone(value);
      } else if (rule === 'url') {
        valid = this.url(value);
      } else if (rule === 'isSlug') {
        valid = this.isSlug(value);
      } else if (rule === 'isImage') {
        valid = this.isImage(value);
      } else if (rule === 'notEmpty') {
        valid = this.notEmpty(value);
      } else if (rule === 'equalTo') {
        valid = this.equalTo(value, value);
      } else if (rule.includes('minLength')) {
        const length = Number(rule.split(':')[1]);
        valid = this.minLength(value, length);
      } else if (rule.includes('maxLength')) {
        const length = Number(rule.split(':')[1]);
        valid = this.maxLength(value, length);
      } else if (rule === 'isNumber') {
        valid = this.isNumber(value);
      } else if (rule === 'isString') {
        valid = this.isString(value);
      } else if (rule.includes('minMax')) {
        const min = Number(rule.split(':')[1]);
        const max = Number(rule.split(':')[2]);
        valid = this.minMax(value, min, max);
      }
    });
    return valid;
  }
}

const validate = new Validate();

export default validate;