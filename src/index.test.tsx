import { compare } from ".";

test('ID selector and Class selector vs Attribute and class selector',() => {
    let a  = '#container > .element';
    let b = 'body > .element';
    expect(compare(a,b)).toBe(990);
})
test('Attribute vs Class selector',() => {
    let a  = 'body';
    let b = '.element';
    expect(compare(a,b)).toBe(-90);
})
test('Class and Pseudo-elements selector vs Class and Pseudo-class selector',() => {
    let a  = '.element + .element::last-child';
    let b = '.element:hover';
    expect(compare(a,b)).toBe(10);
})
test('Attribute selector vs Attribute and Pseudo-class selector',() => {
    let a  = 'input[type=text]';
    let b = 'li:hover';
    expect(compare(a,b)).toBe(0);
})
