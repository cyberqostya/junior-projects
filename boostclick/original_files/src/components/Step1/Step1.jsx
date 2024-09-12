import { ButtonToggler } from 'components/UI/ButtonToggler/ButtonToggler';
import { useState } from 'react';

import Intro from './components/Intro/Intro';
import Interactive from './components/Interactive/Interactive';

export default function Step1() {
  // Переключатель "Самостоятельно / Через агентства"
  const [tabs, setTabs] = useState([
    {
      title: 'Самостоятельно',
      isActive: true,
    },
    {
      title: 'Через агенства',
      isActive: false,
      link: 'https://aggo.ru/avito/',
    },
  ]);
  const togglerStyle = {
    margin: '60px 0 100px',
  };

  return (
    <main className="main">
      <div className="main__inner">
        <Intro />
        <ButtonToggler buttons={tabs} style={togglerStyle} />
        <Interactive />
      </div>
    </main>
  );
}
