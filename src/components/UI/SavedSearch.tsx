import React from 'react';
import {ISavedSearch} from "~/components/Dashboard";
import Modal from "~/components/UI/Modal";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface Props {
    savedSearch: ISavedSearch;
}

function SavedSearch(props: Props) {
    return (
        <div className='p-3 border border-gray-600 rounded-lg shadow-lg'>
            <div>
                <h3 className='text-gray-500 font-bold'>Query: <span className='font-normal text-gray-300'>{props.savedSearch.query}</span></h3>
                <p className='text-gray-500 text-sm italic'>Searched
                    at: {new Date(props.savedSearch.createdAt).toLocaleDateString()}</p>
            </div>
            <div className='mt-3'>
                <Modal modalButtonText='View Result Output'
                       modalName={`${props.savedSearch.query}-query-output-modal-${new Date(props.savedSearch.createdAt).toLocaleDateString()}`} modalSize='lg'>
                    <div>
                        <SyntaxHighlighter language='json' style={dracula}>
                            {JSON.stringify(props.savedSearch.result, null, 2)}
                        </SyntaxHighlighter>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default SavedSearch;