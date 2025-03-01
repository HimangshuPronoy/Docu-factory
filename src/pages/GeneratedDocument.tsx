
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDocument } from "@/contexts/DocumentContext";
import { ArrowLeft, Download, Mail, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GeneratedDocument: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const { 
    getDocumentById, 
    generateDocument,
    saveGeneratedDocument
  } = useDocument();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [documentContent, setDocumentContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  const documentType = documentId ? getDocumentById(documentId) : undefined;
  
  useEffect(() => {
    const loadDocument = async () => {
      if (!documentId) return;
      
      try {
        const content = await generateDocument(documentId);
        setDocumentContent(content);
      } catch (error) {
        console.error("Error loading document:", error);
        toast({
          title: "Error",
          description: "Failed to load document. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDocument();
  }, [documentId, generateDocument, toast]);

  const handleSaveDocument = () => {
    if (!documentId || !documentContent) return;
    
    saveGeneratedDocument(documentId, documentContent);
    toast({
      title: "Document Saved",
      description: "Your document has been saved to your account.",
    });
  };

  const handleDownloadDocument = () => {
    if (!documentContent || !documentType) return;
    
    const filename = `${documentType.title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.txt`;
    const blob = new Blob([documentContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "Your document is being downloaded.",
    });
  };

  const handleEmailDocument = () => {
    toast({
      title: "Email Feature",
      description: "This feature would email the document in a real application.",
    });
  };

  const handleCreateNew = () => {
    navigate("/documents");
  };

  if (!documentType || !documentId) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <h1 className="text-2xl font-bold">Document not found</h1>
        <Button onClick={() => navigate("/documents")} className="mt-4">
          Back to Document Selection
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl animate-fade-in">
      <Button
        variant="ghost"
        className="mb-4 p-0 hover:bg-transparent"
        onClick={() => navigate(`/documents/${documentId}/review`)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Review
      </Button>
      
      <h1 className="text-3xl font-bold tracking-tight mb-2">Your Generated Document</h1>
      <p className="text-muted-foreground mb-6">
        Your {documentType.title.toLowerCase()} has been successfully generated
      </p>
      
      <Tabs defaultValue="preview" className="mb-8">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="text">Plain Text</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="mt-6 animate-fade-in">
          <Card className="min-h-[50vh]">
            <CardHeader>
              <CardTitle>{documentType.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="whitespace-pre-line prose max-w-none">
                  {documentContent}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6 space-x-4">
              <Button variant="outline" onClick={handleSaveDocument}>
                <Save className="mr-2 h-4 w-4" />
                Save to Account
              </Button>
              <Button variant="outline" onClick={handleDownloadDocument}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" onClick={handleEmailDocument}>
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="text" className="mt-6 animate-fade-in">
          <Card className="min-h-[50vh]">
            <CardContent className="pt-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md border border-gray-200 min-h-[40vh] text-sm">
                  {documentContent}
                </pre>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
        <Button variant="outline" onClick={handleSaveDocument}>
          <Save className="mr-2 h-4 w-4" />
          Save to Account
        </Button>
        <Button variant="outline" onClick={handleDownloadDocument}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button variant="outline" onClick={handleEmailDocument}>
          <Mail className="mr-2 h-4 w-4" />
          Email
        </Button>
        <Button onClick={handleCreateNew}>
          Create Another Document
        </Button>
      </div>
      
      <div className="mt-8 text-sm text-center text-muted-foreground">
        <p>
          Disclaimer: The generated document is for informational purposes only and does not constitute legal advice.
          Users should consult a lawyer for specific legal needs.
        </p>
      </div>
    </div>
  );
};

export default GeneratedDocument;
