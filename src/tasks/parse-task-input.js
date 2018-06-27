function parseDuration(str) {
  const numStr = /\d+(\.\d+)?/.exec(str)[0];
  let num = parseFloat(numStr);
  const units = str.slice(numStr.length);
  switch (units.toLowerCase()) {
    case 'h':
    case 'hour':
    case 'hours':
      num *= 60 * 60 * 1000;
      break;
    case 'm':
    case 'min':
      num *= 60 * 1000;
      break;
    case 's':
    case 'sec':
      num *= 1000;
      break;
    default:
      throw new Error(`Unknown unit ${units}`);
  }
  return num;
}

function parseTaskInput(name) {
  const res = /(\d+(\.\d+)?(m|min|s|sec|h|hour))$/.exec(name);
  let title = name;
  let duration = 30 * 60 * 1000;
  if (res) {
    title = name.slice(0, res.index);
    duration = parseDuration(res[0]);
  }
  return {
    title,
    duration
  };
}

export default parseTaskInput;
