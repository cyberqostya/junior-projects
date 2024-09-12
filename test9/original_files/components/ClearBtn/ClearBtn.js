import styles from './style.module.scss';

export default function ClearBtn({ onClick }) {
  return (
    <button className={styles.clear} onClick={onClick} type='reset'>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 20C15 20 19 16 19 12C19 7 15 4 11 4C7 4 3 7 3 12C3 16 7 20 11 20ZM8 15C8 15 8 15 8 14C8 14 8 14 8 14L10 12L8 10C8 10 8 10 8 9C8 9 8 9 8 9C9 9 9 9 9 9L11 11L13 9C13 9 13 9 14 9C14 9 14 9 14 9C14 10 14 10 14 10L12 12L14 14C14 14 14 14 14 14C14 15 14 15 14 15C13 15 13 15 13 15L11 13L9 15C9 15 9 15 8 15Z" fill="#C4C4C4" />
      </svg>
    </button>
  )
}