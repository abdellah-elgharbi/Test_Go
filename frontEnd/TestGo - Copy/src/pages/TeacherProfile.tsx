import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/LayoutTeacher';

// Données locales pour les modules disponibles
const AVAILABLE_MODULES = [
    "Introduction Au Java",
    "Java Advanced Programming",
    "Algorithmes et Structures de Données",
    "Programmation Web",
    "Base de Données SQL",
    "Administration Systèmes",
    "Réseaux Informatiques",
    "Architecture des Ordinateurs",
    "Intelligence Artificielle",
    "Cybersécurité"
];

const TeacherProfile = () => {
    const [loading, setLoading] = useState(true);
    const [teacher, setTeacher] = useState({
        id: "T123456",
        email: "younes.aitouahda@gmail.com",
        nom: "Ait Ouahda",
        prenom: "Younes",
        role: "Enseignant",
        telephone: "+212 6XX XX XX XX",
        modulesEnseignes: ["Introduction Au Java", "Java Advanced Programming"]
    });

    const [editData, setEditData] = useState({...teacher});
    const [editMode, setEditMode] = useState(false);
    const [isEditing, setIsEditing] = useState(null);
    const [notification, setNotification] = useState({show: false, message: "", type: ""});
    const [availableModules, setAvailableModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState("");
    
    // Password management
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        message: "Faible",
        color: "bg-red-500"
    });
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    // Animation states
    const [moduleAnimation, setModuleAnimation] = useState(null);

    // Simulation de chargement initial
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);
        
        return () => clearTimeout(timer);
    }, []);

    // Charger les modules disponibles
    useEffect(() => {
        setAvailableModules(AVAILABLE_MODULES);
    }, []);

    useEffect(() => {
        setEditData({...teacher});
    }, [teacher]);

    // Password strength evaluation
    useEffect(() => {
        if (!passwordData.newPassword) {
            setPasswordStrength({
                score: 0,
                message: "Faible",
                color: "bg-red-500"
            });
            return;
        }

        let score = 0;
        // Length check
        if (passwordData.newPassword.length >= 8) score += 1;
        if (passwordData.newPassword.length >= 12) score += 1;
        
        // Complexity checks
        if (/[A-Z]/.test(passwordData.newPassword)) score += 1;
        if (/[a-z]/.test(passwordData.newPassword)) score += 1;
        if (/[0-9]/.test(passwordData.newPassword)) score += 1;
        if (/[^A-Za-z0-9]/.test(passwordData.newPassword)) score += 1;

        // Calculate strength
        let message, color;
        if (score <= 2) {
            message = "Faible";
            color = "bg-red-500";
        } else if (score <= 4) {
            message = "Moyen";
            color = "bg-yellow-500";
        } else {
            message = "Fort";
            color = "bg-green-500";
        }

        setPasswordStrength({ score, message, color });
    }, [passwordData.newPassword]);

    const toggleEdit = () => {
        if (editMode) {
            // Cancel edit mode
            setEditData({...teacher});
        }
        setEditMode(prev => !prev);
        setIsEditing(null);
    };

    const handleInputChange = (field, value) => {
        setEditData({...editData, [field]: value});
    };

    const handlePasswordChange = (field, value) => {
        setPasswordData({...passwordData, [field]: value});
    };

    const handleSaveChanges = () => {
        setLoading(true);
        
        // Simulation de délai de traitement
        setTimeout(() => {
            setTeacher({...editData});
            setEditMode(false);
            showNotification("Modifications enregistrées avec succès!", "success");
            setLoading(false);
        }, 800);
    };

    const handleAddModule = () => {
        if (selectedModule && !editData.modulesEnseignes.includes(selectedModule)) {
            const updatedModules = [...editData.modulesEnseignes, selectedModule];
            setEditData({...editData, modulesEnseignes: updatedModules});
            setSelectedModule("");
            showNotification("Module ajouté!", "success");
            
            // Trigger animation for the newly added module
            setModuleAnimation(selectedModule);
            setTimeout(() => setModuleAnimation(null), 1000);
        } else if (editData.modulesEnseignes.includes(selectedModule)) {
            showNotification("Ce module est déjà dans votre liste", "info");
        }
    };

    const handleRemoveModule = (index) => {
        // Mark module for animated removal
        const moduleToRemove = editData.modulesEnseignes[index];
        setModuleAnimation(moduleToRemove);
        
        // Wait for animation to complete before removing
        setTimeout(() => {
            const updatedModules = [...editData.modulesEnseignes];
            updatedModules.splice(index, 1);
            setEditData({...editData, modulesEnseignes: updatedModules});
            showNotification("Module supprimé!", "info");
            setModuleAnimation(null);
        }, 300);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        
        // Password validation
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            showNotification("Les mots de passe ne correspondent pas", "error");
            return;
        }
        
        if (passwordStrength.score < 4) {
            showNotification("Le mot de passe n'est pas assez sécurisé", "error");
            return;
        }

        // Simulate password update
        setLoading(true);
        setTimeout(() => {
            showNotification("Mot de passe mis à jour avec succès!", "success");
            setShowPasswordModal(false);
            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
            setLoading(false);
        }, 800);
    };

    const showNotification = (message, type) => {
        setNotification({show: true, message, type});
        setTimeout(() => {
            setNotification({show: false, message: "", type: ""});
        }, 3000);
    };

    // Notification styles based on type
    const notificationStyles = {
        success: "bg-green-500",
        info: "bg-blue-500",
        error: "bg-red-500"
    };

    return (
        <Layout>
            <div className="max-w-6xl mx-auto p-4 md:p-8 font-sans text-gray-800 relative">
                {/* Loading Overlay */}
                {loading && (
                    <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-40 backdrop-blur-sm transition-opacity duration-300">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mb-4 mx-auto"></div>
                            <p className="text-gray-700 font-medium animate-pulse">Chargement en cours...</p>
                        </div>
                    </div>
                )}
                
                {/* Notification */}
                {notification.show && (
                    <div 
                        className={`fixed top-5 right-5 p-3 px-6 rounded-lg text-white font-medium shadow-lg z-50 animate-notification ${notificationStyles[notification.type]}`}
                        style={{animation: "slideInRight 0.3s ease-out forwards, fadeOut 0.3s ease-in forwards 2.7s"}}
                    >
                        {notification.message}
                    </div>
                )}
                
                {/* Password Change Modal */}
                {showPasswordModal && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
                        style={{animation: "fadeIn 0.2s ease-out"}}
                    >
                        <div 
                            className="bg-white rounded-lg p-6 w-full max-w-md"
                            style={{animation: "scaleIn 0.3s ease-out"}}
                        >
                            <h2 className="text-xl font-semibold mb-4">Modifier votre mot de passe</h2>
                            <form onSubmit={handlePasswordSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Mot de passe actuel</label>
                                    <input 
                                        type="password"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Nouveau mot de passe</label>
                                    <input 
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                        required
                                    />
                                    {passwordData.newPassword && (
                                        <div className="mt-2">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                                                <div 
                                                    className={`h-2.5 rounded-full ${passwordStrength.color} transition-all duration-500 ease-out`} 
                                                    style={{width: `${(passwordStrength.score/6)*100}%`}}
                                                ></div>
                                            </div>
                                            <p className="text-sm text-gray-600">Force: {passwordStrength.message}</p>
                                        </div>
                                    )}
                                    <ul className="text-xs text-gray-600 mt-2 space-y-1">
                                        <li className={`transition-colors duration-300 ${passwordData.newPassword.length >= 8 ? "text-green-600" : ""}`}>• Au moins 8 caractères</li>
                                        <li className={`transition-colors duration-300 ${/[A-Z]/.test(passwordData.newPassword) ? "text-green-600" : ""}`}>• Au moins une lettre majuscule</li>
                                        <li className={`transition-colors duration-300 ${/[a-z]/.test(passwordData.newPassword) ? "text-green-600" : ""}`}>• Au moins une lettre minuscule</li>
                                        <li className={`transition-colors duration-300 ${/[0-9]/.test(passwordData.newPassword) ? "text-green-600" : ""}`}>• Au moins un chiffre</li>
                                        <li className={`transition-colors duration-300 ${/[^A-Za-z0-9]/.test(passwordData.newPassword) ? "text-green-600" : ""}`}>• Au moins un caractère spécial</li>
                                    </ul>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 mb-2">Confirmer le mot de passe</label>
                                    <input 
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                                            passwordData.confirmPassword && 
                                            passwordData.newPassword !== passwordData.confirmPassword ? 
                                            "border-red-500" : "border-gray-300"
                                        }`}
                                        required
                                    />
                                    {passwordData.confirmPassword && 
                                        passwordData.newPassword !== passwordData.confirmPassword && (
                                        <p className="text-red-500 text-sm mt-1">Les mots de passe ne correspondent pas</p>
                                    )}
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button 
                                        type="button"
                                        onClick={() => setShowPasswordModal(false)}
                                        className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition duration-300 transform hover:scale-105"
                                    >
                                        Annuler
                                    </button>
                                    <button 
                                        type="submit"
                                        className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition duration-300 transform hover:scale-105"
                                    >
                                        Enregistrer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                
                {/* Header */}
                <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-gray-100">
                    <h1 className="text-3xl font-semibold text-gray-800 hover:text-blue-700 transition-colors duration-300">Profil Enseignant</h1>
                    <div className="flex gap-2">
                        {editMode ? (
                            <>
                                <button 
                                    onClick={handleSaveChanges}
                                    className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-md"
                                >
                                    Enregistrer
                                </button>
                                <button 
                                    onClick={toggleEdit}
                                    className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-md"
                                >
                                    Annuler
                                </button>
                            </>
                        ) : (
                            <button 
                                onClick={toggleEdit}
                                className="px-5 py-2 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded-lg border border-gray-300 transition duration-300 transform hover:scale-105 hover:shadow-md"
                            >
                                Modifier
                            </button>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full lg:w-1/4 transition-all duration-500 ease-in-out">
                        {/* ID Section */}
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-center mb-6 hover:shadow-md transition-all duration-300 transform hover:translate-y-1">
                            <h3 className="text-gray-600 font-medium mb-2">ID Enseignant</h3>
                            <p className="text-xl font-semibold text-gray-800 mb-2">{teacher.id}</p>
                            <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                {teacher.role}
                            </span>
                        </div>
                        
                        {/* Account Security */}
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:translate-y-1">
                            <h2 className="text-xl font-semibold text-gray-800 pb-3 border-b border-gray-100 mb-4">
                                Sécurité du compte
                            </h2>
                            <div className="flex flex-col gap-3">
                                <button 
                                    onClick={() => setShowPasswordModal(true)}
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center font-medium transition duration-300 transform hover:scale-105 hover:shadow-md"
                                >
                                    Modifier le mot de passe
                                </button>
                                <button 
                                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-center font-medium transition duration-300 transform hover:scale-105 hover:shadow-md"
                                >
                                    Activer 2FA
                                </button>
                                <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md mt-2 text-sm transform transition hover:bg-yellow-50 hover:shadow-inner duration-300">
                                    <p className="font-semibold">Conseils de sécurité:</p>
                                    <ul className="list-disc ml-4 mt-1 space-y-1">
                                        <li>Changez votre mot de passe régulièrement</li>
                                        <li>N'utilisez jamais le même mot de passe pour plusieurs comptes</li>
                                        <li>Activez l'authentification à deux facteurs</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Form */}
                    <div className="w-full lg:w-3/4 transition-all duration-500 ease-in-out">
                        {/* Personal Information */}
                        <div className="bg-white p-6 rounded-xl shadow-sm mb-6 hover:shadow-md transition-all duration-300">
                            <h2 className="text-xl font-semibold text-gray-800 pb-3 border-b border-gray-100 mb-4 transition-colors duration-300 hover:text-blue-700">
                                Informations Personnelles
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-600 font-medium mb-2">Prénom</label>
                                    {editMode ? (
                                        <input
                                            type="text"
                                            value={editData.prenom}
                                            onChange={(e) => handleInputChange("prenom", e.target.value)}
                                            className="w-full px-3 py-2 border border-blue-400 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                        />
                                    ) : (
                                        <p className="py-2 text-gray-800">{teacher.prenom}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-600 font-medium mb-2">Nom</label>
                                    {editMode ? (
                                        <input
                                            type="text"
                                            value={editData.nom}
                                            onChange={(e) => handleInputChange("nom", e.target.value)}
                                            className="w-full px-3 py-2 border border-blue-400 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                        />
                                    ) : (
                                        <p className="py-2 text-gray-800">{teacher.nom}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-600 font-medium mb-2">Email</label>
                                    {editMode ? (
                                        <input
                                            type="email"
                                            value={editData.email}
                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                            className="w-full px-3 py-2 border border-blue-400 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                        />
                                    ) : (
                                        <p className="py-2 text-gray-800">{teacher.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-600 font-medium mb-2">Téléphone</label>
                                    {editMode ? (
                                        <input
                                            type="tel"
                                            value={editData.telephone}
                                            onChange={(e) => handleInputChange("telephone", e.target.value)}
                                            className="w-full px-3 py-2 border border-blue-400 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                        />
                                    ) : (
                                        <p className="py-2 text-gray-800">{teacher.telephone}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Modules */}
                        <div className="bg-white p-6 rounded-xl shadow-sm mb-6 hover:shadow-md transition-all duration-300">
                            <h2 className="text-xl font-semibold text-gray-800 pb-3 border-b border-gray-100 mb-4 flex justify-between items-center transition-colors duration-300 hover:text-blue-700">
                                <span>Modules Enseignés</span>
                                <span className="text-sm font-normal text-gray-500">{editData.modulesEnseignes.length} modules</span>
                            </h2>
                            
                            {loading ? (
                                <div className="py-8 flex justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {(editMode ? editData.modulesEnseignes : teacher.modulesEnseignes).map((module, index) => (
                                            <div 
                                                key={index} 
                                                className={`bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all duration-300 
                                                ${editMode ? 'hover:bg-gray-200' : ''}
                                                ${moduleAnimation === module ? 'animate-pulse opacity-50' : ''}
                                                transform hover:scale-105`}
                                                style={moduleAnimation === module ? {animation: "fadeOut 0.3s ease-out"} : {}}
                                            >
                                                <span>{module}</span>
                                                {editMode && (
                                                    <button 
                                                        onClick={() => handleRemoveModule(index)}
                                                        className="text-gray-500 hover:text-red-500 hover:bg-gray-200 h-5 w-5 flex items-center justify-center rounded-full transition duration-200"
                                                    >
                                                        ×
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {editMode && (
                                        <div className="flex gap-2 mt-4">
                                            <select
                                                value={selectedModule}
                                                onChange={(e) => setSelectedModule(e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all duration-300"
                                            >
                                                <option value="">Sélectionner un module...</option>
                                                {availableModules
                                                    .filter(module => !editData.modulesEnseignes.includes(module))
                                                    .map((module, index) => (
                                                        <option key={index} value={module}>
                                                            {module}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                            <button 
                                                onClick={handleAddModule}
                                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md"
                                                disabled={!selectedModule}
                                            >
                                                Ajouter
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Add CSS keyframes for animations */}
            <style jsx>{`
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                
                @keyframes scaleIn {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
            `}</style>
        </Layout>
    );
};

export default TeacherProfile;