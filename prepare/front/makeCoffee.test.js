const { makeCoffee } = require('./makeCoffee');

describe('coffee index.js file', () => {
  it('coffee test', () => {
    const result = makeCoffee('americano', 3);
    expect(result).toEqual(['물,커피원두', '물,커피원두', '물,커피원두']);
  });
});
