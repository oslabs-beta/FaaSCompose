import CloudProvidersDropdown from './CloudProvidersDropdown';
import PlatformSpecific from './PlatformSpecific';
import UserInput from './UserInput';
import CompositionResult from './CompositionResult';

const Execution = (props): JSX.Element => (
  <>
    <h3>Execution</h3>
    <CloudProvidersDropdown compositionName = { props.compositionName } />
    <PlatformSpecific />
    <UserInput compositionName = { props.compositionName }/>
    <CompositionResult />
  </>
);

export default Execution;
