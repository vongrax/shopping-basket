import { RuleObject } from 'ant-design-vue/es/form';

export const validateEmptyField = (message: string) => async (_rule: RuleObject, value: string) => {
  if (!value) {
    return Promise.reject(new Error(message));
  }
  if (value === 'Выберите') {
    return Promise.reject(new Error(message));
  }
  return Promise.resolve();
};

export const validateEmail = () => async (_rule: RuleObject, value: string) => {
  if (!value) {
    return Promise.reject(new Error('Пожалуйста, введите электронную почту'));
  }
  if (
    !value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return Promise.reject(new Error('Пожалуйста, введите корректный адрес электронной почты'));
  }
  return Promise.resolve();
};

export const validatePhone = () => async (_rule: RuleObject, value: string) => {
  if (!value) {
    return Promise.reject(new Error('Пожалуйста, введите телефон'));
  }
  if (value && !value.match(/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{5,12}$/)) {
    return Promise.reject(new Error('Пожалуйста, введите корректный телефон'));
  }
  return false;
};
