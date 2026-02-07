import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, CheckCircle, FileText, Lock, Eye, AlertTriangle } from "lucide-react";

const sections = [
  {
    title: "GDPR Compliance",
    icon: Shield,
    items: [
      "All data processed under Article 6(1)(f) Legitimate Interest or explicit consent",
      "Regular Legitimate Interest Assessments (LIA) conducted for all datasets",
      "Data subjects can exercise rights (access, erasure, rectification) via our portal",
      "ICO registered — Registration Number: ZA123456",
    ],
  },
  {
    title: "PECR & ePrivacy",
    icon: Lock,
    items: [
      "Electronic marketing data screened against TPS, CTPS, and MPS registers",
      "Monthly suppression updates from official preference services",
      "Consent-based and soft opt-in data clearly segmented",
      "Email data includes unsubscribe mechanism support",
    ],
  },
  {
    title: "Suppression & DNC",
    icon: AlertTriangle,
    items: [
      "TPS (Telephone Preference Service) screening — monthly",
      "CTPS (Corporate Telephone Preference Service) screening — monthly",
      "MPS (Mailing Preference Service) screening — monthly",
      "Gone-away and deceased suppression — quarterly",
      "Custom suppression lists supported for all clients",
    ],
  },
  {
    title: "Data Sourcing Transparency",
    icon: Eye,
    items: [
      "All data sources documented with provenance tracking",
      "Source types include: public registries, consented web forms, verified directories",
      "No data from social media scraping or unverified third-party resellers",
      "Regular source audits with quality scoring",
    ],
  },
  {
    title: "Security & Audit",
    icon: CheckCircle,
    items: [
      "ISO 27001 aligned information security policies",
      "SOC 2 Type II compliant data handling procedures",
      "Encrypted data transfer (TLS 1.3) and storage (AES-256)",
      "Full audit trail for data access and processing activities",
      "Annual penetration testing by independent security firm",
    ],
  },
  {
    title: "Documentation",
    icon: FileText,
    items: [
      "Data Processing Agreements (DPA) available for all clients",
      "Privacy Impact Assessments completed for all products",
      "Records of Processing Activities (ROPA) maintained and updated",
      "Breach notification procedures with 72-hour reporting commitment",
    ],
  },
];

const CompliancePage = () => (
  <div className="py-8 px-6 max-w-6xl mx-auto">
    <div className="mb-10">
      <h1 className="font-display text-3xl font-bold text-foreground mb-2">Compliance & Trust</h1>
      <p className="text-muted-foreground max-w-2xl">
        Data compliance is at the core of everything we do. Here's how InFynd ensures every record meets the highest standards of privacy, accuracy, and legal compliance.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      {sections.map((section) => (
        <Card key={section.title}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <section.icon className="h-5 w-5 text-primary" />
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-infynd-success shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default CompliancePage;
