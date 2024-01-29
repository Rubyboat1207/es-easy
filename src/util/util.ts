export function toSorted<T>(arr: T[], sortFn: (a: T, b: T) => number) {
    const array = [...arr];

    array.sort(sortFn);

    return array;
}