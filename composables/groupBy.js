export function useGroupBy(arr, keyFn) {
  const groupedArray = Object.values(
    arr.reduce((acc, current) => {
      const key = keyFn(current);
      const group = acc[key] || [];
      group.push(current);
      acc[key] = group;
      return acc;
    }, {})
  );

  return {
    groupedArray,
  };
}
