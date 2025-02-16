import KeyboardAndInput from '@/components/input/KeyboardAndInput';
import ConfigurationDrawer from '@/components/configuration/ConfigurationDrawer';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto pb-6">
      <KeyboardAndInput />
      <ConfigurationDrawer />
    </div>
  );
}
