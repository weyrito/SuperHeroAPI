import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 bg-gradient-to-b from-black via-[#1a1a1a] to-black">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center relative"
            >
                <motion.div
                    className="absolute -top-20 left-1/2 transform -translate-x-1/2"
                    animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <span className="text-8xl">🦇</span>
                </motion.div>

                <h1 className="text-8xl font-batman text-yellow-500 mb-4 shadow-[0_0_30px_rgba(255,215,0,0.3)]">
                    404
                </h1>
                <p className="text-4xl font-batman text-yellow-500 mb-8 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
                    Bat-erreur ! Cette page n'existe pas dans la Bat-cave
                </p>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                >
                    <Link
                        to="/"
                        className="inline-block bg-black text-yellow-500 font-batman px-8 py-4 rounded-lg border-2 border-yellow-500 hover:bg-yellow-500 hover:text-black hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] transition-all duration-300"
                    >
                        Retour à la Bat-cave
                    </Link>
                    <div className="absolute inset-0 bg-yellow-500 opacity-20 blur-xl -z-10"></div>
                </motion.div>
            </motion.div>
        </div>
    );
}