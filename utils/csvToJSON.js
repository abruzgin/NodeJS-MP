export default function csvToJSON (content) {
  const lines = content.split("\n");
  const result = [];
  const headers = lines[0].split(",");

  lines.forEach((line, lIndex) => {
    if (lIndex !== 0) {
      const obj = {};
      const currentLine = line.replace(/(?!\B"[^"]*),(?![^"]*"\B)/g, ";").split(";");
      headers.forEach((header, hIndex) => {
        obj[header] = currentLine[hIndex];
      });
      result.push(obj);
    }
  });
  return JSON.stringify(result);
}