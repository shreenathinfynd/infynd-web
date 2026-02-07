import { Separator } from "@/components/ui/separator";
import DataCleansingStoryBlock from "./enrichment/DataCleansingStoryBlock";
import DataMatchIntelligenceBlock from "./enrichment/DataMatchIntelligenceBlock";
import AppendEnrichmentStoryBlock from "./enrichment/AppendEnrichmentStoryBlock";
import LookalikeIntelligenceBlock from "./enrichment/LookalikeIntelligenceBlock";
import ContinuousEnrichmentLoopBlock from "./enrichment/ContinuousEnrichmentLoopBlock";

const EnrichmentStoryExperience = () => {
  return (
    <div className="space-y-4">
      <DataCleansingStoryBlock />
      <Separator className="my-8" />
      <DataMatchIntelligenceBlock />
      <Separator className="my-8" />
      <AppendEnrichmentStoryBlock />
      <Separator className="my-8" />
      <LookalikeIntelligenceBlock />
      <Separator className="my-8" />
      <ContinuousEnrichmentLoopBlock />
    </div>
  );
};

export default EnrichmentStoryExperience;
