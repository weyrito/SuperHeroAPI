import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!isLogin && password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
        setLoading(false);
        return;
      }
      navigate('/search');
    } catch (error: any) {
      setError(
        isLogin 
          ? 'Échec de la connexion. Vérifiez vos identifiants.'
          : 'Échec de l\'inscription. ' + (error.message || 'Veuillez réessayer.')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#1a1a1a] to-black p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-black/50 p-8 rounded-lg border-2 border-yellow-500 shadow-[0_0_30px_rgba(255,215,0,0.2)]">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-batman text-yellow-500 mb-2">
              {isLogin ? 'Bat-Connexion' : 'Bat-Inscription'}
            </h2>
            <div className="text-yellow-500 text-6xl mb-4">🦇</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-500/20 border border-red-500 text-red-500 p-3 rounded text-center"
              >
                {error}
              </motion.div>
            )}

            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Bat-Email"
                required
                className="w-full px-4 py-2 bg-black/70 text-yellow-500 border-2 border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-yellow-500/50"
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Bat-Mot de passe"
                required
                className="w-full px-4 py-2 bg-black/70 text-yellow-500 border-2 border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-yellow-500/50"
              />
            </div>

            {!isLogin && (
              <div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirmer le Bat-Mot de passe"
                  required
                  className="w-full px-4 py-2 bg-black/70 text-yellow-500 border-2 border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-yellow-500/50"
                />
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255,215,0,0.5)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 text-black font-batman py-2 px-4 rounded-lg hover:bg-black hover:text-yellow-500 border-2 border-yellow-500 transition-all duration-300"
            >
              {loading ? 'Chargement...' : (isLogin ? 'Se connecter' : 'S\'inscrire')}
            </motion.button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-yellow-500 hover:text-white transition-colors duration-300"
              >
                {isLogin 
                  ? 'Pas encore de compte ? Inscrivez-vous !' 
                  : 'Déjà un compte ? Connectez-vous !'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}