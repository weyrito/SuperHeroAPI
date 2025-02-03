import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHeroById, searchHeroes, type Hero } from '../API/FetchSuperHero';

export default function HeroDetails() {
  const { id } = useParams();
  const [hero, setHero] = useState<Hero | null>(null);
  const [suggestedHeroes, setSuggestedHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroAndSuggestions = async () => {
      if (id) {
        const data = await getHeroById(id);
        setHero(data);
        
        if (data) {
          const nameWords = data.name
            .split(' ')
            .filter((word: string) => word.length > 2)
            .map((word: string) => word.toLowerCase());

          const results = await searchHeroes(nameWords[0]);
          
          const similarHeroes = results.filter((h: Hero) => 
            h.id !== id && // Exclure le héros actuel
            nameWords.some((word: string) => 
              h.name.toLowerCase().includes(word)
            )
          );

          setSuggestedHeroes(similarHeroes.slice(0, 3));
        }
        
        setLoading(false);
      }
    };

    fetchHeroAndSuggestions();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Chargement...
        <div className="flex justify-center py-4">
          <img 
            src="/loader.gif" 
            alt="Loading..." 
            className="w-16 h-16"
          />
        </div>
      </div>
    );
  }

  if (!hero) {
    return <div className="flex justify-center items-center min-h-screen">Super-héros non trouvé</div>;
  }

  return (
  <div className="container mx-auto px-4 py-8">
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-[#e53935]/20">
      <div className="md:flex">
        <div className="md:w-1/3">
          <img 
            src={hero.image.url} 
            alt={hero.name}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="md:w-2/3 p-6 text-gray-100">
          <h1 className="text-3xl font-bold mb-4 text-[#e53935]">{hero.name}</h1>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-[#64b5f6]">Biographie</h2>
            <div className="grid grid-cols-2 gap-2">
              <p><span className="font-semibold text-gray-400">Nom complet:</span> {hero.biography['full-name']}</p>
              <p><span className="font-semibold text-gray-400">Autres identités:</span> {hero.biography['alter-egos']}</p>
              <p><span className="font-semibold text-gray-400">Lieu de naissance:</span> {hero.biography['place-of-birth']}</p>
              <p><span className="font-semibold text-gray-400">Première apparition:</span> {hero.biography['first-appearance']}</p>
              <p><span className="font-semibold text-gray-400">Éditeur:</span> {hero.biography.publisher}</p>
              <p><span className="font-semibold text-gray-400">Alignement:</span> {hero.biography.alignment}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-[#64b5f6]">Statistiques</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-400">Intelligence:</span>
                <div className="w-full bg-gray-800 rounded">
                  <div 
                    className="bg-[#64b5f6] text-xs text-white text-center p-1 rounded"
                    style={{ width: `${hero.powerstats.intelligence}%` }}
                  >
                    {hero.powerstats.intelligence}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-400">Force:</span>
                <div className="w-full bg-gray-800 rounded">
                  <div 
                    className="bg-[#e53935] text-xs text-white text-center p-1 rounded"
                    style={{ width: `${hero.powerstats.strength}%` }}
                  >
                    {hero.powerstats.strength}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Apparence */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-[#64b5f6]">Apparence</h2>
            <div className="grid grid-cols-2 gap-2">
              <p><span className="font-semibold text-gray-400">Genre:</span> {hero.appearance.gender}</p>
              <p><span className="font-semibold text-gray-400">Race:</span> {hero.appearance.race}</p>
              <p><span className="font-semibold text-gray-400">Taille:</span> {hero.appearance.height[1]}</p>
              <p><span className="font-semibold text-gray-400">Poids:</span> {hero.appearance.weight[1]}</p>
              <p><span className="font-semibold text-gray-400">Couleur des yeux:</span> {hero.appearance['eye-color']}</p>
              <p><span className="font-semibold text-gray-400">Couleur des cheveux:</span> {hero.appearance['hair-color']}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-[#64b5f6]">Héro(s) lié(s)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {suggestedHeroes.length > 0 ? (
          suggestedHeroes.map((suggestedHero) => (
            <Link 
              key={suggestedHero.id} 
              to={`/hero/${suggestedHero.id}`}
              className="block bg-gray-900 rounded-lg overflow-hidden border border-[#e53935]/20 hover:border-[#e53935] transition-colors"
            >
              <img 
                src={suggestedHero.image.url} 
                alt={suggestedHero.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-100">{suggestedHero.name}</h3>
                <p className="text-sm text-gray-400">
                  {suggestedHero.biography.publisher}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-400">
            Aucun héros similaire trouvé
          </p>
        )}
      </div>
    </div>
  </div>
);
}
