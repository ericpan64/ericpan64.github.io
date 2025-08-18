type EssayFrontmatter = {
    title: string;
    date?: string;        // YYYY-MM format
    displayDate?: string; // "August 2025"
    slug?: string;
    published?: boolean;
};

export async function load() {
    // Load .svx essays using import.meta.glob - try different patterns
    const svxModules = import.meta.glob('./**/*.svx', { eager: true }) as Record<
        string,
        { metadata?: EssayFrontmatter }
    >;

    const essays = Object.entries(svxModules)
        .map(([path, mod]) => {
            // Only process essays (paths should start with ./[slug]/+page.svx)
            const slugMatch = path.match(/^\.\/([^/]+)\/\+page\.svx$/);
            if (!slugMatch) return null;
            
            const slug = slugMatch[1];
            const m = (mod?.metadata || {}) as EssayFrontmatter;
            
            if (!m.title) return null;

            // Use provided displayDate or compute from date
            let displayDate = m.displayDate;
            if (!displayDate && m.date) {
                const [year, month] = m.date.split('-');
                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                                  'July', 'August', 'September', 'October', 'November', 'December'];
                displayDate = `${monthNames[parseInt(month) - 1]} ${year}`;
            }

            return {
                filename: slug,
                displayDate: displayDate || '',
                title: m.title,
                href: `/essays/${slug}`,
                published: m.published !== false
            };
        })
        .filter(Boolean)
        .filter((e) => (e as any).published)
        .sort((a: any, b: any) => b.filename.localeCompare(a.filename));
    
    return {
        essays
    };
}