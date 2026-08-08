function removeDuplicates(arr) {
  const hashMap = new Set(arr);

  const resultArr = [...hashMap];
  return resultArr;
}
removeDuplicates([1, 2, 2, 3, 4, 4]);
export default removeDuplicates;
