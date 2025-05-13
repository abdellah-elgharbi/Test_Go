import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProgramDetail from './pages/ProgramDetail';
import Programs from './pages/Programs';
// Components
import ProfileManager from './components/ProfileManager';
import TestDetaille from './pages/TestDetaillePage';
// Pages
import TestsPage from "./pages/TestsPage";
import TakeTestPage from "./pages/TakeTestPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import QuestionPage from './pages/QuestionPage';
import { FiliereDashboard } from "./components/adminDashboard/FiliereDashboard";
import TeacherDashboardPage from './pages/TeacherDashboardPage';
import AccountManagementPage from './pages/AccountManagementPage';
import TestResultPage from './pages/TestResultPage';
import GroupesFormation from './pages/GroupsPage';
import ModulesPage from './pages/ModulesPage';
import FiliersPage from './pages/FilieresPage';
import TeacherProfile from "@/pages/TeacherProfile.tsx";
import StudentDashboardPage from "@/pages/StudentDashboardPage.tsx";
import StudentDetails from './pages/StudentDetails';
import GestionTest from './pages/GestionTest';
// Create query client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
            <Routes>
              {/** Default pages  */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<NotFound />} />
              {/** Student pages  */}
              <Route path="/StudentDashboardPage" element={<StudentDashboardPage />} />
              <Route path="/student/profile" element={<ProfileManager />} />
              <Route path="/student/tests" element={<TestsPage />} />
              <Route path="/test/:testId" element={<TakeTestPage />} />
              <Route path="/test/:testId/results" element={<TestResultPage />} />
              {/** teacher pages  */}
              <Route path="teacher/questions" element={<QuestionPage/>}/>
              <Route path="/teacher-dashboard" element={<TeacherDashboardPage/>}/>
              <Route path="/teacher/groups" element={<GroupesFormation/>}/>
              <Route path="/teacher-profile" element={<TeacherProfile />} />
              <Route path="/teacher/reports" element={<FiliereDashboard/>}/>
              <Route path="/teacher/test_detaille" element={<TestDetaille/>}/>
              <Route path="/teacher/test_detaille/student_fraud/:id" element={<StudentDetails />} />
<Route path="/teacher/tests" element={<GestionTest />}/>
              {/** admin pages  */}
            
              <Route path="/admin/users" element={<AccountManagementPage />} />
              <Route path="/admin/modules" element={<ModulesPage/>}/>
              <Route path="/programs" element={<Programs />} />
              <Route path="/programs/:programId" element={<ProgramDetail />} />
              <Route path="/filiers" element={<FiliersPage/>}/>

            </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;