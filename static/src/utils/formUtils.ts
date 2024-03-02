/* eslint-disable no-useless-escape */

const buttonTypes = new Set(["submit", "button"]);
const checkBox = new Set(["checkbox", "radio"]);

export const stringToBool = (bool?: string) => bool === "true";

export const isEmpty = (obj: any) => !obj || Object.keys(obj).length === 0;

const regexpToStringForInput = (regexp: RegExp) => (regexp as any).source;

export const WebsiteUrlRegExpPattern = regexpToStringForInput(
  /^(?:http(s)?:\/\/)?[\w.\-]+(?:.[\w.\-]+)+[\w\-._~:\/?#\[\]@!$&'\(\)*+,;=.]+$/
);

export const RemittanceInformationRegExp =
  /^([a-zA-Z0-9\(\)'+?,.\/]|[a-zA-Z0-9\(\)'+?,.\/][a-zA-Z0-9\s:\(\).,'+?\/\-]*[a-zA-Z0-9\(\)'+?,.\/])$/;

export const RemittanceInformationRegExpPattern = regexpToStringForInput(
  RemittanceInformationRegExp
);

export const getFormValues = (formElement: HTMLFormElement) => {
  return Object.fromEntries(
    (Array.from(formElement.elements) as HTMLInputElement[])
      .filter((element) => !buttonTypes.has(element.type))
      .filter((element) => !checkBox.has(element.type) || element.checked)
      .map((element) => [
        element.name,
        element.type !== "file"
          ? element.dataset.type === "decimal"
            ? !isNaN(parseFloat(element.value.replace(",", ".")))
              ? `${parseFloat(element.value.replace(",", "."))}`
              : "0"
            : "formValue" in element.dataset
            ? JSON.parse(
                element.dataset.formValue || JSON.stringify(element.value)
              )
            : element.value
          : element.files,
      ])
  );
};

export const isEqual = (a: any, b: any) =>
  JSON.stringify(a) === JSON.stringify(b);

const EMAIL_REGEXP =
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const isEmail = (email: string) => {
  return EMAIL_REGEXP.test(email);
};
