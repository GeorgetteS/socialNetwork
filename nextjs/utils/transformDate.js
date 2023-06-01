export function transformDate(dateString) {
  const date = new Date(dateString);

  const options = {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };

  return new Intl.DateTimeFormat('ru-RU', options).format(date);
}
