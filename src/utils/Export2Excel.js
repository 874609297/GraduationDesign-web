import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
 
/**
 *
 * @param {Object} workbook 工作薄
 * @param {Object} worksheet 工作表
 * @param {Object} cell 单元格
 * 标记，引用单元格时所使用的地址格式（如：A1、C7）
 */
function datenum (v, date1904) {
    if (date1904) v += 1462
    var epoch = Date.parse(v)
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000)
}
 
function sheetFromArrayOfArrays (data, opts) {
    var ws = {}
    var range = {
        s: {
            c: 10000000,
            r: 10000000
        },
        e: {
            c: 0,
            r: 0
        }
    }
    for (var R = 0; R !== data.length; ++R) {
        for (var C = 0; C !== data[R].length; ++C) {
            if (range.s.r > R) range.s.r = R
            if (range.s.c > C) range.s.c = C
            if (range.e.r < R) range.e.r = R
            if (range.e.c < C) range.e.c = C
            var cell = {
                v: data[R][C] // v表示单元格原始值， t表示内容类型，s-string类型，n-number类型，b-boolean类型，d-date类型，等等
            }
            if (cell.v == null) continue
            /**
             * 通过地址对象 { r: R, c: C } 来获取单元格，R 和 C 分别代表从 0 开始的行和列的索引。
             * XLSX.utils 中的 encode_cell/decode_cell 方法可以转换单元格地址
             *    XLSX.utils.encode_cell({ r: 7, c: 2 })  ===》 C7
             */
            var cellRef = XLSX.utils.encode_cell({ c: C, r: R })
 
            if (typeof cell.v === 'number') cell.t = 'n'
            else if (typeof cell.v === 'boolean') cell.t = 'b'
            else if (cell.v instanceof Date) {
                cell.t = 'n'
                cell.z = XLSX.SSF._table[14]
                cell.v = datenum(cell.v)
            } else cell.t = 's'
 
            ws[cellRef] = cell
        }
    }
    // ws['!ref']：表示所有单元格的范围，例如从A1到F8则记录为A1:F8
    if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range)
    return ws
}
 
function Workbook () {
    if (!(this instanceof Workbook)) return new Workbook()
    this.SheetNames = []
    this.Sheets = {}
}
 
// 字符串转为ArrayBuffer
function s2ab (s) {
    var buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
    return buf
}
 
/**
 *
 * @param {Array} multiHeader  多行表头
 * @param {Array} header  表头
 * @param {Array} data  数据
 * @param {String} filename  文件名
 * @param {Array} merges  合并单元格
 * @param {Boolean} autoWidth  是否设置单元格宽度
 * @param {String} bookType  要生成的文件类型
 */
export function exportJsonToExcel ({
                                       multiHeader = [],
                                       header,
                                       data,
                                       filename,
                                       merges = [],
                                       autoWidth = true,
                                       bookType = 'xlsx'
                                   } = {}) {
    filename = filename || 'excel-list'
    data = [...data]
    data.unshift(header)
 
    for (let i = multiHeader.length - 1; i > -1; i--) {
        data.unshift(multiHeader[i])
    }
 
    var wsName = 'SheetJS'
    var wb = new Workbook()
    var ws = sheetFromArrayOfArrays(data)
 
    if (merges.length > 0) {
        // ws[!merges]：存放一些单元格合并信息，是一个数组，每个数组由包含s和e构成的对象组成，s表示开始，e表示结束，r表示行，c表示列
        if (!ws['!merges']) ws['!merges'] = []
        merges.forEach(item => {
            ws['!merges'].push(XLSX.utils.decode_range(item))
        })
    }
 
    if (autoWidth) {
        /* 设置worksheet每列的最大宽度 */
        const colWidth = data.map(row => row.map(val => {
            /* 先判断是否为null/undefined */
            if (val == null) {
                return { 'wch': 10 }
            } else if (val.toString().charCodeAt(0) > 255) { /* 再判断是否为中文 */
                return {
                    'wch': val.toString().length * 2
                }
            } else {
                return {
                    'wch': val.toString().length
                }
            }
        }))
        /* 以第一行为初始值 */
        let result = colWidth[0]
        for (let i = 1; i < colWidth.length; i++) {
            for (let j = 0; j < colWidth[i].length; j++) {
                if (result[j] && result[j]['wch'] < colWidth[i][j]['wch']) {
                    result[j]['wch'] = colWidth[i][j]['wch']
                }
            }
        }
        // ws['!cols']设置单元格宽度, [{'wch': 10},{'wch': 10}] ===> 第一列和第二列设置了宽度
        ws['!cols'] = result
    }
 
    /* add worksheet to workbook */
    wb.SheetNames.push(wsName)
    wb.Sheets[wsName] = ws
 
    var wbout = XLSX.write(wb, {
        bookType: bookType,
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    })
    saveAs(
        new Blob([s2ab(wbout)], { type: 'application/octet-stream' }),
        `${filename}.${bookType}`
    )
}
 