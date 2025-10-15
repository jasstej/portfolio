export type Achievement = {
  id: string;
  title: string;
  issuer: string;
  imageUrl: string;
  verifyUrl?: string;
  issuedOn?: string;
  note?: string;
};

export type SocialLinks = {
  github: string;
  linkedin: string;
  instagram: string;
  email?: string;
  website?: string;
};

export type Content = {
  achievements: Achievement[];
  links: SocialLinks;
  skills: string[];
  projects: Array<{
    id: string;
    name: string;
    desc: string;
    stack: string[];
    github?: string;
    demo?: string;
  }>;
};

// Semantic network mapping between nodes (skills/concepts/certifications) and projects.
export type FlowLink = {
  from: string; // e.g., "aws-cp", "terraform", "security"
  to: string;   // project id e.g., "cipherlake"
  weight?: number; // optional strength to render thicker/brighter edges
  label?: string;  // optional semantic label for tooltips/edge captions
};

// Consistent coloring per node type for visual layers
export const nodeColors = {
  certificate: "#00b4ff",
  project: "#00ff9d",
  skill: "#ff005e",
  philosophy: "#f5f5f5",
};

export const defaultContent: Content = {
  achievements: [
    {
      id: "aws-cp",
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      imageUrl: "https://d1.awsstatic.com/training-and-certification/Certification%20Badges/AWS-Certified_Cloud-Practitioner_512x512.4a36b1f83d2d8ce0a4145f1fbb9c1fd9b4a1d0a7.png",
      verifyUrl: "https://www.credly.com/",
      issuedOn: "2024-10-01",
    },
    {
      id: "rhcsa",
      title: "Red Hat Certified System Administrator (RHCSA)",
      issuer: "Red Hat",
      imageUrl: "https://static.redhat.com/libs/redhat/brand-assets/latest/certification-badges/RedHat-CertifiedSystemAdministrator-Logo-2021.png",
      issuedOn: "2024-05-20",
    },
  ],
  links: {
    github: "https://github.com/JasstejTrace",
    linkedin: "https://www.linkedin.com/in/JasstejTrace",
    instagram: "https://instagram.com/JasstejTrace.exe",
    email: "hello@jasstejtrace.exe",
    website: "https://jasstejtrace.exe",
  },
  skills: [
    "React", "TypeScript", "Python", "AWS", "Kali Linux", "Red Hat", "Docker", "Terraform", "Next.js", "Node.js", "Bash", "Nmap"
  ],
  projects: [
    { id: "sentinel", name: "Sentinel", desc: "Autonomous endpoint telemetry collector.", stack: ["Python", "Go", "TLS1.3"], github: "#", demo: "#" },
    { id: "cipherlake", name: "CipherLake", desc: "Secure data lake infrastructure with envelope encryption.", stack: ["AWS KMS", "S3", "Lambda"], github: "#", demo: "#" },
    { id: "tracenet", name: "TraceNet", desc: "Distributed packet inspection framework.", stack: ["Rust", "Suricata", "Async"], github: "#", demo: "#" },
    { id: "firecore", name: "FireCore", desc: "Cloud firewall orchestration with GitOps.", stack: ["Terraform", "Ansible"], github: "#", demo: "#" },
  ],
};

// Semantic links that describe why nodes are connected (not just layout).
// Only include ids that exist in the current content where applicable.
export const flowLinks: FlowLink[] = [
  // Certifications -> Projects
  { from: "aws-cp", to: "cipherlake", weight: 2, label: "cloud-foundations" },
  { from: "aws-cp", to: "firecore", weight: 1 },
  { from: "rhcsa", to: "sentinel", weight: 1, label: "linux-admin" },

  // Skills/Tools -> Projects (match against defaultContent.skills case-insensitively)
  { from: "terraform", to: "firecore", weight: 2, label: "infra-as-code" },
  { from: "python", to: "sentinel", weight: 2, label: "endpoint-agent" },
  { from: "rust", to: "tracenet", weight: 2, label: "dpi-perf" },
  { from: "aws", to: "cipherlake", weight: 2, label: "kms-s3" },

  // Concepts / philosophy -> Projects
  { from: "cloud", to: "cipherlake", weight: 1 },
  { from: "security", to: "sentinel", weight: 1 },
  { from: "automation", to: "firecore", weight: 1 },
  { from: "research", to: "tracenet", weight: 1 },
];
