import Link from "next/link"
import Image from "next/image"
import { Card, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createSlug } from "@/lib/utils"

export default async function AllProjects() {
    const projects = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`)
    .then((res) => res.json())
    .then((data) => data.projects)
    .catch((error) => {
       console.error("Error fetching projects:", error);
       return [];
    });

    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">All Projects</h2>
          <p className="text-muted-foreground text-lg">
            Browse through all of my projects
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {projects.map((project) => {
            const slug = createSlug(project.title);
            return (
              <Card key={slug} className="flex flex-col md:flex-row overflow-hidden">
                <div className="relative w-full md:w-64 aspect-video md:aspect-square flex-shrink-0 overflow-hidden bg-muted/30">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 256px"
                    className="object-contain p-4 md:p-6"
                  />
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <CardTitle className="text-2xl mb-3">{project.title}</CardTitle>
                  <CardDescription className="flex-1 mb-4 text-base">
                    {project.desc}
                  </CardDescription>

                  <CardFooter className="p-0 mt-auto flex gap-2">
                    <Button asChild variant="secondary" size="sm">
                      <a href={project.link} target="_blank" rel="noreferrer">
                        Open Project
                      </a>
                    </Button>
                    <Button asChild size="sm">
                      <Link href={`/projects/${slug}`}>Details</Link>
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    )
}
