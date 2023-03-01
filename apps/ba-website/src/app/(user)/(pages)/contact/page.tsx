'use client';

import ContactForm from '@/components/forms/ContactForm';

type AgentPageTypes = {
    params: { agentId: string };
};

const AgentPage = ({ params }: AgentPageTypes) => {
    return (
        <div className='min-h-[86vh] bg-slate-50'>
            <div className='container max-w-2xl relative py-24 grid gap-10'>
                <h1 className='font-display text-5xl font-extrabold tracking-tight text-gray-900 md:text-6xl'>
                    Get in touch with us
                </h1>



                <ContactForm />
            </div>
        </div>
    );
};
export default AgentPage;
