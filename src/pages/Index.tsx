
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, BarChart, UserPlus, History, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <Leaf className="h-16 w-16" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Crop Yield Prediction with AI
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Make data-driven farming decisions with our advanced machine learning model
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isAuthenticated ? (
              <Button asChild size="lg" className="bg-white text-forest-500 hover:bg-gray-100">
                <Link to="/predict">
                  Start Predicting <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="bg-white text-forest-500 hover:bg-gray-100">
                  <Link to="/register">
                    Create Account <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/login">
                    Login
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center card-hover">
              <div className="bg-forest-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <UserPlus className="h-8 w-8 text-forest-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
              <p className="text-muted-foreground">
                Register with your email to access our prediction tools and save your history
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center card-hover">
              <div className="bg-forest-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BarChart className="h-8 w-8 text-forest-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Input Your Data</h3>
              <p className="text-muted-foreground">
                Enter soil, climate, and crop details to generate accurate yield predictions
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center card-hover">
              <div className="bg-forest-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <History className="h-8 w-8 text-forest-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Your History</h3>
              <p className="text-muted-foreground">
                Review past predictions and compare results to optimize your farming strategy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to optimize your crop yield?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of farmers using data-driven insights to improve their harvest
          </p>
          {isAuthenticated ? (
            <Button asChild size="lg" className="bg-forest-500 hover:bg-forest-600">
              <Link to="/predict">
                Start Predicting Now
              </Link>
            </Button>
          ) : (
            <Button asChild size="lg" className="bg-forest-500 hover:bg-forest-600">
              <Link to="/register">
                Get Started for Free
              </Link>
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
