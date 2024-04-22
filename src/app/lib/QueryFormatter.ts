class QueryFormatter {
  public static normalizeQuery(query: string) {
    let normalizedQuery = query;
    normalizedQuery = query.replaceAll(/(and)/ig, "AND");
    normalizedQuery = normalizedQuery.replaceAll(/(or)/ig, "OR");
    normalizedQuery = normalizedQuery.replaceAll(/\s+/g, " ");
    normalizedQuery = normalizedQuery.replaceAll(/[^a-zA-Z()\s+]/g, '');

    return normalizedQuery;
  }

  private static getQueryKeywords(query: string) {
    const operators = /(AND)|(OR)|[()]/g;
    const whitespaces = / +/;
    return Array.from(new Set(query.replaceAll(operators, "").trim().split(whitespaces)));
  }

  public static normalizeAndGetQueryKeywords(query: string): { normalizedQuery: string, keywords: string[] } {
    const normalizedQuery = QueryFormatter.normalizeQuery(query);
    const keywords = this.getQueryKeywords(normalizedQuery);

    return { normalizedQuery, keywords };
  }
}

export { QueryFormatter };
