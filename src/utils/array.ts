export const uniqueArray = <T>(array: T[], property: keyof T) => {
  return array.filter((value: T, index: number, self: T[]): boolean => {
    return self.findIndex(obj => obj[property] === value[property]) === index;
  });
};
