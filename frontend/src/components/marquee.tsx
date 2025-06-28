import { motion } from 'framer-motion';

const Marquee = () => {
    // const { scrollYProgress } = useScroll();

    return (<>
        <motion.div className="flex items-center justify-center py-2 px-2 overflow-x-hidden gap-5 bai-jamjuree-bold uppercase bg-black my-3">
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: "-100%" }}
                transition={{
                    ease: "linear",
                    duration: 20,
                    repeat: Infinity
                }}
                className="flex gap-5"
            >
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="text-3xl rounded-lg text-white py-2 px-3 text-nowrap">
                        <ul>Future of Information</ul>
                    </div>
                ))}
            </motion.div>
        </motion.div>

        <motion.div className="flex items-center justify-center py-2 px-2 overflow-x-hidden gap-5 bai-jamjuree-bold uppercase bg-black my-3">
            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                    ease: "linear",
                    duration: 20,
                    repeat: Infinity
                }}
                className="flex gap-5"
            >
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="text-3xl rounded-lg text-white py-2 px-3 text-nowrap">
                        <ul>Let's create the future</ul>
                    </div>
                ))}
            </motion.div>
        </motion.div>
    </>)
}

export default Marquee;