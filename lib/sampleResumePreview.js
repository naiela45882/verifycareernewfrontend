/** Sample content for template previews when the resume is still empty (build-from-scratch). */
export const SAMPLE_RESUME_PREVIEW = {
  contact: {
    name: "Alex Morgan",
    email: "alex.morgan@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    links: [{ label: "LinkedIn", url: "https://linkedin.com/in/example" }],
  },
  summary:
    "Software engineer with 5+ years building scalable web products. Strong in React, Node.js, and cloud infrastructure. Passionate about clean APIs and user-centered design.",
  experience: [
    {
      company: "Tech Corp",
      title: "Senior Software Engineer",
      location: "Remote",
      startDate: "Jan 2021",
      endDate: "",
      current: true,
      bullets: [
        "Led migration to React 18, improving page load by 40%",
        "Designed REST APIs used by 3 product teams",
      ],
    },
    {
      company: "Startup Labs",
      title: "Full Stack Developer",
      location: "Austin, TX",
      startDate: "Jun 2018",
      endDate: "Dec 2020",
      current: false,
      bullets: ["Built customer dashboard from zero to 10k MAU"],
    },
  ],
  education: [
    {
      school: "State University",
      degree: "B.S. Computer Science",
      field: "",
      startDate: "2014",
      endDate: "2018",
      details: "",
    },
  ],
  skills: {
    categories: [
      {
        name: "Skills",
        items: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker"],
      },
    ],
  },
  projects: [
    {
      name: "Open Source CLI",
      url: "",
      bullets: ["Developer tool with 2k+ GitHub stars"],
    },
  ],
  certifications: [],
};
