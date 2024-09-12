import './Intro.scss';
import Sound from '../Sound/Sound';

export default function Intro() {
  return (
    <section className="main__intro">
      <div className="main__intro-text-container">
        <h1 className="main__title">SEO продвижение на Авито</h1>
        <p className="main__about">
          UPTOUP - это платформа, позволяющая быстро и просто повысить отдачу от
          ваших рекламных объявлений. Пользуйтесь платформой, чтобы
          оптимизировать затраты на рекламу, всегда опережает своих конкурентов
          и получать больше заявок с Авито
        </p>
      </div>

      <Sound />
    </section>
  );
}
