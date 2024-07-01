import BigButton from '../components/BigButton';

export default {
  component: BigButton,
  title: 'BigButton',
};

export const Default = (args) => <BigButton {...args} />;
Default.args = {
  children: 'Button',
  disabled: false,
};
export const Disabled = (args) => <BigButton {...args} />;
Disabled.args = {
  children: 'Button',
  disabled: true,
};
