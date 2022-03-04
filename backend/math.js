const calculateTip = (bill, tip = 1) => {
  let total = bill + tip;
  return total - bill;
};

const fahrenheitToCelcius = (temp) => {
  return (temp - 32) / 1.8;
};

const celciusToFahrenheit = (temp) => {
  return temp * 1.8 + 32;
};

const add = (a, b) => {
  return new Promise((resolve, rejecct) => {
    resolve(a + b);
  });
};

module.exports = {
  calculateTip,
  fahrenheitToCelcius,
  celciusToFahrenheit,
  add,
};
