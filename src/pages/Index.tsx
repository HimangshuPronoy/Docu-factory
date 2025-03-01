
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Shield, Clock, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/documents");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-28 px-4 flex flex-col items-center text-center max-w-5xl mx-auto">
        <div className="absolute top-[-10%] right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-up">
          Create Legal Documents<br />Quickly & Easily
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Generate custom legal documents in minutes with our intuitive, step-by-step process.
          No legal expertise required.
        </p>
        <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <Button size="lg" onClick={handleGetStarted} className="group">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all hover:shadow-md">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Professional Templates</h3>
            <p className="text-muted-foreground">Access a variety of carefully crafted legal document templates</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all hover:shadow-md">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Save Time</h3>
            <p className="text-muted-foreground">Create legal documents in minutes instead of hours</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all hover:shadow-md">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-muted-foreground">Your information is encrypted and never shared with third parties</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full py-16 bg-gray-50 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create professional legal documents at a fraction of the cost of hiring a lawyer.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Card className="w-full max-w-md border-2 border-primary shadow-lg">
              <CardHeader className="text-center pb-2">
                <div className="bg-primary text-white py-1 px-4 rounded-full text-sm font-medium inline-block mb-2">MOST POPULAR</div>
                <CardTitle className="text-2xl">Professional Plan</CardTitle>
                <CardDescription>Perfect for individuals and small businesses</CardDescription>
              </CardHeader>
              <CardContent className="text-center pt-4">
                <div className="flex justify-center items-baseline">
                  <span className="text-5xl font-bold">$29.99</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Cancel anytime</p>
                
                <div className="mt-8 space-y-4">
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Unlimited document creation</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Access to all 10+ document types</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Document storage & management</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Email & download documents</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Priority customer support</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleGetStarted} className="w-full" size="lg">
                  Get Started Now
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <p className="text-center text-sm text-muted-foreground mt-6">
            Need custom document templates for your organization? <a href="#" className="text-primary hover:underline">Contact us</a> for enterprise pricing.
          </p>
          <p className="text-center text-xs text-muted-foreground mt-3">
            By subscribing, you agree to our <Link to="/terms-of-service" className="text-primary hover:underline">Terms of Service</Link>, including our No Refunds policy.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mb-6">1</div>
              <h3 className="text-xl font-semibold mb-3">Choose a Document</h3>
              <p className="text-muted-foreground">Select from our library of legal document templates</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mb-6">2</div>
              <h3 className="text-xl font-semibold mb-3">Answer Questions</h3>
              <p className="text-muted-foreground">Fill in the required information through our guided process</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mb-6">3</div>
              <h3 className="text-xl font-semibold mb-3">Get Your Document</h3>
              <p className="text-muted-foreground">Download or save your completed legal document</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-4">
        <div className="max-w-4xl mx-auto bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to create your legal document?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who create and manage their legal documents with ease.
          </p>
          <Button size="lg" onClick={handleGetStarted}>
            Start Your $29.99/month Subscription
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">No credit card required to try. 7-day free trial available.</p>
        </div>
      </section>
    </div>
  );
};

export default Index;
