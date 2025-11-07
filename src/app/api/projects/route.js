export async function GET() {

     const projects = [
    {
      title: "Jargon",
      desc: "A customizable language learning app designed for immigrant tradespeople in BC",
      img: "/jargon_logo.png",
      link: "https://jargon-app.ca",
      keywords: ["React", "Node.js", "Education", "Mobile"]
    },
    {
      title: "Money Monsters",
      desc: "Teach children financial literacy through an engaging chore management platform.",
      img: "/MM.png",
      link: "https://moneymonstersv2.onrender.com/",
      keywords: ["JavaScript", "Express", "PostgreSQL", "Education"]
    },
    {
      title: "Figma User Documentation",
      desc: "Comprehensive mkdocs walkthrough for learning the Figma design system.",
      img: "/figma.png",
      link: "https://builtbyrobyn.github.io/mkdocsmaterialcomms/",
      keywords: ["Documentation", "MkDocs", "Figma", "Design"]
    },
  ];
    return Response.json({projects});
}