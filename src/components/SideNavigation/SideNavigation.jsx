import React from 'react';

const SideNavigation = ({ setTitle }) => {
    return (
        <div className='hidden md:flex pr-11 mt-11 ml-1 mr-48 w-64'>
            <div className='hidden md:flex flex-col bg-neutral-100 p-5 pl-5 pr-11 mr-16 w-64 rounded-md drop-shadow-lg fixed'>
                <h2 className='font-bold text-xl text-cyan-600 pb-2'>Table of contents</h2>
                <ul className='list-disc list-inside pl-2 text-sm font-semibold'>
                    <li className='cursor-pointer pb-4'>{setTitle}</li>
                    <li className='cursor-pointer pb-4'>Introduction</li>
                    <li className='cursor-pointer pb-4'>Main part</li>
                    <li className='cursor-pointer pb-4'>Conclusion</li>
                    <li className='cursor-pointer'>Comment section</li>
                </ul>
            </div>
        </div>
    );
}

export default SideNavigation;