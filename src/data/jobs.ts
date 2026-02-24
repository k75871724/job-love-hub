export type JobType = "CDI" | "CDD" | "Freelance" | "Stage";
export type WorkMode = "Sur site" | "Hybride" | "Remote";

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  workMode: WorkMode;
  salary?: string;
  tags: string[];
  postedAt: string; // ISO
  description: string;
};

export const jobs: Job[] = [
  {
    id: "job_01",
    title: "Product Designer",
    company: "Atelier Nord",
    location: "Paris",
    type: "CDI",
    workMode: "Hybride",
    salary: "48–60k€",
    tags: ["Design System", "Figma", "UX"],
    postedAt: "2026-02-12T09:00:00.000Z",
    description:
      "Construire une expérience claire et ambitieuse, de la discovery à la livraison. Vous travaillerez avec produit + engineering sur un design system et des features de bout en bout.",
  },
  {
    id: "job_02",
    title: "Développeur·se Frontend React",
    company: "Sillage Studio",
    location: "Lyon",
    type: "CDI",
    workMode: "Sur site",
    salary: "45–55k€",
    tags: ["React", "TypeScript", "UI"],
    postedAt: "2026-02-18T10:30:00.000Z",
    description:
      "Vous rejoignez une équipe produit pour construire des interfaces rapides et accessibles. Vous aimez la rigueur UI, les détails, et les perf.",
  },
  {
    id: "job_03",
    title: "Growth Marketing",
    company: "Mistral Works",
    location: "Bordeaux",
    type: "CDD",
    workMode: "Hybride",
    salary: "40–50k€",
    tags: ["Acquisition", "SEO", "Ops"],
    postedAt: "2026-02-06T08:10:00.000Z",
    description:
      "Piloter les canaux d’acquisition, structurer la mesure, et améliorer le funnel. Vous testez, itérez, documentez.",
  },
  {
    id: "job_04",
    title: "Data Analyst",
    company: "Keram",
    location: "Toulouse",
    type: "Freelance",
    workMode: "Remote",
    salary: "450–550€/j",
    tags: ["SQL", "Looker", "BI"],
    postedAt: "2026-02-20T16:45:00.000Z",
    description:
      "Mettre en place des dashboards, clarifier les métriques et accompagner les équipes. Mission orientée impact.",
  },
  {
    id: "job_05",
    title: "Stagiaire Customer Success",
    company: "Cobalt",
    location: "Nantes",
    type: "Stage",
    workMode: "Sur site",
    tags: ["Support", "Onboarding", "Ops"],
    postedAt: "2026-02-01T11:20:00.000Z",
    description:
      "Aider nos clients à réussir dès la première semaine. Vous documentez, améliorez l’onboarding, et chassez les frictions.",
  },
  {
    id: "job_06",
    title: "Engineering Manager",
    company: "Orion Labs",
    location: "Marseille",
    type: "CDI",
    workMode: "Hybride",
    salary: "70–85k€",
    tags: ["Leadership", "Delivery", "Architecture"],
    postedAt: "2026-02-22T07:50:00.000Z",
    description:
      "Encadrer une squad, sécuriser le delivery et construire une culture d’excellence. Vous aimez coacher et simplifier.",
  },
];
