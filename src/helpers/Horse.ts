interface LabelValuePair {
  label: string;
  value: string;
}

export function generateList(enumObj: any): LabelValuePair[] {
  return Object.keys(enumObj)
    .filter(key => !Number.parseInt(key, 10)) // Specify radix 10
    .map(key => ({
      label: enumObj[key],
      value: key,
    }));
}
