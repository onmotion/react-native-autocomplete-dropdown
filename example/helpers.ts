export const generateDataSet = (n = 450) => {
  return new Array(n)
    .fill({ id: '1', title: 'test' })
    .map((item, i) => ({ ...item, id: i.toString(), title: item.title + i }))
}
