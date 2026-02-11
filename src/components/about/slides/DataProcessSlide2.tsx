import { motion } from "framer-motion";
import { Search, Shield, UserCheck } from "lucide-react";

const steps = [
    {
        icon: Search,
        title: "Quality Evaluation",
        text: "Again our data is evaluated and scrutinized for errors, relevance, reoccurrence and establish lead scoring.",
    },
    {
        icon: Shield,
        title: "Compliance Checks",
        text: "Then compliance checks are carried out by checking against TPS, CTPS and MPS registers. Followed by notification emails are sent to the customers where we hold email addresses.",
    },
    {
        icon: UserCheck,
        title: "Human Verification",
        text: "For more accuracy, we human-verify the data by our data quality team before delivery or any information is loaded into the InFynd platform.",
    },
];

const DataProcessSlide2 = () => (
    <section className="min-h-screen flex items-center py-20 px-6">
        <div className="max-w-4xl mx-auto w-full">
            {/* Phase Marker */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring" }}
                className="flex items-center gap-3 mb-6"
            >
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    2
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
            >
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                    Rigorous Quality Assurance
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl">
                    Multiple layers of verification ensure compliance and accuracy.
                </p>

                <div className="space-y-6 pt-4">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="flex items-start gap-4 p-5 rounded-lg bg-muted/30 border"
                        >
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <step.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-foreground mb-1">
                                    Step {i + 4}: {step.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">{step.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-sm text-muted-foreground italic pt-4 border-l-2 border-primary/30 pl-4"
                >
                    "Human expertise combined with automated compliance ensures data you can trust."
                </motion.p>
            </motion.div>
        </div>
    </section>
);

export default DataProcessSlide2;
