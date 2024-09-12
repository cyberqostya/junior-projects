import styles from './style.module.scss';
import ClearBtn from '@com/ClearBtn/ClearBtn';

export default function Input({ phrase, typing, clear }) {
  return (
    <label className={styles.wrapper}>
      <img src='/images/magnifier.svg' alt='search icon' />
      <input minLength={2} required value={phrase} type='text' placeholder='Телефоны, яблоки, груши...' className={styles.input} onChange={typing} />
      {phrase.length > 0 && <ClearBtn onClick={clear} />}
    </label>
  )
}