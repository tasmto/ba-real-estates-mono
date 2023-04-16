import Image from "next/image";
import Link from "next/link";
import { groq } from "next-sanity";
import { TeamMember } from "types";

import ToolTip from "@/components/common/ToolTip";
import { client } from "@/lib/sanity.client";
import urlFor from "@/lib/sanity.helpers";

const Page = async () => {

    const AgentsQuery = groq`*[_type == 'teamMember']`;
    const agents: TeamMember[] = await client.fetch(AgentsQuery);
    return (
        <div className="container grid gap-6  mt-16 mb-16">
            <div className="text-center mb-4">
                <h1 className='font-display text-5xl font-semibold tracking-tight text-gray-900 md:text-6xl'>
                    Meet our team
                </h1>
                <p className='leading-2 font-bold text-gray-300'>
                    Here is the team behind BA Real Estates.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {agents.map(agent =>
                    <ToolTip key={agent._id} title="View agent's page" arrow>
                        <Link href={`/team/${agent?.slug?.current}`} className='rounded-lg overflow-hidden relative group after:hover:bg-gray-400/70 after:absolute after:top-0 after:left-0 after:z-20 after:block after:h-full after:w-full after:bg-slate-700/30'>
                            <div className='absolute bottom-4 left-4 z-30 text-white'>
                                <h2 className='text-xl font-bold lg:text-2xl'>
                                    {agent.name}
                                </h2>
                                <p className='text-slate-100 sm:text-lg'>
                                    {agent.role}
                                </p>
                            </div>
                            <Image
                                className='rounded-lg  inset-0 h-full w-full object-cover'
                                src={
                                    (agent?.image?.asset &&
                                        urlFor(agent.image.asset)
                                            ?.width(850)
                                            .height(850)
                                            .url()) ||
                                    ''
                                }
                                alt=''
                                width={500}
                                height={500}
                            />
                        </Link>
                    </ToolTip>
                )}
            </div>
        </div>
    )
}
export const revalidate = 300;
export default Page
