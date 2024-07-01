import Input from '../components/Input';

export default {
  component: Input,
  title: 'Input',
};

export const Default = () => <Input>Button</Input>;
export const Success = () => <Input status="success">Button</Input>;
export const Warning = () => <Input status="warning">Button</Input>;
export const Error = () => <Input status="error">Button</Input>;
export const Important = () => <Input status="important">Button</Input>;
export const Info = () => <Input status="info">Button</Input>;
