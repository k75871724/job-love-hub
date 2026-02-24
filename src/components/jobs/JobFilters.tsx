import * as React from "react";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { JobType, WorkMode } from "@/data/jobs";

export type JobFiltersValue = {
  query: string;
  location: string;
  type: JobType | "all";
  workMode: WorkMode | "all";
};

type Props = {
  value: JobFiltersValue;
  onChange: (next: JobFiltersValue) => void;
  onReset: () => void;
};

export function JobFilters({ value, onChange, onReset }: Props) {
  return (
    <div className="grid gap-4 rounded-xl border bg-card/70 p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="space-y-2">
        <Label htmlFor="q">Recherche</Label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="q"
            value={value.query}
            onChange={(e) => onChange({ ...value, query: e.target.value })}
            placeholder="Métier, entreprise, tag…"
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <div className="space-y-2">
          <Label htmlFor="location">Ville</Label>
          <Input
            id="location"
            value={value.location}
            onChange={(e) => onChange({ ...value, location: e.target.value })}
            placeholder="Paris, Lyon…"
          />
        </div>

        <div className="space-y-2">
          <Label>Contrat</Label>
          <Select value={value.type} onValueChange={(v) => onChange({ ...value, type: v as JobFiltersValue["type"] })}>
            <SelectTrigger>
              <SelectValue placeholder="Tous" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="CDI">CDI</SelectItem>
              <SelectItem value="CDD">CDD</SelectItem>
              <SelectItem value="Freelance">Freelance</SelectItem>
              <SelectItem value="Stage">Stage</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 sm:col-span-2 lg:col-span-1">
          <Label>Mode</Label>
          <Select
            value={value.workMode}
            onValueChange={(v) => onChange({ ...value, workMode: v as JobFiltersValue["workMode"] })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tous" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="Sur site">Sur site</SelectItem>
              <SelectItem value="Hybride">Hybride</SelectItem>
              <SelectItem value="Remote">Remote</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">Astuce : essayez “React” ou “UX”.</p>
        <Button variant="outline" size="sm" onClick={onReset} className="gap-2">
          <X className="size-4" />
          Réinitialiser
        </Button>
      </div>
    </div>
  );
}
