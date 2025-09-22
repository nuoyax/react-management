type InputNumberValue = number | string | null | undefined;

function processInput(inputValue: InputNumberValue): number | null {
  if (typeof inputValue === 'number') {
    // 检查是否是 NaN 或 Infinity，如果是则返回 null
    if (!Number.isFinite(inputValue)) return null;
    return inputValue;
  }

  if (typeof inputValue === 'string') {
    const trimmedValue = inputValue.trim();
    if (trimmedValue === '') return null;

    const parsedNumber = Number(trimmedValue);
    if (Number.isNaN(parsedNumber) || !Number.isFinite(parsedNumber)) return null;
    return parsedNumber;
  }

  // 如果输入既不是数字也不是字符串，返回 null
  return null;
}

/**
 * 格式化数字，支持千分位分隔和小数位数控制
 * @param value 要格式化的数字
 * @param decimalPlaces 小数位数，默认为2
 * @param trimZero 是否去除小数末尾的0，默认为false
 * @param useGrouping 是否使用千分位分隔符，默认为true
 * @returns 格式化后的数字字符串
 * @example
 * formatNumber(1234.56)                 // 返回 "1,234.56"
 * formatNumber(1234.5, 2)               // 返回 "1,234.50"
 * formatNumber(1234.5, 2, true)         // 返回 "1,234.5"
 * formatNumber(1234.56, 2, false, false) // 返回 "1234.56"
 */
export function formatNumber(value: number, decimalPlaces?: number, trimZero = false, useGrouping = true): string {
  const processedValue = processInput(value);
  if (processedValue === null) return '';

  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: trimZero ? 0 : (decimalPlaces ?? 0),
    maximumFractionDigits: decimalPlaces ?? 2,
    useGrouping: useGrouping,
  };
  const formatter = new Intl.NumberFormat('en-US', options);
  return formatter.format(value);
}
