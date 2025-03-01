
import React, { createContext, useState, useContext } from "react";
import { useToast } from "@/hooks/use-toast";

export interface DocumentType {
  id: string;
  title: string;
  description: string;
  template: string;
  questionsCount: number;
  icon: string;
}

export interface Question {
  id: string;
  documentId: string;
  text: string;
  type: "text" | "date" | "select" | "number" | "longtext";
  placeholder?: string;
  options?: string[];
  required: boolean;
  templateVariable: string;
}

export interface Answer {
  questionId: string;
  value: string;
}

interface DocumentContextType {
  documentTypes: DocumentType[];
  getDocumentById: (id: string) => DocumentType | undefined;
  getQuestionsForDocument: (documentId: string) => Question[];
  answers: Record<string, Answer>;
  setAnswer: (questionId: string, value: string) => void;
  clearAnswers: () => void;
  generateDocument: (documentId: string) => Promise<string>;
  savedDocuments: Array<{
    id: string;
    documentType: DocumentType;
    createdAt: string;
    content: string;
  }>;
  saveGeneratedDocument: (documentId: string, content: string) => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error("useDocument must be used within a DocumentProvider");
  }
  return context;
};

// Mock data for document types
const mockDocumentTypes: DocumentType[] = [
  {
    id: "rental-agreement",
    title: "Rental Agreement",
    description: "A standard rental agreement for residential properties",
    template: "This Rental Agreement is made on [DATE] between [LANDLORD_NAME] (Landlord) and [TENANT_NAME] (Tenant) for the property located at [PROPERTY_ADDRESS].\n\nTERM: The lease term begins on [LEASE_START_DATE] and ends on [LEASE_END_DATE].\n\nRENT: Tenant agrees to pay [MONTHLY_RENT] on the [RENT_DUE_DAY] day of each month.\n\nSECURITY DEPOSIT: Tenant has paid [SECURITY_DEPOSIT] as a security deposit.\n\nUTILITIES: Tenant is responsible for paying all utilities except for [INCLUDED_UTILITIES].\n\nUse of Premises: The premises shall be used exclusively as a residence for Tenant(s) named above.\n\nSigned by [LANDLORD_NAME] (Landlord)\nSigned by [TENANT_NAME] (Tenant)",
    questionsCount: 8,
    icon: "home",
  },
  {
    id: "employment-contract",
    title: "Employment Contract",
    description: "A standard employment agreement between employer and employee",
    template: "EMPLOYMENT AGREEMENT\n\nThis Employment Agreement is made on [DATE] between [EMPLOYER_NAME] (Employer) and [EMPLOYEE_NAME] (Employee).\n\nPOSITION: Employee is hired for the position of [JOB_TITLE].\n\nSTART DATE: Employment will begin on [START_DATE].\n\nCOMPENSATION: Employee will be paid [SALARY] per [PAYMENT_PERIOD].\n\nBENEFITS: Employee will receive the following benefits: [BENEFITS].\n\nTERMINATION: Employment may be terminated by either party with [NOTICE_PERIOD] notice.\n\nSigned by [EMPLOYER_NAME] (Employer)\nSigned by [EMPLOYEE_NAME] (Employee)",
    questionsCount: 7,
    icon: "briefcase",
  },
  {
    id: "nda",
    title: "Non-Disclosure Agreement",
    description: "A confidentiality agreement to protect sensitive information",
    template: "NON-DISCLOSURE AGREEMENT\n\nThis Non-Disclosure Agreement is made on [DATE] between [PARTY_ONE_NAME] and [PARTY_TWO_NAME].\n\nPURPOSE: The parties wish to engage in discussions related to [PURPOSE] which may require the disclosure of confidential information.\n\nCONFIDENTIAL INFORMATION: Includes any information disclosed by either party related to [INFORMATION_SCOPE].\n\nOBLIGATIONS: The receiving party agrees to keep confidential information secret for a period of [DURATION].\n\nGOVERNING LAW: This agreement is governed by the laws of [JURISDICTION].\n\nSigned by [PARTY_ONE_NAME]\nSigned by [PARTY_TWO_NAME]",
    questionsCount: 5,
    icon: "shield",
  },
  {
    id: "will",
    title: "Last Will and Testament",
    description: "A basic will to distribute assets and appoint executors",
    template: "LAST WILL AND TESTAMENT\n\nI, [TESTATOR_NAME], being of sound mind, make this my Last Will and Testament.\n\nREVOCATION: I revoke all prior wills and codicils.\n\nEXECUTOR: I appoint [EXECUTOR_NAME] as the executor of my will.\n\nGUARDIAN: I appoint [GUARDIAN_NAME] as guardian of my minor children, if any.\n\nBEQUESTS: I distribute my assets as follows: [ASSET_DISTRIBUTION].\n\nRESIDUARY ESTATE: All the rest of my estate I give to [RESIDUARY_BENEFICIARY].\n\nSigned by [TESTATOR_NAME] on [DATE].",
    questionsCount: 6,
    icon: "scroll",
  },
  // New document types
  {
    id: "power-of-attorney",
    title: "Power of Attorney",
    description: "Legal authorization for someone to act on your behalf",
    template: "POWER OF ATTORNEY\n\nI, [PRINCIPAL_NAME], residing at [PRINCIPAL_ADDRESS], hereby appoint [AGENT_NAME], residing at [AGENT_ADDRESS], as my Attorney-in-Fact (Agent).\n\nEFFECTIVE DATE: This Power of Attorney shall become effective on [EFFECTIVE_DATE].\n\nPOWERS GRANTED: I grant my Agent authority to act on my behalf with respect to the following matters: [POWERS_GRANTED].\n\nDURATION: This Power of Attorney shall [DURATION_TYPE] upon [TERMINATION_EVENT].\n\nINDEMNIFICATION: I will indemnify my Agent against any claims that arise against them because they acted as my Agent, as long as their actions were made in good faith.\n\nGOVERNING LAW: This Power of Attorney shall be governed by the laws of [JURISDICTION].\n\nSigned by [PRINCIPAL_NAME] (Principal) on [DATE].\n\nWITNESSED BY: [WITNESS_NAME]",
    questionsCount: 7,
    icon: "file-signature",
  },
  {
    id: "promissory-note",
    title: "Promissory Note",
    description: "A written promise to repay a loan or debt",
    template: "PROMISSORY NOTE\n\nDate: [DATE]\n\nFOR VALUE RECEIVED, I, [BORROWER_NAME], residing at [BORROWER_ADDRESS] (\"Borrower\"), promise to pay to [LENDER_NAME], residing at [LENDER_ADDRESS] (\"Lender\"), the principal sum of [LOAN_AMOUNT], with interest at the rate of [INTEREST_RATE]% per annum.\n\nPAYMENT TERMS: Borrower will repay this note in [PAYMENT_SCHEDULE] installments of [INSTALLMENT_AMOUNT], beginning on [FIRST_PAYMENT_DATE] and continuing until [FINAL_PAYMENT_DATE].\n\nLATE PAYMENT: Any payment not made within [GRACE_PERIOD] days of its due date shall be subject to a late fee of [LATE_FEE_AMOUNT].\n\nPREPAYMENT: Borrower may prepay this note in whole or in part at any time without penalty.\n\nDEFAULT: If Borrower fails to make any payment when due, Lender may declare the entire principal amount outstanding and any accrued interest immediately due and payable.\n\nSigned by [BORROWER_NAME] (Borrower)",
    questionsCount: 9,
    icon: "dollar-sign",
  },
  {
    id: "cease-and-desist",
    title: "Cease and Desist Letter",
    description: "A formal demand to stop an illegal or harmful activity",
    template: "CEASE AND DESIST LETTER\n\nDate: [DATE]\n\nFrom: [SENDER_NAME]\n[SENDER_ADDRESS]\n\nTo: [RECIPIENT_NAME]\n[RECIPIENT_ADDRESS]\n\nRe: [SUBJECT_MATTER]\n\nDear [RECIPIENT_NAME],\n\nThis letter serves as a formal demand that you immediately CEASE AND DESIST [ACTIVITY_DESCRIPTION].\n\nI have evidence that you have engaged in [SPECIFIC_ACTIONS] which [LEGAL_BASIS]. Your actions have caused [DAMAGES_DESCRIPTION].\n\nYou are hereby ordered to:\n\n1. Immediately stop all [ACTIVITY_DESCRIPTION];\n2. [ADDITIONAL_DEMANDS]; and\n3. Provide written confirmation of your compliance within [RESPONSE_TIMEFRAME] days.\n\nIf you fail to comply with this demand, I will [CONSEQUENCES], including but not limited to legal action. This would be unfortunate for all concerned and may result in me seeking monetary damages, injunctive relief, and attorney fees.\n\nPlease be guided accordingly.\n\nSincerely,\n\n[SENDER_NAME]",
    questionsCount: 7,
    icon: "alert-octagon",
  },
  {
    id: "invoice",
    title: "Professional Invoice",
    description: "A formal bill for goods or services provided",
    template: "INVOICE\n\nFrom: [PROVIDER_NAME]\n[PROVIDER_ADDRESS]\n[PROVIDER_CONTACT]\n\nTo: [CLIENT_NAME]\n[CLIENT_ADDRESS]\n[CLIENT_CONTACT]\n\nInvoice #: [INVOICE_NUMBER]\nDate: [DATE]\nDue Date: [DUE_DATE]\n\nDescription of Services:\n[SERVICE_DESCRIPTION]\n\nItem Breakdown:\n[ITEM_BREAKDOWN]\n\nSubtotal: [SUBTOTAL]\nTax ([TAX_RATE]%): [TAX_AMOUNT]\nTotal Amount Due: [TOTAL_AMOUNT]\n\nPayment Methods:\n[PAYMENT_METHODS]\n\nTerms and Conditions:\nPayment is due by the due date listed above. Late payments may be subject to a fee of [LATE_FEE].\n\nThank you for your business!",
    questionsCount: 11,
    icon: "file-text",
  },
  {
    id: "service-agreement",
    title: "Service Agreement",
    description: "Contract outlining terms for providing services",
    template: "SERVICE AGREEMENT\n\nThis Service Agreement (the \"Agreement\") is made on [DATE] between [PROVIDER_NAME] (\"Provider\") and [CLIENT_NAME] (\"Client\").\n\nSERVICES: Provider agrees to provide the following services to Client: [SERVICES_DESCRIPTION].\n\nTERM: This Agreement shall begin on [START_DATE] and continue until [END_DATE] or until terminated as provided herein.\n\nCOMPENSATION: Client agrees to pay Provider [COMPENSATION_AMOUNT] for the services according to the following schedule: [PAYMENT_SCHEDULE].\n\nINDEPENDENT CONTRACTOR RELATIONSHIP: The parties intend that Provider is an independent contractor and not an employee of Client.\n\nCONFIDENTIALITY: Provider agrees to keep confidential all proprietary or confidential information of Client.\n\nTERMINATION: This Agreement may be terminated by either party with [NOTICE_PERIOD] written notice.\n\nGOVERNING LAW: This Agreement shall be governed by the laws of [JURISDICTION].\n\nSigned by [PROVIDER_NAME] (Provider)\nSigned by [CLIENT_NAME] (Client)",
    questionsCount: 8,
    icon: "clipboard",
  },
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    description: "Document explaining how user data is collected and used",
    template: "PRIVACY POLICY\n\nLast Updated: [DATE]\n\n1. INTRODUCTION\n\n[COMPANY_NAME] (\"we,\" \"our,\" or \"us\") respects your privacy and is committed to protecting it through our compliance with this Privacy Policy. This policy describes the types of information we may collect from you or that you may provide when you visit [WEBSITE_URL] (our \"Website\") and our practices for collecting, using, maintaining, protecting, and disclosing that information.\n\n2. INFORMATION WE COLLECT\n\nWe collect several types of information from and about users of our Website, including:\n[COLLECTED_DATA_TYPES]\n\n3. HOW WE USE YOUR INFORMATION\n\nWe use information that we collect about you or that you provide to us, including any personal information:\n[DATA_USAGE]\n\n4. DISCLOSURE OF YOUR INFORMATION\n\nWe may disclose personal information that we collect or you provide as described in this Privacy Policy:\n[DISCLOSURE_TERMS]\n\n5. DATA SECURITY\n\n[SECURITY_MEASURES]\n\n6. YOUR CHOICES\n\n[USER_OPTIONS]\n\n7. CONTACT INFORMATION\n\nIf you have any questions about this Privacy Policy, please contact us at:\n[CONTACT_INFORMATION]",
    questionsCount: 7,
    icon: "lock",
  },
];

