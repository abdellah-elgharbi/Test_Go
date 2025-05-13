import AuthComponent from "../components/Auth/AuthComponent"
import AnimatedBackground from "../components/Auth/AnimatedBackground";
import Navbar from "../components/home/NavBar";


const LoginPage = () => {
  return (
    <AnimatedBackground>
      <Navbar hideConnexion={true}/>
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 py-16">
     <AuthComponent/>
      </div>
    </AnimatedBackground>
  );
};

export default LoginPage;
