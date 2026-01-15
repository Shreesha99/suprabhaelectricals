type FAQ = {
  keywords: string[];
  answer: string;
};

const FAQS: FAQ[] = [
  {
    keywords: ["services", "what do you do", "work", "offer"],
    answer:
      "We are a Government Licensed Class 1 Electrical Contractor providing HT & LT electrical works up to 33KV, DG sets, panels, transformers, cable laying, earthing, and annual maintenance for government and institutional projects.",
  },
  {
    keywords: ["government", "psu", "tender", "public"],
    answer:
      "We specialize exclusively in government, PSU, and institutional electrical projects across Karnataka, including public infrastructure and statutory works.",
  },
  {
    keywords: ["experience", "years", "how long"],
    answer:
      "Suprabha Electricals has over 25 years of experience executing compliant and large-scale electrical infrastructure projects.",
  },
  {
    keywords: ["license", "licensed", "approval"],
    answer:
      "We are a Government Licensed Class 1 Electrical Contractor and hold a Super Grade Electrical License, enabling us to execute high-value and critical infrastructure projects.",
  },
  {
    keywords: ["contact", "reach", "phone", "email"],
    answer:
      "You can contact us via the Contact section on this website for enquiries, tenders, or consultations.",
  },
  {
    keywords: ["location", "where", "karnataka"],
    answer:
      "We operate across Karnataka and undertake electrical infrastructure projects throughout the state.",
  },
];

export function getSmartReply(query: string): string {
  const normalized = query.toLowerCase();

  for (const faq of FAQS) {
    if (faq.keywords.some((k) => normalized.includes(k))) {
      return faq.answer;
    }
  }

  return "I can help with information about our services, experience, licenses, or contact details. Please try asking in a different way.";
}
