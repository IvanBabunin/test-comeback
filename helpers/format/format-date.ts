export function formatDate(
  value: Date | string | number,
  locale = 'uk-UA',
  options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' },
) {
  return new Intl.DateTimeFormat(locale, options).format(new Date(value));
}

export function formatTime(value: Date | string | number, locale = 'uk-UA') {
  return new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' }).format(
    new Date(value),
  );
}
