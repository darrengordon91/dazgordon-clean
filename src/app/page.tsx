import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect root to home story
  redirect('/home');
}
