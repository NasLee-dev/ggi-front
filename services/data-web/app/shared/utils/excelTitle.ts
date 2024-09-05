export const excelTitle = (title: string) => {
  const today = new Date()
  const year = today.getFullYear()
  const month =
    today.getMonth() < 10
      ? (today.getMonth() + 1).toString().padStart(2, '0')
      : today.getMonth() + 1
  const day =
    today.getDate() < 10
      ? today.getDate().toString().padStart(2, '0')
      : today.getDate()

  return `${title}_${year}${month}${day}`
}
