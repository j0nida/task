export { default as match } from './matchString';
export { scrollBySmothly, scrollToSmothly } from './scroll';
export { exportCSV } from './dataExport';

export const capitalize = str => str.charAt(0).toUpperCase() + str.substring(1);

export const removeLastChar = (str, char=',') => {
    str = str.trim();
    if (str.slice(-1) === char)
        str = str.slice(0, -1);
    return str;
}
