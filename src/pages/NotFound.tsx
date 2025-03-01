
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold mb-6">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          We're sorry, the page you requested could not be found.
          Please check the URL or go back to the homepage.
        </p>
        <Button onClick={() => navigate("/")} size="lg">
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
