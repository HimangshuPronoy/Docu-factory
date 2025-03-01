
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useDocument } from "@/contexts/DocumentContext";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { format } from "date-fns";

const QuestionForm: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const { 
    getDocumentById, 
    getQuestionsForDocument, 
    answers, 
    setAnswer 
  } = useDocument();
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 3;
  
  const documentType = documentId ? getDocumentById(documentId) : undefined;
  const questions = documentId ? getQuestionsForDocument(documentId) : [];
  
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const currentQuestions = questions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );
  
  const [isFormComplete, setIsFormComplete] = useState(false);

  // Check if all required fields have been filled
  useEffect(() => {
    const requiredQuestions = questions.filter(q => q.required);
    const allRequiredAnswered = requiredQuestions.every(q => 
      answers[q.id] && answers[q.id].value.trim() !== ""
    );
    setIsFormComplete(allRequiredAnswered);
  }, [questions, answers]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    } else {
      // If on the last page and form is complete, go to review
      if (isFormComplete && documentId) {
        navigate(`/documents/${documentId}/review`);
      }
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    } else {
      navigate(`/documents`);
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
        onClick={() => navigate("/documents")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Document Selection
      </Button>
      
      <h1 className="text-3xl font-bold tracking-tight mb-6">{documentType.title}</h1>
      
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{currentPage} of {totalPages}</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentPage / totalPages) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <Card className="mb-8 animate-fade-up">
        <CardHeader>
          <CardTitle>Section {currentPage}</CardTitle>
          <CardDescription>
            Please answer the following questions to create your {documentType.title.toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentQuestions.map((question) => {
            const currentAnswer = answers[question.id]?.value || "";
            
            return (
              <div key={question.id} className="space-y-2">
                <Label htmlFor={question.id}>
                  {question.text}
                  {question.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                
                {question.type === "text" && (
                  <Input
                    id={question.id}
                    placeholder={question.placeholder}
                    value={currentAnswer}
                    onChange={(e) => setAnswer(question.id, e.target.value)}
                    required={question.required}
                  />
                )}
                
                {question.type === "longtext" && (
                  <Textarea
                    id={question.id}
                    placeholder={question.placeholder}
                    value={currentAnswer}
                    onChange={(e) => setAnswer(question.id, e.target.value)}
                    required={question.required}
                  />
                )}
                
                {question.type === "date" && (
                  <Input
                    id={question.id}
                    type="date"
                    value={currentAnswer}
                    onChange={(e) => {
                      const date = e.target.value;
                      if (date) {
                        // Format the date
                        const formattedDate = format(new Date(date), "MMMM d, yyyy");
                        setAnswer(question.id, formattedDate);
                      } else {
                        setAnswer(question.id, "");
                      }
                    }}
                    required={question.required}
                  />
                )}
                
                {question.type === "number" && (
                  <Input
                    id={question.id}
                    type="number"
                    placeholder={question.placeholder}
                    value={currentAnswer}
                    onChange={(e) => setAnswer(question.id, e.target.value)}
                    required={question.required}
                  />
                )}
                
                {question.type === "select" && question.options && (
                  <Select
                    value={currentAnswer}
                    onValueChange={(value) => setAnswer(question.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {question.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            );
          })}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={handlePrevious}>
            Previous
          </Button>
          <Button onClick={handleNext}>
            {currentPage === totalPages ? "Review Document" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      
      {currentPage === totalPages && (
        <div className="text-center text-sm text-muted-foreground">
          {isFormComplete ? (
            <div className="flex items-center justify-center text-green-500">
              <CheckCircle className="h-4 w-4 mr-2" />
              All required questions answered. You can now review your document.
            </div>
          ) : (
            <div>
              Please answer all required questions before proceeding to review.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionForm;
