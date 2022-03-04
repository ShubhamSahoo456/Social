const {
  calculateTip,
  celciusToFahrenheit,
  fahrenheitToCelcius,
  add,
} = require("../math");

test("should first calculate tip by given value", () => {
  let countTip = calculateTip(10, 3);
  expect(countTip).toBe(3);
});

test("should second calculate tip with default value", () => {
  let countTip = calculateTip(10);
  expect(countTip).toBe(1);
});

test("should convert 32F to 0 C", () => {
  let temp = fahrenheitToCelcius(32);
  expect(temp).toBe(0);
});

test("should convert 0 C to 32F", () => {
  let temp = celciusToFahrenheit(0);
  expect(temp).toBe(32);
});

test("should add two numbers", (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5);
    done();
  });
});

test("should add two numbers async/await", async () => {
  let sum = await add(2, 3);
  expect(sum).toBe(5);
});
