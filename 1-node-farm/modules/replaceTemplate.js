export default function replaceTemplate(template, product) {
  let output = template;
  for (const key in product) {
    const value = product[key];
    output =
      typeof value === 'boolean'
        ? output.replace(
            RegExp(`{%${value ? '' : 'NOT_'}${key.toUpperCase()}%}`, 'g'),
            `${value ? '' : 'not-'}${key}`
          )
        : output.replace(RegExp(`{%${key.toUpperCase()}%}`, 'g'), value);
  }
  return output;
}
