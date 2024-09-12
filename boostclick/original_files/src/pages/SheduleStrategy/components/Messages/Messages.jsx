import MainStore from 'stores/MainStore';
import ToggleText from '../ToggleText/ToggleText';
import './Messages.scss';
import { observer } from 'mobx-react';
import { useEffect, useRef, useState } from 'react';

export const Messages = observer(() => {

  function radiobuttonHandler(e) {
    const message = e.currentTarget.closest('.messages__radio').textContent;
    MainStore.strategy.setArrivedMessage(message);

    console.log(MainStore.strategy.arrivedMessage);
  }

  // Анимация раскрытия
  const buttonsref = useRef();
  const [buttonsStyle, setButtonsStyle] = useState({});
  useEffect(() => {
    setButtonsStyle({
      height: buttonsref.current.scrollHeight,
      marginTop: 25,
    });
  }, []);



  return (
    <div className="messages">
      <ToggleText
        isActive={MainStore.strategy.isArrivedMessagesActive}
        handler={MainStore.strategy.switchArrivedMessages}
        title="Cообщения, которые будут приходить в рамках активности в личные сообщения"
        info="Чтобы отличить активность в чате от сервиса вы можете выбрать формат обращения. Отвечать на сообщения необходимо, тк объявления с быстрыми ответами могут иметь приемущество в выдаче."
      />
      <div className="messages__radiobuttons" ref={buttonsref} style={MainStore.strategy.isArrivedMessagesActive ? buttonsStyle : {}}>
        {MainStore.strategy.MESSAGES_WILL_COME.map((i, key) => (
          <label
            className="messages__radio"
            key={key}
          >
            <input type="checkbox" name="message" onChange={radiobuttonHandler} checked={i.isActive} />
            {i.title}
          </label>
        ))}
      </div>
    </div>
  );
});
