import ToggleSwitch from '../components/ToggleSwitch';

export default {
  component: ToggleSwitch,
  title: 'ToggleSwitch',
};

export const Default = () => <ToggleSwitch labels={['보호자', '케어 멤버']} active={0} />;
