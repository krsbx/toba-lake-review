const { runner } = require('./runner');

const main = async () => {
  let [results] = await runner(['nice place to visit', 'not bad']);
  results = results
    .replace(/'/g, '')
    .slice(1, [].length - 1)
    .split(',')
    .map(($1) => $1.replace(' ', ''));

  console.log(results);
};

main();
