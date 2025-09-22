/**
 * 将日期转换为相对时间描述
 * @param date - 要转换的日期，支持 Date 对象、时间戳或日期字符串
 * @returns 相对时间描述，如：今天、昨天、3天前、2周前、3个月前、1年前
 */
export function formatRelativeTime(date: Date | string | number): string {
  const targetDate = new Date(date);
  const now = new Date();

  // 转换为同一天的 00:00:00
  const targetDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // 计算天数差
  const diffDays = Math.floor((today.getTime() - targetDay.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return '今天';
  } else if (diffDays === 1) {
    return '昨天';
  } else if (diffDays <= 7) {
    return `${diffDays}天前`;
  } else if (diffDays <= 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks}周前`;
  } else if (diffDays <= 365) {
    const months = Math.floor(diffDays / 30);
    return `${months}个月前`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years}年前`;
  }
}
