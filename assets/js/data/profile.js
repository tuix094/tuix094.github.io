/* ==========================================================================
   PROFILE DATA
   Edit this file to change your personal information everywhere on the site.
   Never put passwords, ID numbers, or private documents here: this file is public.
   Rules: keep the quotes " " around text and the commas between items.
   ========================================================================== */
window.PROFILE = {
  name: "Emmanuel Baylon",
  initials: "EB",
  title: "Graphic Designer, Programmer, and Data Analyst",
  tagline: "I design visuals, write code, and turn data into answers.",
  intro:
    "I'm an IT student who works across design, programming, and data. I create logos, illustrations, and layouts, build programs and websites, and work with databases to find what the numbers are saying. I like projects where good design and clear logic meet.",
  location: "Calamba City, Laguna, Philippines",
  email: "emmanuelbaylon03@gmail.com",
  phone: "+63 951 991 1798",
  photo: "/assets/img/profile.jpg",  // save your photo as assets/img/profile.jpg
  siteUrl: "https://tuix094.github.io",

  // Get your free form ID at https://formspree.io (see README). Example: "xyzabcde"
  formspreeId: "YOUR_FORM_ID",

  cv: {
    file: "/assets/cv/CV.pdf",            // save your CV as assets/cv/CV.pdf
    downloadName: "Emmanuel-Baylon-CV.pdf",
    updated: "October 2026"
  },

  socials: [
    { label: "LinkedIn", icon: "linkedin", url: "" }, // add your LinkedIn link to show it
    { label: "GitHub", icon: "github", url: "https://github.com/tuix094" },
    { label: "Facebook", icon: "facebook", url: "" } // leave url empty to hide
  ],

  about: {
    education: "BS Information Technology, City College of Calamba (3rd Year)",
    occupation: "3rd Year BS Information Technology Student, City College of Calamba",
    years: "3 years of academic projects",
    specializations: ["Graphic design", "Programming", "Data analysis"],
    bio: [
      "I got into IT because I love playing games and working with computers. I wanted to know how the games I played were made, how computers actually worked, and how I could build something of my own. That curiosity led me to study Information Technology.",
      "Along the way I found designing. I enjoy creating posters, layouts, and graphics, and I've learned that good design makes any program or report easier to use and understand. Today I work across three areas: graphic design, programming, and data analysis.",
      "In my Graphics Design subject I've drawn a fruit illustration, a logo, a typography logo, a pumpkin spice latte design, and the wireframe for this website. I've also built programs in Java and C++ and a web system with PHP and MySQL. My goal is to keep growing in all three areas and work on projects that combine them, such as designing and building apps or games, or turning data into visuals people can understand at a glance."
    ]
  },

  /* Skill levels: use only "Familiar", "Proficient", or "Advanced".
     Familiar = used it in at least one project. Proficient = use it regularly.
     Advanced = could teach it. tone is the card color: lavender, sage, or sky. */
  skills: [
    {
      category: "Graphic design",
      tone: "lavender",
      summary: "Visuals, layouts, and interfaces.",
      items: [
        { name: "GIMP", level: "Familiar" },
        { name: "Canva", level: "Proficient" },
        { name: "Figma", level: "Familiar" },
        { name: "Logo design", level: "Proficient" },
        { name: "Typography", level: "Proficient" },
        { name: "Illustration", level: "Proficient" },
        { name: "Wireframing", level: "Familiar" }
      ]
    },
    {
      category: "Programming",
      tone: "sage",
      summary: "Building programs and websites.",
      items: [
        { name: "HTML", level: "Proficient" },
        { name: "CSS", level: "Proficient" },
        { name: "JavaScript", level: "Familiar" },
        { name: "PHP", level: "Familiar" },
        { name: "Java", level: "Proficient" },
        { name: "C++", level: "Proficient" },
        { name: "C#", level: "Familiar" }
      ]
    },
    {
      category: "Data analysis",
      tone: "sky",
      summary: "Storing, querying, and understanding data.",
      items: [
        { name: "SQL", level: "Proficient" },
        { name: "MySQL", level: "Proficient" },
        { name: "Database design", level: "Familiar" },
        { name: "Writing queries and reports", level: "Familiar" }
      ]
    }
  ],

  experience: [
    {
      position: "BS Information Technology Student",
      organization: "City College of Calamba",
      location: "Calamba City, Laguna",
      start: "Aug 2023",               // <-- change to your actual first month
      end: "Present",
      responsibilities: [
        "Build programs in Java, C++, and C# and websites in HTML, CSS, JavaScript, and PHP for coursework.",
        "Design and query databases using SQL and MySQL.",
        "Create logos, illustrations, and layouts for Graphics Design."
      ],
      accomplishments: [
        "Helped build a truck rental management system with GPS tracking for R Pedraja Enterprises OPC in Software Engineering.",
        "Helped build an inventory system for street vendors in C++ and a racing game in Java.",
        "Completed five Graphics Design activities: Fruit Design, Logo, Pumpkin Spice Latte, Typography Logo, and Wireframe.",
        "Designed, built, and deployed this portfolio website on GitHub Pages."
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Science in Information Technology",
      school: "City College of Calamba",
      major: "3rd Year",
      year: "2023 to Present"           // <-- change if your start year is different
    }
    // To add senior high school, put a comma after the } above and paste:
    // { degree: "Senior High School, ICT Strand", school: "Your SHS", major: "", year: "2021 to 2023" }
  ],

  /* Certifications and licenses are optional. The column appears automatically
     once you add one. Example:
     { name: "Introduction to Python", issuer: "Cisco Networking Academy", year: "2025", credentialId: "", verifyUrl: "" } */
  certifications: [],

  licenses: []
};
