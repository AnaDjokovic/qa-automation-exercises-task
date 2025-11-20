/**
 * Converts RSD amount to USD based on fetched exchange rate
 * Round number
 *
 * @param { number } rsdAmount - Value represent price in RSD
 * @param { number } usdRate - Middle USD exchange rate
 * @returns { number } Rounded USD value
 */
function convertRsdToUsd(rsdAmount, usdRate) {
  if (typeof rsdAmount !== 'number' || typeof usdRate !== 'number') {
    throw new Error('ERROR: Values should be type number!');
  }

  return Math.round(rsdAmount / usdRate);
}

module.exports = convertRsdToUsd;
