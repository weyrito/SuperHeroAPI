import { useState, useEffect, useCallback } from 'react';
import { searchHeroes, getAllHeroes, getHeroById } from '../API/FetchSuperHero';
import type { Hero } from '../API/FetchSuperHero';
import SearchBar from '../components/SearchBar';
import HeroCard from '../components/HeroCard';
import { motion } from 'framer-motion';

const Search = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadInitialHeroes();
  }, []);

  const loadInitialHeroes = async () => {
    setLoading(true);
    const initialHeroes = await getAllHeroes();
    setHeroes(initialHeroes);
    setLoading(false);
  };

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) {
      loadMoreHeroes();
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const loadMoreHeroes = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;
    const start = nextPage * 10 - 9;

    try {
      if (searchTerm.trim() === '') {
        const newHeroes = await Promise.all(
          Array.from({ length: 10 }, (_, i) => getHeroById((start + i).toString()))
        );
        const filteredHeroes = newHeroes.filter((hero): hero is Hero => hero !== null);

        if (filteredHeroes.length === 0) {
          setHasMore(false);
        } else {
          setHeroes(prev => [...prev, ...filteredHeroes]);
          setPage(nextPage);
        }
      }
    } catch (error) {
      console.error('Error loading more heroes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term: string) => {
    setLoading(true);
    setSearchTerm(term);
    setPage(1);
    setHasMore(true);

    const results = term.trim() === ''
      ? await getAllHeroes()
      : await searchHeroes(term);
    
    setHeroes(results);
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <SearchBar onSearch={handleSearch} />
        
        <motion.div 
          layout
          className="w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {heroes.map((hero) => (
              <motion.div
                key={hero.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: {
                    type: "spring",
                    duration: 0.5,
                    bounce: 0.3
                  }
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 0 25px rgba(229,57,53,0.6)",
                  transition: {
                    type: "spring",
                    duration: 0.3
                  }
                }}
                className="bg-gradient-to-r from-[#1a1a1a] via-[#e53935] to-[#1a1a1a] p-[1px] rounded-lg shadow-[0_0_15px_rgba(229,57,53,0.3)]"
              >
                <HeroCard hero={hero} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {loading }

        {!hasMore && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500 text-lg text-center"
          >
            Plus de héros à charger
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default Search;