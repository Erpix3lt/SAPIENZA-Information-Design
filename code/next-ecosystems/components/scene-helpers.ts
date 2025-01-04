import { Vulnerability } from "@/app/api/osv/[ecosystem]/route";

export const sortedVulnerabilityReport = (vulnerabilityReport: Vulnerability[]) => {
  return [...vulnerabilityReport].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
};

export const normalize = (value: number, min: number, max: number) => {
  return (value - min) / (max - min);
};