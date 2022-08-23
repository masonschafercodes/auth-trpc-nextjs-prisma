import React from 'react';
import {signOut} from "next-auth/react";
import IntegrationConnect from "~/components/Profile/IntegrationConnect";
import {Integration} from '@prisma/client';

interface IIntegrationData {
    integrationName: string;
    integrationDescription: string;
    integrationImage: string;
    isConnected: boolean;
}

const integrations: IIntegrationData[] = [
    {
        integrationName: 'clearbit',
        integrationDescription: 'Clearbit develops business intelligence to help companies find more information of customers in order to increase sales and reduce fraud.',
        integrationImage: 'https://asset.brandfetch.io/idPfQccWRj/idZcHaRy4-.jpeg?updated=1635901775059',
        isConnected: false
    },
    {
        integrationName: 'Salesforce',
        integrationImage: 'https://asset.brandfetch.io/idVE84WdIN/idSAK0pQtK.jpeg?updated=1646247085744',
        integrationDescription: 'Salesforce is a global cloud computing company that develops CRM solutions and provides business software on a subscription basis.',
        isConnected: false
    }
]

interface Props {
    userIntegrations: Integration[];
}

export function Profile(props: Props) {

    const {userIntegrations} = props;

    function isIntegrationConnected(userIntegrations: Integration[], standardIntegrationName: string) {
        return userIntegrations?.some(integration => integration.type === standardIntegrationName);
    }

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
                            onClick={() => signOut({callbackUrl: "/"})}
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
                        <IntegrationConnect integrationName={integration.integrationName}
                                            integrationDescription={integration.integrationDescription}
                                            integrationImage={integration.integrationImage}
                                            isConnected={isIntegrationConnected(userIntegrations, integration.integrationName)}
                                            key={index}/>
                    ))}
                </div>
            </div>
        </div>
    )
}