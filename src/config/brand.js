// Central brand configuration.
// Change these values to re-brand the whole app in one place — the name,
// tagline, footer, and contact details below are used across every page.
const BRAND = {
  name: "Company X",
  legalName: "Company X Inc.",
  tagline: "Employee Referral Program",

  // Used on the Contact page (all placeholder values — edit freely)
  contact: {
    addressLines: ["123 Business Avenue", "Suite 100", "Your City, 0000"],
    phones: ["+00 000 000 0000", "+00 000 000 0001"],
    email: "hello@companyx.example",
    links: ["www.companyx.example", "careers.companyx.example"]
  },

  // Short blurb shown on the "About <company>" page
  about: [
    "Company X is a modern company focused on building great products and " +
      "growing great teams. This page is a placeholder — replace it with your " +
      "own company story.",
    "We believe the best talent often comes from the people our employees " +
      "already know, which is why our referral program rewards you for helping " +
      "us find the right candidates.",
    "Update this copy in src/config/brand.js to match your organization."
  ]
};

export default BRAND;
