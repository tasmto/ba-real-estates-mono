import { clsx } from 'clsx';
import React from 'react';
import {
    HiCheckCircle,
    HiExclamationCircle,
    HiEllipsisHorizontalCircle,
    HiTrash,
    HiPencil,
} from 'react-icons/hi2';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { RiEditCircleFill } from 'react-icons/ri';

export type CueCardType = {
    type: 'error' | 'success' | 'normal' | 'loading' | 'delete' | 'edit';
    userName: string;
    userImage: string;
    description: string;
    title: string;
    time: string;
    isLast?: boolean;
    onClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
    className?: string;
};

const QueCard = ({
    type = 'normal',
    userName,
    userImage,
    description,
    title,
    time,
    isLast,
    onClick,
    className,
}: CueCardType) => {
    return (
        <li onClick={onClick} className={clsx(className)}>
            <div className='relative pb-8'>
                {!isLast ? (
                    <span
                        className={clsx(
                            'absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-600 from-gray-400 to-gray-600 bg-gradient-to-t ',

                            type === 'error' && 'from-rose-400 to-rose-500',
                            type === 'delete' && 'from-rose-500 to-rose-700',
                            type === 'success' && 'from-primary-400 to-primary-500',
                            type === 'edit' && 'from-green-400 to-green-500'
                        )}
                        aria-hidden='true'
                    />
                ) : null}
                <div className='relative flex space-x-3'>
                    <div>
                        <span
                            className={clsx(
                                //   event.iconBackground,
                                [
                                    type === 'error' && 'bg-rose-500',
                                    type === 'delete' && 'bg-rose-700',
                                    type === 'success' && 'bg-primary-500',
                                    type === 'edit' && 'bg-green-500',
                                    type === 'normal' && 'bg-gray-500',
                                    type === 'loading' && 'bg-gray-400',

                                    'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-transparent',
                                ]
                            )}
                        >
                            {type === 'success' ? (
                                <HiCheckCircle
                                    className='h-5 w-5 text-slate-300 '
                                    aria-hidden='true'
                                />
                            ) : type === 'error' ? (
                                <HiExclamationCircle
                                    className='h-5 w-5 text-slate-300 '
                                    aria-hidden='true'
                                />
                            ) : type === 'delete' ? (
                                <HiTrash
                                    className='h-4 w-5 text-slate-300'
                                    aria-hidden='true'
                                />
                            ) : type === 'edit' ? (
                                <RiEditCircleFill
                                    className='h-5 w-5 text-slate-300'
                                    aria-hidden='true'
                                />
                            ) : type === 'loading' ? (
                                <AiOutlineLoading3Quarters
                                    className='h-5 w-5 text-slate-100 animate-spin'
                                    aria-hidden='true'
                                />
                            ) : (
                                <HiEllipsisHorizontalCircle className='h-5 w-5 text-white' />
                            )}
                        </span>
                    </div>
                    <div className='min-w-0 flex-wrap flex-1 flex justify-between gap-x-4 gap-y-2'>
                        <div>
                            <p className='text-sm flex flex-col gap-1 justify-start items-center text-gray-300'>
                                <span className='w-full'>{title} </span>
                                <a
                                    title={description || ''}
                                    className='max-w-[200px] sm:max-w-[300px] text-xs font-medium text-gray-400 truncate block'
                                >
                                    {description}
                                </a>
                            </p>
                        </div>
                        <div className='text-start text-sm whitespace-nowrap text-gray-500'>
                            <time dateTime={time}>{time}</time>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default QueCard;
