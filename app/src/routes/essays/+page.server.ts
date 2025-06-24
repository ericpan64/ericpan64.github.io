import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

export async function load() {
    const essaysDirectory = join(process.cwd(), 'static', 'writing', 'essays');
    
    try {
        const files = await readdir(essaysDirectory);
        
        // Filter for markdown files (exclude _.md)
        const essayFiles = files
            .filter((file: string) => file.endsWith('.md') && file !== '_.md')
            .sort((a: string, b: string) => b.localeCompare(a)); // Sort in reverse chronological order
        
        // Extract metadata from filenames
        const essays = essayFiles.map((file: string) => {
            const filename = file.replace('.md', '');
            const parts = filename.split('_');
            
            // Parse date from filename (e.g., "2024-10" -> "October 2024")
            let displayDate = '';
            if (parts[0] && parts[0].includes('-')) {
                const [year, month] = parts[0].split('-');
                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                                  'July', 'August', 'September', 'October', 'November', 'December'];
                displayDate = `${monthNames[parseInt(month) - 1]} ${year}`;
            }
            
            // Extract title from filename (everything after date)
            const title = parts.slice(1).join('_').replace(/-/g, ' ');
            
            return {
                filename,
                displayDate,
                title,
                href: `/essays/${filename}`
            };
        });
        
        return {
            essays
        };
    } catch (error) {
        console.error('Error reading essays directory:', error);
        return {
            essays: []
        };
    }
}