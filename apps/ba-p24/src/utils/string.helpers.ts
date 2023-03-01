import isUrl from 'is-url';

/**
 * @description A simple utilirty function that removes all non-core elements (query parameters etc.) from a given url.
 * @param url string
 * @returns A url that removes all query parameters etc. from the url
 */

export const sanitizeUrl = (url: string, origin?: string) => {
  try {
    const urlObj = new URL(url);

    urlObj.protocol = origin || 'https:';
    urlObj.search = '';
    urlObj.hash = '';

    return urlObj?.toString() || url;
  } catch (error) {
    return url;
  }
};

export const isValidUrl = (urlString: string): boolean => isUrl(urlString);
