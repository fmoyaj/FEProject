class QueryFormatter {
  public static normalizeQuery(query: string) {
    let normalizedQuery = query;
    normalizedQuery = query.replaceAll(/(and)/ig, "AND");
    normalizedQuery = normalizedQuery.replaceAll(/(or)/ig, "AND");
    normalizedQuery = normalizedQuery.replaceAll(/\s+/g, " ");
    normalizedQuery = normalizedQuery.replaceAll(/[^a-zA-Z()\s+]/g, '');

    return normalizedQuery;
  }

  private isValidParenthesis(query: string) {
    const stack = [];

    for (let i = 0; i < query.length; i++) {
      let char = query[i];

      if (char === "(") {
        stack.push(char);
      } else if (char === ")") {
        stack.pop();
      }
    }

    return stack.length === 0;
  }

  public static getQueryKeywords = (userQuery: string) => {
    const normalizedQuery = QueryFormatter.normalizeQuery(userQuery);
    const operators = /(AND)|(OR)|[()]/g;
    const whitespaces = / +/;
    return Array.from(new Set(normalizedQuery.replaceAll(operators, "").trim().split(whitespaces)));
  }
}

export { QueryFormatter };
