import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect root to /home for StoryBlok integration
  redirect('/home');
}

export const dynamic = 'force-dynamic';
