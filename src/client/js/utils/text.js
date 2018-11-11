const ignoredRegex = /(\s|-|`|%|,|\.|:|!|\?|\[|]|\/)/g

export const convertText = text => text.replace(ignoredRegex, '').toLowerCase()

export const isTextEqual = (str1, str2) => convertText(str1) === convertText(str2)

export const removeMeta = text => text.replace('`', '')
