/**
 * The function `generateYearOptions` creates an array of YearOption objects with labels and values
 * representing years within a specified range.
 * @param {number} startYear - startYear is the beginning year for generating the year options. In the
 * example provided, it is set to 1980.
 * @param {number} endYear - The `endYear` parameter specifies the last year for which you want to
 * generate options. In the example usage provided, `endYear` is set to 2080, meaning that the
 * `generateYearOptions` function will create year options from 1980 to 2080 inclusive.
 * @returns An array of `YearOption` objects representing the years from 1980 to 2080, where each
 * object has a `label` and `value` property containing the year as a string.
 */
interface YearOption {
  label: string;
  value: string;
}

export function generateYearOptions(
  startYear: number,
  endYear: number,
): YearOption[] {
  const yearOptions: YearOption[] = [];
  for (let year = startYear; year <= endYear; year++) {
    const yearStr = year.toString();
    yearOptions.push({label: yearStr, value: yearStr});
  }
  return yearOptions;
}
