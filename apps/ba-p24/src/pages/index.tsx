import QueFeed from "@/components/feeds/que-feed/QueFeed";
import { DateTimePicker } from "@/components/inputs/datetimepicker/DateTimePicker";
import { isValidUrl, sanitizeUrl } from "@/utils/string.helpers";
import clsx from "clsx";
import Head from "next/head";
import { type FormEvent, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { DateRangeType } from "react-tailwindcss-datepicker/dist/types";
import {
  type CompletedJobsType,
  type QueJobType,
  type UploadListingFormDataType,
} from "typings";
import { FaBrush } from "react-icons/fa";
import { api } from "@/utils/api";

export default function Home() {
  /*
   * On submit form:
      If it's not a p24 url then block the submitting
      1. Trim the string and post the url to the upload listing url. 
   */

  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data: success,
    mutate,
  } = api.listings.uploloadListing.useMutation({
    mutationFn: async (listing: UploadListingFormDataType) => {
      const req = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          ...listing,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await req.json();
      if (req.status !== 200)
        throw new Error(data?.message || "Something went wrong!");
      return data;
    },
    onSuccess: (data, listing, context) => {
      setCompletedJobs((jobs) => [
        ...jobs,
        {
          ...listing,
          success: data,
          time: new Date(),
        },
      ]);
    },
    onError: (error, listing, context) => {
      setCompletedJobs((jobs) => [
        ...jobs,
        {
          ...listing,
          error: error,
          time: new Date(),
        },
      ]);
    },
    onSettled: () => {
      setUploadQue((cur) => cur.slice(1));
    },
  });

  const ThreeMonthsFromNow = new Date();
  ThreeMonthsFromNow.setMonth(ThreeMonthsFromNow.getMonth() + 3);

  const [formButtonEnabled, setFormButtonEnabled] = useState<boolean>(false);
  const [endpoint, setEndpoint] = useState<string>("/api/p24/upload.listing");
  const [uploadQue, setUploadQue] = useState<QueJobType[]>([]);
  const [completedJobs, setCompletedJobs] = useState<CompletedJobsType[]>([]);
  const [formData, setFormData] = useState<UploadListingFormDataType>({
    p24url: "",
    mandateStartEnd: {
      startDate: new Date(),
      endDate: ThreeMonthsFromNow,
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUploadQue((cur) => [...cur, { ...formData, time: new Date() }]);
    setFormData((cur) => ({ ...cur, p24url: "" }));
  };

  // Make an error and success que that carries on to next one.
  // Clicking on a que card sets it as p24 url
  useEffect(() => {
    if (uploadQue.length <= 0 || isLoading === true || !uploadQue[0]) return;
    mutate(uploadQue[0]);
  }, [isSuccess, isError, isLoading, uploadQue]);

  // While uploading if user tries to leave the page then alert them
  useEffect(() => {
    if (isLoading)
      window.addEventListener("beforeunload", alertUserOnWindowClose);
    if (!isLoading)
      window.removeEventListener("beforeunload", alertUserOnWindowClose);
    return () => {
      window.removeEventListener("beforeunload", alertUserOnWindowClose);
    };
  }, [isLoading]);

  useEffect(() => {
    setFormButtonEnabled(
      isValidUrl(formData.p24url) &&
      uploadQue.find((item) => item.p24url === formData.p24url) ===
      undefined &&
      completedJobs
        .filter((item) => item.success)
        .find((item) => item.p24url === formData.p24url) === undefined
    );
  }, [formData.p24url]);

  const alertUserOnWindowClose = (e: any) => {
    e.preventDefault();
    e.returnValue = "";
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 bg-slate-800 py-10 pt-[35vh] ">
      <Head>
        <title>
          {uploadQue.length > 0
            ? "Uploading... | BA P24"
            : isError || completedJobs.find((item) => item.error)
              ? "Done with errors | BA P24"
              : completedJobs.length > 0
                ? "Done | BA P24"
                : "BA P24 Syncer"}
        </title>

        {uploadQue.length > 0 ? (
          <link rel="shortcut icon" href="/fav-loading.ico" />
        ) : completedJobs.find((item) => item.error) ? (
          <link rel="shortcut icon" href="/fav-error.ico" />
        ) : completedJobs.length > 0 ? (
          <link rel="shortcut icon" href="/fav-done.ico" />
        ) : (
          <link rel="shortcut icon" href="/fav.ico" />
        )}
      </Head>
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}
        className="flex w-full max-w-md grid-cols-1 flex-col  gap-y-6 gap-x-2 md:min-w-[300px]"
      >
        <fieldset className="grid gap-y-2 gap-x-2">
          <label
            htmlFor="p24-link"
            className="order-1 col-span-full block text-sm font-medium text-gray-300"
          >
            Property 24 link
          </label>
          <div className="group order-2 flex rounded-md shadow-sm sm:col-span-2">
            <select
              className={clsx(
                "mr-1 items-center rounded-l-md border border-gray-600  bg-transparent px-3 text-gray-500 group-focus:border-blue-800 sm:text-sm",
                endpoint === "/api/p24/delete.listing" &&
                "bg-rose-800/10 group-focus:border-rose-800"
              )}
              onChange={(e) => setEndpoint(e.target.value)}
            >
              <option value="/api/p24/upload.listing">Add</option>
              <option value="/api/p24/upload.listing">Edit</option>
              <option value="/api/p24/delete.listing">Delete</option>
            </select>
            <input
              value={formData.p24url || ""}
              type="url"
              name="p24 link"
              id="p24-link"
              autoComplete={"off"}
              className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-600 bg-transparent px-3 py-3  focus-within:!bg-transparent focus:!bg-transparent active:!bg-transparent group-focus:border-blue-800 group-focus:ring-blue-300 sm:text-sm"
              placeholder="www.example.com"
              onChange={(e) => {
                setFormData((cur) => ({
                  ...cur,
                  p24url: sanitizeUrl(e.target.value.trim()),
                }));
              }}
              onClick={(e) => {
                const copyTextFromClipBoard = async () => {
                  const text = await navigator.clipboard.readText();
                  if (
                    !text ||
                    typeof text !== "string" ||
                    !text.includes("property24.com/")
                  )
                    return;
                  if (
                    completedJobs.find((item) => item.p24url === text) ||
                    uploadQue.find((item) => item.p24url === text)
                  )
                    return;
                  setFormData((cur) => ({ ...cur, p24url: text }));
                };
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                copyTextFromClipBoard();
              }}
            />
          </div>
        </fieldset>
        <fieldset className="grid gap-y-2 gap-x-2">
          <label
            htmlFor="mandateStartEnd"
            className="col-span-full block text-sm font-medium text-gray-300 "
          >
            Mandate start and end date
          </label>
          <DateTimePicker
            id="mandateStartEnd"
            value={formData.mandateStartEnd}
            onChange={(dates) => {
              setFormData((cur) => ({ ...cur, mandateStartEnd: dates }));
            }}
          />
        </fieldset>
        <div className="order-last col-span-1 flex w-full gap-2 sm:order-3">
          <button
            disabled={!formButtonEnabled}
            type="submit"
            className={clsx(
              "flex w-full items-center justify-center justify-center rounded-md border border-transparent px-4 py-2 text-center font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-400 sm:text-sm",

              endpoint === "/api/p24/delete.listing"
                ? "bg-rose-800 hover:bg-rose-700 focus:ring-primary-500 "
                : " bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 "
            )}
          >
            {endpoint === "/api/p24/delete.listing"
              ? "Delete Listing"
              : " Add Listing"}
          </button>
          <button
            type="button"
            onClick={() => {
              setUploadQue([]);
              setCompletedJobs([]);
            }}
            title="This clears all the links etc."
            className=" flex items-center justify-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-center font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:bg-gray-400 sm:text-sm"
          >
            <FaBrush className="h-4 w-4" />
          </button>
        </div>
      </form>
      <QueFeed
        completedJobs={completedJobs}
        quedJobs={uploadQue}
        className="w-full max-w-md  md:min-w-[300px]"
        reAddJob={(listing) => {
          setFormData(listing);
        }}
      />
    </main>
  );
}
