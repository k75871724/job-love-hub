import * as React from "react";
import { Building2, Clock, MapPin } from "lucide-react";

import type { Job } from "@/data/jobs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

function formatDate(dateIso: string) {
  const d = new Date(dateIso);
  return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short" }).format(d);
}

export function JobCard({ job }: { job: Job }) {
  return (
    <Card className="group overflow-hidden rounded-xl border bg-card/80 shadow-sm transition-shadow hover:shadow-elevated">
      <CardHeader className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="size-4" />
            <span>{job.company}</span>
          </div>
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="size-4" />
            <span>{formatDate(job.postedAt)}</span>
          </div>
        </div>

        <CardTitle className="text-balance text-xl leading-tight">
          <span className="underline-offset-4 transition-colors group-hover:text-primary">{job.title}</span>
        </CardTitle>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{job.type}</Badge>
          <Badge variant="outline">{job.workMode}</Badge>
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            {job.location}
          </span>
          {job.salary ? <span className="text-sm text-muted-foreground">• {job.salary}</span> : null}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm leading-relaxed text-muted-foreground">{job.description}</p>
        <div className="flex flex-wrap gap-2">
          {job.tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border bg-background/60 px-2.5 py-1 text-xs text-foreground/90"
            >
              {t}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="justify-between gap-3">
        <Button variant="hero" size="sm">
          Voir l’offre
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          Sauvegarder
        </Button>
      </CardFooter>
    </Card>
  );
}
