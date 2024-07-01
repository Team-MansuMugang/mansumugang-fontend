import ToggleSwitch from '../components/ToggleSwitch';

export default {
  component: ToggleSwitch,
  title: 'ToggleSwitch',
};

export const Default = () => <ToggleSwitch labels={['보호자', '케어 맴버']} active={0} />;
