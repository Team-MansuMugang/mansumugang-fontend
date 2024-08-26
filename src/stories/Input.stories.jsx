import Input from '../components/Input';

export default {
  component: Input,
  title: 'Input',
};

const defaultArgs = {
  placeholder: 'placeholder',
  type: 'text',
  autoCapitalize: 'off',
};

export const Default = (args) => <Input {...args}></Input>;
Default.args = {
  ...defaultArgs,
  status: 'default',
};
export const Success = (args) => <Input {...args}></Input>;
Success.args = {
  ...defaultArgs,
  status: 'success',
};
export const Warning = (args) => <Input {...args}></Input>;
Warning.args = {
  ...defaultArgs,
  status: 'warning',
};
export const Error = (args) => <Input {...args}></Input>;
Error.args = {
  ...defaultArgs,
  status: 'error',
};
export const Important = (args) => <Input {...args}></Input>;
Important.args = {
  ...defaultArgs,
  status: 'important',
};
export const Info = (args) => <Input {...args}></Input>;
Info.args = {
  ...defaultArgs,
  status: 'info',
};
