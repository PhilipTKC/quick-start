export function convertToTitleCase(string: string) {
    // Replace all hyphens with spaces
    string = string.replace(/-/g, ' ');

    // Convert the string to title case
    string = string.replace(/\w\S*/g, function (word) {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });

    return string;
}

export function extractIdFromPath(url: string) {
    const regex = /^https?:\/\/[^/]+\/([^/]+)\/.*$/;

    return url.match(regex)[1];
}