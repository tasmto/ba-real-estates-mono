import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';

export type UploadListingFormDataType = {
  p24url: string;
  mandateStartEnd: DateRangeType;
};

export interface CompletedJobsType extends UploadListingFormDataType {
  success?: { message: string; listing: any };
  error?: unknown;
  time: Date;
}

export interface QueJobType extends UploadListingFormDataType {
  time: Date;
}
