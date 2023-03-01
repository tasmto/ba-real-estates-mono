import React from 'react'
import { IconType } from 'react-icons/lib';
import { RxSlash } from "react-icons/rx"
import clsx from 'clsx';
import Link from 'next/link';

import ToolTip from '@/components/common/ToolTip';

interface Props {
    pages: {
        name?: string;
        href?: string;
        current?: boolean;
        icon?: IconType
    }[],
    className?: string
}

const Breadcrumbs: React.FC<Props> = ({ pages, className }: Props) => {
    return (
        <nav className={clsx("flex", className)} aria-label="Breadcrumb">
            <ol className={clsx(["flex items-center flex-wrap gap-x-2 gap-y-2"])}>

                {pages.map(({ name, href, current, icon }, i) => {
                    const Icon = icon;

                    return (
                        <li key={name} className="flex items-center">

                            {i > 0 && <RxSlash
                                className="flex-shrink-0 h-5 w-5 text-gray-300"
                            />}
                            <ToolTip title={name || ""}><Link
                                href={href ?? ""}
                                className={clsx([i > 0 && "ml-4", "text-sm font-medium text-gray-500 hover:text-gray-700 flex gap-2", current && "text-gray-400 hover:text-gray-400"])}
                                aria-current={current ? 'page' : undefined}
                            >
                                {Icon && <Icon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />}
                                {name && <span className={clsx([Icon && 'sr-only'])}>{name}</span>}
                            </Link></ToolTip>

                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}

export default Breadcrumbs