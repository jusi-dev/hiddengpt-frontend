import React from 'react';

const SideNavigation = () => {
    return (
        <div className='hidden md:flex pr-11 mt-11 ml-1 mr-48 w-64'>
            <div className='hidden md:flex flex-col bg-neutral-100 p-5 pl-5 pr-11 mr-16 w-64 rounded-md drop-shadow-lg fixed'>
                <h2 className='font-bold text-xl text-cyan-600 pb-2'>Table of contents</h2>
                <ul className='list-disc list-inside pl-2 text-sm font-semibold'>
                    <li className='cursor-pointer pb-4'>How to Setup Bind (DNS Server) on Ubuntu 22.04</li>
                    <li className='cursor-pointer pb-4'>Step 1) Install Bind9 Package</li>
                    <li className='cursor-pointer pb-4'>Step 2) Configure Bind9 (DNS Server)</li>
                    <li className='cursor-pointer pb-4'>Step 3) Validating Syntax of bind configuration and Zone files</li>
                    <li className='cursor-pointer'>Comment section</li>
                </ul>
            </div>
        </div>
    );
}

export default SideNavigation;