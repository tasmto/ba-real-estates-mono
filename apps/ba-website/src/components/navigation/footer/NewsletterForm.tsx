'use client';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import * as z from 'zod';

const FormSchema = z.object({
    EMAIL: z.string().email('This is may not be a valid email'),
});

type Props = {
    className?: string;
};

const NewsletterForm = ({ className }: Props) => {
    const {
        mutate,
        isLoading,
        isError,
        isSuccess,
        error: submitError,
    } = useMutation({
        mutationFn: (email: FieldValues) => {
            const data = new FormData();
            data.append("EMAIL", email["EMAIL"]);

            return fetch(
                'https://129df916.sibforms.com/serve/MUIEAKCUnj7Q1L4YZAZPL3xmSx9g4ZyFadoxCPBsIqXV_XuhaXmCbwib7rHTnShEH7G6S-9-gHj9xENnGB3hcEW73m1IcbpXNO_sNBCgTA2UIh08xY4WGrEWmL_AEuXvFObvuT6Rucx8vzviNqmMBPH2I5xdnE1bNAuC2pGLA5eSVh4YhM6AxL4_uFg_BKFKe5q7k13-M2EXKYOh?isAjax=1',
                {
                    method: 'POST',
                    body: data,
                }
            );
        },
    });

    const { register, handleSubmit, formState } = useForm({
        resolver: zodResolver(FormSchema),
    });
    const { errors } = formState;

    return (
        <>
            {/* @ts-expect-error: this expects one child?! */}
            <form className={`flex flex-col gap-2`} onSubmit={handleSubmit(mutate)}>
                <fieldset className={`${className}`}>
                    <label htmlFor='email-address' className='sr-only'>
                        Email address
                    </label>
                    <input
                        type='email'
                        {...register('EMAIL', { required: true })}
                        autoComplete='email'
                        disabled={isLoading}
                        readOnly={isLoading}
                        id='email-address'
                        className=' w-full min-w-0  appearance-none rounded-md border border-gray-300 bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:border-primary-500 disabled:bg-gray-400 focus:placeholder-gray-400 focus:outline-none focus:ring-primary-500 sm:max-w-xs'
                        placeholder='i.e. user@example.co.za'
                    />
                    <div className='mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0'>
                        <button disabled={isLoading}
                            type='submit'
                            className='flex w-full items-center justify-center rounded-md border border-transparent bg-primary-700 py-2 px-4 text-base text-white hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-600'
                        >
                            Subscribe
                        </button>
                    </div>
                </fieldset>
                {(errors.EMAIL?.message || submitError || isError) && (
                    <div className='flex self-start justify-self-start px-6 rounded-lg bg-rose-200 py-2 text-sm text-rose-800'>
                        {JSON.stringify(errors?.EMAIL?.message || submitError).replaceAll(
                            '"',
                            ''
                        )}
                    </div>
                )}
                {(isSuccess) && (
                    <div className='flex self-start justify-self-start rounded-lg bg-primary-300 py-2 px-6 text-sm text-emerald-700'>
                        Thank you so much for signing up to our newsletter!
                    </div>
                )}
            </form>
        </>
    );
};

export default NewsletterForm;
