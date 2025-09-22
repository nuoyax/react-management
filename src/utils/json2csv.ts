type Header = {
  key: string;
  label: string;
};

type Options = {
  delimiter?: string;
  headers: Header[]; // 表头，eg: [{ key: 'startTime', label: '开始时间' }]
  withBOM?: boolean;
  escapeQuotes?: boolean;
  // 用于定义列格式转换的函数类型，eg: { startTime: (value: any) => new Date(value).toLocaleString() }
  formatters?: {
    [key: string]: (value: any) => string;
  };
};

export function json2csv(data: any, options: Options): string {
  const { delimiter = ',', headers, withBOM = true, escapeQuotes = true, formatters = {} } = options;
  const headerKeys = headers.map(header => header.key);
  const headerLabels = headers.map(header => header.label);
  const rows = data.map((item: any) => {
    return headerKeys.map(key => {
      let value = item[key];
      if (formatters[key]) {
        value = formatters[key](value);
      }
      if (escapeQuotes) {
        value = value.replace(/"/g, '""');
      }
      return `"${value}"`;
    });
  });
  const csv = [headerLabels, ...rows].map(row => row.join(delimiter));
  return withBOM ? '\ufeff' + csv.join('\n') : csv.join('\n');
}

/**
 * 导出 CSV 文件
 * @param data 数据
 * @param options 配置项
 *  - filename: 文件名，默认为 'data.csv'
 *  - delimiter: 分隔符，默认为逗号 ','
 *  - headers: 表头配置数组，每项包含 key（字段名）和 label（显示名）
 *  - withBOM: 是否添加 BOM 字符，用于解决 Excel 打开 CSV 文件中文乱码问题，默认为 true
 *  - escapeQuotes: 是否转义引号，防止 CSV 格式错误，默认为 true
 *  - formatters: 格式化函数对象，key 为字段名，value 为格式化函数，用于转换数据格式
 */
export function exportCsv(data: any, options: Options & { filename: string }): void {
  const { filename = 'data.csv', ...restOptions } = options;
  const csvContent = json2csv(data, restOptions);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', ensureCsvExtension(filename));
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

/**
 * 判断文件名是否以.csv结尾，如果不是则添加
 * @param filename 文件名
 * @returns 处理后的文件名
 */
function ensureCsvExtension(filename: string): string {
  return filename.toLowerCase().endsWith('.csv') ? filename : `${filename}.csv`;
}
