/**
 * 实现数组的at方法
 * @param arr 目标数组
 * @param index 索引值，可以是正数或负数
 * @returns 返回对应索引的元素，如果索引无效则返回undefined
 */
export function at<T>(arr: T[], index: number): T | undefined {
  // 处理负数索引，将其转换为正数索引
  const len = arr.length;
  const positiveIndex = index >= 0 ? index : len + index;

  // 检查索引是否有效
  if (positiveIndex < 0 || positiveIndex >= len) {
    return undefined;
  }

  return arr[positiveIndex];
}

/**
 * 使用正则表达式将不同命名格式的字符串转换为单词数组
 * @param str 输入的字符串，可以是小驼峰、大驼峰、snake_case或kebab-case格式
 * @returns 单词数组
 */
export function splitNameToWords(str: string): string[] {
  if (!str) return [];
  return str
    .split(/(?=[A-Z][a-z])|(?<=[a-z])(?=[A-Z])|[-_]/)
    .filter(Boolean)
    .map(word => word.toLowerCase());
}

/**
 * 测试用例
 */
// console.log(splitNameToWords('getUserName')); // ['get', 'user', 'name']
// console.log(splitNameToWords('GetUserName')); // ['get', 'user', 'name']
// console.log(splitNameToWords('user_name')); // ['user', 'name']
// console.log(splitNameToWords('user-name')); // ['user', 'name']
// console.log(splitNameToWords('XMLHttpRequest')); // ['xml', 'http', 'request']

/**
 * -> snake_case
 */
export function toSnackCase(str: string): string {
  return splitNameToWords(str).join('_');
}
export function toKebabCase(str: string): string {
  return splitNameToWords(str).join('-');
}
export function toCamelCase(str: string): string {
  const words = splitNameToWords(str);
  return (
    words[0] +
    words
      .slice(1)
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join('')
  );
}
export function toPascalCase(str: string): string {
  return toCamelCase(str).replace(/^[a-z]/, match => match.toUpperCase());
}

/**
 * 对象数组去重策略
 */
export const UniqueStrategy = {
  /** 保留第一个出现的元素 */
  KEEP_FIRST: 'keepFirst',
  /** 保留最后一个出现的元素 */
  KEEP_LAST: 'keepLast',
  /** 合并重复项 */
  MERGE: 'merge',
} as const;

type UniqueStrategyType = ObjectToEnum<typeof UniqueStrategy>;

interface UniqueOptions<T> {
  /** 用于确定唯一性的键或键生成函数 */
  key: keyof T | ((item: T) => string);
  /** 去重策略 */
  strategy?: UniqueStrategyType;
  /** 当策略为MERGE时的合并函数 */
  mergeFunction?: (existing: T, newItem: T) => T;
}

/**
 * 对象数组去重
 * @param array 需要去重的对象数组
 * @param options 去重选项
 * @returns 去重后的数组
 * @example
 * // 基本用法 - 按id去重，保留第一个出现的元素
 * const uniqueUsers = uniqueObjectArray(users, { key: 'id' });
 *
 * // 使用自定义键生成函数
 * const uniqueByNameAndAge = uniqueObjectArray(users, {
 *   key: user => `${user.name}-${user.age}`
 * });
 *
 * // 保留最后一个出现的元素
 * const uniqueKeepLast = uniqueObjectArray(users, {
 *   key: 'id',
 *   strategy: UniqueStrategy.KEEP_LAST
 * });
 *
 * // 合并重复项
 * const mergedUsers = uniqueObjectArray(users, {
 *   key: 'id',
 *   strategy: UniqueStrategy.MERGE,
 *   mergeFunction: (existing, newItem) => ({
 *     ...existing,
 *     ...newItem,
 *     visits: (existing.visits || 0) + (newItem.visits || 0)
 *   })
 * });
 */
