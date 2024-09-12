class End {
  constructor(data) {

    // DOM Элементы
    this.form = data.form;
    this.nameInput = data.nameInput;
    this.telInput = data.telInput;
    this.submitBtn = data.submitBtn;

    this.end = data.end;
    this.subtitle = data.subtitle;
    this.success = data.success;
    this.successMessageName = data.successMessageName;

    this.form.addEventListener('submit', this.submitForm);
    this.setEndHeight(this.end.clientHeight);
  }

  submitForm = (e) => {
    e.preventDefault();
    
    let formData = new FormData(this.form);

    // fetch('sendmail.php', {
    //   method: 'POST',
    //   body: formData,
    // })
    // .then(response => {
    //   if(response.ok) { this.form.reset() }
    //   else { alert('Произошла ошибка на сервре. Перезагрузите страницу и попробуйте снова.') }
    // });

    this.drowSuccess();
  }

  setEndHeight(height) {
    this.end.style.height = height + 'px';
  }

  drowSuccess() {
    this.successMessageName.textContent = this.nameInput.value;
    this.success.style = 'display: block';
    this.setEndHeight(this.end.clientHeight - this.subtitle.clientHeight - this.form.clientHeight + this.success.clientHeight);
    this.subtitle.style = 'display: none';
    this.form.style = 'display: none';
  }
}