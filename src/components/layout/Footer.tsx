
import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-forest-500 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center">
              <Leaf className="h-6 w-6" />
              <span className="ml-2 text-xl font-bold">CropYieldAI</span>
            </div>
            <p className="mt-2 text-sm">
              Empowering farmers with predictive insights
            </p>
          </div>
          <div className="mt-4 flex flex-col md:mt-0">
            <h3 className="mb-2 text-lg font-semibold">Contact</h3>
            <span className="text-sm">info@cropyieldai.com</span>
            <span className="text-sm">+1 (555) 123-4567</span>
          </div>
        </div>
        <div className="mt-8 border-t border-forest-400 pt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} CropYieldAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
