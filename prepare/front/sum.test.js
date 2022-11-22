const { sum } = require('./sum');

describe('test index.js file', () => {
  it('sums a and b', () => {
    let result = sum(1, 2);
    expect(result).toBe(3);
    result = sum(3, 4);
    expect(result).toBe(7);
  });
});
