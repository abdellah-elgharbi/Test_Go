import { useState, useEffect } from 'react';
import { Plus, Calendar, ClipboardList, BarChart2, Search, Filter, ChevronDown, Trash2, Edit } from 'lucide-react';
import Layout from '@/components/layout/LayoutTeacher';
import { useNavigate } from 'react-router-dom';
const TestManagement = () => {
    const [activeTab, setActiveTab] = useState('tous');
    const [tests, setTests] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentTest, setCurrentTest] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterModule, setFilterModule] = useState('tous');


  
    useEffect(() => {
        // Données fictives - à remplacer par un appel API
        // fetchTests() - Fonction à implémenter pour l'appel API
        const mockTests = [
            {
                id: 'test1',
                title: 'Examen JAVA Fondamentaux',
                module: 'JAVA',
                type: 'THEORIQUE',
                niveau: 'MOYEN',
                dateCreation: '2025-04-28',
                creneauDebut: '2025-05-10T08:00:00',
                creneauFin: '2025-05-10T10:00:00',
                groupe: '2ITE-2',
                nombreQuestions: 15,
                status: 'PLANIFIE',
                participationCount: 0,
                totalStudents: 25
            },
            {
                id: 'test2',
                title: 'TP Spring Framework',
                module: 'Spring',
                type: 'PRATIQUE',
                niveau: 'DIFFICILE',
                dateCreation: '2025-04-22',
                creneauDebut: '2025-05-03T10:00:00',
                creneauFin: '2025-05-03T12:00:00',
                groupe: '2ITE-2',
                nombreQuestions: 3,
                status: 'EN_COURS',
                participationCount: 12,
                totalStudents: 25
            },
            {
                id: 'test3',
                title: 'Quiz JavaScript ES6+',
                module: 'JS',
                type: 'THEORIQUE',
                niveau: 'SIMPLE',
                dateCreation: '2025-04-15',
                creneauDebut: '2025-04-25T14:00:00',
                creneauFin: '2025-04-25T15:00:00',
                groupe: 'ISIC-2',
                nombreQuestions: 10,
                status: 'TERMINE',
                participationCount: 36,
                totalStudents: 40
            },
            {
                id: 'test4',
                title: 'Examen Final JAVA',
                module: 'JAVA',
                type: 'HYBRIDE',
                niveau: 'DIFFICILE',
                dateCreation: '2025-04-10',
                creneauDebut: '2025-04-20T09:00:00',
                creneauFin: '2025-04-20T12:00:00',
                groupe: '2ITE-1',
                nombreQuestions: 20,
                status: 'TERMINE',
                participationCount: 28,
                totalStudents: 30
            }
        ];

        setTests(mockTests);
    }, []);

    const filteredTests = tests.filter(test => {
        // Filtre par statut
        if (activeTab !== 'tous' && test.status !== activeTab) {
            return false;
        }

        // Filtre par recherche
        if (searchQuery && !test.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        // Filtre par module
        if (filterModule !== 'tous' && test.module !== filterModule) {
            return false;
        }

        return true;
    });

    const modules = ['tous', 'JAVA', 'Spring', 'JS', 'Oracle', 'Dev .Net'];

    const statusBadge = (status) => {
        const styles = {
            'PLANIFIE': 'bg-blue-100 text-blue-800',
            'EN_COURS': 'bg-yellow-100 text-yellow-800',
            'TERMINE': 'bg-green-100 text-green-800'
        };

        const labels = {
            'PLANIFIE': 'Planifié',
            'EN_COURS': 'En cours',
            'TERMINE': 'Terminé'
        };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    const typeBadge = (type) => {
        const styles = {
            'THEORIQUE': 'bg-purple-100 text-purple-800',
            'PRATIQUE': 'bg-orange-100 text-orange-800',
            'HYBRIDE': 'bg-teal-100 text-teal-800'
        };
 

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[type]}`}>
                {type.charAt(0) + type.slice(1).toLowerCase()}
            </span>
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(date);
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const handleViewTest = (test) => {
        setCurrentTest(test);
        setIsViewModalOpen(true);
    };

    const handleEditTest = (test) => {
        setCurrentTest(test);
        setIsEditModalOpen(true);
    };

    const handleDeleteTest = (testId) => {
        // Confirmation avant suppression
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce test ?")) {
            // Pour l'implémentation avec API:
            // deleteTest(testId).then(() => {
            //   fetchTests().then(updatedTests => setTests(updatedTests));
            // });

            // Implémentation avec mock data:
            const updatedTests = tests.filter(test => test.id !== testId);
            setTests(updatedTests);
        }
    };

    const updateTest = (updatedTest) => {
        // Pour l'implémentation avec API:
        // updateTestAPI(updatedTest).then(() => {
        //   fetchTests().then(updatedTests => setTests(updatedTests));
        // });

        // Implémentation avec mock data:
        const updatedTests = tests.map(test => 
            test.id === updatedTest.id ? updatedTest : test
        );
        setTests(updatedTests);
        setIsEditModalOpen(false);
    };
   const navigate=useNavigate()
    const handleViewResults = (test) => {
        if (test.status === 'TERMINE') {
            navigate(`/teacher/test_detaille`);
        }
    } 
    return (
    <Layout>
        <div className="p-6 max-w-full bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gestion des Tests</h1>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                    <Plus size={18} />
                    Créer un test
                </button>
            </div>

            {/* Tabs de filtrage par statut */}
            <div className="flex border-b mb-6">
                <button
                    className={`px-4 py-2 font-medium ${activeTab === 'tous' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('tous')}
                >
                    Tous
                </button>
                <button
                    className={`px-4 py-2 font-medium ${activeTab === 'PLANIFIE' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('PLANIFIE')}
                >
                    Planifiés
                </button>
                <button
                    className={`px-4 py-2 font-medium ${activeTab === 'EN_COURS' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('EN_COURS')}
                >
                    En cours
                </button>
                <button
                    className={`px-4 py-2 font-medium ${activeTab === 'TERMINE' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('TERMINE')}
                >
                    Terminés
                </button>
            </div>

            {/* Recherche et filtres */}
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="relative flex-grow max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Rechercher un test..."
                        className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="relative">
                    <select
                        className="pl-4 pr-10 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                        value={filterModule}
                        onChange={(e) => setFilterModule(e.target.value)}
                    >
                        {modules.map(module => (
                            <option key={module} value={module}>
                                {module === 'tous' ? 'Tous les modules' : module}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
            </div>

            {/* Liste des tests */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Titre</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Module</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Groupe</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Créneau</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Participation</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Statut</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {filteredTests.map(test => (
                        <tr key={test.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4">
                                <div className="font-medium text-gray-900">{test.title}</div>
                                <div className="text-sm text-gray-500">Niveau: {test.niveau.charAt(0) + test.niveau.slice(1).toLowerCase()}</div>
                            </td>
                            <td className="px-4 py-4 text-gray-700">{test.module}</td>
                            <td className="px-4 py-4">{typeBadge(test.type)}</td>
                            <td className="px-4 py-4 text-gray-700">{test.groupe}</td>
                            <td className="px-4 py-4">
                                <div className="flex items-center">
                                    <Calendar size={16} className="mr-2 text-gray-400" />
                                    <div>
                                        <div className="text-sm">{formatDate(test.creneauDebut)}</div>
                                        <div className="text-xs text-gray-500">
                                            {new Date(test.creneauDebut).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} -
                                            {new Date(test.creneauFin).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-4">
                                <div className="flex items-center">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className="bg-green-600 h-2.5 rounded-full"
                                            style={{ width: `${(test.participationCount / test.totalStudents) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="ml-2 text-sm text-gray-500">
                                        {test.participationCount}/{test.totalStudents}
                                    </span>
                                </div>
                            </td>
                            <td className="px-4 py-4">{statusBadge(test.status)}</td>
                            <td className="px-4 py-4">
                                <div className="flex space-x-2">
                                    <button 
                                        className="p-1 text-blue-600 hover:text-blue-800 rounded" 
                                        title="Voir détails"
                                        onClick={() => handleViewTest(test)}
                                    >
                                        <ClipboardList size={18} />
                                    </button>
                                    <button 
                                        className="p-1 text-yellow-600 hover:text-yellow-800 rounded" 
                                        title="Modifier"
                                        onClick={() => handleEditTest(test)}
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button 
                                        className="p-1 text-red-600 hover:text-red-800 rounded" 
                                        title="Supprimer"
                                        onClick={() => handleDeleteTest(test.id)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <button 
                                        className="p-1 text-green-600 hover:text-green-800 rounded" 
                                        title="Voir résultats" 
                                        disabled={test.status !== 'TERMINE'}
                                    >
                                        <BarChart2 size={18} className={test.status !== 'TERMINE' ? 'opacity-50' : ''} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {filteredTests.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-gray-500">Aucun test ne correspond à vos critères.</p>
                </div>
            )}

            {/* Modal de création de test */}
            {isCreateModalOpen && (
                <CreateTestModal onClose={() => setIsCreateModalOpen(false)} />
            )}

            {/* Modal de visualisation de test */}
            {isViewModalOpen && currentTest && (
                <ViewTestModal 
                    test={currentTest} 
                    onClose={() => setIsViewModalOpen(false)} 
                    onEdit={() => {
                        setIsViewModalOpen(false);
                        setIsEditModalOpen(true);
                    }}
                />
            )}

            {/* Modal de modification de test */}
            {isEditModalOpen && currentTest && (
                <EditTestModal 
                    test={currentTest} 
                    onClose={() => setIsEditModalOpen(false)} 
                    onUpdate={updateTest} 
                />
            )}
        </div>
    </Layout>
    );
};



// Nouveau composant modal pour visualiser les détails d'un test
const ViewTestModal = ({ test, onClose, onEdit }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        if (test.status === 'TERMINE') {
            navigate('/teacher/test_detaille');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="bg-white rounded-lg w-full max-w-4xl p-8 max-h-[90vh] overflow-y-auto shadow-xl transform transition-all"
                onClick={(e) => e.stopPropagation()} // Empêche la propagation au fond noir
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Détails du test</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-8">
                    {/* Informations générales */}
                    <div onClick={handleNavigate} className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition">
                        <h3 className="text-lg font-medium mb-4 text-gray-700 border-b pb-2">Informations générales</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Titre</p>
                                <p className="text-base text-gray-800">{test.title}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Module</p>
                                <p className="text-base text-gray-800">{test.module}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Type</p>
                                <p className="text-base text-gray-800">{test.type.charAt(0) + test.type.slice(1).toLowerCase()}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Niveau</p>
                                <p className="text-base text-gray-800">{test.niveau.charAt(0) + test.niveau.slice(1).toLowerCase()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Planification */}
                    <div>
                        <h3 className="text-lg font-medium mb-4 text-gray-700 border-b pb-2">Planification</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Groupe</p>
                                <p className="text-base text-gray-800">{test.groupe}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Date de création</p>
                                <p className="text-base text-gray-800">
                                    {new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(test.dateCreation))}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Début</p>
                                <p className="text-base text-gray-800">
                                    {new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(test.creneauDebut))}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Fin</p>
                                <p className="text-base text-gray-800">
                                    {new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(test.creneauFin))}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Statistiques */}
                    <div>
                        <h3 className="text-lg font-medium mb-4 text-gray-700 border-b pb-2">Statistiques</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Nombre de questions</p>
                                <p className="text-base text-gray-800">{test.nombreQuestions}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Participation</p>
                                <p className="text-base text-gray-800">{test.participationCount} / {test.totalStudents}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Statut</p>
                                <p className="text-base text-gray-800">
                                    {test.status === 'PLANIFIE' ? 'Planifié' : test.status === 'EN_COURS' ? 'En cours' : 'Terminé'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Questions */}
                    <div>
                        <h3 className="text-lg font-medium mb-4 text-gray-700 border-b pb-2">Questions</h3>
                        <div className="mt-2 space-y-3">
                            {Array.from({ length: test.nombreQuestions }).map((_, index) => (
                                <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                                    <p className="text-sm text-gray-800">Question {index + 1}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-6 mt-8 pt-6 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium border border-gray-300 rounded-md"
                    >
                        Fermer
                    </button>
                    <button
                        onClick={onEdit}
                        className="px-6 py-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 font-medium"
                    >
                        Modifier
                    </button>
                </div>
            </div>
        </div>
    );
};

// Nouveau composant modal pour modifier un test
const EditTestModal = ({ test, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({ ...test });
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const allQuestions = [
        { id: 'q1', text: 'Question 1: Quel est le langage de programmation utilisé pour le backend?' },
        { id: 'q2', text: 'Question 2: Quelle est la structure de données la plus utilisée pour stocker les données en mémoire?' },
        { id: 'q3', text: 'Question 3: Qu\'est-ce qu\'un framework?' },
        { id: 'q4', text: 'Question 4: Quel est le principe de la programmation orientée objet?' }
    ];

    // Initialiser les questions sélectionnées (simulé)
    useEffect(() => {
        // Dans une véritable application, ces questions seraient chargées depuis l'API
        const questionIds = allQuestions.slice(0, test.nombreQuestions).map(q => q.id);
        setSelectedQuestions(questionIds);
    }, [test]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleQuestionSelection = (questionId) => {
        setSelectedQuestions((prev) => {
            if (prev.includes(questionId)) {
                return prev.filter((id) => id !== questionId);
            }
            return [...prev, questionId];
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Mise à jour du nombre de questions sélectionnées
        const updatedTest = {
            ...formData,
            nombreQuestions: selectedQuestions.length
        };
        
        // Dans une véritable application, ce serait un appel API
        onUpdate(updatedTest);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-4xl p-8 max-h-[90vh] overflow-y-auto shadow-xl transform transition-all">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Modifier le test</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Informations générales */}
                    <div>
                        <h3 className="text-lg font-medium mb-4 text-gray-700">Informations générales</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Titre du test</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Module</label>
                                <select 
                                    name="module"
                                    value={formData.module}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="JAVA">JAVA</option>
                                    <option value="Spring">Spring</option>
                                    <option value="JS">JavaScript</option>
                                    <option value="Oracle">Oracle</option>
                                    <option value="Dev .Net">Dev .Net</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Type de test</label>
                                <div className="flex space-x-6">
                                    <label className="inline-flex items-center text-sm text-gray-600">
                                        <input 
                                            type="radio" 
                                            name="type" 
                                            value="THEORIQUE" 
                                            checked={formData.type === "THEORIQUE"}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-green-600" 
                                        />
                                        <span className="ml-2">Théorique</span>
                                    </label>
                                    <label className="inline-flex items-center text-sm text-gray-600">
                                        <input 
                                            type="radio" 
                                            name="type" 
                                            value="PRATIQUE"
                                            checked={formData.type === "PRATIQUE"}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-green-600" 
                                        />
                                        <span className="ml-2">Pratique</span>
                                    </label>
                                    <label className="inline-flex items-center text-sm text-gray-600">
                                        <input 
                                            type="radio" 
                                            name="type" 
                                            value="HYBRIDE"
                                            checked={formData.type === "HYBRIDE"}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-green-600" 
                                        />
                                        <span className="ml-2">Hybride</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Niveau de difficulté</label>
                                <select 
                                    name="niveau"
                                    value={formData.niveau}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="SIMPLE">Simple</option>
                                    <option value="MOYEN">Moyen</option>
                                    <option value="DIFFICILE">Difficile</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Groupe et planification */}
                    <div>
                        <h3 className="text-lg font-medium mb-4 text-gray-700">Groupe et planification</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Groupe de formation</label>
                                <select 
                                    name="groupe"
                                    value={formData.groupe}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="2ITE-1">2ITE-1</option>
                                    <option value="2ITE-2">2ITE-2</option>
                                    <option value="ISIC-2">ISIC-2</option>
                                </select>
                            </div>

                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Date et heure de début</label>
                                    <input
                                        type="datetime-local"
                                        name="creneauDebut"
                                        value={formData.creneauDebut.slice(0, 16)}
                                        onChange={handleChange}
                                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Date et heure de fin</label>
                                    <input
                                        type="datetime-local"
                                        name="creneauFin"
                                        value={formData.creneauFin.slice(0, 16)}
                                        onChange={handleChange}
                                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Questions */}
                    <div>
                        <h3 className="text-lg font-medium mb-4 text-gray-700">Sélection des questions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {allQuestions.map((question) => (
                                <div key={question.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all">
                                    <input
                                        type="checkbox"
                                        id={`edit-${question.id}`}
                                        checked={selectedQuestions.includes(question.id)}
                                        onChange={() => handleQuestionSelection(question.id)}
                                        className="h-5 w-5 text-green-600"
                                    />
                                    <label htmlFor={`edit-${question.id}`} className="text-sm text-gray-700">{question.text}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-6 mt-8 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium border border-gray-300 rounded-md"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
                        >
                            Enregistrer les modifications
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default TestManagement;