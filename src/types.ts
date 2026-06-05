export interface Project {
  id: string;
  title: string;
  type: string;
  duration: string;
  description: string;
  keyOutcomes: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface WorkExperience {
  id: string;
  designation: string;
  company: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
  location: string;
  duration: string;
  keyResponsibilities: string[];
  keyAchievements: string[];
}

export interface Education {
  id: string;
  qualification: string;
  institution: string;
  duration: string;
  mode: string;
  highlights: string[];
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: Skill[];
}

export interface Certification {
  id: string;
  name: string;
  provider: string;
  year: string;
  imageFilename: string;
}

export interface Achievement {
  id: string;
  category: "Professional" | "Academic" | "Other";
  year: string;
  title: string;
  institution: string;
  description: string;
  statsValue?: string;
  statsLabel?: string;
}
