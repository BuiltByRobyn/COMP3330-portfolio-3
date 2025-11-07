import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createSlug } from "@/lib/utils";

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const { projects } = await res.json();

  const project = projects.find((p) => createSlug(p.title) === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Button asChild variant="ghost">
          <Link href="/projects">&larr; Back to Projects</Link>
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Project Image */}
          <div className="relative w-full md:w-80 aspect-video md:aspect-square flex-shrink-0 overflow-hidden bg-muted/30">
            <Image
              src={project.img}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-contain p-4 md:p-6"
              priority
            />
          </div>

          {/* Project Content */}
          <div className="flex flex-col flex-1 p-6">
            <CardTitle className="text-2xl md:text-3xl mb-4">{project.title}</CardTitle>

            {/* Project Description */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{project.desc}</p>
            </div>

            {/* Project Keywords/Tags */}
            {project.keywords && project.keywords.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Project Link */}
            <div className="mt-auto">
              <Button asChild size="lg">
                <a href={project.link} target="_blank" rel="noreferrer">
                  View Live Project &rarr;
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
