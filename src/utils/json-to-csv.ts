type CsvHeaderItem<T extends Record<string, unknown>> = {
  key: keyof T;
  label: string;
};

type ColumnFormatters<T extends Record<string, unknown>> = {
  [K in keyof T]?: (value: T[K], row: T) => string;
};

/**
 * CSV 导出配置选项
 */
type CsvOptions<T extends Record<string, unknown>> = {
  /** 数据源数组 */
  data: T[];
  /** 表头配置，定义列的键和显示标签 */
  header: CsvHeaderItem<T>[];
  /** 列格式化器，用于自定义每列的数据格式化 */
  formatters?: ColumnFormatters<T>;
  /** 字段分隔符，默认为逗号 ',' */
  delimiter?: string;
  /** 行结束符，默认为 '\r\n' (Windows 格式) */
  eol?: string;
  /** 是否包含表头行，默认为 true */
  withHeader?: boolean;
  /** 是否添加 BOM (Byte Order Mark)，用于 Excel 正确识别 UTF-8 编码，默认为 true */
  withBom?: boolean;
};

/**
 * 将 JSON 数据转换为 CSV 格式字符串
 * @param options - CSV 导出配置选项
 * @returns CSV 格式的字符串
 */
export function jsonToCsv<T extends Record<string, unknown>>(options: CsvOptions<T>): string {
  const { data, header, formatters = {}, delimiter = ',', eol = '\r\n', withHeader = true, withBom = true } = options;

  if (!Array.isArray(data)) throw new TypeError('data must be an array');
  if (!Array.isArray(header)) throw new TypeError('header must be an array');
  if (header.length === 0) throw new TypeError('header cannot be empty');

  // 预编译正则表达式，避免重复创建
  const specialChars = /[.*+?^${}()|[\]\\]/g;
  const delimiterEscaped = delimiter.replace(specialChars, '\\$&');
  const quoteRegex = new RegExp(`["\n\r${delimiterEscaped}]`);

  /* 工具：转义单元格 */
  const escapeCell = (value: string): string => {
    if (!value) return value;
    const mustQuote = quoteRegex.test(value);
    return mustQuote ? `"${value.replace(/"/g, '""')}"` : value;
  };

  /* 工具：默认格式化 */
  const defaultFormatter = (v: unknown): string => (v === null || v === undefined ? '' : String(v));

  // 预计算容量，减少数组扩容
  const estimatedLines = (withHeader ? 1 : 0) + data.length;
  const lines: string[] = new Array(estimatedLines);
  let lineIndex = 0;

  /* 表头 */
  if (withHeader) {
    lines[lineIndex++] = header.map(h => escapeCell(h.label)).join(delimiter);
  }

  /* 数据行 */
  for (const row of data) {
    const cells = header.map(({ key }) => {
      const raw = row[key];
      const formatter = (formatters as any)[key] ?? defaultFormatter;
      const formatted = formatter(raw, row);
      return escapeCell(formatted);
    });
    lines[lineIndex++] = cells.join(delimiter);
  }

  const csvBody = lines.join(eol);
  return withBom ? '\uFEFF' + csvBody : csvBody;
}

/**
 * 下载 CSV 文件
 * @param csvContent - CSV 内容字符串
 * @param filename - 文件名，默认为 'data.csv'
 */
export function downloadCsv(csvContent: string, filename: string = 'data.csv'): void {
  // 确保文件名有 .csv 扩展名
  const csvFilename = filename.toLowerCase().endsWith('.csv') ? filename : `${filename}.csv`;

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', csvFilename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // 清理 URL 对象
  URL.revokeObjectURL(url);
}

/**
 * 一键导出 JSON 数据为 CSV 文件
 * @param options - CSV 导出配置选项
 * @param filename - 文件名，默认为 'data.csv'
 */
export function exportJsonToCsv<T extends Record<string, unknown>>(
  options: CsvOptions<T>,
  filename: string = 'data.csv',
): void {
  const csvContent = jsonToCsv(options);
  downloadCsv(csvContent, filename);
}
