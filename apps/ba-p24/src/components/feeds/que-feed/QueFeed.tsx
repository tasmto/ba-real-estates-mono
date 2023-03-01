import { AutoAnimate } from '@/components/common/AutoAnimate';
import QueCard, { CueCardType } from '@/components/feeds/que-feed/QueCard';
import {
    CREATED_LISTING_RESPONSE_TEXT,
    DELETED_LISTING_RESPONSE_TEXT,
    UPDATED_LISTING_RESPONSE_TEXT,
} from '@/constants/index';
import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';
import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';
import {
    CompletedJobsType,
    QueJobType,
    UploadListingFormDataType,
} from 'typings';

interface Props extends HTMLAttributes<HTMLElement> {
    completedJobs: CompletedJobsType[];
    quedJobs: QueJobType[];
    reAddJob: (listing: UploadListingFormDataType) => void;
}

const QueFeed = ({
    completedJobs,
    quedJobs,
    reAddJob,
    className,
    ...rest
}: Props) => {
    let fomatedJobs: Array<
        CueCardType & {
            url: string;
            mandateDates: DateRangeType;
            success?: Record<string, any>;
        }
    > = completedJobs.map((job) => ({
        type: job.error
            ? 'error'
            : job?.success?.message === DELETED_LISTING_RESPONSE_TEXT
                ? 'delete'
                : job?.success?.message === UPDATED_LISTING_RESPONSE_TEXT
                    ? 'edit'
                    : job.success
                        ? 'success'
                        : 'normal',
        userName: '',
        userImage: '',
        description: job.p24url?.replaceAll('https://www.property24.com/', ''),
        title: job.success
            ? job.success?.message || CREATED_LISTING_RESPONSE_TEXT
            : job.error
                ? //   @ts-expect-error
                typeof job.error?.message === 'string'
                    //   @ts-expect-error
                    ? job.error?.message
                    : 'Something went wrong'
                : 'Unknown status',
        time: new Intl.DateTimeFormat('default', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        }).format(job.time),
        url: job.p24url,
        mandateDates: job.mandateStartEnd,
        success: job.success,
    }));

    fomatedJobs = fomatedJobs.concat(
        quedJobs.map((job) => ({
            type: 'loading',
            userName: '',
            userImage: '',
            description: job.p24url?.replaceAll('https://www.property24.com/', ''),
            title: 'Waiting to be added or removed...',
            time: new Intl.DateTimeFormat('default', {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            }).format(job.time),
            url: job.p24url,
            mandateDates: job.mandateStartEnd,
        }))
    );
    return (
        <aside {...rest} className={clsx('flow-root', className)}>
            <AutoAnimate as='ul' role='list' className='-mb-8'>
                {fomatedJobs
                    .reverse()
                    .map(
                        (
                            {
                                type,
                                userName,
                                userImage,
                                description,
                                title,
                                time,
                                url,
                                mandateDates,
                                success,
                            },
                            i
                        ) => (
                            <QueCard
                                isLast={i === fomatedJobs.length - 1}
                                key={url || time}
                                type={type}
                                userName={userName}
                                userImage={userImage}
                                description={description}
                                title={title}
                                time={time}
                                className={
                                    type === 'error' || (type === 'success' && success?.url)
                                        ? 'cursor-pointer'
                                        : type === 'loading'
                                            ? 'cursor-wait'
                                            : ''
                                }
                                onClick={(e) => {
                                    if (type === 'error')
                                        reAddJob({ p24url: url, mandateStartEnd: mandateDates });
                                    if (type === 'success' && success?.url)
                                        window.open(
                                            `https://www.barealestates.co.za/listings/${success?.url}`,
                                            '_blank'
                                        );
                                }}
                            />
                        )
                    )}
            </AutoAnimate>
        </aside>
    );
};

export default QueFeed;
