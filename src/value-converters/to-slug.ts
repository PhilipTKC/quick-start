export class ToSlugValueConverter {
    private static readonly regex = /[^\w\s-]/g;
    private static readonly removeExtraSpaces = /\s+/g;
    private static readonly replaceWithDash = /[-\s]+/g;
    private static readonly unicodeEscapeRegex = /&#x[\dA-Fa-f]+;/g;
  
    public toView(string: string): string {
      const decodedText = this.decodeHtmlEntities(string);
      const sanitizedText = decodedText.replace(ToSlugValueConverter.unicodeEscapeRegex, '').trim().toLowerCase().replace(ToSlugValueConverter.regex, '').replace(ToSlugValueConverter.removeExtraSpaces, ' ').replace(ToSlugValueConverter.replaceWithDash, '-');
      return sanitizedText;
    }
  
    private decodeHtmlEntities(text: string): string {
      const tempEl = document.createElement('div');
      tempEl.innerHTML = text;
      return tempEl.textContent ?? '';
    }
  }