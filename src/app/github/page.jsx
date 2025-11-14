import GitHubCalendar from '@/components/github-calendar';

export const metadata = {
  title: 'GitHub Activity | Robyn Portfolio',
  description: 'View my GitHub contributions and activity.',
};

export default function GitHubPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">GitHub Activity</h1>
        <p className="text-lg text-muted-foreground">
          Check out my contributions and activity on GitHub
        </p>
      </div>

      <GitHubCalendar username="BuiltByRobyn" />
    </div>
  );
}
