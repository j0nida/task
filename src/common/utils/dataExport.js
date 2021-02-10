import FileSaver from 'file-saver'

export const arrayToCSV = (data, separator = ',') => {
    return data.map((row) => row.map((element) => `"${element || ''}"`).join(separator)).join(`\n`)
}

export const exportCSV = (data, filename, separator, noAutoBOM=true) => {
    const dataString = arrayToCSV(data, separator);
    if (typeof window !== 'undefined') {
        FileSaver.saveAs(new Blob(['\ufeff', dataString],
            { type: 'text/csv;charset=utf-8' }),
            filename+'.csv', noAutoBOM);
    }
};