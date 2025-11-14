'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Loader2 } from 'lucide-react';

export default function GitHubCalendar({ username = 'yourusername' }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const existingLink = document.querySelector('link[href*="github-calendar"]');
      if (!existingLink) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/github-calendar@latest/dist/github-calendar-responsive.css';
        link.setAttribute('data-github-calendar', 'true');
        document.head.appendChild(link);
      }
    }
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>GitHub Contributions</span>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            View Profile
            <ExternalLink className="h-3 w-3" />
          </a>
        </CardTitle>
        <CardDescription>
          My recent activity and contributions on GitHub
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="github-calendar-container overflow-x-auto relative">
          <Script
            src="https://unpkg.com/github-calendar@latest/dist/github-calendar.min.js"
            strategy="lazyOnload"
            onLoad={() => {
              if (window.GitHubCalendar) {
                window.GitHubCalendar('.calendar', username, {
                  responsive: true,
                  tooltips: true,
                });
                setIsLoading(false);
              }
            }}
          />

          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}

          <div className="calendar" style={{ display: isLoading ? 'none' : 'block' }}></div>
        </div>
      </CardContent>
    </Card>
  );
}
