const coffeeMaking = {
  americano: () => `물,커피원두`,
  cappuccino: () => `우유,커피원두`,
};

export const makeCoffee = (orderMenu, orderCount) => {
  const result = [];
  for (let i = 0; i < orderCount; i++) {
    result.push(coffeeMaking[orderMenu]());
  }
  return result;
};

module.exports = {
  makeCoffee,
};
