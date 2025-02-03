import { Link } from 'react-router-dom';
import type { Hero } from '../API/FetchSuperHero';

interface HeroCardProps {
  hero: Hero;
}

export default function HeroCard({ hero }: HeroCardProps) {
  return (
    <Link to={`/hero/${hero.id}`} className="block">
      <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <img 
          src={hero.image.url} 
          alt={hero.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-100">{hero.name}</h2>
        </div>
      </div>
    </Link>
  );
}