const CSS_SELECTOR_REGEX_MAP: Record<string, RegExp> = {
  id: /(#[^#\s+>~.[:)]+)/g,
  class: /(\.[^\s+>~.[:)]+)/g,
  attribute: /(\[[^\]]+\])/g,
  pseudoClass: /(:(?!not|global|local)[^\s+>~.[:]+)/g,
  tag: /([^\s+>~.[:]+)/g,
  pseudoElement: /(::[^\s+>~.[:]+|:first-line|:first-letter|:before|:after)/gi,
};
const CSS_SELECTOR_PRIORITY_MAP: Record<string, number> = {
  attribute: 100,
  id: 1000,
  class: 100,
  tag: 10,
  pseudoElement: 10,
  pseudoClass: 100,
};
export function calculatePriority(input: string) {
  let text = input;
  return Object.keys(CSS_SELECTOR_REGEX_MAP).reduce((pre, key) => {
    const regex = CSS_SELECTOR_REGEX_MAP[key];
    let count = 0;
    while (true) {
      const rexArray = regex.exec(text);
      if (rexArray) {
        count++;
        text = text.replace(rexArray[0], "");
      } else {
        break;
      }
    }
    return pre + count * CSS_SELECTOR_PRIORITY_MAP[key];
  }, 0);
}

export function compare(a: string, b: string) {
  const priority_a = calculatePriority(a);
  const priority_b = calculatePriority(b);
  return priority_a - priority_b;
}
