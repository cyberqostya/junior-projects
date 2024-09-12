import './Tag.scss';

export default function Tag(props) {
  const { title, image, counter } = props;

  return(
    <div className='tag'>
      <p className='tag__title'>{title}</p>
      <img src={image} className='tag__image' alt='animal'/>
      <p className='tag__counter'>{counter}</p>
    </div>
  );
}