
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useDocument } from "@/contexts/DocumentContext";
import { FilePlus, FileText, Trash2 } from "lucide-react";
import { format } from "date-fns";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { savedDocuments } = useDocument();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.name}
          </p>
        </div>
        <Button
          onClick={() => navigate("/documents")}
          className="mt-4 md:mt-0"
        >
          <FilePlus className="mr-2 h-4 w-4" />
          Create New Document
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>View and manage your recently created documents</CardDescription>
          </CardHeader>
          <CardContent>
            {savedDocuments.length === 0 ? (
              <div className="text-center py-10">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">No documents yet</h3>
                <p className="mt-1 text-muted-foreground">
                  Create your first document to get started
                </p>
                <Button
                  variant="outline"
                  onClick={() => navigate("/documents")}
                  className="mt-4"
                >
                  Create Document
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {savedDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-all-300"
                  >
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <h4 className="font-medium">{doc.documentType.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Created on {format(new Date(doc.createdAt), "MMM dd, yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate("/documents")}
            >
              <FilePlus className="mr-2 h-4 w-4" />
              Create New Document
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                if (savedDocuments.length > 0) {
                  // Navigate to the most recent document
                  // This is just a placeholder action
                  navigate("/documents");
                }
              }}
              disabled={savedDocuments.length === 0}
            >
              <FileText className="mr-2 h-4 w-4" />
              Continue Recent Document
            </Button>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              All documents are saved in your account for future access.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
