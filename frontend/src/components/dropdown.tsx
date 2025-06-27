import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";

type DropDownProps = {
    isVisible: boolean;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropDown: React.FC<DropDownProps> = ({ isVisible, setIsVisible, setCategory }) => {


    function handleCategoryUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        console.log(`Selected category: ${selectedCategory}`);
        setIsVisible(false); // Close the dropdown after selection
    }
// top-10 left-10 md:right-10 
    return (<>
        {/* <ArrowDownAz/> */}
        <div className="absolute top-5 right-5  z-[1] space-grotesk w-auto md:w-fit ">
            <label onClick={() => setIsVisible(!isVisible)} className="cursor-pointer  text-sm flex items-center justify-center gap-1" htmlFor="Category">Category <IoMdArrowDropdown size={24} className={`transition-all duration-300  font-semibold ${isVisible === true ? "rotate-90" : "rotate-0"} `} /></label>
            <section className={`${isVisible ? "h-auto opacity-100 py-5 px-4" : "h-0 opacity-0 py-0 px-0"} bg-gradient-to-br from-gray-50 to-gray-100 text-black font-sm   overflow-hidden transition-all duration-300 rounded-lg mt-3 flex items-start justify-center gap-1  flex-col border border-black/40 relative `}>
                <span className='flex items-center justify-between px-2 w-full gap-3 flex-row-reverse'>
                    <input onChange={(e) => handleCategoryUpload(e)} value="Law" className='' name='category' type="radio" />
                    <label htmlFor="category" className="text-xs md:text-sm">
                        Law
                    </label>
                </span>
                <span className='flex items-center justify-between px-2 w-full gap-3 flex-row-reverse'>
                    <input onChange={(e) => handleCategoryUpload(e)} value="AI" className='bg-purple-500 text-purple-400' name='category' type="radio" />
                    <label className="text-xs md:text-sm" htmlFor="category">AI</label>
                </span>
                <span className='flex items-center justify-between px-2 w-full gap-3 flex-row-reverse'>
                    <input onChange={(e) => handleCategoryUpload(e)} value="Physics" className='bg-purple-500 text-purple-400' name='category' type="radio" />
                    <label className="text-xs md:text-sm" htmlFor="category">Physics</label>
                </span>
                <span className='flex items-center flex-row-reverse justify-between px-2 w-full gap-3 '>
                    <input onChange={(e) => handleCategoryUpload(e)} value="Chemistry" className='bg-purple-500 text-purple-400' name='category' type="radio" />
                    <label className="text-xs md:text-sm" htmlFor="category">Chemistry</label>
                </span><span className='flex items-center justify-between px-2 w-full gap-3 flex-row-reverse'>
                    <input onChange={(e) => handleCategoryUpload(e)} value="History" className='bg-purple-500 text-purple-400' name='category' type="radio" />
                    <label className="text-xs md:text-sm" htmlFor="category">History</label>
                </span><span className='flex items-center justify-between px-2 w-full gap-3 flex-row-reverse'>
                    <input onChange={(e) => handleCategoryUpload(e)} value="Finance" className='bg-purple-500 text-purple-400' name='category' type="radio" />
                    <label className="text-xs md:text-sm" htmlFor="category">Finance</label>
                </span>
            </section>
        </div>

    </>)
}

export default DropDown;