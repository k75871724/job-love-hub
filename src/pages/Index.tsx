import * as React from "react";
import { ArrowRight, BriefcaseBusiness, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { jobs } from "@/data/jobs";
import { HeroSpotlight } from "@/components/jobs/HeroSpotlight";
import { JobFilters, type JobFiltersValue } from "@/components/jobs/JobFilters";
import { JobCard } from "@/components/jobs/JobCard";

const defaultFilters: JobFiltersValue = {
  query: "",
  location: "",
  type: "all",
  workMode: "all",
};

function includesLoose(haystack: string, needle: string) {
  return haystack.toLocaleLowerCase().includes(needle.toLocaleLowerCase());
}

const Index = () => {
  const [filters, setFilters] = React.useState<JobFiltersValue>(defaultFilters);

  React.useEffect(() => {
    document.title = "Offres d’emploi — Trouvez votre prochain poste";
  }, []);

  const results = React.useMemo(() => {
    const q = filters.query.trim();
    const loc = filters.location.trim();

    return jobs.filter((j) => {
      if (filters.type !== "all" && j.type !== filters.type) return false;
      if (filters.workMode !== "all" && j.workMode !== filters.workMode) return false;

      if (loc && !includesLoose(j.location, loc)) return false;

      if (!q) return true;
      const blob = `${j.title} ${j.company} ${j.tags.join(" ")} ${j.description}`;
      return includesLoose(blob, q);
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      <HeroSpotlight className="pb-8 pt-6">
        <header className="container">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl border bg-card/70 shadow-sm">
                <BriefcaseBusiness className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Jobboard</p>
                <p className="text-lg font-semibold leading-none">Offres & opportunités</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="soft" className="hidden sm:inline-flex">
                Déposer une offre
              </Button>
              <Button variant="hero" className="gap-2">
                Créer une alerte
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </header>

        <main className="container mt-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-5">
              <p className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-3 py-1 text-sm text-muted-foreground shadow-sm">
                <Sparkles className="size-4 text-primary" />
                Sélection d’offres (démo)
              </p>

              <h1 className="text-balance text-4xl leading-[1.02] tracking-tight sm:text-5xl">
                Des offres claires. Des équipes sérieuses. Un rythme simple.
              </h1>
              <p className="max-w-prose text-pretty text-lg text-muted-foreground">
                Cherchez par métier, ville ou type de contrat. Cette première version affiche des offres de démonstration —
                on pourra ensuite brancher une vraie base de données.
              </p>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="rounded-full border bg-card/70 px-3 py-1 shadow-sm">{results.length} offres</span>
                <span className="rounded-full border bg-card/70 px-3 py-1 shadow-sm">Mise à jour instantanée</span>
                <span className="rounded-full border bg-card/70 px-3 py-1 shadow-sm">Mobile friendly</span>
              </div>
            </div>

            <div className="lg:pl-6">
              <JobFilters
                value={filters}
                onChange={setFilters}
                onReset={() => setFilters(defaultFilters)}
              />
            </div>
          </div>

          <Separator className="my-8" />

          <section aria-label="Résultats" className="pb-12">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl tracking-tight">Résultats</h2>
                <p className="text-sm text-muted-foreground">Cliquez une offre pour afficher une page détail (prochaine étape).</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {filters.query || filters.location || filters.type !== "all" || filters.workMode !== "all"
                  ? "Filtres actifs"
                  : "Aucun filtre"}
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {results.map((job, idx) => (
                <div key={job.id} className={idx < 2 ? "animate-fade-up" : ""}>
                  <JobCard job={job} />
                </div>
              ))}

              {results.length === 0 ? (
                <div className="md:col-span-2">
                  <div className="rounded-xl border bg-card/70 p-8 text-center shadow-sm">
                    <p className="text-lg font-semibold">Aucune offre ne correspond.</p>
                    <p className="mt-2 text-muted-foreground">Essayez de retirer un filtre ou de chercher un mot-clé plus large.</p>
                    <div className="mt-5 flex justify-center">
                      <Button variant="outline" onClick={() => setFilters(defaultFilters)}>
                        Réinitialiser les filtres
                      </Button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        </main>
      </HeroSpotlight>

      <footer className="container pb-10">
        <Separator className="mb-6" />
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Jobboard — Prototype</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="link" className="h-auto p-0 text-sm">
              Mentions
            </Button>
            <Button variant="link" className="h-auto p-0 text-sm">
              Contact
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
