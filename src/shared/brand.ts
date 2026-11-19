import logoPngUrl from "../assets/gdp-logo.png";

/**
 * Branding shared by the login and account themes.
 * Mirrors the gdhr-gdp-web frontend: logo, Khmer system name (vertical nav header)
 * and the footer copyright line.
 */
export const brand = {
    logoUrl: logoPngUrl,
    systemNameLines: ["ប្រព័ន្ធគ្រប់គ្រងទិន្នន័យ", "មន្ត្រីពន្ធនាគារ"],
    copyright: "©រក្សាសិទ្ធគ្រប់យ៉ាងដោយអគ្គនាយកដ្ឋានធនធានមនុស្ស"
} as const;
