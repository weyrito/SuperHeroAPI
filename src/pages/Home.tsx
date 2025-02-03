import { useAuth } from '../context/AuthContext';

export default function Home() {
    const { user } = useAuth();
    
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12 bg-gradient-to-r from-black via-[#1a1a1a] to-black text-yellow-500 py-16 rounded-lg shadow-[0_0_30px_rgba(255,215,0,0.3)]">
                <h1 className="text-4xl mb-4 font-batman tracking-wider">
                    Bat-venue dans la Bat-cave des Super-Héros
                </h1>
                <p className="text-xl text-white">
                    En-bat-quez pour une aventure bat-taculaire !
                </p>
            </div>

            <div className="max-w-3xl mx-auto mb-12 text-center">
                <h2 className="text-2xl font-batman text-yellow-500 mb-4 tracking-wider shadow-[0_0_15px_rgba(255,215,0,0.2)]">
                    À Bat-propos de notre Bat-pplication
                </h2>
                <p className="text-lg mb-4 text-white">
                    Notre Bat-plateforme vous permet d'explorer une bat-base de données 
                    de super-héros. Bat-cherchez vos personnages préférés et découvrez 
                    leurs bat-histoires, leurs bat-pouvoirs et leurs bat-ractéristiques.
                </p>
                {!user && (
                    <p className="text-yellow-500 font-batman tracking-wide shadow-[0_0_15px_rgba(255,215,0,0.2)]">
                        Bat-connectez-vous pour accéder à toutes les bat-fonctionnalités !
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-black rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                    <img 
                        src="/cosplayNul1.jpg" 
                        alt="Bat-Cosplay"
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                </div>
            
                <div className="bg-black rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                    <img 
                        src="/cosplayNul2.webp" 
                        alt="Bat-Cosplay"
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                </div>
            </div>
        </div>
    );
}