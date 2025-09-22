/**
 * 将字符串分割为单词
 * [A-Z]{2,}(?![a-z]): 匹配两个或更多大写字母且后面没有跟着小写字母。在“XMLFile”中，匹配到了“XML”。
 * [A-Z][a-z]+: 匹配一个大写字母，后面跟着一个或多个小写字母。
 * [a-z]+: 匹配一个或多个小写字母
 * \d+: Matches one or more digits.
 */
export function splitIntoWords(text: string | null | undefined): string[] {
  if (!text) return [];
  const wordRegex = /[A-Z]{2,}(?![a-z])|[A-Z][a-z]+|[a-z]+|[A-Z]|\d+/g;
  const words = text.match(wordRegex)?.map(word => word.toLowerCase());
  return words || [];
}
