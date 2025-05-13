import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { useNavigate } from "react-router-dom"; // ✅ Corrigé ici

// Logo SVG...
const EducationCapLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" className="w-32 h-24">
    {/* (SVG contenu inchangé) */}
  </svg>
);

const AuthComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // ✅ Correctement placé ici

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoading(true);
    setError("");

    // Simuler une authentification
    setTimeout(() => {
      if (email === "abdellahStudent@gmail.com" && password === "abdellah") {
        if (rememberMe) {
          localStorage.setItem("savedEmail", email);
          localStorage.setItem("savedPassword", password);
        } else {
          localStorage.removeItem("savedEmail");
          localStorage.removeItem("savedPassword");
        }

        navigate("/StudentDashboardPage"); // ✅ Redirection vers la page utilisateur
      } 
      else if(email==="abdellahProf@gmail.com" && password==="abdellah"){
        if (rememberMe) {
          localStorage.setItem("savedEmail", email);
          localStorage.setItem("savedPassword", password);
        } else {
          localStorage.removeItem("savedEmail");
          localStorage.removeItem("savedPassword");
        }

        navigate("/teacher-dashboard"); // ✅ Redirection vers la page utilisateur
      }
      else if(email==="abdellahAdmin@gmail.com" && password==="abdellah"){
        if (rememberMe) {
          localStorage.setItem("savedEmail", email);
          localStorage.setItem("savedPassword", password);
        } else {
          localStorage.removeItem("savedEmail");
          localStorage.removeItem("savedPassword");
        }

        navigate("/admin/users"); // ✅ Redirection vers la page utilisateur
      }
      else {
        setError("Email ou mot de passe incorrect.");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleForgotPassword = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      alert("Un email de récupération a été envoyé à votre adresse.");
      setShowForgotPassword(false);
    }, 1000);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-96 border border-gray-100">
      <div className="flex justify-center mb-4">
        <EducationCapLogo />
      </div>

      {showForgotPassword ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-800">Récupération</h2>
          <p className="text-sm text-gray-500 text-center mb-4">
            Nous vous enverrons un lien pour réinitialiser votre mot de passe
          </p>

          <Input
            type="email"
            placeholder="Entrez votre email"
            value={recoveryEmail}
            onChange={(e) => setRecoveryEmail(e.target.value)}
            className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
          />

          <Button
            onClick={handleForgotPassword}
            className="w-full rounded-lg py-2.5"
            style={{
              backgroundColor: "#162766",
              color: "white",
              boxShadow: "0 4px 6px rgba(22, 39, 102, 0.2)",
            }}
            disabled={isLoading}
          >
            {isLoading ? "Envoi en cours..." : "Envoyer un lien de réinitialisation"}
          </Button>

          <p
            className="text-sm text-blue-700 mt-4 cursor-pointer text-center hover:text-blue-900 font-medium"
            onClick={() => setShowForgotPassword(false)}
          >
            &larr; Retour à la connexion
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-800">Connexion</h2>
          <p className="text-sm text-gray-500 text-center mb-4">
            Entrez vos identifiants pour accéder à votre compte
          </p>

          <div className="space-y-3">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1">Mot de passe</label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">Se souvenir de moi</label>
            </div>

            <p
              className="text-sm text-blue-700 cursor-pointer hover:text-blue-900 font-medium"
              onClick={() => setShowForgotPassword(true)}
            >
              Mot de passe oublié ?
            </p>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <Button
            onClick={handleLogin}
            className="w-full rounded-lg py-2.5 mt-2"
            style={{
              backgroundColor: "#162766",
              color: "white",
              boxShadow: "0 4px 6px rgba(22, 39, 102, 0.2)",
            }}
            disabled={isLoading}
          >
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
