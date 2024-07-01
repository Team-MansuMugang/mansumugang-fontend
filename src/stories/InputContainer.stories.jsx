import InputContainer from '../components/InputContainer';
import Input from '../components/Input';
import CheckButton from '../components/CheckButton';

export default {
  component: InputContainer,
  title: 'InputContainer',
};

const defaultArgs = {
  description: 'Description',
  statusDescription: 'Status Description',
};

const Template = (args) => (
  <InputContainer {...args}>
    <Input></Input>
    <CheckButton>button</CheckButton>
  </InputContainer>
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
