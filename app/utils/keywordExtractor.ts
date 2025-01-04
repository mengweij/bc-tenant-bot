export function extractKeywords(question: string): string[] {
    const stopWords = new Set([
        'what', 'when', 'where', 'which', 'who', 'whom', 'whose', 'why', 'how',
        'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
        'do', 'does', 'did', 'will', 'would', 'shall', 'should', 'may', 'might',
        'must', 'can', 'could', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on',
        'at', 'to', 'for', 'of', 'with', 'by',
        // frequently used words also not need to be highlighted
        'tenant', 'landlord', 'rent', 'rental', 'property', 'unit', 'building',
        'apartment', 'house', 'room', 'bc', 'british', 'columbia'
    ]);

    // special keywords (need to be matched exactly)
    // TODO: add more special terms
    const specialTerms = new Set([
        'security deposit', 'damage deposit', 'pet deposit',
        'notice period', 'eviction notice', 'rental agreement',
        'lease agreement', 'fixed term', 'month to month',
        'repair and maintenance', 'reasonable access'
    ]);

    const foundSpecialTerms = Array.from(specialTerms)
        .filter(term => question.toLowerCase().includes(term));

    const words = question.toLowerCase()
        .replace(/[^\w\s-]/g, ' ')  // clean up non-word characters (keep hyphens)
        .split(/\s+/)
        .filter(word => {
            if (word.length < 3) return false;
            if (stopWords.has(word)) return false;
            // clean up numbers (keep hyphenated numbers)
            if (/^\d+$/.test(word)) return false;
            return true;
        });

    const allKeywords = [...new Set([
        ...foundSpecialTerms,
        ...words
    ])];

    // sort by length, ensure longer phrases are processed first
    return allKeywords.sort((a, b) => b.length - a.length);
} 