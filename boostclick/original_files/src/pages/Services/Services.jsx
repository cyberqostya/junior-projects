import Step1 from 'components/Step1/Step1';
import { observer } from 'mobx-react';
import Answers from 'components/Answers/Answers';
import { useEffect } from 'react';

export const Services = observer(() => {

  // Прокрутка вверх страницы
  useEffect(() => { window.scroll(0, 0) }, []);

  return (
    <>
      <Step1 />
      <Answers />
    </>)
});
