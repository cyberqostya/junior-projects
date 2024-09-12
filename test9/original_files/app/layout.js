import "./globals.scss";

export const metadata = {
  title: "Тестовое Миков К",
  description: "Поиск по фотографиям на основе макета и api unsplash",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
