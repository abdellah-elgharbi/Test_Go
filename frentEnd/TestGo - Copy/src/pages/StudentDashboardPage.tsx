
import Layout from "@/components/layout/Layout";
import StudentDashboard from "@/components/Etudiant/StudentDashboard";

export default function StudentDashboardPage() {
  return (
    <Layout>
       <div className='flex-1'>
        <StudentDashboard />
        </div>
    </Layout>
  );
}
