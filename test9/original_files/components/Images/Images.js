import styles from './style.module.scss';
import Image from '@com/Image/Image';
import Button from "@com/Button/Button";

function Images({ apiResponse, displayedImages, loadMoreImages, isLoading }) {
  return (
    <div className={styles.container}>
      <ul className={styles.images}>
        {displayedImages.map((i, key) => <Image key={key} src={i.urls.small} alt={i.alt_description} srcFull={i.urls.full} />)}
      </ul>

      {(apiResponse.total_pages > 1 && displayedImages.length < apiResponse.total) &&
        <div className={`${styles.button} ${isLoading ? styles['button_loading'] : ''}`}>
          <Button onClick={loadMoreImages}>Показать ещё</Button>
        </div>
      }
    </div>
  )
}

export default Images;