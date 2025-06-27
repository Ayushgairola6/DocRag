import { Link } from "react-router";
import { IoHomeOutline } from "react-icons/io5";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { GoQuestion } from "react-icons/go";
import { GiClassicalKnowledge } from "react-icons/gi";
import { motion } from 'framer-motion'
type SidebarProps = {
    isVisble: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: React.FC<SidebarProps> = ({ isVisble, setIsVisible }) => {
    return (<>
        <div onClick={() => {
            if (isVisble === true) {
                setIsVisible(false);
            }
        }} className={`md:hidden fixed h-fit w-70 -bottom-5 -left-2 rotate-0 bg-white  rounded-r-full shadow-2xl shadow-purple-600 bg-gray-300    gap-2 z-[9] py-10 rounded-b-xl  ${isVisble === true ? "-translate-y-0 rotate-0" : "translate-y-90 rotate-90 "} duration-500 transition-all cursor-pointer flex items-center justify-start`}>
            {/* <MdClose size={22} className="absolute right-5 bottom-8 hover:scale-110 transition-all duration-300" /> */}


            {/*navigation links  */}
            <motion.section className="flex flex-col items-center justify-center gap-1   text-sm space-grotesk">

                <Link className=" w-full py-2 flex items-center justify-start gap-6 hover:text-purple-600   pl-4 hover:pl-12 hover:transition-all duration-300" to='/'><IoHomeOutline size={22} />Home</Link>
                <Link className=" w-full py-2 flex items-center justify-start gap-6 hover:text-purple-600   pl-4 hover:pl-12 hover:transition-all duration-300" to='/Interface'><IoChatboxEllipsesOutline size={22} />Try Now</Link>
                <Link className=" w-full py-2 flex items-center justify-start gap-6 hover:text-purple-600   pl-4 hover:pl-12 hover:transition-all duration-300" to='/Details'><GoQuestion size={22}/>Details</Link>
                <Link className=" w-full py-2 flex items-center justify-start gap-6 hover:text-purple-600   pl-4 hover:pl-12 hover:transition-all duration-300" to='/About'><GiClassicalKnowledge size={22} />Quick Start</Link>



            </motion.section>


        </div>
    </>)
}

export default Sidebar;