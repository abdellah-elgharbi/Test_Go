import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Layout from "./layout/Layout";
import { 
  EyeIcon, 
  EyeOffIcon, 
  LockIcon, 
  UserIcon, 
  MailIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ShieldIcon
} from "lucide-react";

const ProfileManager = () => {
  const { toast } = useToast();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);

  const studentData = {
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
  };

  // Animation d'entrée
  useEffect(() => {
    setMounted(true);
  }, []);

  // Vérifier la force du mot de passe
  useEffect(() => {
    if (passwordData.newPassword) {
      let strength = 0;
      if (passwordData.newPassword.length >= 8) strength += 1;
      if (/[A-Z]/.test(passwordData.newPassword)) strength += 1;
      if (/[0-9]/.test(passwordData.newPassword)) strength += 1;
      if (/[^A-Za-z0-9]/.test(passwordData.newPassword)) strength += 1;
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
  }, [passwordData.newPassword]);

  // Vérifier la correspondance des mots de passe
  useEffect(() => {
    if (passwordData.confirmPassword && passwordData.newPassword) {
      setIsPasswordMatch(passwordData.confirmPassword === passwordData.newPassword);
    } else {
      setIsPasswordMatch(null);
    }
  }, [passwordData.confirmPassword, passwordData.newPassword]);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation du mot de passe
    if (passwordData.newPassword.length < 8) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères.");
      showErrorToast("Mot de passe trop court");
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Les nouveaux mots de passe ne correspondent pas.");
      showErrorToast("Mots de passe différents");
      return;
    }

    setPasswordError(null);
    toast({
      title: "Succès !",
      description: "Votre mot de passe a été modifié avec succès.",
      variant: "default",
    });
    
    // Animation de succès avant de réinitialiser
    setTimeout(() => {
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }, 1000);
  };

  const showErrorToast = (message: string) => {
    toast({
      title: "Erreur",
      description: message,
      variant: "destructive",
    });
  };

  const togglePasswordVisibility = (field: string) => {
    switch (field) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword);
        break;
    }
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0: return "bg-red-500";
      case 1: return "bg-orange-500";
      case 2: return "bg-yellow-500";
      case 3: return "bg-blue-500";
      case 4: return "bg-green-500";
      default: return "bg-gray-300";
    }
  };

  const getStrengthText = () => {
    switch (passwordStrength) {
      case 0: return "Très faible";
      case 1: return "Faible";
      case 2: return "Moyen";
      case 3: return "Fort";
      case 4: return "Excellent";
      default: return "";
    }
  };

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-10 max-w-3xl transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <Card className="shadow-xl border border-blue-100 overflow-hidden transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1">
          <CardHeader className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 px-6 py-5">
            <CardTitle className="text-white text-2xl font-semibold flex items-center">
              <UserIcon className="mr-2" size={24} />
              <span className="tracking-wide">Profil Étudiant</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <Label className="text-blue-900 font-medium flex items-center">
                  <UserIcon className="mr-2 transition-transform duration-300 group-hover:scale-110" size={16} />
                  Nom
                </Label>
                <Input
                  value={studentData.lastName}
                  disabled
                  className="bg-blue-50 border border-blue-200 text-blue-900 focus:ring-2 focus:ring-blue-300 transition-all duration-300 group-hover:bg-blue-100"
                />
              </div>
              <div className="space-y-2 group">
                <Label className="text-blue-900 font-medium flex items-center">
                  <UserIcon className="mr-2 transition-transform duration-300 group-hover:scale-110" size={16} />
                  Prénom
                </Label>
                <Input
                  value={studentData.firstName}
                  disabled
                  className="bg-blue-50 border border-blue-200 text-blue-900 focus:ring-2 focus:ring-blue-300 transition-all duration-300 group-hover:bg-blue-100"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <Label className="text-blue-900 font-medium flex items-center">
                <MailIcon className="mr-2 transition-transform duration-300 group-hover:scale-110" size={16} />
                Email
              </Label>
              <Input
                value={studentData.email}
                disabled
                type="email"
                className="bg-blue-50 border border-blue-200 text-blue-900 focus:ring-2 focus:ring-blue-300 transition-all duration-300 group-hover:bg-blue-100"
              />
            </div>

            {/* Sécurité */}
            <div className="border-t border-blue-200 pt-6 mt-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <ShieldIcon className="mr-2 text-blue-700" size={20} />
                <span className="relative">
                  Sécurité
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-800 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </span>
              </h3>
              
              {!isChangingPassword ? (
                <div className="transition-all duration-300 transform hover:translate-x-1">
                  <Button
                    onClick={() => setIsChangingPassword(true)}
                    className="bg-blue-800 hover:bg-blue-950 transition-all duration-300 transform hover:scale-105 flex items-center shadow-md"
                  >
                    <LockIcon className="mr-2" size={16} />
                    Modifier le mot de passe
                  </Button>
                </div>
              ) : (
                <div className={`transition-all duration-500 ${isChangingPassword ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                  <form onSubmit={handlePasswordChange} className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-blue-900">Mot de passe actuel</Label>
                      <div className="relative group">
                        <Input
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData((prev) => ({
                              ...prev,
                              currentPassword: e.target.value,
                            }))
                          }
                          className="pr-10 focus:ring-2 focus:ring-blue-300 transition-all duration-300 border border-blue-200 focus:border-blue-400"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-800 transition-colors duration-300"
                          onClick={() => togglePasswordVisibility('current')}
                        >
                          {showCurrentPassword ? (
                            <EyeOffIcon size={18} />
                          ) : (
                            <EyeIcon size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-blue-900">Nouveau mot de passe</Label>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData((prev) => ({
                              ...prev,
                              newPassword: e.target.value,
                            }))
                          }
                          className="pr-10 focus:ring-2 focus:ring-blue-300 transition-all duration-300 border border-blue-200 focus:border-blue-400"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-800 transition-colors duration-300"
                          onClick={() => togglePasswordVisibility('new')}
                        >
                          {showNewPassword ? (
                            <EyeOffIcon size={18} />
                          ) : (
                            <EyeIcon size={18} />
                          )}
                        </button>
                      </div>
                      
                      {/* Indicateur de force du mot de passe */}
                      {passwordData.newPassword && (
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-600">Force du mot de passe:</span>
                            <span className={`text-xs font-medium ${
                              passwordStrength <= 1 ? 'text-red-600' : 
                              passwordStrength === 2 ? 'text-yellow-600' : 
                              passwordStrength === 3 ? 'text-blue-600' : 'text-green-600'
                            }`}>
                              {getStrengthText()}
                            </span>
                          </div>
                          
                          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${getStrengthColor()} transition-all duration-500 ease-in-out`} 
                              style={{ width: `${passwordStrength * 25}%` }}
                            ></div>
                          </div>
                          
                          <ul className="text-xs text-gray-600 space-y-1 mt-2">
                            <li className="flex items-center">
                              {passwordData.newPassword.length >= 8 ? 
                                <CheckCircleIcon className="text-green-500 mr-1" size={12} /> : 
                                <XCircleIcon className="text-red-500 mr-1" size={12} />
                              }
                              Au moins 8 caractères
                            </li>
                            <li className="flex items-center">
                              {/[A-Z]/.test(passwordData.newPassword) ? 
                                <CheckCircleIcon className="text-green-500 mr-1" size={12} /> : 
                                <XCircleIcon className="text-red-500 mr-1" size={12} />
                              }
                              Au moins une majuscule
                            </li>
                            <li className="flex items-center">
                              {/[0-9]/.test(passwordData.newPassword) ? 
                                <CheckCircleIcon className="text-green-500 mr-1" size={12} /> : 
                                <XCircleIcon className="text-red-500 mr-1" size={12} />
                              }
                              Au moins un chiffre
                            </li>
                            <li className="flex items-center">
                              {/[^A-Za-z0-9]/.test(passwordData.newPassword) ? 
                                <CheckCircleIcon className="text-green-500 mr-1" size={12} /> : 
                                <XCircleIcon className="text-red-500 mr-1" size={12} />
                              }
                              Au moins un caractère spécial
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-blue-900">Confirmer le nouveau mot de passe</Label>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData((prev) => ({
                              ...prev,
                              confirmPassword: e.target.value,
                            }))
                          }
                          className={`pr-10 focus:ring-2 focus:ring-blue-300 transition-all duration-300 border ${
                            isPasswordMatch === null ? 'border-blue-200' :
                            isPasswordMatch ? 'border-green-300' : 'border-red-300'
                          } focus:border-blue-400`}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-800 transition-colors duration-300"
                          onClick={() => togglePasswordVisibility('confirm')}
                        >
                          {showConfirmPassword ? (
                            <EyeOffIcon size={18} />
                          ) : (
                            <EyeIcon size={18} />
                          )}
                        </button>
                        
                        {isPasswordMatch !== null && (
                          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                            {isPasswordMatch ? (
                              <CheckCircleIcon className="text-green-500" size={18} />
                            ) : (
                              <XCircleIcon className="text-red-500" size={18} />
                            )}
                          </div>
                        )}
                      </div>
                      
                      {isPasswordMatch === false && passwordData.confirmPassword && (
                        <p className="text-xs text-red-600 mt-1">Les mots de passe ne correspondent pas</p>
                      )}
                    </div>

                    {passwordError && (
                      <div className="bg-red-50 p-4 rounded-md border-l-4 border-red-500 animate-pulse">
                        <p className="text-red-600 text-sm font-medium flex items-center">
                          <XCircleIcon className="mr-2" size={16} />
                          {passwordError}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-4 pt-2">
                      <Button 
                        type="submit" 
                        className="bg-blue-800 hover:bg-blue-950 transition-all duration-300 transform hover:scale-105 shadow-lg flex-1"
                      >
                        <span className="relative inline-block">
                          Enregistrer
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                        </span>
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-blue-800 text-blue-800 hover:bg-blue-50 transition-all duration-300 flex-1"
                        onClick={() => {
                          setIsChangingPassword(false);
                          setPasswordData({
                            currentPassword: "",
                            newPassword: "",
                            confirmPassword: "",
                          });
                          setPasswordError(null);
                        }}
                      >
                        Annuler
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfileManager;