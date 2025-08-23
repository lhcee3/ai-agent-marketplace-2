export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  
  // Simple SVG placeholder based on agent type
  const colors = {
    chatbot: { bg: '#3B82F6', accent: '#1D4ED8' },
    code: { bg: '#10B981', accent: '#059669' },
    creative: { bg: '#8B5CF6', accent: '#7C3AED' },
    data: { bg: '#F59E0B', accent: '#D97706' },
    marketing: { bg: '#EF4444', accent: '#DC2626' },
    sales: { bg: '#06B6D4', accent: '#0891B2' },
    research: { bg: '#84CC16', accent: '#65A30D' },
    devops: { bg: '#6366F1', accent: '#4F46E5' },
    finance: { bg: '#14B8A6', accent: '#0D9488' },
    language: { bg: '#F97316', accent: '#EA580C' },
    health: { bg: '#EC4899', accent: '#DB2777' },
    legal: { bg: '#6B7280', accent: '#4B5563' },
  };

  const icons = {
    chatbot: '💬',
    code: '💻', 
    creative: '✨',
    data: '📊',
    marketing: '📈',
    sales: '💼',
    research: '🔬',
    devops: '⚙️',
    finance: '💰',
    language: '🌍',
    health: '🏥',
    legal: '⚖️',
  };

  const color = colors[type as keyof typeof colors] || colors.chatbot;
  const icon = icons[type as keyof typeof icons] || icons.chatbot;

  const svg = `
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color.bg};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color.accent};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="300" height="300" fill="url(#grad)"/>
      <text x="150" y="150" font-family="Arial, sans-serif" font-size="64" text-anchor="middle" dominant-baseline="middle" fill="white">${icon}</text>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
