// math.test.js
const math = require('./math'); // The module you want to test

test('adds 1 + 2 to equal 3', () => {
  expect(math.add(1, 2)).toBe(3);
});