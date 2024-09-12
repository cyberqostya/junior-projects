import './FormInput.scss';

export default function FormInput(props) {
  const { type, placeholder, className } = props;

  return(
    <input 
      className={`forminput ${className || ''}`} 
      type={type} 
      placeholder={placeholder}
    />
  );
}