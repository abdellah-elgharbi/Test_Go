import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { LogOut, User } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../../components/ui/dropdown-menu";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    // Here we would also clear authentication state
  };
  
  return (
    <header>
      <div>
        <div>
          <Link to="/">
            <span>TestBloom</span>
          </Link>
          
          <nav>
            <Link to="/">
              Home
            </Link>
            <Link to="/about">
              About
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/dashboard">
                  Dashboard
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div>
                <Button asChild variant="ghost">
                  <Link to="/login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </nav>
          
          {/* Mobile menu button would go here */}
        </div>
      </div>
    </header>
  );
}