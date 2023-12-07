export const convertToDate = (value: any) => {
  if (typeof value === 'number' || parseInt(value)) {
    const dateTime = new Date(parseInt(value) * 1000);
    return dateTime;
  } else if (typeof value === 'string') {
    const dateTime = new Date(value);
    return dateTime;
  } else if (value instanceof Date) {
    return value;
  }
  return undefined;
};

export const convertDateToInt = (value: any) => {
  if (value instanceof Date) {
    return Math.floor(value.getTime() / 1000);
  } else if (typeof value === 'number' || parseInt(value)) {
    const currentValue = parseInt(value) > 1000000000000 ? parseInt(value) : parseInt(value) * 1000;
    const dateTime = new Date(currentValue);
    return Math.floor(dateTime.getTime() / 1000);
  } else if (typeof value === 'string') {
    const dateTime = new Date(value);
    return Math.floor(dateTime.getTime() / 1000);
  }
  return 0;
};

export const convertDateToIntArgs = (args: any) => {
  return {
    ...args,
    value: convertDateToInt(args.value),
  };
};

const dateStringShort = (date: Date) =>
  `${date.getMonth() + 1}/${date.getFullYear()}`;

const dateStringLong = (date: Date) =>
  `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

const dateStringBlog = (date: Date) =>
  `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${date.getMinutes()} ${date.getHours() > 12 ? 'PM' : 'AM'}`;

const handleDateToString = (date: any, convert: (date: Date) => string) => {
  if (typeof date === 'number' || parseInt(date)) {
    const dateTime = new Date(parseInt(date) * 1000);
    return convert(dateTime);
  } else if (typeof date === 'string') {
    const dateTime = new Date(date);
    return convert(dateTime);
  } else if (date instanceof Date) {
    return convert(date);
  }
  return 'N/A';
}

export const convertDateToString = (date: any) =>
  handleDateToString(date, dateStringShort);

export const convertDateToStringFull = (date: any) =>
  handleDateToString(date, dateStringLong);

export const processBlogDate = (date: any) =>
  handleDateToString(date, dateStringBlog);