// Mock questions for each document type
const mockQuestions: Record<string, Question[]> = {
  "rental-agreement": [
    {
      id: "1",
      documentId: "rental-agreement",
      text: "What is the name of the landlord?",
      type: "text",
      placeholder: "e.g., John Smith",
      required: true,
      templateVariable: "LANDLORD_NAME",
    },
    {
      id: "2",
      documentId: "rental-agreement",
      text: "What is the name of the tenant?",
      type: "text",
      placeholder: "e.g., Jane Doe",
      required: true,
      templateVariable: "TENANT_NAME",
    },
    {
      id: "3",
      documentId: "rental-agreement",
      text: "What is the address of the rental property?",
      type: "text",
      placeholder: "e.g., 123 Main St, Anytown, CA 12345",
      required: true,
      templateVariable: "PROPERTY_ADDRESS",
    },
    {
      id: "4",
      documentId: "rental-agreement",
      text: "When does the lease start?",
      type: "date",
      required: true,
      templateVariable: "LEASE_START_DATE",
    },
    {
      id: "5",
      documentId: "rental-agreement",
      text: "When does the lease end?",
      type: "date",
      required: true,
      templateVariable: "LEASE_END_DATE",
    },
    {
      id: "6",
      documentId: "rental-agreement",
      text: "What is the monthly rent amount?",
      type: "number",
      placeholder: "e.g., 1500",
      required: true,
      templateVariable: "MONTHLY_RENT",
    },
    {
      id: "7",
      documentId: "rental-agreement",
      text: "On which day of the month is rent due?",
      type: "number",
      placeholder: "e.g., 1",
      required: true,
      templateVariable: "RENT_DUE_DAY",
    },
    {
      id: "8",
      documentId: "rental-agreement",
      text: "What is the security deposit amount?",
      type: "number",
      placeholder: "e.g., 1500",
      required: true,
      templateVariable: "SECURITY_DEPOSIT",
    },
    {
      id: "9",
      documentId: "rental-agreement",
      text: "What utilities (if any) are included in the rent?",
      type: "text",
      placeholder: "e.g., water, garbage",
      required: false,
      templateVariable: "INCLUDED_UTILITIES",
    },
  ],
  "employment-contract": [
    {
      id: "10",
      documentId: "employment-contract",
      text: "What is the name of the employer?",
      type: "text",
      placeholder: "e.g., ABC Company",
      required: true,
      templateVariable: "EMPLOYER_NAME",
    },
    {
      id: "11",
      documentId: "employment-contract",
      text: "What is the name of the employee?",
      type: "text",
      placeholder: "e.g., John Smith",
      required: true,
      templateVariable: "EMPLOYEE_NAME",
    },
    {
      id: "12",
      documentId: "employment-contract",
      text: "What is the job title?",
      type: "text",
      placeholder: "e.g., Marketing Manager",
      required: true,
      templateVariable: "JOB_TITLE",
    },
    {
      id: "13",
      documentId: "employment-contract",
      text: "When does employment start?",
      type: "date",
      required: true,
      templateVariable: "START_DATE",
    },
    {
      id: "14",
      documentId: "employment-contract",
      text: "What is the salary amount?",
      type: "text",
      placeholder: "e.g., $50,000",
      required: true,
      templateVariable: "SALARY",
    },
    {
      id: "15",
      documentId: "employment-contract",
      text: "What is the payment period?",
      type: "select",
      options: ["year", "month", "week", "hour"],
      required: true,
      templateVariable: "PAYMENT_PERIOD",
    },
    {
      id: "16",
      documentId: "employment-contract",
      text: "What benefits are included?",
      type: "longtext",
      placeholder: "e.g., health insurance, 401(k), paid time off",
      required: true,
      templateVariable: "BENEFITS",
    },
    {
      id: "17",
      documentId: "employment-contract",
      text: "What is the notice period for termination?",
      type: "text",
      placeholder: "e.g., two weeks",
      required: true,
      templateVariable: "NOTICE_PERIOD",
    },
  ],
  "nda": [
    {
      id: "18",
      documentId: "nda",
      text: "What is the name of the first party?",
      type: "text",
      placeholder: "e.g., ABC Company",
      required: true,
      templateVariable: "PARTY_ONE_NAME",
    },
    {
      id: "19",
      documentId: "nda",
      text: "What is the name of the second party?",
      type: "text",
      placeholder: "e.g., XYZ Corporation",
      required: true,
      templateVariable: "PARTY_TWO_NAME",
    },
    {
      id: "20",
      documentId: "nda",
      text: "What is the purpose of sharing confidential information?",
      type: "text",
      placeholder: "e.g., potential business partnership",
      required: true,
      templateVariable: "PURPOSE",
    },
    {
      id: "21",
      documentId: "nda",
      text: "What is the scope of information considered confidential?",
      type: "longtext",
      placeholder: "e.g., business plans, financial information, customer data",
      required: true,
      templateVariable: "INFORMATION_SCOPE",
    },
    {
      id: "22",
      documentId: "nda",
      text: "How long will the confidentiality obligation last?",
      type: "text",
      placeholder: "e.g., 3 years",
      required: true,
      templateVariable: "DURATION",
    },
    {
      id: "23",
      documentId: "nda",
      text: "What jurisdiction's laws will govern this agreement?",
      type: "text",
      placeholder: "e.g., State of California",
      required: true,
      templateVariable: "JURISDICTION",
    },
  ],
  "will": [
    {
      id: "24",
      documentId: "will",
      text: "What is your full legal name?",
      type: "text",
      placeholder: "e.g., John Robert Smith",
      required: true,
      templateVariable: "TESTATOR_NAME",
    },
    {
      id: "25",
      documentId: "will",
      text: "Who do you want to appoint as executor of your will?",
      type: "text",
      placeholder: "e.g., Jane Smith",
      required: true,
      templateVariable: "EXECUTOR_NAME",
    },
    {
      id: "26",
      documentId: "will",
      text: "Who do you want to appoint as guardian of your minor children (if any)?",
      type: "text",
      placeholder: "e.g., Robert Jones",
      required: true,
      templateVariable: "GUARDIAN_NAME",
    },
    {
      id: "27",
      documentId: "will",
      text: "How do you want to distribute your assets?",
      type: "longtext",
      placeholder: "e.g., I give my car to my son, James Smith. I give my jewelry to my daughter, Sarah Smith.",
      required: true,
      templateVariable: "ASSET_DISTRIBUTION",
    },
    {
      id: "28",
      documentId: "will",
      text: "Who should receive the rest of your estate?",
      type: "text",
      placeholder: "e.g., my wife, Jane Smith",
      required: true,
      templateVariable: "RESIDUARY_BENEFICIARY",
    },
  ],
  // New document type questions
  "power-of-attorney": [
    {
      id: "29",
      documentId: "power-of-attorney",
      text: "What is the name of the principal (person granting authority)?",
      type: "text",
      placeholder: "e.g., John Smith",
      required: true,
      templateVariable: "PRINCIPAL_NAME",
    },
    {
      id: "30",
      documentId: "power-of-attorney",
      text: "What is the address of the principal?",
      type: "text",
      placeholder: "e.g., 123 Main St, Anytown, CA 12345",
      required: true,
      templateVariable: "PRINCIPAL_ADDRESS",
    },
    {
      id: "31",
      documentId: "power-of-attorney",
      text: "What is the name of the agent (person receiving authority)?",
      type: "text",
      placeholder: "e.g., Jane Doe",
      required: true,
      templateVariable: "AGENT_NAME",
    },
    {
      id: "32",
      documentId: "power-of-attorney",
      text: "What is the address of the agent?",
      type: "text",
      placeholder: "e.g., 456 Oak St, Anytown, CA 12345",
      required: true,
      templateVariable: "AGENT_ADDRESS",
    },
    {
      id: "33",
      documentId: "power-of-attorney",
      text: "When should this power of attorney become effective?",
      type: "date",
      required: true,
      templateVariable: "EFFECTIVE_DATE",
    },
    {
      id: "34",
      documentId: "power-of-attorney",
      text: "What powers are being granted to the agent?",
      type: "longtext",
      placeholder: "e.g., financial decisions, healthcare decisions, real estate transactions",
      required: true,
      templateVariable: "POWERS_GRANTED",
    },
    {
      id: "35",
      documentId: "power-of-attorney",
      text: "Is this a durable or non-durable power of attorney?",
      type: "select",
      options: ["durable (remains in effect if principal becomes incapacitated)", "non-durable (terminates if principal becomes incapacitated)"],
      required: true,
      templateVariable: "DURATION_TYPE",
    },
    {
      id: "36",
      documentId: "power-of-attorney",
      text: "Under what conditions does this power of attorney terminate?",
      type: "text",
      placeholder: "e.g., death of the principal, revocation by the principal",
      required: true,
      templateVariable: "TERMINATION_EVENT",
    },
    {
      id: "37",
      documentId: "power-of-attorney",
      text: "What jurisdiction's laws will govern this document?",
      type: "text",
      placeholder: "e.g., State of California",
      required: true,
      templateVariable: "JURISDICTION",
    },
    {
      id: "38",
      documentId: "power-of-attorney",
      text: "Who will witness the signing of this document?",
      type: "text",
      placeholder: "e.g., Robert Johnson",
      required: true,
      templateVariable: "WITNESS_NAME",
    },
  ],
  "promissory-note": [
    {
      id: "39",
      documentId: "promissory-note",
      text: "What is the name of the borrower?",
      type: "text",
      placeholder: "e.g., John Smith",
      required: true,
      templateVariable: "BORROWER_NAME",
    },
    {
      id: "40",
      documentId: "promissory-note",
      text: "What is the address of the borrower?",
      type: "text",
      placeholder: "e.g., 123 Main St, Anytown, CA 12345",
      required: true,
      templateVariable: "BORROWER_ADDRESS",
    },
    {
      id: "41",
      documentId: "promissory-note",
      text: "What is the name of the lender?",
      type: "text",
      placeholder: "e.g., Jane Doe",
      required: true,
      templateVariable: "LENDER_NAME",
    },
    {
      id: "42",
      documentId: "promissory-note",
      text: "What is the address of the lender?",
      type: "text",
      placeholder: "e.g., 456 Oak St, Anytown, CA 12345",
      required: true,
      templateVariable: "LENDER_ADDRESS",
    },
    {
      id: "43",
      documentId: "promissory-note",
      text: "What is the loan amount?",
      type: "text",
      placeholder: "e.g., $10,000",
      required: true,
      templateVariable: "LOAN_AMOUNT",
    },
    {
      id: "44",
      documentId: "promissory-note",
      text: "What is the annual interest rate?",
      type: "number",
      placeholder: "e.g., 5",
      required: true,
      templateVariable: "INTEREST_RATE",
    },
    {
      id: "45",
      documentId: "promissory-note",
      text: "What is the payment schedule?",
      type: "select",
      options: ["monthly", "quarterly", "annual", "lump sum"],
      required: true,
      templateVariable: "PAYMENT_SCHEDULE",
    },
    {
      id: "46",
      documentId: "promissory-note",
      text: "What is the amount of each installment?",
      type: "text",
      placeholder: "e.g., $500",
      required: true,
      templateVariable: "INSTALLMENT_AMOUNT",
    },
    {
      id: "47",
      documentId: "promissory-note",
      text: "When is the first payment due?",
      type: "date",
      required: true,
      templateVariable: "FIRST_PAYMENT_DATE",
    },
    {
      id: "48",
      documentId: "promissory-note",
      text: "When is the final payment due?",
      type: "date",
      required: true,
      templateVariable: "FINAL_PAYMENT_DATE",
    },
    {
      id: "49",
      documentId: "promissory-note",
      text: "How many days grace period for late payments?",
      type: "number",
      placeholder: "e.g., 10",
      required: true,
      templateVariable: "GRACE_PERIOD",
    },
    {
      id: "50",
      documentId: "promissory-note",
      text: "What is the late payment fee?",
      type: "text",
      placeholder: "e.g., $25",
      required: true,
      templateVariable: "LATE_FEE_AMOUNT",
    },
  ],
  "cease-and-desist": [
    {
      id: "51",
      documentId: "cease-and-desist",
      text: "What is your name (the sender)?",
      type: "text",
      placeholder: "e.g., John Smith",
      required: true,
      templateVariable: "SENDER_NAME",
    },
    {
      id: "52",
      documentId: "cease-and-desist",
      text: "What is your address?",
      type: "text",
      placeholder: "e.g., 123 Main St, Anytown, CA 12345",
      required: true,
      templateVariable: "SENDER_ADDRESS",
    },
    {
      id: "53",
      documentId: "cease-and-desist",
      text: "Who is the recipient of this letter?",
      type: "text",
      placeholder: "e.g., Jane Doe or XYZ Company",
      required: true,
      templateVariable: "RECIPIENT_NAME",
    },
    {
      id: "54",
      documentId: "cease-and-desist",
      text: "What is the recipient's address?",
      type: "text",
      placeholder: "e.g., 456 Oak St, Anytown, CA 12345",
      required: true,
      templateVariable: "RECIPIENT_ADDRESS",
    },
    {
      id: "55",
      documentId: "cease-and-desist",
      text: "What is the subject matter of this letter?",
      type: "text",
      placeholder: "e.g., Copyright Infringement, Harassment, Defamation",
      required: true,
      templateVariable: "SUBJECT_MATTER",
    },
    {
      id: "56",
      documentId: "cease-and-desist",
      text: "Describe the activity that must stop:",
      type: "longtext",
      placeholder: "e.g., unauthorized use of copyrighted material, harassment via phone calls",
      required: true,
      templateVariable: "ACTIVITY_DESCRIPTION",
    },
    {
      id: "57",
      documentId: "cease-and-desist",
      text: "Describe the specific actions that have occurred:",
      type: "longtext",
      placeholder: "e.g., On June 1, 2023, you published my copyrighted image on your website without permission",
      required: true,
      templateVariable: "SPECIFIC_ACTIONS",
    },
    {
      id: "58",
      documentId: "cease-and-desist",
      text: "What is the legal basis for your demand?",
      type: "text",
      placeholder: "e.g., violates copyright law, constitutes harassment under state law",
      required: true,
      templateVariable: "LEGAL_BASIS",
    },
    {
      id: "59",
      documentId: "cease-and-desist",
      text: "Describe the damages or harm caused:",
      type: "longtext",
      placeholder: "e.g., damage to my reputation, emotional distress, financial loss",
      required: true,
      templateVariable: "DAMAGES_DESCRIPTION",
    },
    {
      id: "60",
      documentId: "cease-and-desist",
      text: "List any additional demands beyond stopping the activity:",
      type: "longtext",
      placeholder: "e.g., Remove all infringing content, Provide written apology",
      required: true,
      templateVariable: "ADDITIONAL_DEMANDS",
    },
    {
      id: "61",
      documentId: "cease-and-desist",
      text: "How many days do they have to respond?",
      type: "number",
      placeholder: "e.g., 10",
      required: true,
      templateVariable: "RESPONSE_TIMEFRAME",
    },
    {
      id: "62",
      documentId: "cease-and-desist",
      text: "What are the consequences if they fail to comply?",
      type: "text",
      placeholder: "e.g., pursue legal action, file a lawsuit for damages",
      required: true,
      templateVariable: "CONSEQUENCES",
    },
  ],
  "invoice": [
    {
      id: "63",
      documentId: "invoice",
      text: "What is the name of the service provider or seller?",
      type: "text",
      placeholder: "e.g., John Smith or ABC Company",
      required: true,
      templateVariable: "PROVIDER_NAME",
    },
    {
      id: "64",
      documentId: "invoice",
      text: "What is the provider's address?",
      type: "text",
      placeholder: "e.g., 123 Main St, Anytown, CA 12345",
      required: true,
      templateVariable: "PROVIDER_ADDRESS",
    },
    {
      id: "65",
      documentId: "invoice",
      text: "What is the provider's contact information?",
      type: "text",
      placeholder: "e.g., Phone: (555) 123-4567, Email: contact@example.com",
      required: true,
      templateVariable: "PROVIDER_CONTACT",
    },
    {
      id: "66",
      documentId: "invoice",
      text: "What is the name of the client or buyer?",
      type: "text",
      placeholder: "e.g., Jane Doe or XYZ Corporation",
      required: true,
      templateVariable: "CLIENT_NAME",
    },
    {
      id: "67",
      documentId: "invoice",
      text: "What is the client's address?",
      type: "text",
      placeholder: "e.g., 456 Oak St, Anytown, CA 12345",
      required: true,
      templateVariable: "CLIENT_ADDRESS",
    },
    {
      id: "68",
      documentId: "invoice",
      text: "What is the client's contact information?",
      type: "text",
      placeholder: "e.g., Phone: (555) 987-6543, Email: client@example.com",
      required: true,
      templateVariable: "CLIENT_CONTACT",
    },
    {
      id: "69",
      documentId: "invoice",
      text: "What is the invoice number?",
      type: "text",
      placeholder: "e.g., INV-2023-001",
      required: true,
      templateVariable: "INVOICE_NUMBER",
    },
    {
      id: "70",
      documentId: "invoice",
      text: "When is the payment due?",
      type: "date",
      required: true,
      templateVariable: "DUE_DATE",
    },
    {
      id: "71",
      documentId: "invoice",
      text: "Provide a general description of the services or goods:",
      type: "longtext",
      placeholder: "e.g., Web design services for company website redesign project",
      required: true,
      templateVariable: "SERVICE_DESCRIPTION",
    },
    {
      id: "72",
      documentId: "invoice",
      text: "Provide an itemized breakdown of services/products:",
      type: "longtext",
      placeholder: "e.g., Web Design: $1,500\nLogo Creation: $500\nContent Writing: $750",
      required: true,
      templateVariable: "ITEM_BREAKDOWN",
    },
    {
      id: "73",
      documentId: "invoice",
      text: "What is the subtotal amount (before tax)?",
      type: "text",
      placeholder: "e.g., $2,750",
      required: true,
      templateVariable: "SUBTOTAL",
    },
    {
      id: "74",
      documentId: "invoice",
      text: "What is the tax rate percentage?",
      type: "number",
      placeholder: "e.g., 8.5",
      required: true,
      templateVariable: "TAX_RATE",
    },
    {
      id: "75",
      documentId: "invoice",
      text: "What is the tax amount?",
      type: "text",
      placeholder: "e.g., $233.75",
      required: true,
      templateVariable: "TAX_AMOUNT",
    },
    {
      id: "76",
      documentId: "invoice",
      text: "What is the total amount due?",
      type: "text",
      placeholder: "e.g., $2,983.75",
      required: true,
      templateVariable: "TOTAL_AMOUNT",
    },
    {
      id: "77",
      documentId: "invoice",
      text: "What payment methods are accepted?",
      type: "text",
      placeholder: "e.g., Bank Transfer, Credit Card, PayPal",
      required: true,
      templateVariable: "PAYMENT_METHODS",
    },
    {
      id: "78",
      documentId: "invoice",
      text: "What is the late payment fee or policy?",
      type: "text",
      placeholder: "e.g., 2% per month on unpaid balance",
      required: true,
      templateVariable: "LATE_FEE",
    },
  ],
  "service-agreement": [
    {
      id: "79",
      documentId: "service-agreement",
      text: "What is the name of the service provider?",
      type: "text",
      placeholder: "e.g., John Smith or ABC Consulting LLC",
      required: true,
      templateVariable: "PROVIDER_NAME",
    },
    {
      id: "80",
      documentId: "service-agreement",
      text: "What is the name of the client?",
      type: "text",
      placeholder: "e.g., Jane Doe or XYZ Corporation",
      required: true,
      templateVariable: "CLIENT_NAME",
    },
    {
      id: "81",
      documentId: "service-agreement",
      text: "Describe the services to be provided:",
      type: "longtext",
      placeholder: "e.g., Marketing consulting services including social media management, content creation, and email marketing",
      required: true,
      templateVariable: "SERVICES_DESCRIPTION",
    },
    {
      id: "82",
      documentId: "service-agreement",
      text: "When will the services begin?",
      type: "date",
      required: true,
      templateVariable: "START_DATE",
    },
    {
      id: "83",
      documentId: "service-agreement",
      text: "When will the services end?",
      type: "date",
      required: true,
      templateVariable: "END_DATE",
    },
    {
      id: "84",
      documentId: "service-agreement",
      text: "What is the compensation amount?",
      type: "text",
      placeholder: "e.g., $5,000 total or $75 per hour",
      required: true,
      templateVariable: "COMPENSATION_AMOUNT",
    },
    {
      id: "85",
      documentId: "service-agreement",
      text: "What is the payment schedule?",
      type: "text",
      placeholder: "e.g., 50% upfront, 50% upon completion, or monthly invoicing",
      required: true,
      templateVariable: "PAYMENT_SCHEDULE",
    },
    {
      id: "86",
      documentId: "service-agreement",
      text: "What is the notice period for termination?",
      type: "text",
      placeholder: "e.g., 30 days written notice",
      required: true,
      templateVariable: "NOTICE_PERIOD",
    },
    {
      id: "87",
      documentId: "service-agreement",
      text: "What jurisdiction's laws will govern this agreement?",
      type: "text",
      placeholder: "e.g., State of California",
      required: true,
      templateVariable: "JURISDICTION",
    },
  ],
  "privacy-policy": [
    {
      id: "88",
      documentId: "privacy-policy",
      text: "What is your company or website name?",
      type: "text",
      placeholder: "e.g., ABC Corporation or mywebsite.com",
      required: true,
      templateVariable: "COMPANY_NAME",
    },
    {
      id: "89",
      documentId: "privacy-policy",
      text: "What is your website URL?",
      type: "text",
      placeholder: "e.g., https://www.example.com",
      required: true,
      templateVariable: "WEBSITE_URL",
    },
    {
      id: "90",
      documentId: "privacy-policy",
      text: "What types of data do you collect from users?",
      type: "longtext",
      placeholder: "e.g., Personal information such as name, email address, phone number; Usage data such as IP address, browser type; Cookies",
      required: true,
      templateVariable: "COLLECTED_DATA_TYPES",
    },
    {
      id: "91",
      documentId: "privacy-policy",
      text: "How do you use the collected data?",
      type: "longtext",
      placeholder: "e.g., To provide and maintain our service; To notify you about changes to our service; To provide customer support",
      required: true,
      templateVariable: "DATA_USAGE",
    },
    {
      id: "92",
      documentId: "privacy-policy",
      text: "Under what circumstances do you disclose user data?",
      type: "longtext",
      placeholder: "e.g., To comply with legal obligations; To protect and defend our rights; To business partners with user consent",
      required: true,
      templateVariable: "DISCLOSURE_TERMS",
    },
    {
      id: "93",
      documentId: "privacy-policy",
      text: "What security measures do you have in place to protect data?",
      type: "longtext",
      placeholder: "e.g., SSL encryption, secure networks, regular security assessments",
      required: true,
      templateVariable: "SECURITY_MEASURES",
    },
    {
      id: "94",
      documentId: "privacy-policy",
      text: "What choices do users have regarding their data?",
      type: "longtext",
      placeholder: "e.g., Access their personal data, request correction, opt out of marketing communications",
      required: true,
      templateVariable: "USER_OPTIONS",
    },
    {
      id: "95",
      documentId: "privacy-policy",
      text: "What contact information should users use for privacy concerns?",
      type: "text",
      placeholder: "e.g., Email: privacy@example.com, Phone: (555) 123-4567",
      required: true,
      templateVariable: "CONTACT_INFORMATION",
    },
  ],
};

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [savedDocuments, setSavedDocuments] = useState<Array<{
    id: string;
    documentType: DocumentType;
    createdAt: string;
    content: string;
  }>>([]);
  const { toast } = useToast();

  const getDocumentById = (id: string): DocumentType | undefined => {
    return mockDocumentTypes.find((doc) => doc.id === id);
  };

  const getQuestionsForDocument = (documentId: string): Question[] => {
    return mockQuestions[documentId] || [];
  };

  const setAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { questionId, value },
    }));
  };

  const clearAnswers = () => {
    setAnswers({});
  };

  const generateDocument = async (documentId: string): Promise<string> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const document = getDocumentById(documentId);
      if (!document) {
        throw new Error("Document type not found");
      }
      
      const questions = getQuestionsForDocument(documentId);
      let content = document.template;
      
      // Get current date for the document
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      content = content.replace(/\[DATE\]/g, currentDate);
      
      // Replace all template variables with answers
      questions.forEach((question) => {
        const answer = answers[question.id];
        if (answer) {
          const regex = new RegExp(`\\[${question.templateVariable}\\]`, 'g');
          content = content.replace(regex, answer.value);
        } else if (question.required) {
          // For required fields without answers, use placeholder text
          const regex = new RegExp(`\\[${question.templateVariable}\\]`, 'g');
          content = content.replace(regex, `[${question.templateVariable} - REQUIRED]`);
        }
      });
      
      toast({
        title: "Success",
        description: "Document generated successfully",
      });
      
      return content;
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate document",
        variant: "destructive",
      });
      throw error;
    }
  };

  const saveGeneratedDocument = (documentId: string, content: string) => {
    const document = getDocumentById(documentId);
    if (!document) {
      toast({
        title: "Error",
        description: "Document type not found",
        variant: "destructive",
      });
      return;
    }
    
    const newDocument = {
      id: Math.random().toString(36).substring(2, 9),
      documentType: document,
      createdAt: new Date().toISOString(),
      content,
    };
    
    setSavedDocuments((prev) => [newDocument, ...prev]);
    
    toast({
      title: "Success",
      description: "Document saved successfully",
    });
  };

  return (
    <DocumentContext.Provider
      value={{
        documentTypes: mockDocumentTypes,
        getDocumentById,
        getQuestionsForDocument,
        answers,
        setAnswer,
        clearAnswers,
        generateDocument,
        savedDocuments,
        saveGeneratedDocument,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};
