import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Contact() {
    const { } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-4xl font-batman text-yellow-500 text-center mb-8 shadow-[0_0_30px_rgba(255,215,0,0.3)]">
                Bat-Contact
            </h1>
            
            {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6 bg-black/50 p-8 rounded-lg border-2 border-yellow-500 shadow-[0_0_30px_rgba(255,215,0,0.2)]">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-batman text-yellow-500 mb-1">
                                Bat-Prénom
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-black/70 text-yellow-500 border-2 border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-yellow-500/50"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-batman text-yellow-500 mb-1">
                                Bat-Nom
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-black/70 text-yellow-500 border-2 border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-yellow-500/50"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-batman text-yellow-500 mb-1">
                            Bat-Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-black/70 text-yellow-500 border-2 border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-yellow-500/50"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-batman text-yellow-500 mb-1">
                            Bat-Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full px-4 py-2 bg-black/70 text-yellow-500 border-2 border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-yellow-500/50"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-500 text-black font-batman py-2 px-4 rounded-lg hover:bg-black hover:text-yellow-500 hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] border-2 border-yellow-500 transition-all duration-300"
                    >
                        Envoyer le Bat-Message
                    </button>
                </form>
            ) : (
                <div className="text-center p-8 bg-black/50 rounded-lg border-2 border-yellow-500 shadow-[0_0_30px_rgba(255,215,0,0.3)]">
                    <h2 className="text-2xl font-batman text-yellow-500 mb-4">
                        Merci {formData.firstName} {formData.lastName} !
                    </h2>
                    <p className="text-yellow-500 font-batman">
                        Votre Bat-message a été envoyé avec succès. Nous vous répondrons bientôt à l'adresse {formData.email}.
                    </p>
                </div>
            )}
        </div>
    );
}