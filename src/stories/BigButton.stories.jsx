import BigButton from '../components/BigButton';

export default {
  component: BigButton,
  title: 'BigButton',
};

export const Default = () => <BigButton>Button</BigButton>;
export const Disabled = () => <BigButton disabled={true}>Button</BigButton>;
