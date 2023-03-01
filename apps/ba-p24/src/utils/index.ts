export const convertStringToUrlFriendlyString = (value?: string) =>
  !value
    ? ''
    : value
        .replace(/[^a-z0-9_]+/gi, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase();

export const makeStringOnlyAlphaNumeric = (str?: string) =>
  !str ? str : str.replaceAll('/W/g', '');
