import { action, makeObservable, observable } from "mobx";

class ShureModalStore {
  constructor() {
    makeObservable(this, {
      isOpen: observable,
      setIsOpen: action,

      text: observable,
      setText: action,

      ok: observable,
      setOk: action,

      cancel: observable,
      setCancel: action,
    });
  }

  isOpen = false;
  setIsOpen(value) {
    this.isOpen = value;
  }

  text = "";
  setText(text) {
    this.text = text;
  }

  ok = () => {};
  setOk(func) {
    this.ok = func;
  }

  cancel = () => {};
  setCancel(func) {
    this.cancel = func;
  }
}

export default new ShureModalStore();
