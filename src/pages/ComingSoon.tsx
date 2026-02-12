import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, Construction, ArrowLeft, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ComingSoon = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full"
            >
                <Card className="border-primary/20 shadow-2xl bg-background/50 backdrop-blur-xl overflow-hidden relative">
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-32 h-32 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

                    <CardContent className="p-10 text-center relative z-10">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mb-8 flex justify-center"
                        >
                            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-inner border border-white/5">
                                <Rocket className="h-10 w-10 text-primary animate-pulse" />
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl font-display font-bold text-foreground mb-3"
                        >
                            Coming Soon
                        </motion.h1>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-muted-foreground mb-8 text-lg"
                        >
                            We're currently building something amazing here. This product module is under active development.
                        </motion.p>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col gap-3"
                        >
                            
                            <Button
                                onClick={() => navigate(-1)}
                                size="lg"
                                className="w-full rounded-xl gap-2 font-medium shadow-lg hover:shadow-primary/25 transition-all"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Return to Products
                            </Button>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default ComingSoon;
