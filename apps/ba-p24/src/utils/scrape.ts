import { ReferenceType } from '@/constants/index';
import { RespondToRequest } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';

export const scrapeHTML = async (url: string) => {
  try {
    if (!url) throw Error('No url provided');
    if (!url.includes('https://')) throw new Error('No https url provided');
    const req = await fetch(url);
    const data = await req.text();
    return data;
  } catch (error) {
    return null;
  }
};

export type ScrapeSchemaType = {
  selector: string;
  type: 'text' | 'number' | 'image' | 'images' | 'boolean';
  required?: boolean;
  array?: boolean;
  defaultValue: number | boolean | string | [];
  reference?: ReferenceType;
  key?: string;
};

export const organizeScrapedData = (
  {
    selector,
    array,
    reference,
    required,
    type,
    defaultValue,
  }: ScrapeSchemaType,
  dom: any,
  document: Document,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (type === 'text') {
    const text = !array
      ? document.querySelector(selector)?.textContent?.trim()
      : Array.from(document.querySelectorAll(selector))?.map((item) =>
          item?.textContent?.trim()
        );
    if (required && text.length < 1)
      return RespondToRequest(
        res,
        500,
        `unable to parse required field ${selector} (value returned as ${text})`
      );
    return text ?? defaultValue ?? '';
  }
  //
  else if (type === 'number') {
    const number = !array
      ? Number(
          document
            .querySelector(selector)
            ?.textContent?.trim()
            .replaceAll(' ', '')
            .replaceAll(/\D+/g, '')
        )
      : Array.from(document.querySelectorAll(selector))?.map((item) =>
          item?.textContent?.trim().replaceAll(' ', '').replaceAll(/\D+/g, '')
        );
    if (
      (required && !number) ||
      (required && typeof number === 'object' && number?.length < 1)
    )
      return RespondToRequest(
        res,
        500,
        `unable to parse required field ${selector} (value returned as ${number}).`
      );
    return typeof number === 'number' && !Number.isNaN(number)
      ? number
      : defaultValue;
  }
  //
  else if (type === 'boolean') {
    const elementPresent = document.querySelector(selector) ? true : false;
    return elementPresent ?? defaultValue;
  }
  //
  else if (type === 'image') {
    let imageSrc = document
      .querySelector(selector)
      ?.getAttribute('lazy-src')
      ?.trim();
    if (required && !imageSrc)
      RespondToRequest(
        res,
        500,
        `unable to parse required field ${selector} (value returned as ${imageSrc}).`
      );
    imageSrc = imageSrc.split('Crop')[0];
    return imageSrc ?? defaultValue;
  }
  //
  else if (type === 'images') {
    let gallerySrc: Array<any> | NodeListOf<any> =
      document.querySelectorAll(selector);

    if ((required && !gallerySrc) || (gallerySrc.length === 0 && required))
      RespondToRequest(
        res,
        500,
        `unable to parse required field ${selector} (value returned as ${gallerySrc}).`
      );
    gallerySrc = Array.from(gallerySrc)?.map(
      (img) => img?.getAttribute('lazy-src')?.trim().split('Crop')[0]
    );
    return gallerySrc ?? defaultValue ?? [];
  }
  //
  else {
    RespondToRequest(res, 500, `unable to parse type ${type} of ${selector}.`);
  }
};
