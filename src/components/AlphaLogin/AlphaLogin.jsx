import React, { useRef } from "react";

const AlphaLogin = ({ verifyOTAC }) => {
    const inputRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const inputValue = inputRef.current.value;
        verifyOTAC(inputValue);
        inputRef.current.value = "";
    };

    return (
        <div className="pb-10">
            <Helmet>
                <title>Stuff-Explained Alpha login</title>
            </Helmet>
            <div className='flex flex-col bg-neutral-100 p-11 ml-10 mr-10 md:pl-20 mt-11 md:ml-36 md:mr-36 md:pr-20 rounded-md drop-shadow-lg items-center w-auto h-full'>
                <h1 className='font-bold text-3xl pt-2 text-cyan-500 pb-2'>Stuff Explained - Alpha login</h1>
                <p className="text-md md:text-lg font-semibold pb-5 ">Enter your One Time Access Code:</p>
                    <div>
                        <div className="flex flex-col w-auto">
                            <form onSubmit={handleSubmit}>
                                <label>
                                    <input 
                                        className="w-48 h-16 rounded-xl border-2 border-solid border-cyan-600" 
                                        type="text" 
                                        ref={inputRef} 
                                        name="comment" 
                                    />
                                </label>
                                <input
                                    className=" text-bold text-2xl text-cyan-500 mt-4 p-2 border-2 border-solid border-cyan-600 
                                                rounded-lg hover:scale-110 transition-all cursor-pointer active:scale-90 items-center ml-8" 
                                    type="submit" 
                                    value="Submit" 
                                />
                            </form>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default AlphaLogin;