import { visit } from 'unist-util-visit';

/**
 * Custom remark plugin to handle Pokemon emote links
 * Transforms links with |{emote-name} syntax into links with special CSS classes
 * Example: [text](url|{heart-1}) -> <a href="url" class="pikachu-heart-1">text</a>
 */
export default function remarkEmoteLinks() {
  return (/** @type {any} */ tree) => {
    visit(tree, 'link', (/** @type {any} */ node) => {
      const href = node.url || '';
      const emoteSeparator = '|{';
      const emoteEndChar = '}';
      
      // Check if this link has emote syntax
      const emoteIndex = href.indexOf(emoteSeparator);
      if (emoteIndex > -1 && href.endsWith(emoteEndChar)) {
        // Extract the base URL and emote name
        const baseUrl = href.slice(0, emoteIndex);
        const emoteRaw = href.slice(emoteIndex + emoteSeparator.length, -1);
        const emoteName = emoteRaw.replace(/[{}]/g, '');
        
        // Update the URL to remove emote syntax
        node.url = baseUrl;
        
        // Add the emote class via hProperties
        node.data = node.data || {};
        node.data.hProperties = node.data.hProperties || {};
        
        // Get existing classes if any
        const existingClass = node.data.hProperties.class || 
                            node.data.hProperties.className || 
                            '';
        
        // Combine with new emote class
        const classes = new Set(
          String(existingClass)
            .split(/\s+/)
            .filter(Boolean)
        );
        classes.add(`pikachu-${emoteName}`);
        
        // Set the combined classes
        node.data.hProperties.class = Array.from(classes).join(' ');
      }
    });
  };
}