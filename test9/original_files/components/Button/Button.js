import styles from './style.module.scss';
import { memo } from 'react';

function Button({ onClick, children }) {
  return <button className={styles.button} onClick={onClick}>{children}</button>
}

export default memo(Button);