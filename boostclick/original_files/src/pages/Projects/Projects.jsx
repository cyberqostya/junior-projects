import Answers from 'components/Answers/Answers';
import {MyProjects} from 'components/MyProjects/MyProjects';
import { useEffect } from 'react';

export default function Projects() {

  // Прокрутка вверх страницы
  useEffect(() => { window.scroll(0, 0) }, []);

  return (
    <>
      <main className="projects">
        <div className="projects__inner">
          <MyProjects />
        </div>
      </main>
      <Answers />
    </>
  );
}
