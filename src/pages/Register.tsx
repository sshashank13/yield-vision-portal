
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="container mx-auto py-16 px-4 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
