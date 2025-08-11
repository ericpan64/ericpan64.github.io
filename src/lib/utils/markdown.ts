/**
 * Markdown utility functions for content processing
 */

export interface Heading {
  level: number;
  text: string;
  id: string;
}

export interface MarkdownMetadata {
  title?: string;
  date?: string;
  description?: string;
  tags?: string[];
  [key: string]: any;
}

/**
 * Extract headings from HTML content for table of contents
 */
export function collectHeadings(html: string): Heading[] {
  const headings: Heading[] = [];
  const regex = /<h([1-6])\s+id="([^"]+)"[^>]*>([^<]+)<\/h[1-6]>/gi;
  
  let match;
  while ((match = regex.exec(html)) !== null) {
    headings.push({
      level: parseInt(match[1], 10),
      id: match[2],
      text: match[3].trim()
    });
  }
  
  return headings;
}

/**
 * Generate ID from heading text
 */
export function headingToId(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

/**
 * Extract front matter from markdown content
 * (For future mdsvex integration)
 */
export function extractFrontMatter(markdown: string): {
  metadata: MarkdownMetadata;
  content: string;
} {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = markdown.match(frontMatterRegex);
  
  if (!match) {
    return { metadata: {}, content: markdown };
  }
  
  const frontMatter = match[1];
  const content = markdown.slice(match[0].length);
  
  // Simple YAML parsing (for basic key-value pairs)
  const metadata: MarkdownMetadata = {};
  const lines = frontMatter.split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      
      // Remove quotes if present
      const cleanValue = value.replace(/^["'](.*)["']$/, '$1');
      
      // Handle arrays (simple comma-separated)
      if (key === 'tags' && cleanValue.includes(',')) {
        metadata[key] = cleanValue.split(',').map(tag => tag.trim());
      } else {
        metadata[key] = cleanValue;
      }
    }
  }
  
  return { metadata, content };
}

/**
 * Process markdown links for emotes (Pokemon-style)
 */
export function processEmoteLinks(markdown: string): string {
  // Process links with emote syntax: [text](url|{emote-name})
  return markdown.replace(
    /\[([^\]]+)\]\(([^)]+)\|{([^}]+)}\)/g,
    (match, text, url, emote) => {
      return `[${text}](${url}|{${emote}})`;
    }
  );
}