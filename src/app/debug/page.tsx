export default function DebugPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Environment Variables Debug</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Environment Variables:</h2>
        <ul className="space-y-2">
          <li>
            <strong>NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN:</strong> 
            {process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN ? '✅ Set' : '❌ Not Set'}
          </li>
          <li>
            <strong>NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN:</strong> 
            {process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN ? '✅ Set' : '❌ Not Set'}
          </li>
          <li>
            <strong>STORYBLOK_SPACE_ID:</strong> 
            {process.env.STORYBLOK_SPACE_ID || '❌ Not Set'}
          </li>
          <li>
            <strong>STORYBLOK_REGION:</strong> 
            {process.env.STORYBLOK_REGION || '❌ Not Set'}
          </li>
        </ul>
        
        <h2 className="text-xl font-semibold mb-4 mt-8">Test API Call:</h2>
        <div className="bg-gray-50 p-4 rounded">
          <p>API URL: https://api.storyblok.com/v2/cdn/stories/home?token={process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN}&version=published</p>
        </div>
      </div>
    </div>
  );
}
