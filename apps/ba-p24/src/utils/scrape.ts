import { type ReferenceType } from "@/constants/index";
import { type NextApiRequest, type NextApiResponse } from "next";

export const scrapeHTML = async (url: string) => {
  try {
    if (!url) throw Error("No url provided");
    if (!url.includes("https://")) throw new Error("No https url provided");
    const req = await fetch(url);
    const data = await req.text();
    return data;
  } catch (error) {
    return null;
  }
};

export type ScrapeSchemaType = {
  selector: string;
  type: "text" | "number" | "image" | "images" | "boolean";
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
  document: Document
) => {
  if (type === "text") {
    const text = !array
      ? document.querySelector(selector)?.textContent?.trim()
      : Array.from(document.querySelectorAll(selector))?.map((item) =>
          item?.textContent?.trim()
        );
    if (required && (!text || text?.length <= 0))
      return new Error(
        `unable to parse required field ${selector} (value returned as ${
          text?.toString() || "unknown"
        })`
      );
    return text ?? defaultValue ?? "";
  }
  //
  else if (type === "number") {
    const number = !array
      ? Number(
          document
            .querySelector(selector)
            ?.textContent?.trim()
            .replaceAll(" ", "")
            .replaceAll(/\D+/g, "")
        )
      : Array.from(document.querySelectorAll(selector))?.map((item) =>
          item?.textContent?.trim().replaceAll(" ", "").replaceAll(/\D+/g, "")
        );
    if (
      (required && !number) ||
      (required && typeof number === "object" && number?.length < 1)
    )
      throw new Error(
        `unable to parse required field ${selector} (value returned as ${number.toString()}).`
      );
    return typeof number === "number" && !Number.isNaN(number)
      ? number
      : defaultValue;
  }
  //
  else if (type === "boolean") {
    const elementPresent = document.querySelector(selector) ? true : false;
    return elementPresent ?? defaultValue;
  }
  //
  else if (type === "image") {
    let imageSrc = document
      .querySelector(selector)
      ?.getAttribute("lazy-src")
      ?.trim();
    if (required && !imageSrc)
      throw new Error(
        `unable to parse required field ${selector} (value returned as ${
          imageSrc || "unknown"
        }).`
      );
    imageSrc = imageSrc?.split("Crop")[0];
    return imageSrc ?? defaultValue;
  }
  //
  else if (type === "images") {
    let gallerySrc: Array<any> | NodeListOf<any> =
      document.querySelectorAll(selector);

    if ((required && !gallerySrc) || (gallerySrc.length === 0 && required))
      throw new Error(
        `unable to parse required field ${selector} (value returned as ${Array.from(
          gallerySrc
        ).toString()}).`
      );
    gallerySrc = Array.from(gallerySrc)?.map(
      (img) => img?.getAttribute("lazy-src")?.trim().split("Crop")[0]
    );
    return gallerySrc ?? defaultValue ?? [];
  }
  //
  else {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`unable to parse type ${type} of ${selector}.`);
  }
};
