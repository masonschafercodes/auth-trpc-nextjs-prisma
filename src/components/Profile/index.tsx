import React from 'react';
import {signOut} from "next-auth/react";
import IntegrationConnect from "~/components/Profile/IntegrationConnect";

interface IIntegrationData {
    integrationName: string;
    integrationDescription: string;
    integrationImage: string;
    isConnected: boolean;
}

const integrations: IIntegrationData[] = [
    {
        integrationName: 'Slack',
        integrationDescription: 'Boost your productivity with your coworkers via chat and video messaging',
        integrationImage: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.freebiesupply.com%2Flogos%2Flarge%2F2x%2Fslack-logo-icon.png&f=1&nofb=1',
        isConnected: false
    },
    {
        integrationName: 'clearbit',
        integrationDescription: 'Boost your productivity with your coworkers via chat and video messaging',
        integrationImage: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fclipground.com%2Fimages%2Fclearbit-logo-7.jpg&f=1&nofb=1',
        isConnected: true
    }
]

export function Profile() {
    return (
        <div className='max-w-6xl mx-auto'>
            <div>
                <div className="navbar justify-between bg-base-100">
                    <a className="btn btn-ghost normal-case text-xl">DataTrak</a>
                    <div className='flex gap-2'>
                        <a href='/profile' className="btn btn-ghost btn-sm normal-case">
                            Profile
                        </a>
                        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                        <a href='/dashboard' className="btn btn-ghost btn-sm normal-case">
                            Dashboard
                        </a>
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="btn btn-ghost btn-sm normal-case"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            <div className='mt-2'>
                <div className='my-2'>
                    <h1 className='text-xl font-semibold text-gray-300'>Integrations</h1>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    {integrations.map((integration, index) => (
                        <IntegrationConnect integrationName={integration.integrationName} integrationDescription={integration.integrationDescription} integrationImage={integration.integrationImage} isConnected={ integration.isConnected} key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}