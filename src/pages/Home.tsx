import { useAuth } from '../context/AuthContext';


export default function Home() {
    const { user } = useAuth();
    
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12 bg-gray-800 text-white py-16 rounded-lg">
                <h1 className="text-4xl font-bold mb-4">
                    Bienvenue dans l'univers des Super-Héros
                </h1>
                <p className="text-xl">
                    Découvrez et explorez les détails de vos super-héros préférés
                </p>
            </div>

            <div className="max-w-3xl mx-auto mb-12 text-center">
                <h2 className="text-2xl font-bold mb-4">
                    À propos de notre application
                </h2>
                <p className="text-lg mb-4">
                    Notre plateforme vous permet d'explorer une vaste base de données 
                    de super-héros. Recherchez vos personnages préférés et découvrez 
                    leurs histoires, leurs pouvoirs et leurs caractéristiques.
                </p>
                {!user && (
                    <p className="text-blue-600">
                        Connectez-vous pour accéder à toutes les fonctionnalités !
                    </p>
                )}
            </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <img 
                        src="/cosplayNul1.jpg" 
                        alt="Cosplay Nul Batman"
                        className="w-full h-full object-cover"
                    />
                </div>
            
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <img 
                        src="/cosplayNul2.webp" 
                        alt="Cosplay Nul Spider-Man"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}