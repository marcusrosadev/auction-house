export default function timestampConverter(timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const readableDate = `${month}-${day}-${year}`;

  return readableDate;
}
