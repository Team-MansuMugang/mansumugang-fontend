import InputWrapper from '../components/InputWrapper';
import Input from '../components/Input';
import CheckButton from '../components/CheckButton';

export default {
  component: InputWrapper,
  title: 'InputWrapper',
};

const defaultArgs = {
  description: 'Description',
  statusDescription: 'Status Description',
};

const Template = (args) => (
  <InputWrapper {...args}>
    <Input></Input>
    <CheckButton>button</CheckButton>
  </InputWrapper>
);

export const Default = Template.bind({});
Default.args = { ...defaultArgs, status: 'default', statusDescription: '' };

export const Success = Template.bind({});
Success.args = { ...defaultArgs, status: 'success' };

export const Warning = Template.bind({});
Warning.args = { ...defaultArgs, status: 'warning' };

export const Error = Template.bind({});
Error.args = { ...defaultArgs, status: 'error' };

export const Important = Template.bind({});
Important.args = { ...defaultArgs, status: 'important' };

export const Info = Template.bind({});
Info.args = { ...defaultArgs, status: 'info' };
