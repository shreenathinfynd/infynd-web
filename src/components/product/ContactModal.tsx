import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, AtSign, Phone, Building, Link2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName?: string;
}

const ContactModal = ({ open, onOpenChange, productName }: ContactModalProps) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast({ title: "Please fill in required fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Message sent!", description: "We'll get back to you shortly." });
      onOpenChange(false);
      setForm({ name: "", email: "", phone: "", company: "", message: "" });
    }, 800);
  };

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-sidebar text-sidebar-foreground border-sidebar-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-primary">Let's Talk</DialogTitle>
          <DialogDescription className="text-sidebar-foreground/70">
            Seamless platform setup across your entire funnel.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sidebar-foreground/50" />
            <Input
              placeholder="Enter your Full Name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="pl-10 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/40"
              maxLength={100}
              required
            />
          </div>
          <div className="relative">
            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sidebar-foreground/50" />
            <Input
              type="email"
              placeholder="Enter your Work email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="pl-10 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/40"
              maxLength={255}
              required
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sidebar-foreground/50" />
            <Input
              type="tel"
              placeholder="Enter your Phone number"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="pl-10 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/40"
              maxLength={20}
            />
          </div>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sidebar-foreground/50" />
            <Input
              placeholder="Enter your Company Name"
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              className="pl-10 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/40"
              maxLength={200}
            />
          </div>
          <div className="relative">
            <Link2 className="absolute left-3 top-3 h-4 w-4 text-sidebar-foreground/50" />
            <Textarea
              placeholder="Write your message...."
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              className="pl-10 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/40 min-h-[80px]"
              maxLength={1000}
            />
          </div>
          <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={submitting}>
            {submitting ? "Sending..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
