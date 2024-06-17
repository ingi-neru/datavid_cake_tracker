export default function transformData(data) {
  data.forEach((row) => {
    row.birthday = new Date(row.birthday).toLocaleDateString();
  });
}
