import { TextInput } from 'components/UI/TextInput/TextInput';
import './DirectForm.scss';
import { useEffect, useRef, useState } from 'react';
import { InteractiveMB } from 'components/InteractiveMB/InteractiveMB';
import MainStore from 'stores/MainStore';
import ToggleText from '../ToggleText/ToggleText';
import { observer } from 'mobx-react';

export const DirectForm = observer(() => {

  // Анимация раскрытия
  const ref = useRef();
  const [containerStyle, setContainerStyle] = useState({});
  useEffect(() => {
    setContainerStyle({
      height: ref.current.scrollHeight,
    });
  }, []);

  return (
    <div className="directform">
      <ToggleText
        isActive={MainStore.strategy.isExternalTrafficActive}
        handler={MainStore.strategy.switchExternalTraffic}
        title="Внешний автотрафик Яндекс Директ"
        info="Площадки очень любят внешний трафик с других сайтов, объявления с внешним трафиком могут более медленно опускаться в выдаче. Мы запустим не большую рекламную кампанию в Яндекс Директе с вашим объявлением."
      />
      <div className="directform__container" ref={ref} style={MainStore.strategy.isExternalTrafficActive ? containerStyle : {}}>
        <p className="directform__text">
          Введите текст объявления, которое будет размещаться в рекламе директ
        </p>
        <div className="directform__inputs">
          <TextInput
            placeholder="Заголовок объявления Яндекс Директ - 54 символа"
            maxLength={54}
            value={MainStore.strategy.directTitle}
            onChange={MainStore.strategy.setDirectTitle}
          />
          <TextInput
            placeholder="Описание объявления Яндекс Директ - 120 символов"
            maxLength={120}
            data={MainStore.strategy.directDescription}
            onChange={MainStore.strategy.setDirectDescription}
          />
          <InteractiveMB
            title="Лимит Яндекс Директ"
            min={100}
            max={3000}
            minBar={MainStore.strategy.isExternalTrafficActive ? 1 : 0}
            maxBar={30}
            firstpreprice="от "
            secondpreprice="до "
            currency="₽"
            firstTextCurrency="₽ в месяц"
            price={MainStore.strategy.directionClicksPrice}
            pieces={MainStore.strategy.directClickQuantity}
            secondTextCurrency="кликов"
            handler={MainStore.strategy.setDirectClickQuantity}
            value={MainStore.strategy.directClickQuantity}
            style={{ maxWidth: 350 }}
          />
        </div>
      </div>
    </div>
  );
})
