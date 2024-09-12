import { memo, useState } from 'react';
import styles from './style.module.scss';

function Image({ src, alt, srcFull }) {
  const [isActive, setIsActive] = useState(false);
  const deactivate = (e) => {
    if (!e.target.matches('[class*=popup__image]')) setIsActive(false)
  }

  return (
    <>
      <li><img className={styles.image} src={src} alt={alt} onClick={() => { setIsActive(true) }} /></li>

      {isActive &&
        <div className={styles.popup} onClick={deactivate}>
          <button className={styles.close}><img src='/images/close.svg' alt='close popup icon' /></button>
          <img className={styles['popup__image']} src={srcFull} alt={alt} />
        </div>
      }
    </>
  )
}

export default memo(Image);