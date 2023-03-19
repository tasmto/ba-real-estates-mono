'use client';
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { HiArrowRight } from 'react-icons/hi';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import Link from 'next/link';
import * as z from 'zod';



const FormSchema = z.object({
    name: z.string(),
    phone: z
        .string()
        .min(9, 'This phone number might be too short')
        .max(12, 'The phone number you have entered is too long'),
    email: z.string().email('This is may not be a valid email'),
    message: z.string().min(10, 'Please enter a longer message'),
});

const ContactForm = () => {
    const [loading, setLoading] = useState(false);
    const [formSubmited, setFormSubmitted] = useState(false);
    const { register, handleSubmit, reset, formState } = useForm({
        resolver: zodResolver(FormSchema),
    });
    const { errors } = formState;
    const processForm = async (data: FieldValues) => {
        setLoading(true);
        try {
            const req = await fetch(
                'https://formeezy.com/api/v1/forms/63da62d671486d0008dfe0c1/submissions',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        ...data,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const success = await req.json();
        } catch (error) {
        } finally {
            setFormSubmitted(true);
            setLoading(false);
        }
    };

    return (
        <div>
            {loading ? (
                <div className='flex h-full min-h-[200px] w-full items-center justify-center gap-2'>
                    <div className="rounded-full" role="status">
                        <AiOutlineLoading3Quarters className=' text-gray-300 animate-spin inline-block w-16 h-16 ' />
                    </div>
                    <span className='text-lg text-gray-500'>Loading...</span>
                </div>
            ) : formSubmited ? (
                <div className='grid h-full items-start rounded-lg border border-slate-200 py-6 px-4'>
                    <h3 className='mb-4 font-display text-2xl font-semibold tracking-tight text-gray-900'>
                        Thank you so much!
                    </h3>
                    <p className='text-lg text-gray-500'>
                        Hey, we've received your message and we will be in touch as soon as
                        possible.
                        <br />  <br /> For now feel free to explore the rest of our website.
                    </p>
                    <Link
                        href='/'
                        type='button'
                        className='mt-10 flex items-center gap-2 self-start justify-self-start rounded-lg bg-accent-200 px-8 py-4 font-medium text-primary-800 hover:bg-accent-300 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400'
                    >
                        <span>Back to home</span>
                        <HiArrowRight />
                    </Link>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit(processForm)}
                    className='grid grid-cols-1 gap-y-6'
                >
                    <div className='grid gap-2'>
                        <label
                            htmlFor='full-name'
                            className='font-bold text-gray-900 sm:text-lg'
                        >
                            Full name
                        </label>
                        <input
                            type='text'
                            {...register('name', { required: true })}
                            autoComplete='name'
                            className={clsx(
                                'block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-primary-500 focus:ring-primary-500',
                                errors?.name?.message && 'border-rose-400 text-rose-700'
                            )}
                            placeholder='Enter your name'
                        />
                        {errors.name?.message && (
                            <div className='rounded-lg bg-rose-200 py-2 px-2 text-sm text-rose-800'>
                                {JSON.stringify(errors?.name?.message).replaceAll('"', '')}
                            </div>
                        )}
                    </div>
                    <div className='grid gap-2'>
                        <label
                            htmlFor='email'
                            className='font-bold text-gray-900 sm:text-lg'
                        >
                            Email
                        </label>
                        <input
                            type='email'
                            {...register('email')}
                            autoComplete='email'
                            className={clsx(
                                'block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-primary-500 focus:ring-primary-500',
                                errors?.email?.message && 'border-rose-400 text-rose-700'
                            )}
                            placeholder='Enter your email'
                        />
                        {errors.email?.message && (
                            <div className='rounded-lg bg-rose-200 py-2 px-2 text-sm text-rose-800'>
                                {JSON.stringify(errors?.email?.message).replaceAll('"', '')}
                            </div>
                        )}
                    </div>
                    <div className='grid gap-2'>
                        <label
                            htmlFor='phone'
                            className='font-bold text-gray-900 sm:text-lg'
                        >
                            Phone
                        </label>
                        <input
                            type='text'
                            {...register('phone')}
                            autoComplete='tel'
                            className={clsx(
                                'block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-primary-500 focus:ring-primary-500',
                                errors?.phone?.message && 'border-rose-400 text-rose-700'
                            )}
                            placeholder='Enter your phone number'
                        />
                        {errors.phone?.message && (
                            <div className='rounded-lg bg-rose-200 py-2 px-2 text-sm text-rose-800'>
                                {JSON.stringify(errors?.phone?.message).replaceAll('"', '')}
                            </div>
                        )}
                    </div>
                    <div className='grid gap-2'>
                        <label
                            htmlFor='message'
                            className='font-bold text-gray-900 sm:text-lg'
                        >
                            Message
                        </label>
                        <textarea
                            id='message'
                            {...register('message')}
                            rows={4}
                            className={clsx(
                                'focus:ring-primary-} block w-full rounded-md border border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-primary-500',
                                errors?.message?.message && 'border-rose-400 text-rose-700'
                            )}
                            placeholder='Enter your message'
                            defaultValue={''}
                        />
                        {errors.message?.message && (
                            <div className='rounded-lg bg-rose-200 py-2 px-2 text-sm text-rose-800'>
                                {JSON.stringify(errors.message?.message).replaceAll('"', '')}
                            </div>
                        )}
                    </div>
                    <div>
                        <button
                            type='submit'
                            className=' rounded-md border border-transparent bg-primary-700 py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-800 focus:ring-offset-2'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ContactForm;
