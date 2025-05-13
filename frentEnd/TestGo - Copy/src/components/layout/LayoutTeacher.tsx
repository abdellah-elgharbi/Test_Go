
import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import TeacherNavbar from "../navbar/TeacherNavbar";
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
 return (
    <div className="flex min-h-screen bg-gray-100">
      <TeacherNavbar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
