import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('🔍 API endpoint called - fetching StoryBlok content');
    
    const response = await fetch(
      `https://api.storyblok.com/v2/cdn/stories/home?token=${process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN}&version=published&resolve_relations=featured_projects,featured_posts,featured_tools`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`StoryBlok API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ StoryBlok API call successful:', data.story?.name);

    return NextResponse.json({
      success: true,
      data: data,
      status: 'success'
    });
  } catch (error) {
    console.error('❌ API endpoint error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 'error'
    }, { status: 500 });
  }
}
