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
        integrationImage: 'https://asset.brandfetch.io/idJ_HhtG0Z/idS8F1wmDj.jpeg?updated=1646246424535',
        isConnected: false
    },
    {
        integrationName: 'clearbit',
        integrationDescription: 'Boost your productivity with your coworkers via chat and video messaging',
        integrationImage: 'https://asset.brandfetch.io/idPfQccWRj/idZcHaRy4-.jpeg?updated=1635901775059',
        isConnected: false
    },
    {
        integrationName: 'Linear',
        integrationImage: 'https://asset.brandfetch.io/iduDa181eM/idYYbqOlKi.png?updated=1635899407667',
        integrationDescription: 'Linear allows users to manage software development and track bugs.',
        isConnected: false
    },
    {
        integrationName: 'Google Drive',
        integrationImage: 'https://asset.brandfetch.io/id6O2oGzv-/idNEgS9h8q.jpeg?updated=1655734433950',
        integrationDescription: 'Our mission is to organize the world’s information and make it universally accessible and useful.',
        isConnected: false
    },
    {
        integrationName: 'Asana',
        integrationImage: 'https://asset.brandfetch.io/idxPi2Evsk/idxxtwI5Gl.jpeg?updated=1646239586536',
        integrationDescription: 'Easily organize and plan workflows, projects, and more, so you can keep your team\'s work on schedule. Start using Asana as your work management tool today.',
        isConnected: false
    },
    {
        integrationName: 'Salesforce',
        integrationImage: 'https://asset.brandfetch.io/idVE84WdIN/idSAK0pQtK.jpeg?updated=1646247085744',
        integrationDescription: 'Salesforce is a global cloud computing company that develops CRM solutions and provides business software on a subscription basis.',
        isConnected: false
    },
    {
        integrationName: 'Salesloft',
        integrationImage: 'https://asset.brandfetch.io/idLO9lFZj5/id8bueqGAT.jpeg?updated=1656930742716',
        integrationDescription: 'Salesloft helps thousands of the world’s most successful selling teams drive more revenue with the Modern Revenue Workspace.',
        isConnected: false
    },
    {
        integrationName: 'Salesvue',
        integrationImage: 'https://asset.brandfetch.io/id_sVXWl5Q/id7HLnwdi0.png?updated=1635904561974',
        integrationDescription: 'Prospecting to Pipeline Enablement',
        isConnected: false
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