class TextFormatter {
  public static cleanString(text: string) {
    const regex = new RegExp("[']", 'g');
    return text.replaceAll(regex, "");
  }

  public static capitalizeFirstLetter(text: string) {
    return text.replace(/^\w/, (c) => c.toUpperCase());
  }

  public static boldWord(text: string, regex: RegExp | string) {
    try {
      return text.replaceAll(regex, "<b>$&</b>");
    } catch {
      return text;
    }
  }
}

export { TextFormatter };
