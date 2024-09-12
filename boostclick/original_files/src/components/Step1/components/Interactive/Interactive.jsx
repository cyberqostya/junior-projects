import { InteractivePlateControls } from '../InteractivePlateControls/InteractivePlateControls';
import { InteractivePlateStep } from '../InteractivePlateStep/InteractivePlateStep';
import InteractivePlateText from '../InteractivePlateText/InteractivePlateText';
import './Interactive.scss';

export default function Interactive() {
  return (
    <div className="interactive">
      <InteractivePlateText />
      <InteractivePlateControls />
      <InteractivePlateStep />
    </div>
  );
}
