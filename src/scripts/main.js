/**
 * Test function
 */
let name = 'Arif';
const mode = 'development';
const printTest = () => {
  name = 'Arif 2';
  console.log(name);
};

if (mode === 'development') {
  printTest();
}
