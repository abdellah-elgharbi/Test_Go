
import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import StudentNavbar from "../navbar/StudentNavbar";
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
 return (
    <div className="flex min-h-screen bg-gray-100">
      <StudentNavbar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
