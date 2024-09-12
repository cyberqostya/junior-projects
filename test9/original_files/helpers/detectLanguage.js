// Примитивный распознаватель языка ввода клиента 
// Если не английский, то русский язык

export default function detectLanguage(text) {
  return text.match(/[a-zA-Z]/) ? 'en' : 'ru';
}