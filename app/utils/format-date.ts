export function formatDate(date: Date) {
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options as any).format(date);
  return formattedDate;
}