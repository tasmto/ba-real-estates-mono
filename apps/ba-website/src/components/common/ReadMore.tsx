
'use client'
import { ChevronDownIcon } from "@heroicons/react/solid";
import clsx from "clsx";

import useToggle from "@/hooks/useToggle";

type Props = {
    children: string;
    minLength?: number;
    className?: string;
    defaultState?: boolean;
}

function ReadMore({ children, minLength = 320, className, defaultState = false, }: Props) {
    const [expanded, toggle] = useToggle(defaultState);

    return (
        <div className="flex flex-col gap-3">
            <p className={clsx([className, expanded && 'whitespace-pre-line'])}>
                {!expanded ? `${children.slice(0, minLength).trim()}${children.length > minLength ? '...' : ''}` : children}</p>
            {children.length > minLength &&
                <button role='button'
                    onClick={toggle}
                    className="text-primary-600 hover:text-primary-800 transition-colors flex items-center group gap-2 self-start cursor-pointer"
                >
                    <span className="block whitespace-nowrap"> {!expanded ? "Read More" : "Show Less"}</span>
                    <ChevronDownIcon className={clsx([expanded ? 'group-hover:-translate-y-1 duration-150 rotate-180 ' : 'group-hover:translate-y-1 duration-300', 'w-6 h-6 transition-transform'])} />
                </button>
            }
        </div>
    );
}

export default ReadMore;