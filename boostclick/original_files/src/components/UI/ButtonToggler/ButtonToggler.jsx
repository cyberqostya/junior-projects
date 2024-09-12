import { observer } from 'mobx-react-lite';
import './ButtonToggler.scss';

export const ButtonToggler = observer((props) => {
  const { buttons, style, onClick = () => {} } = props;

  return (
    <div className="buttontoggler" style={style} onClick={onClick}>
      {buttons.map((i, ind) => {
        if (i.link) {
          return (
            <a
              className={
                'buttontoggler__button ' + (i.isActive ? '_active' : '')
              }
              key={ind}
              href={i.link}
              target="_blank"
              rel="noreferrer"
            >
              {i.title}
            </a>
          );
        } else {
          return (
            <button
              className={
                'buttontoggler__button ' + (i.isActive ? '_active' : '')
              }
              key={ind}
            >
              {i.title}
            </button>
          );
        }
      })}
    </div>
  );
})
