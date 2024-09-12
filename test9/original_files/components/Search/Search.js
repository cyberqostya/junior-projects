import Input from '@com/Input/Input';
import styles from './style.module.scss';
import Button from '@com/Button/Button';
import { memo, useEffect, useState } from 'react';

function Search({
  searchPhrase,
  typeSearchPhrase,
  clearSearchPhrase,
  getImages,
  isLoading,
  isFirstLoad
}) {

  // Анимация при первом поиске
  const [isFirstAnimationPlayed, setIsFirstAnimationPlayed] = useState(false);
  useEffect(() => {
    if (isLoading && isFirstLoad) {
      setIsFirstAnimationPlayed(true);
    }
  }, [isLoading]);

  return (
    <form className={`${styles.search} ${isFirstAnimationPlayed ? styles['search_submit'] : ''}`} onSubmit={getImages}>
      <Input phrase={searchPhrase} typing={typeSearchPhrase} clear={clearSearchPhrase} />
      <Button>Искать</Button>
    </form>
  )
}

export default memo(Search);