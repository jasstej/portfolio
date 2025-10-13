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
