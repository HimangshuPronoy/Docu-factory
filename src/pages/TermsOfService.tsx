
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const TermsOfService: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4 animate-fade-in">
      <Button
        variant="ghost"
        className="mb-6 p-0 hover:bg-transparent"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>
      
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose max-w-none">
        <p className="text-muted-foreground mb-4">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
          <p>Welcome to DocuFactory ("Company", "we", "our", "us"). These Terms of Service ("Terms", "Terms of Service") govern your use of our website and services (collectively, the "Service").</p>
          <p>By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">2. Subscriptions</h2>
          <p>Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set on a monthly basis.</p>
          <p>At the end of each Billing Cycle, your Subscription will automatically renew under the exact same conditions unless you cancel it or DocuFactory cancels it. You may cancel your Subscription renewal either through your online account management page or by contacting DocuFactory customer support team.</p>
          <p><strong>No Refund Policy:</strong> All payments are non-refundable. There are no refunds for partial month subscriptions or unused document credits. We do not provide refunds in the event that you decide to downgrade or cancel your subscription.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">3. Free Trial</h2>
          <p>DocuFactory may, at its sole discretion, offer a Subscription with a free trial for a limited period of time ("Free Trial").</p>
          <p>You may be required to enter your billing information in order to sign up for the Free Trial. If you do enter your billing information when signing up for the Free Trial, you will not be charged by DocuFactory until the Free Trial has expired. On the last day of the Free Trial period, unless you cancelled your Subscription, you will be automatically charged the applicable subscription fee for the type of Subscription you have selected.</p>
          <p>At any time and without notice, DocuFactory reserves the right to (i) modify the terms and conditions of the Free Trial offer, or (ii) cancel such Free Trial offer.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">4. Service Changes and Pricing</h2>
          <p>DocuFactory, in its sole discretion and at any time, may modify the Subscription fees. Any Subscription fee change will become effective at the end of the then-current Billing Cycle.</p>
          <p>DocuFactory will provide you with reasonable prior notice of any change in Subscription fees to give you an opportunity to terminate your Subscription before such change becomes effective.</p>
          <p>Your continued use of the Service after the Subscription fee change comes into effect constitutes your agreement to pay the modified Subscription fee amount.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">5. Legal Document Disclaimer</h2>
          <p>The documents provided through the Service are generated based on information provided by you and templates created by DocuFactory. These documents are provided for informational purposes only and do not constitute legal advice.</p>
          <p>DocuFactory is not a law firm and is not a substitute for an attorney or law firm. Use of the Service is not intended to and does not create an attorney-client relationship.</p>
          <p>DocuFactory cannot guarantee that any document generated will be legally binding or enforceable, or that it will meet your specific requirements. We recommend that you consult with a qualified attorney to review any legal document before finalizing or signing it.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">6. Limitation of Liability</h2>
          <p>In no event shall DocuFactory, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">7. Governing Law</h2>
          <p>These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.</p>
          <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">8. Changes to Terms</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect.</p>
          <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at support@docufactory.com.</p>
        </section>
      </div>
      
      <div className="mt-10 border-t pt-8">
        <p className="text-center text-sm text-muted-foreground">
          By using DocuFactory services, you acknowledge that you have read and understood these Terms of Service.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
