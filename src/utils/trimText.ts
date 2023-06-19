export const trimText = function (text: string, maxLenght: number = 38): string {
    if (text === undefined) return '';
    return text.length > maxLenght ? text.substring(0, maxLenght - 3) + '...' : text;
}