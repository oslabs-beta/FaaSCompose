import CloudProvidersDropdown from './CloudProvidersDropdown';
import PlatformSpecific from './PlatformSpecific';
import UserInput from './UserInput';
import CompositionResult from './CompositionResult';
import LoginDeploy from './LoginDeploy';

const Execution = (props): JSX.Element => (
  <>
    <h3>Execution</h3>
    <CloudProvidersDropdown compositionName = { props.compositionName } />
    <PlatformSpecific />
    <LoginDeploy compositionName = { props.compositionName }/>
    <UserInput compositionName = { props.compositionName }/>
    <CompositionResult />
  </>
);

export default Execution;
