import React, { useState, useRef } from 'react';
import Papa from 'papaparse'; // Added import for Papa Parse
import Layout from '@/components/layout/LayoutAdmin';
import { UserPlus, Edit, Trash2, Upload, Users, GraduationCap } from 'lucide-react'; // Added Lucide icons

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  filiere: string;
}

interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
}

const AccountManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'teachers'>('students');
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Student | Teacher | null>(null);
  const [formData, setFormData] = useState<Partial<Student & Teacher>>({
    name: '',
    email: '',
    phone: '',
    password: '',
    filiere: ''
  });
  const filiereInputRef = useRef<HTMLInputElement>(null);
  const studentsInputRef = useRef<HTMLInputElement>(null);
  const teachersInputRef = useRef<HTMLInputElement>(null);
  const [filieres, setFilieres] = useState<string[]>(['2ITE 1', '2ITE 2', '2ITE 3']);
  const [studentsByFiliere, setStudentsByFiliere] = useState<{ [key: string]: string[] }>({
    '2ITE 1': ['EL MASKYNE', 'ALAMI Sara', 'BENNANI Karim'],
    '2ITE 2': ['IDRISSI Amine', 'TAZI Yasmine', 'BENNANI Karim'],
    '2ITE 3': ['EL MASKYNE', 'ALAMI Sara', 'IDRISSI Amine']
  });
  const [teachersList, setTeachersList] = useState<string[]>([
    'Dr. MOHAMMED Ahmed',
    'Dr. BENSOUDA Fatima',
    'Dr. TAZI Karim',
    'Dr. ALAOUI Hassan',
    'Dr. IDRISSI Samira'
  ]);

  const handleOpenModal = (user?: Student | Teacher) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: '',
        filiere: 'filiere' in user ? user.filiere : ''
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        filiere: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'students') {
      if (editingUser) {
        setStudents(students.map(student => 
          student.id === editingUser.id ? { ...student, ...formData } as Student : student
        ));
      } else {
        const newStudent: Student = {
          id: students.length + 1,
          name: formData.name || '',
          email: formData.email || '',
          phone: formData.phone || '',
          password: formData.password || '',
          filiere: formData.filiere || ''
        };
        setStudents([...students, newStudent]);
      }
    } else {
      if (editingUser) {
        setTeachers(teachers.map(teacher => 
          teacher.id === editingUser.id ? { ...teacher, ...formData } as Teacher : teacher
        ));
      } else {
        const newTeacher: Teacher = {
          id: teachers.length + 1,
          name: formData.name || '',
          email: formData.email || '',
          phone: formData.phone || '',
          password: formData.password || ''
        };
        setTeachers([...teachers, newTeacher]);
      }
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      if (activeTab === 'students') {
        setStudents(students.filter(user => user.id !== id));
      } else {
        setTeachers(teachers.filter(user => user.id !== id));
      }
    }
  };

  

  const handleStudentsCsvImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          // On s'attend à un CSV avec une seule colonne contenant les noms des étudiants
          const newStudentsByFiliere = { ...studentsByFiliere };
          const selectedFiliere = formData.filiere || Object.keys(newStudentsByFiliere)[0];
          
          if (selectedFiliere) {
            const newStudents = results.data.flat().filter(Boolean) as string[];
            newStudentsByFiliere[selectedFiliere] = newStudents;
            setStudentsByFiliere(newStudentsByFiliere);
          } else {
            alert("Veuillez d'abord sélectionner une filière avant d'importer la liste des étudiants");
          }
        },
        header: false
      });
    }
  };

  const handleTeachersCsvImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          const newTeachers = results.data.flat().filter(Boolean);
          setTeachersList(newTeachers as string[]);
        },
        header: false
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Card container with improved gradient and shadow */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header with enhanced gradient */}
          <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-violet-500 to-violet-700">

            <h1 className="text-2xl font-bold text-white flex items-center">
              {activeTab === 'students' ? (
                <GraduationCap className="mr-2 h-6 w-6" />
              ) : (
                <Users className="mr-2 h-6 w-6" />
              )}
              Gestion des comptes
            </h1>
            
            {/* Improved Tabs with better hover effects */}
            <div className="flex space-x-4 mb-0 mt-2">
              <button
                onClick={() => setActiveTab('students')}
                className={`px-4 py-2 rounded-t-lg font-medium transition-all duration-200 flex items-center ${
                  activeTab === 'students'
                    ? 'bg-white text-blue-700 border-b-2 border-blue-700 shadow-lg'
                    : 'text-white hover:bg-blue-500 hover:bg-opacity-20'
                }`}
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                Étudiants
              </button>
              <button
                onClick={() => setActiveTab('teachers')}
                className={`px-4 py-2 rounded-t-lg font-medium transition-all duration-200 flex items-center ${
                  activeTab === 'teachers'
                    ? 'bg-white text-blue-700 border-b-2 border-blue-700 shadow-lg'
                    : 'text-white hover:bg-blue-500 hover:bg-opacity-20'
                }`}
              >
                <Users className="mr-2 h-4 w-4" />
                Professeurs
              </button>
            </div>
            
            {/* Enhanced Add button with animation */}
            <button
              onClick={() => handleOpenModal()}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out shadow-md transform hover:scale-105 flex items-center"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Ajouter un compte
            </button>
          </div>

          {/* Table container with softer shadows */}
          <div className="px-6 py-6">
            <div className="overflow-hidden shadow-sm border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">Nom</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Téléphone</th>
                    {activeTab === 'students' && (
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Filière</th>
                    )}
                    <th scope="col" className="relative py-3.5 pl-3 pr-6 text-sm font-semibold text-gray-900 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {(activeTab === 'students' ? students : teachers).length > 0 ? (
                    (activeTab === 'students' ? students : teachers).map((user) => (
                      <tr key={user.id} className="hover:bg-blue-50 transition-all duration-150">
                        <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900">{user.name}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">{user.email}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">{user.phone}</td>
                        {activeTab === 'students' && (
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {(user as Student).filiere}
                            </span>
                          </td>
                        )}
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                          <button
                            onClick={() => handleOpenModal(user)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors duration-150 inline-flex items-center"
                          >
                            <Edit className="mr-1 h-4 w-4" />
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-900 transition-colors duration-150 inline-flex items-center"
                          >
                            <Trash2 className="mr-1 h-4 w-4" />
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={activeTab === 'students' ? 5 : 4} className="py-12 text-center text-sm text-gray-500">
                        <div className="flex flex-col items-center justify-center">
                          <UserPlus className="h-12 w-12 text-gray-300 mb-3" />
                          <p>Aucun {activeTab === 'students' ? 'étudiant' : 'professeur'} trouvé.</p>
                          <p className="mt-1">Cliquez sur "Ajouter un compte" pour en créer un.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer section with improved import buttons */}
          <div className="px-6 py-5 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-end gap-4">
              {activeTab === 'students' ? (
                <>
                  
               
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleStudentsCsvImport}
                    ref={studentsInputRef}
                    className="hidden"
                  />
                  <button
                    onClick={() => studentsInputRef.current?.click()}
                    className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 ease-in-out shadow-md transform hover:scale-105 flex items-center justify-center"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Importer étudiants
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleTeachersCsvImport}
                    ref={teachersInputRef}
                    className="hidden"
                  />
                  <button
                    onClick={() => teachersInputRef.current?.click()}
                    className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 ease-in-out shadow-md transform hover:scale-105 flex items-center justify-center"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Importer professeurs
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Improved modal with better styling */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity z-50 backdrop-blur-sm">
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 border border-gray-200">
                  <div>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4 border-b pb-2 flex items-center">
                      {editingUser ? <Edit className="mr-2 h-5 w-5" /> : <UserPlus className="mr-2 h-5 w-5" />}
                      {editingUser ? 'Modifier un compte' : 'Ajouter un compte'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Nom
                        </label>
                        {activeTab === 'students' ? (
                          formData.filiere && (
                            <select
                              id="name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                              required
                            >
                              <option value="">Sélectionner un étudiant</option>
                              {studentsByFiliere[formData.filiere as keyof typeof studentsByFiliere]?.map((student) => (
                                <option key={student} value={student}>{student}</option>
                              ))}
                            </select>
                          )
                        ) : (
                          <select
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            required
                          >
                            <option value="">Sélectionner un professeur</option>
                            {teachersList.map((teacher) => (
                              <option key={teacher} value={teacher}>{teacher}</option>
                            ))}
                          </select>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                          focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          placeholder="email@exemple.com"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                          focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          placeholder="+212 6XX XX XX XX"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Mot de passe
                        </label>
                        <input
                          type="password"
                          id="password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                          focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          placeholder="••••••••"
                          required={!editingUser}
                        />
                      </div>
                      {activeTab === 'students' && (
                        <>
                          <div>
                            <label htmlFor="filiere" className="block text-sm font-medium text-gray-700">
                              Filière
                            </label>
                            <select
                              id="filiere"
                              value={formData.filiere}
                              onChange={(e) => setFormData({ ...formData, filiere: e.target.value })}
                              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                              required
                            >
                              <option value="">Sélectionner une filière</option>
                              {filieres.map((filiere) => (
                                <option key={filiere} value={filiere}>{filiere}</option>
                              ))}
                            </select>
                          </div>
                        </>
                      )}
                      <div className="mt-6 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3 pt-4 border-t">
                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0 transition-colors duration-200"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2 transition-colors duration-200"
                        >
                          {editingUser ? 'Modifier' : 'Ajouter'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AccountManagementPage;