
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Leaf } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="bg-white shadow dark:bg-gray-900">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Leaf className="h-8 w-8 text-forest-500" />
            <span className="ml-2 text-xl font-bold text-forest-500">CropYieldAI</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`py-2 px-2 font-medium hover:text-forest-500 transition-colors ${
                location.pathname === "/" ? "text-forest-500" : "text-gray-700 dark:text-gray-200"
              }`}
            >
              Home
            </Link>
            
            {isAuthenticated && (
              <>
                <Link
                  to="/predict"
                  className={`py-2 px-2 font-medium hover:text-forest-500 transition-colors ${
                    location.pathname === "/predict" ? "text-forest-500" : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  Predict
                </Link>
                <Link
                  to="/history"
                  className={`py-2 px-2 font-medium hover:text-forest-500 transition-colors ${
                    location.pathname === "/history" ? "text-forest-500" : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  History
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Hello, {user?.name}
                </span>
                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu, shown on small screens */}
        <div className="md:hidden flex flex-col mt-4 space-y-2">
          <Link
            to="/"
            className={`py-2 px-2 font-medium hover:text-forest-500 transition-colors ${
              location.pathname === "/" ? "text-forest-500" : "text-gray-700 dark:text-gray-200"
            }`}
          >
            Home
          </Link>
          
          {isAuthenticated && (
            <>
              <Link
                to="/predict"
                className={`py-2 px-2 font-medium hover:text-forest-500 transition-colors ${
                  location.pathname === "/predict" ? "text-forest-500" : "text-gray-700 dark:text-gray-200"
                }`}
              >
                Predict
              </Link>
              <Link
                to="/history"
                className={`py-2 px-2 font-medium hover:text-forest-500 transition-colors ${
                  location.pathname === "/history" ? "text-forest-500" : "text-gray-700 dark:text-gray-200"
                }`}
              >
                History
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
