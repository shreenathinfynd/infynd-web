import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlurredAddonOverlayProps {
    addonName: string;
    onUnlock: () => void;
}

export const BlurredAddonOverlay = ({ addonName, onUnlock }: BlurredAddonOverlayProps) => {
    return (
        <div className="relative inline-block w-full min-h-[60px] py-2">
            <div className="blur-[4px] select-none pointer-events-none opacity-50 text-xs">
                <div className="space-y-1">
                    <div className="font-mono">$24.5K</div>
                    <div className="text-[10px] text-muted-foreground">Series A</div>
                </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-[2px] rounded">
                <div className="text-center px-3 py-2">
                    <Lock className="h-5 w-5 mx-auto mb-1 text-primary/70" />
                    <p className="text-[10px] font-medium mb-1.5 text-muted-foreground">Premium Add-On</p>
                    <Button
                        size="sm"
                        variant="default"
                        onClick={onUnlock}
                        className="text-[10px] px-2.5 py-1 h-auto rounded-sm"
                    >
                        Unlock
                    </Button>
                </div>
            </div>
        </div>
    );
};
