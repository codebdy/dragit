
var seedId = 1;
export const createId = () => {
  return (seedId++).toString();
};
