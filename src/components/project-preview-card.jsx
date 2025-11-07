import { Card, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function ProjectPreviewCard({ count = 3 }) {
 const apiUrl = process.env.NEXT_PUBLIC_API_URL;
 const projects = await fetch(`${apiUrl}/api/projects`)
 .then((res) => res.json())
 .then((data) => data.projects)
 .catch((error) => {
    console.error("Error fetching projects:", error);
    return [];
 });

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Projects</h2>
        <p className="text-muted-foreground text-lg">
          Check out some of my recent work
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {projects.map((project, index) => (
          <Card key={index} className="flex flex-col h-full p-0 overflow-hidden">
            <div className="relative w-full aspect-video overflow-hidden p-4 bg-muted">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-contain bg-muted"
              />
            </div>

            <div className="flex flex-col flex-1 p-6">
              <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
              <CardDescription className="flex-1 mb-4">
                {project.desc}
              </CardDescription>

              <CardFooter className="p-0 mt-auto">
                <Button asChild className="w-full">
                  <a href={project.link}>View Project</a>
                </Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
