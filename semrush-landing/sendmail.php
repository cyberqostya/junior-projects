<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/PHPMailer.php';

  $mail = new PHPMailer\PHPMailer\PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'phpmailer/language/');
  $mail->IsHTML(true);

  // От кого письмо
  $mail->setFrom('stanli9@mail.ru', 'qweqwe1');
  // Кому отправить
  $mail->addAddress('stanli9@mail.ru');
  // Тема письма
  $mail->Subject = 'Подписка на рассылку';

  // Тело письма
  $body = '<h1>Вот, какое письмо пришло</h1>';

  if(trim(!empty($_POST['name']))) {
    $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
  }
  if(trim(!empty($_POST['email']))) {
    $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
  }
  if(trim(!empty($_POST['phone']))) {
    $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
  }
  if(trim(!empty($_POST['site']))) {
    $body.='<p><strong>Сайт для аудита:</strong> '.$_POST['site'].'</p>';
  }

  $mail->Body = $body;

  // Отправляем
  if(!$mail->send()) {
    $message = 'Ошибка';
  } else {
    $message = 'Данные отправлены!';
  }

  $response = ['message' => $message];

  header('Content-type: application/json')
  echo json_encode($response);
?>