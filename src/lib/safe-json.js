function parse(text, fallback = null) {
  try {
    return JSON.parse(text);
  } catch {
    return fallback;
  }
}

function stringify(value) {
  return JSON.stringify(value, null, 2);
}

module.exports = { parse, stringify };
