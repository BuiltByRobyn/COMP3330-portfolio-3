'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CalWidget = dynamic(() => import('@/components/CalendlyWidget'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center" style={{ minWidth: '320px', height: '700px' }}>
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  ),
});

const longerMeetingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  duration: z.string().min(1, 'Please specify desired duration'),
  purpose: z.string().min(10, 'Please provide at least 10 characters describing the purpose').max(500),
});

export default function CalendarPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(longerMeetingSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/calendar/request-meeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit request');
      }

      toast.success('Meeting request submitted! I\'ll get back to you soon.');
      reset();
    } catch (error) {
      toast.error('Failed to submit request. Please try again.');
      console.error('Error submitting meeting request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Schedule a Meeting</h1>
        <p className="text-muted-foreground">
          Choose a quick 30-minute slot or request a custom meeting time
        </p>
        <p className="text-muted-foreground mt-1">
          Need more than an hour? Let me know in the request form
        </p>
        <div className="border-b-2 border-border pt-8"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="flex flex-col">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Quick 30-Min Chat</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Choose a time to meet with me remotely.
            </p>
          </div>
          <div className="flex-1">
            <CalWidget url="robyn-downie-g5eqxl/30min" />
          </div>
        </div>

        <div className="border-b-2 border-border my-8 lg:hidden"></div>

        <div className="flex flex-col">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Need More Time?</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Fill out this form and I'll get back to you to schedule a custom session.
            </p>
          </div>
          <Card className="bg-transparent border-0 shadow-none flex-1">
            <CardContent className="p-0">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" suppressHydrationWarning>
            <div className="grid grid-cols-1 gap-4" suppressHydrationWarning>
              <div className="space-y-2" suppressHydrationWarning>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...register('name')}
                  className={errors.name ? 'border-red-500' : ''}
                  suppressHydrationWarning
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2" suppressHydrationWarning>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register('email')}
                  className={errors.email ? 'border-red-500' : ''}
                  suppressHydrationWarning
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2" suppressHydrationWarning>
              <Label htmlFor="duration">Desired Duration</Label>
              <Input
                id="duration"
                placeholder="e.g., 1 hour, 90 minutes"
                {...register('duration')}
                className={errors.duration ? 'border-red-500' : ''}
                suppressHydrationWarning
              />
              {errors.duration && (
                <p className="text-sm text-red-500">{errors.duration.message}</p>
              )}
            </div>

            <div className="space-y-2" suppressHydrationWarning>
              <Label htmlFor="purpose">Purpose of Meeting</Label>
              <textarea
                id="purpose"
                rows={4}
                placeholder="Please describe what you'd like to discuss and why you need a longer session..."
                {...register('purpose')}
                className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
                  errors.purpose ? 'border-red-500' : ''
                }`}
                suppressHydrationWarning
              />
              {errors.purpose && (
                <p className="text-sm text-red-500">{errors.purpose.message}</p>
              )}
            </div>

            <div className="flex justify-center lg:justify-start">
              <Button type="submit" disabled={isSubmitting} className="w-full lg:w-auto">
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
        </div>
      </div>
    </div>
  );
}
