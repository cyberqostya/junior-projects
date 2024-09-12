// Вспомогательные функции (одна)
// Преобразователь дат в формат ISO-8601 2022-03-25
export const convertDate = (str: string):string => {

  const months: string[] = ['янв', 'фев', 'март', 'апр', 'ма', 'июн', 'июл', 'авг', 'сент', 'окт', 'нояб', 'дек'];

  const year = str.match(/\d{4}/) ? str.match(/\d{4}/)[0] : new Date().getFullYear();
  let month: number;
  let day: number;
  if(str.match(/сегодн/i)){
    month = new Date().getMonth() + 1;
    day = new Date().getDate();
  } else if(str.match(/вчер/i)) {
    month = new Date(Date.now() - 1000*60*60*24).getMonth() + 1;
    day = new Date(Date.now() - 1000*60*60*24).getDate();
  } else {
    day = Number(str.match(/\d{2}/i)[0]);
    month = months.indexOf( months.find(i => str.match(new RegExp(i,'i'))) ) + 1;
  }

  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}