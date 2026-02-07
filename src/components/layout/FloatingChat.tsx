import { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  links?: { label: string; to: string }[];
}

const starterPrompts = [
  "Show me UK email data for retail",
  "What healthcare data do you have?",
  "Compare postal and email data",
  "How do you ensure GDPR compliance?",
];

const scriptedResponses: Record<string, ChatMessage> = {
  "show me uk email data for retail": {
    role: "assistant",
    content: "Great choice! Our Email Marketing Data covers 18.5M+ UK records with strong retail sector coverage. You'll get verified email addresses with <3% bounce rate guarantee.",
    links: [{ label: "View Email Marketing Data →", to: "/products/email-marketing-data" }],
  },
  "what healthcare data do you have?": {
    role: "assistant",
    content: "Our Global Healthcare Data covers 12M+ records across 52 countries, including NHS Trusts, private hospitals, pharma companies, and individual HCPs with GMC/NMC verification.",
    links: [{ label: "Explore Healthcare Data →", to: "/products/global-healthcare-data" }],
  },
  "compare postal and email data": {
    role: "assistant",
    content: "Both are great for outreach! Postal data (42M+ records) excels at physical mail campaigns, while Email data (58M+ records) is ideal for digital campaigns. Many clients use both for multi-channel strategies.",
    links: [{ label: "Compare Products →", to: "/compare" }],
  },
  "how do you ensure gdpr compliance?": {
    role: "assistant",
    content: "We take compliance seriously. All data is processed under legitimate interest or consent, with TPS/MPS screening, regular suppression, and full audit trails. We're registered with the ICO.",
    links: [{ label: "View Compliance Details →", to: "/compliance" }],
  },
};

const defaultResponse: ChatMessage = {
  role: "assistant",
  content: "Thanks for your question! I can help you explore our data products, compare options, or find the right dataset for your needs. Try asking about a specific product or use case.",
  links: [{ label: "Browse All Products →", to: "/" }],
};

const FloatingChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { role: "user", content: text };
    const response = scriptedResponses[text.toLowerCase().trim()] || defaultResponse;
    setMessages((prev) => [...prev, userMsg, response]);
    setInput("");
  };

  return (
    <>
      {/* Chat Panel */}
      <div className={cn(
        "fixed bottom-20 right-4 z-50 w-96 max-w-[calc(100vw-2rem)] bg-card rounded-2xl shadow-2xl border transition-all duration-300",
        open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-display font-semibold">InFynd Assistant</span>
          </div>
          <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Try one of these:</p>
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="block w-full text-left text-sm px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={cn("text-sm", msg.role === "user" ? "text-right" : "text-left")}>
              <div className={cn(
                "inline-block px-3 py-2 rounded-xl max-w-[85%]",
                msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              )}>
                {msg.content}
              </div>
              {msg.links && (
                <div className="mt-1 space-y-1">
                  {msg.links.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className="block text-xs text-primary hover:underline"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            placeholder="Ask about our data..."
            className="flex-1 h-9 text-sm rounded-full"
          />
          <Button size="icon" className="h-9 w-9 rounded-full shrink-0" onClick={() => handleSend(input)}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all flex items-center justify-center",
          open && "bg-muted text-foreground"
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
};

export default FloatingChat;
