const expectedCategories = ['Women', 'Men', 'Kids'];
const categoryProducts = {
  Women: ['DRESS', 'TOPS', 'SAREE'],
  Men: ['TSHIRTS', 'JEANS'],
  Kids: ['DRESS', 'TOPS & SHIRTS'],
};
const brandList = [
  'Polo',
  'H&M',
  'Madame',
  'Mast & Harbour',
  'Babyhug',
  'Allen Solly Junior',
  'Kookie Kids',
  'Biba',
];

const emptyCartNotification = 'Cart is empty! Click here to buy products.';

module.exports = { expectedCategories, categoryProducts, brandList, emptyCartNotification };
