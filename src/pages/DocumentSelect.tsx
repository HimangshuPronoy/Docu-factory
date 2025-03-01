
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDocument } from "@/contexts/DocumentContext";
import { 
  ArrowLeft, 
  Briefcase, 
  FileText, 
  Home, 
  Shield, 
  Scroll, 
  FileSignature, 
  DollarSign, 
  AlertOctagon, 
  Clipboard, 
  Lock
} from "lucide-react";

const DocumentSelect: React.FC = () => {
  const { documentTypes, clearAnswers } = useDocument();
  const navigate = useNavigate();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "home":
        return <Home className="h-5 w-5" />;
      case "briefcase":
        return <Briefcase className="h-5 w-5" />;
      case "shield":
        return <Shield className="h-5 w-5" />;
      case "scroll":
        return <Scroll className="h-5 w-5" />;
      case "file-signature":
        return <FileSignature className="h-5 w-5" />;
      case "dollar-sign":
        return <DollarSign className="h-5 w-5" />;
      case "alert-octagon":
        return <AlertOctagon className="h-5 w-5" />;
      case "file-text":
        return <FileText className="h-5 w-5" />;
      case "clipboard":
        return <Clipboard className="h-5 w-5" />;
      case "lock":
        return <Lock className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const handleSelectDocument = (documentId: string) => {
    clearAnswers();
    navigate(`/documents/${documentId}/questions`);
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl animate-fade-in">
      <div className="mb-8">
        <Button
          variant="ghost"
          className="mb-4 p-0 hover:bg-transparent"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Select Document Type</h1>
        <p className="text-muted-foreground mt-1">
          Choose the type of legal document you want to create
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documentTypes.map((docType) => (
          <Card key={docType.id} className="overflow-hidden hover:shadow-md transition-all-300">
            <CardHeader className="bg-primary/5 pb-4">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {getIcon(docType.icon)}
                </div>
                <Badge variant="outline" className="bg-white">
                  {docType.questionsCount} Questions
                </Badge>
              </div>
              <CardTitle className="mt-4">{docType.title}</CardTitle>
              <CardDescription>{docType.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                A step-by-step guide will help you create a customized {docType.title.toLowerCase()} document that meets your specific needs.
              </p>
            </CardContent>
            <CardFooter className="border-t pt-6 pb-4">
              <Button 
                onClick={() => handleSelectDocument(docType.id)} 
                className="w-full"
              >
                Create Document
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentSelect;
