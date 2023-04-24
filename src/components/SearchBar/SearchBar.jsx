import React, { useRef } from "react";

const SearchBar = ({ searchBarInput }) => {
    const inputRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const inputValue = inputRef.current.value;
        searchBarInput(inputValue);
        inputRef.current.value = "";
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <input 
                        className="w-36 h-10 rounded-xl border-1 border-solid border-cyan-600 text-black text-sm font-normal pl-4" 
                        type="searchbar"
                        placeholder='search article...' 
                        ref={inputRef} 
                        name="search" 
                    />
                </label>
            </form>
        </div>
    )
}
export default SearchBar;