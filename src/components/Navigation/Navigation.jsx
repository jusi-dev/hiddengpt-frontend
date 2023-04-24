import React from 'react';

class Navigation extends React.Component{
    handleSignIn = () => {
        console.log('SignIn');
    }

    handleRegister = () => {
        console.log('Register');
    }

    burgerMenu = () => {
        if (this.burgerRef.style.display === "flex") {
            this.burgerRef.style.display = "none";
        } else {
            this.burgerRef.style.display = "flex";
        }
    }

    render() {
        return (
            <nav className='flex flex-col md:flex-row p-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-md md:text-xl font-bold w-full md:px-20 drop-shadow-lg fixed top-0 z-50'>
                <div className='flex flex-row w-full'>
                    <div className='w-full my-auto text-xl md:text-3xl underline underline-offset-4 decoration-1'><p>Stuff-Explained</p></div>

                    <div class="p-4 space-y-2 bg-blue-400 rounded shadow block md:hidden ml-auto" onClick={this.burgerMenu}>
                        <span class="block w-8 h-0.5 bg-gray-100 animate-pulse"></span>
                        <span class="block w-8 h-0.5 bg-gray-100 animate-pulse"></span>
                        <span class="block w-8 h-0.5 bg-gray-100 animate-pulse"></span>
                    </div>
                </div>
                

                <div className='md:flex-row md:flex w-full flex-col md:pt-0 pt-10 hidden' ref={element => this.burgerRef = element}>
                    <button onClick={this.handleRegister} className='cursor-pointer md:ml-auto'>How To</button>
                    <button onClick={this.handleSignIn} className='cursor-pointer md:pl-10 pt-2 md:pt-0'>IT</button>
                    <button onClick={this.handleSignIn} className='cursor-pointer md:pl-10 pt-2 md:pt-0'>Math</button>
                    <button onClick={this.handleSignIn} className='cursor-pointer md:pl-10 pt-2 md:pt-0'>Sign In</button>
                    <button onClick={this.handleRegister} className='cursor-pointer md:pl-10 md:pr-15 pt-2 md:pt-0'>Register</button>
                </div>
            </nav>
        );
    }
}

export default Navigation;