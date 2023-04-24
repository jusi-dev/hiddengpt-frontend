import React, { useRef } from "react";
import './CommentInput.css';

const CommentInput = ({ commentInput }) => {
    const inputRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const inputValue = inputRef.current.value;
        commentInput(inputValue);
        inputRef.current.value = "";
    };

    return (
        <div className="pb-10">
            <div className='flex flex-col p-4 mx-auto ml-3 mr-4 mt-10 bg-neutral-100 md:p-11 md:pl-20 md:mt-11 md:ml-28 md:mr-96 md:pr-20 rounded-md drop-shadow-lg'>
                <h2 className='font-bold text-3xl pt-2 text-cyan-500 pb-2'>Comment section</h2>
                <p className="text-lg font-semibold pb-5">Share your thoughts with us! This means a lot to us. &lt;3</p>
                    <div>
                        <div className="flex flex-col w-auto pr-40">
                            <form onSubmit={handleSubmit}>
                                <label>
                                    <textarea 
                                        className="w-full h-24 pb-14 rounded-xl border-2 border-solid border-cyan-600 min-w-full" 
                                        type="text" 
                                        ref={inputRef} 
                                        name="comment" 
                                    ></textarea>
                                </label>
                                <input
                                    className=" text-bold text-2xl text-cyan-500 mt-4 p-2 border-2 border-solid border-cyan-600 
                                                rounded-lg hover:scale-110 transition-all cursor-pointer active:scale-90" 
                                    type="submit" 
                                    value="Submit" 
                                />
                            </form>
                        </div>
                    </div>
                <div className="min-w-full w-auto bg-white h-auto flex flex-col mt-20 md:mr-72 p-4 rounded-lg border-2 border-solid border-cyan-600">
                    <h4 className="text-lg font-bold">Sk8erboi</h4>
                    <p className="pt-1">Very great tutorial! Thank you very much. I always had struggle with Bind9 but this worked out fine!</p>
                    <p className="pt-4 text-sm text-gray-700">Posted on 05.07.2022</p>
                </div>
                <div className="min-w-full w-auto bg-white h-auto flex flex-col mt-10 md:mr-72 p-4 rounded-lg border-2 border-solid border-cyan-600">
                    <h4 className="text-lg font-bold">Tylller</h4>
                    <p className="pt-1">I really appreciate the effort you put into making this tutorial and sharing your knowledge with others. Keep up the great work!</p>
                    <p className="pt-4 text-sm text-gray-700">Posted on 28.03.2022</p>
                </div>
                <div className="min-w-full w-auto bg-white h-auto flex flex-col mt-10 md:mr-72 p-4 rounded-lg border-2 border-solid border-cyan-600">
                    <h4 className="text-lg font-bold">Myopia</h4>
                    <p className="pt-1">Your explanations were very detailed and you provided excellent examples along the way. Thank you for sharing your expertise with us!</p>
                    <p className="pt-4 text-sm text-gray-700">Posted on 14.12.2021</p>
                </div>
                <div className="min-w-full w-auto bg-white h-auto flex flex-col mt-10 md:mr-72 p-4 rounded-lg border-2 border-solid border-cyan-600">
                    <h4 className="text-lg font-bold">jimmyspinner</h4>
                    <p className="pt-1">I was able to follow along with ease and the end result was exactly what I was hoping for.</p>
                    <p className="pt-4 text-sm text-gray-700">Posted on 30.09.2021</p>
                </div>
            </div>
        </div>
    );
}

export default CommentInput;