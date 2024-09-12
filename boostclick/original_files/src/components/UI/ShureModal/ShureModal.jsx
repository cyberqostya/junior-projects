import { observer } from "mobx-react";
import "./ShureModal.scss";
import Plate from "../Plate/Plate.jsx";
import Button from "../Button/Button.jsx";
import ShureModalStore from "./ShureModalStore.jsx";

export const ShureModal = observer(() => {
  function cancel() {
    ShureModalStore.cancel();
    ShureModalStore.setIsOpen(false);
  }

  function ok() {
    ShureModalStore.ok();
    ShureModalStore.setIsOpen(false);
  }

  return (
    <div className={"shuremodal" + (ShureModalStore.isOpen ? " _active" : "")}>
      <Plate className='shuremodal__plate'>
        <p className='shuremodal__text'>{ShureModalStore.text}</p>
        <div className='shuremodal__buttons'>
          <Button
            title='Отмена'
            classes={["outlined", "small"]}
            onClick={cancel}
          />
          <Button title='OK' classes={["small"]} onClick={ok} />
        </div>

        <button className='shuremodal__close' onClick={cancel}></button>
      </Plate>
    </div>
  );
});
