export default function formatDate (date: string) {
  const dateFormat = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  });
  return dateFormat.format(new Date(date));
};
