import React, { useRef } from 'react';
import Navbar from '../components/home/NavBar';
import './TeacherDashboardPage.css';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell
} from 'recharts';
import Layout from '@/components/layout/LayoutTeacher';
import { Link } from 'react-router';

// Données simulées pour la distribution des notes
const distributionData = [
  { range: '0-5', count: 2 },
  { range: '5-10', count: 4 },
  { range: '10-12', count: 6 },
  { range: '12-16', count: 12 },
  { range: '16-18', count: 4 },
  { range: '18-20', count: 2 },
];

// Couleurs améliorées pour les graphiques
const COLORS = ['#1B5E20', '#2E7D32', '#388E3C', '#43A047', '#4CAF50', '#66BB6A'];

// Données simulées pour le tableau des étudiants
const studentsData = [
  {
    id: 1,
    name: 'EL MASKYNE',
    note: 20,
    duration: '98mins',
    status: 'Réussi',
    testid:1,
    date: '10-05-2023'
  },
  {
    id: 2,
    name: 'ALAMI Sara',
    note: 18,
    duration: '85mins',
    status: 'Réussi',
    testid:1,
    date: '10-05-2023'
  },
  {
    id: 3,
    name: 'BENNANI Karim',
    note: 15,
    duration: '92mins',
    testid:1,
    status: 'Réussi',
    date: '10-05-2023'
  },
  {
    id: 4,
    name: 'IDRISSI Amine',
    note: 12,
    duration: '95mins',
    status: 'Réussi',
    testid:1,
    date: '10-05-2023'
  },
  {
    id: 5,
    name: 'TAZI Yasmine',
    note: 8,
    duration: '100mins',
    status: 'Non Réussi',
    testid:1,
    date: '10-05-2023'
  }
];

const TeacherDashboardPage: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!contentRef.current) return;

    const canvas = await html2canvas(contentRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('resultats-test.pdf');
  };

  const csvData = [
    ['Étudiant', 'Note', 'Durée', 'Statut', 'Date'],
    ...studentsData.map(student => [
      student.name,
      student.note,
      student.duration,
      student.status,
      student.date
    ])
  ];

  return (
    <Layout>
    <div className="dashboard-container">      
      <div className="dashboard-content" ref={contentRef}>
        <div className="dashboard-card">
          {/* Filtres */}
          <div className="dashboard-filters">
            <div className="filter-controls">
              <div className="filter-group">
                <label>Filière</label>
                <select className="filter-select">
                  <option>2ITE 2</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Module:</label>
                <select className="filter-select">
                  <option>JAVA</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Test:</label>
                <select className="filter-select">
                  <option>Final_Java</option>
                </select>
              </div>
              <button className="filter-button">Filtrer</button>
            </div>
            <div className="export-buttons">
              <button className="export-button" onClick={handleExportPDF}>
                <span>PDF</span>
              </button>
              <CSVLink 
                data={csvData}
                filename="resultats-test.csv"
                className="export-button"
                target="_blank"
              >
                <span>CSV</span>
              </CSVLink>
            </div>
          </div>

          {/* Statistiques */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3 className="stat-title">Taux de participation</h3>
              <p className="stat-value">94%</p>
              <p className="stat-subtitle">(30/32 étudiants)</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-title">Note moyenne</h3>
              <p className="stat-value">14.8</p>
              <p className="stat-subtitle">14,8/20</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-title">Taux de réussite</h3>
              <p className="stat-value">83%</p>
              <p className="stat-subtitle">(30 résultats)</p>
            </div>
          </div>

          {/* Graphique de distribution des notes */}
          <div className="chart-section">
            <div className="chart-card">
              <h3 className="chart-title">Distribution des notes</h3>
              <div className="bar-chart">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={distributionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0f2e0" />
                    <XAxis dataKey="range" tick={{ fill: '#2E7D32' }} />
                    <YAxis tick={{ fill: '#2E7D32' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#f8faf8', 
                        border: '1px solid #4CAF50',
                        borderRadius: '6px'
                      }}
                    />
                    <Bar dataKey="count" fill="#43A047">
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Tableau des résultats */}
          <div className="table-container">
            <h3 className="section-title">Résultats par étudiant</h3>
            <table className="data-table">
              <thead className="table-head">
                <tr>
                  <th className="table-header">Étudiant</th>
                  <th className="table-header">Note</th>
                  <th className="table-header">Durée</th>
                  <th className="table-header">Statut</th>
                  <th className="table-header">Date</th>
                  <th className="table-header">Action</th>
                </tr>
              </thead>
              <tbody>
                {studentsData.map((student) => (
                  <tr key={student.id} className="table-row">
                    <td className="table-cell">{student.name}</td>
                    <td className="table-cell">{student.note}</td>
                    <td className="table-cell">{student.duration}</td>
                    <td className="table-cell">
                      <span className={`status-badge ${student.status === 'Réussi' ? 'status-success' : 'status-failed'}`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="table-cell">{student.date}</td>
                    <td className="table-cell">
                    <Link to={`/test/${student.id}/results`}><button className="details-button">Détails</button></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default TeacherDashboardPage;