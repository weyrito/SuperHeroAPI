import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function Header() {
  const { user, signOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const NavLinks = () => (
    <>
      <motion.div whileHover={{ filter: 'brightness(1.2)' }}>
        <RouterLink
          to="/"
          className="text-white font-medium hover:text-[#64b5f6] transition-all duration-300 hover:shadow-[0_0_12px_#64b5f6]"
        >
          ACCUEIL
        </RouterLink>
      </motion.div>

      {user ? (
        <>
          <motion.div whileHover={{ filter: 'brightness(1.2)' }}>
            <RouterLink
              to="/search"
              className="text-white font-medium hover:text-[#64b5f6] transition-all duration-300 hover:shadow-[0_0_12px_#64b5f6]"
            >
              RECHERCHE
            </RouterLink>
          </motion.div>

          <motion.div whileHover={{ filter: 'brightness(1.2)' }}>
            <RouterLink
              to="/contact"
              className="text-white font-medium hover:text-[#64b5f6] transition-all duration-300 hover:shadow-[0_0_12px_#64b5f6]"
            >
              CONTACT
            </RouterLink>
          </motion.div>

          <motion.button
            whileHover={{ filter: 'brightness(1.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => signOut()}
            className="bg-transparent border-2 border-[#e53935] text-white px-4 py-2 rounded hover:bg-[rgba(229,57,53,0.2)] hover:shadow-[0_0_20px_#e53935] hover:border-[#64b5f6] transition-all duration-300"
          >
            DÉCONNEXION
          </motion.button>
        </>
      ) : (
        <motion.div
          whileHover={{ filter: 'brightness(1.2)' }}
          whileTap={{ scale: 0.95 }}
        >
          <RouterLink
            to="/login"
            className="bg-[#e53935] text-white px-4 py-2 rounded hover:bg-[#ef5350] hover:shadow-[0_0_20px_#e53935] transition-all duration-300"
          >
            CONNEXION
          </RouterLink>
        </motion.div>
      )}
    </>
  )

  return (
    <header className="bg-gradient-to-r from-[#1a1a1a] via-[#e53935] to-[#1a1a1a] shadow-[0_4px_20px_rgba(229,57,53,0.4)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ filter: 'brightness(1.2)' }}
            transition={{ duration: 0.2 }}
          >
            <RouterLink to="/" className="no-underline">
              <span className="text-xl md:text-2xl font-black text-white shadow-[0_0_15px_#ff0000] tracking-wider flex items-center">
                <span className="text-[#64b5f6] mr-2 shadow-[0_0_10px_#64b5f6]">
                  ⎊
                </span>
                BATMAN
              </span>
            </RouterLink>
          </motion.div>

          <nav className="hidden md:flex gap-8 items-center">
            <NavLinks />
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween' }}
                className="fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-[#1a1a1a] to-[#e53935] p-4 shadow-lg md:hidden"
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="mt-12 flex flex-col gap-4">
                  <NavLinks />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}