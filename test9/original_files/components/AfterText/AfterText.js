import { memo, useEffect, useState } from "react";
import styles from './style.module.scss';

function AfterText({ apiResponseStatus, apiResponse, isLoading, isFirstLoad }) {
  const [text, setText] = useState('');
  const [isAppear, setIsAppear] = useState(false);

  useEffect(() => {

    if (isLoading) {

      (async () => {
        // При первом запуске необходимо подождать анимацию перемещения анимация
        if (isFirstLoad) await new Promise((res) => { setTimeout(res, 400) })

        setText('Загрузка...');
        setIsAppear(true);
      })()

    } else {

      // До первого запуска
      if (isFirstLoad) return;

      if (apiResponseStatus === 200 && apiResponse.total !== 0) {
        setIsAppear(false);
        setText('');
      } else {
        setIsAppear(true);
        if (apiResponseStatus === 200) {
          setText('К сожалению, поиск не дал результатов');
        } else if (apiResponseStatus === 400) {
          setText('Ошибка запроса, попробуйте снова');
        } else {
          setText('Ошибка сервера, повторите попытку через некоторое время');
        }
      }
    }

  }, [isLoading])

  return <p className={`${styles.text} ${isAppear ? styles['text_appeared'] : ''}`}>{text}</p>;
}

export default memo(AfterText);