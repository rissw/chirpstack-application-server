import { formatMessage } from "devextreme/localization";

export const translate = (file, key) => {
  // console.log("TRANSLATE FILE: ", formatMessage(`${file}`));
  // console.log("TRANSLATE FILE-KEY: ", formatMessage(`${file}.${key}`));
  return formatMessage(file)[key];
};
