const readline = require('readline');
const fs = require('fs');
const util = require('util');

const args = process.argv.slice(2);
const fileName = args[0];
const n = parseInt(args[1]) || 1;

const getRecordsFromFile = async (fileName) => {
  const recordScores = [];
  if (!fs.existsSync(fileName)) {
    console.error("File not found: " + fileName);
    process.exit(1);
  }
  const readInterface = readline.createInterface({
    input: fs.createReadStream(fileName),
    console: false
  });
  for await (const line of readInterface) {
    if (line.length > 0) {
      const recordScore = readNonEmptyLine(line);
      recordScores.push(recordScore);
    }
  };
  return recordScores;
}

const readNonEmptyLine = (line) => {
  const lineRegex = /^(\d+):\s*({.*"id":.*})/;
  const isValidLine = lineRegex.test(line);
  if (!isValidLine) {
    console.error("Bad line: " + line);
    process.exit(2);
  }
  try {
    const [wholeLine, score, record] = lineRegex.exec(line);
    const recordScore = {
      score: parseFloat(score),
      id: JSON.parse(record).id
    };
    return recordScore;
  } catch (error) {
    console.error("Bad line: " + line);
    process.exit(2);
  }
}

getRecordsFromFile(fileName).then((recordScores) => {
  const topNRecords = recordScores
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
  console.log(JSON.stringify(topNRecords, null, 2));
});