
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDocument, Question } from "@/contexts/DocumentContext";
import { ArrowLeft, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ReviewDocument: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const { 
    getDocumentById, 
    getQuestionsForDocument, 
    answers,
    generateDocument 
  } = useDocument();
  const navigate = useNavigate();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [missingRequiredFields, setMissingRequiredFields] = useState<Question[]>([]);
  
  const documentType = documentId ? getDocumentById(documentId) : undefined;
  const questions = documentId ? getQuestionsForDocument(documentId) : [];
  
  // Check for missing required fields on mount
  useEffect(() => {
    const requiredQuestions = questions.filter(q => q.required);
    const unansweredRequired = requiredQuestions.filter(q => 
      !answers[q.id] || answers[q.id].value.trim() === ""
    );
    setMissingRequiredFields(unansweredRequired);
  }, [questions, answers]);

  const handleGenerateDocument = async () => {
    if (!documentId) return;
    
    setIsGenerating(true);
    try {
      await generateDocument(documentId);
      navigate(`/documents/${documentId}/generated`);
    } catch (error) {
      console.error("Error generating document:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditAnswers = () => {
    if (documentId) {
      navigate(`/documents/${documentId}/questions`);
    }
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
    <div className="container mx-auto py-10 px-4 max-w-3xl animate-fade-in">
      <Button
        variant="ghost"
        className="mb-4 p-0 hover:bg-transparent"
        onClick={() => navigate(`/documents/${documentId}/questions`)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Questions
      </Button>
      
      <h1 className="text-3xl font-bold tracking-tight mb-2">Review Your Answers</h1>
      <p className="text-muted-foreground mb-6">
        Please review your answers before generating the {documentType.title.toLowerCase()}
      </p>
      
      {missingRequiredFields.length > 0 && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Missing Information</AlertTitle>
          <AlertDescription>
            Please go back and answer all required questions before generating your document.
          </AlertDescription>
        </Alert>
      )}
      
      {missingRequiredFields.length === 0 && (
        <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle>All Required Fields Completed</AlertTitle>
          <AlertDescription>
            You've completed all required fields and can now generate your document.
          </AlertDescription>
        </Alert>
      )}
      
      <Card className="mb-8 animate-fade-up">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            {documentType.title}
          </CardTitle>
          <CardDescription>
            Review and edit your answers before generating the document
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {questions.map((question) => {
            const currentAnswer = answers[question.id]?.value || "";
            const isMissing = question.required && (!currentAnswer || currentAnswer.trim() === "");
            
            return (
              <div key={question.id} className="space-y-1">
                <p className="font-medium text-sm">
                  {question.text}
                  {question.required && <span className="text-red-500 ml-1">*</span>}
                </p>
                <div className={`p-3 rounded-md border ${isMissing ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
                  {isMissing ? (
                    <p className="text-red-500 text-sm">Required field - please go back and complete</p>
                  ) : (
                    <p className="break-words">{currentAnswer || "Not provided"}</p>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={handleEditAnswers}>
            Edit Answers
          </Button>
          <Button 
            onClick={handleGenerateDocument} 
            disabled={missingRequiredFields.length > 0 || isGenerating}
          >
            {isGenerating ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Generating...
              </div>
            ) : (
              "Generate Document"
            )}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="text-sm text-center text-muted-foreground">
        <p>
          Disclaimer: The generated document is for informational purposes only and does not constitute legal advice.
          Users should consult a lawyer for specific legal needs.
        </p>
      </div>
    </div>
  );
};

export default ReviewDocument;
