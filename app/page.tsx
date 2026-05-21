import { Header } from "@/components/header";
import { DesignAnalyzer } from "@/components/design-analyzer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="space-y-4 text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Transform Designs into
              <span className="text-primary"> Implementation Prompts</span>
            </h1>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              Upload any design screenshot and get a detailed, actionable prompt
              to help you build it.
            </p>
          </div>

          {/* Main Content Workspace */}
          <div className="rounded-2xl border border-border bg-card/50 p-6 shadow-sm backdrop-blur-sm sm:p-8">
            <DesignAnalyzer />
          </div>

          {/* Product Feature Cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            <FeatureCard
              title="Smart Analysis"
              description="AI-powered design recognition extracts colors, layouts, and components"
            />
            <FeatureCard
              title="Detailed Prompts"
              description="Get comprehensive implementation guides with specific technical details"
            />
            <FeatureCard
              title="Copy & Build"
              description="One-click copy to use the prompt with any AI coding assistant"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 transition-colors hover:bg-muted/50">
      <h3 className="mb-2 font-medium text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