export function uniqueObjectArray<T extends object>(array: T[], options: UniqueOptions<T>): T[] {
  const { key, strategy = UniqueStrategy.KEEP_FIRST, mergeFunction } = options;

  const getKey = typeof key === 'function' ? key : (item: T) => String(item[key]);

  const map = new Map<string, T>();

  for (const item of array) {
    const itemKey = getKey(item);

    switch (strategy) {
      case UniqueStrategy.KEEP_FIRST:
        if (!map.has(itemKey)) {
          map.set(itemKey, item);
        }
        break;

      case UniqueStrategy.KEEP_LAST:
        map.set(itemKey, item);
        break;

      case UniqueStrategy.MERGE:
        if (map.has(itemKey) && mergeFunction) {
          const existingItem = map.get(itemKey)!;
          map.set(itemKey, mergeFunction(existingItem, item));
        } else {
          map.set(itemKey, item);
        }
        break;
    }
  }

  return Array.from(map.values());
}

/**
 * 排序条件
 */
export interface SortCondition<T> {
  /** 排序字段或自定义排序函数 */
  key: keyof T | ((item: T) => any);
  /** 排序方向 */
  direction?: SortDirection;
  /** 自定义比较函数 */
  comparator?: (a: any, b: any) => number;
}

/**
 * 对象数组排序
 * @param array 需要排序的对象数组
 * @param conditions 排序条件，可以是单个条件或条件数组
 * @returns 排序后的新数组
 * @example
 * // 基本用法 - 按单个字段升序排序
 * const sortedUsers = sortObjectArray(users, { key: 'age' });
 *
 * // 按单个字段降序排序
 * const sortedByAgeDesc = sortObjectArray(users, {
 *   key: 'age',
 *   direction: 'desc'
 * });
 *
 * // 使用自定义排序函数
 * const sortedByNameLength = sortObjectArray(users, {
 *   key: user => user.name.length
 * });
 *
 * // 多字段排序 - 先按年龄降序，再按名字升序
 * const sortedByAgeAndName = sortObjectArray(users, [
 *   { key: 'age', direction: 'desc' },
 *   { key: 'name' }
 * ]);
 *
 * // 使用自定义比较函数
 * const sortedWithCustomComparator = sortObjectArray(users, {
 *   key: 'name',
 *   comparator: (a, b) => a.localeCompare(b, 'zh-CN')
 * });
 */
export function sortObjectArray<T extends object>(array: T[], conditions: SortCondition<T> | SortCondition<T>[]): T[] {
  // 创建数组副本以避免修改原数组
  const result = [...array];

  // 确保条件是数组形式
  const sortConditions = Array.isArray(conditions) ? conditions : [conditions];

  return result.sort((a, b) => {
    // 遍历所有排序条件
    for (const condition of sortConditions) {
      const { key, direction = 'asc', comparator } = condition;

      // 获取比较值
      const getValue = typeof key === 'function' ? key : (item: T) => item[key];
      const valueA = getValue(a);
      const valueB = getValue(b);

      // 使用自定义比较函数或默认比较
      let compareResult: number;

      if (comparator) {
        compareResult = comparator(valueA, valueB);
      } else {
        // 默认比较逻辑
        if (valueA === valueB) {
          compareResult = 0;
        } else if (valueA === null || valueA === undefined) {
          compareResult = 1; // null/undefined 值排在后面
        } else if (valueB === null || valueB === undefined) {
          compareResult = -1; // null/undefined 值排在后面
        } else if (typeof valueA === 'string' && typeof valueB === 'string') {
          compareResult = valueA.localeCompare(valueB);
        } else {
          compareResult = valueA < valueB ? -1 : 1;
        }
      }

      // 如果是降序，反转比较结果
      if (direction === 'desc') {
        compareResult = -compareResult;
      }

      // 如果当前条件可以确定顺序，则返回结果
      if (compareResult !== 0) {
        return compareResult;
      }
    }

    // 所有条件都相等，保持原顺序
    return 0;
  });
}
