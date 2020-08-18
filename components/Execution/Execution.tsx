import CloudProvidersDropdown from './CloudProvidersDropdown';
import PlatformSpecific from './PlatformSpecific';
import UserInput from './UserInput';
import CompositionResult from './CompositionResult';

const Execution = (): JSX.Element => (
  <>
    <h3>Execution</h3>
    <CloudProvidersDropdown />
    <PlatformSpecific />
    <UserInput />
    <CompositionResult />
  </>
);

export default Execution;
