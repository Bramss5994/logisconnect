import jsPDF from "jspdf";

// Logo as base64 SVG data (Home icon from Lucide)
const createLogoSVG = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1A4D8F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`;
  return "data:image/svg+xml;base64," + btoa(svg);
};

export const generateCommercialPDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  
  // Colors
  const primaryColor: [number, number, number] = [26, 77, 143]; // #1A4D8F
  const successColor: [number, number, number] = [46, 204, 113]; // #2ECC71
  const textColor: [number, number, number] = [51, 51, 51];
  const mutedColor: [number, number, number] = [128, 128, 128];

  let yPos = margin;

  const addNewPage = () => {
    doc.addPage();
    yPos = margin;
  };

  const checkPageBreak = (height: number) => {
    if (yPos + height > pageHeight - margin) {
      addNewPage();
      return true;
    }
    return false;
  };

  // ==================== PAGE 1: COVER ====================
  // Header bar
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 60, "F");

  // Logo placeholder (Home icon representation)
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(1.5);
  doc.line(margin + 5, 25, margin + 15, 15);
  doc.line(margin + 15, 15, margin + 25, 25);
  doc.rect(margin + 8, 25, 14, 15);
  doc.rect(margin + 12, 30, 6, 10);

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.text("LogisConnect", margin + 35, 30);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Simplifier. Automatiser. Satisfaire.", margin + 35, 40);

  // Main title
  yPos = 100;
  doc.setTextColor(...primaryColor);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text("Plaquette Commerciale", pageWidth / 2, yPos, { align: "center" });

  yPos += 20;
  doc.setFontSize(16);
  doc.setTextColor(...textColor);
  doc.setFont("helvetica", "normal");
  doc.text("La plateforme intelligente de gestion", pageWidth / 2, yPos, { align: "center" });
  yPos += 8;
  doc.text("des demandes locataires", pageWidth / 2, yPos, { align: "center" });

  // Key metrics box
  yPos += 40;
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(margin, yPos, contentWidth, 50, 5, 5, "F");
  
  const metricsY = yPos + 20;
  const metricsData = [
    { value: "-40%", label: "d'appels" },
    { value: "-30%", label: "de délais" },
    { value: "+25%", label: "satisfaction" },
    { value: "48h", label: "déploiement" }
  ];
  
  const metricWidth = contentWidth / 4;
  metricsData.forEach((metric, i) => {
    const x = margin + metricWidth * i + metricWidth / 2;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(...primaryColor);
    doc.text(metric.value, x, metricsY, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...mutedColor);
    doc.text(metric.label, x, metricsY + 10, { align: "center" });
  });

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(...mutedColor);
  doc.text("Solution conforme logement social | Hébergé en France 🇫🇷", pageWidth / 2, pageHeight - 20, { align: "center" });

  // ==================== PAGE 2: VISION & PROBLÈME ====================
  addNewPage();
  
  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 15, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("LogisConnect | Plaquette Commerciale", margin, 10);
  
  yPos = 30;
  doc.setTextColor(...primaryColor);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Notre Vision", margin, yPos);
  
  yPos += 15;
  doc.setTextColor(...textColor);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const visionText = "Transformer la gestion locative grâce à l'intelligence artificielle au service des bailleurs sociaux et de leurs locataires. Nous croyons que la technologie, bien utilisée, peut libérer du temps pour ce qui compte vraiment : la relation humaine.";
  const visionLines = doc.splitTextToSize(visionText, contentWidth);
  doc.text(visionLines, margin, yPos);
  
  yPos += visionLines.length * 6 + 20;
  
  // Le problème
  doc.setTextColor(...primaryColor);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Le Problème", margin, yPos);
  
  yPos += 15;
  doc.setTextColor(...textColor);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  
  const problems = [
    "📞 Appels téléphoniques répétitifs et chronophages",
    "⏱️ Qualification manuelle lente et sujette aux erreurs",
    "📋 Affectation des prestataires au cas par cas",
    "📊 Suivi Excel ou papier difficile à maintenir",
    "🔔 Relances manuelles souvent oubliées",
    "📝 Reporting fastidieux et incomplet",
    "📁 Historique fragmenté et non auditable"
  ];
  
  problems.forEach((problem) => {
    doc.text(problem, margin + 5, yPos);
    yPos += 8;
  });
  
  yPos += 15;
  
  // La solution
  doc.setTextColor(...primaryColor);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("La Solution LogisConnect", margin, yPos);
  
  yPos += 15;
  doc.setTextColor(...textColor);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  
  const solutions = [
    "✅ Déclaration multicanal 24/7 (WhatsApp, SMS, Web)",
    "✅ Qualification IA automatique en 10 secondes",
    "✅ Assignation intelligente des prestataires",
    "✅ Suivi centralisé en temps réel",
    "✅ Relances automatiques programmées",
    "✅ Reporting automatique quotidien",
    "✅ Traçabilité complète et auditée"
  ];
  
  solutions.forEach((solution) => {
    doc.text(solution, margin + 5, yPos);
    yPos += 8;
  });

  // ==================== PAGE 3: FONCTIONNALITÉS ====================
  addNewPage();
  
  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 15, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("LogisConnect | Plaquette Commerciale", margin, 10);
  
  yPos = 30;
  doc.setTextColor(...primaryColor);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Fonctionnalités Détaillées", margin, yPos);
  
  yPos += 20;
  
  const features = [
    {
      title: "🏠 Portail Locataire",
      items: ["Déclaration via WhatsApp, SMS ou formulaire web", "Suivi en temps réel avec numéro de tracking", "Notifications automatiques à chaque étape"]
    },
    {
      title: "🤖 Intelligence Artificielle",
      items: ["Qualification automatique des demandes", "Détection du type de problème et de l'urgence", "Suggestions de catégorisation pour validation"]
    },
    {
      title: "🔧 Gestion Prestataires",
      items: ["Assignation automatique par zone et compétence", "Suivi des interventions et délais", "Historique des prestataires par logement"]
    },
    {
      title: "📊 Tableau de Bord",
      items: ["Vue d'ensemble des demandes en cours", "Indicateurs de performance en temps réel", "Alertes sur les demandes en retard"]
    },
    {
      title: "📈 Reporting",
      items: ["Rapports automatiques quotidiens/hebdomadaires", "Export CSV pour vos outils internes", "Statistiques par quartier, type, prestataire"]
    },
    {
      title: "🔗 Intégrations",
      items: ["API REST documentée", "Export vers Aareon, ULIS, IKOS, Imowell", "Webhooks en temps réel"]
    }
  ];
  
  features.forEach((feature) => {
    checkPageBreak(40);
    doc.setTextColor(...primaryColor);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(feature.title, margin, yPos);
    yPos += 8;
    
    doc.setTextColor(...textColor);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    feature.items.forEach((item) => {
      doc.text("• " + item, margin + 5, yPos);
      yPos += 6;
    });
    yPos += 8;
  });

  // ==================== PAGE 4: ROI & TARIFS ====================
  addNewPage();
  
  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 15, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("LogisConnect | Plaquette Commerciale", margin, 10);
  
  yPos = 30;
  doc.setTextColor(...primaryColor);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Retour sur Investissement", margin, yPos);
  
  yPos += 20;
  
  // ROI Example
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(margin, yPos, contentWidth, 60, 5, 5, "F");
  
  doc.setTextColor(...textColor);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Exemple : Bailleur de 5 000 logements", margin + 10, yPos + 12);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const roiItems = [
    "500 demandes/mois × 8 min économisées = 67 heures/mois",
    "Coût horaire chargé : 35€ → Économie mensuelle : 2 333€",
    "Économie annuelle estimée : 28 000€",
    "ROI atteint en 6 mois"
  ];
  let roiY = yPos + 22;
  roiItems.forEach((item) => {
    doc.text("• " + item, margin + 10, roiY);
    roiY += 8;
  });
  
  yPos += 75;
  
  // Tarifs
  doc.setTextColor(...primaryColor);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Tarification", margin, yPos);
  
  yPos += 15;
  
  const plans = [
    { name: "Starter", price: "299€/mois", desc: "Jusqu'à 1 000 logements", features: ["Portail locataire", "Qualification IA", "Tableau de bord", "Support email"] },
    { name: "Pro", price: "599€/mois", desc: "Jusqu'à 5 000 logements", features: ["Tout Starter +", "Gestion prestataires", "Reporting avancé", "API REST", "Support prioritaire"] },
    { name: "Enterprise", price: "Sur mesure", desc: "Plus de 5 000 logements", features: ["Tout Pro +", "Connecteurs ERP", "SLA personnalisé", "Account manager dédié"] }
  ];
  
  const planWidth = contentWidth / 3 - 5;
  plans.forEach((plan, i) => {
    const planX = margin + i * (planWidth + 7);
    
    // Box
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(200, 200, 200);
    doc.roundedRect(planX, yPos, planWidth, 70, 3, 3, "FD");
    
    // Plan name
    doc.setTextColor(...primaryColor);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(plan.name, planX + planWidth / 2, yPos + 12, { align: "center" });
    
    // Price
    doc.setFontSize(14);
    doc.text(plan.price, planX + planWidth / 2, yPos + 25, { align: "center" });
    
    // Description
    doc.setTextColor(...mutedColor);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(plan.desc, planX + planWidth / 2, yPos + 33, { align: "center" });
    
    // Features
    doc.setTextColor(...textColor);
    doc.setFontSize(7);
    let featureY = yPos + 42;
    plan.features.forEach((f) => {
      doc.text("✓ " + f, planX + 5, featureY);
      featureY += 6;
    });
  });

  // ==================== PAGE 5: SÉCURITÉ & DÉPLOIEMENT ====================
  addNewPage();
  
  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 15, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("LogisConnect | Plaquette Commerciale", margin, 10);
  
  yPos = 30;
  doc.setTextColor(...primaryColor);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Sécurité & Conformité", margin, yPos);
  
  yPos += 15;
  doc.setTextColor(...textColor);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  
  const securityItems = [
    "🔒 Chiffrement AES-256 des données au repos",
    "🔐 TLS 1.3 pour les données en transit",
    "🇫🇷 Hébergement 100% en France",
    "📋 Conformité RGPD complète",
    "💾 Sauvegardes quotidiennes avec rétention 30 jours",
    "📝 Journalisation complète pour audit",
    "🤖 Agents IA supervisés par des experts",
    "👤 DPO désigné"
  ];
  
  securityItems.forEach((item) => {
    doc.text(item, margin + 5, yPos);
    yPos += 8;
  });
  
  yPos += 15;
  
  // Architecture
  doc.setTextColor(...primaryColor);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Architecture & Fiabilité", margin, yPos);
  
  yPos += 15;
  doc.setTextColor(...textColor);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  
  const archItems = [
    "⚡ SLA de disponibilité : 99,5%",
    "🔄 Fallback automatique si l'IA doute",
    "📊 Monitoring temps réel 24/7",
    "🛡️ Mode dégradé en cas d'incident",
    "⏱️ Objectif de reprise : 15 minutes",
    "📈 Scalabilité automatique"
  ];
  
  archItems.forEach((item) => {
    doc.text(item, margin + 5, yPos);
    yPos += 8;
  });
  
  yPos += 15;
  
  // Déploiement
  doc.setTextColor(...primaryColor);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Déploiement en 48h", margin, yPos);
  
  yPos += 15;
  doc.setTextColor(...textColor);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  
  const deploySteps = [
    "1️⃣ Configuration personnalisée (2h)",
    "2️⃣ Import des données existantes (optionnel)",
    "3️⃣ Formation des équipes (2h)",
    "4️⃣ Mise en production",
    "5️⃣ Accompagnement post-déploiement"
  ];
  
  deploySteps.forEach((step) => {
    doc.text(step, margin + 5, yPos);
    yPos += 8;
  });

  // ==================== PAGE 6: CONTACT ====================
  addNewPage();
  
  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 15, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("LogisConnect | Plaquette Commerciale", margin, 10);
  
  // Logo area
  yPos = 60;
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(2);
  doc.line(pageWidth / 2 - 15, yPos, pageWidth / 2, yPos - 15);
  doc.line(pageWidth / 2, yPos - 15, pageWidth / 2 + 15, yPos);
  doc.rect(pageWidth / 2 - 10, yPos, 20, 20);
  doc.rect(pageWidth / 2 - 5, yPos + 8, 10, 12);
  
  yPos = 100;
  doc.setTextColor(...primaryColor);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text("LogisConnect", pageWidth / 2, yPos, { align: "center" });
  
  yPos += 10;
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...mutedColor);
  doc.text("Simplifier. Automatiser. Satisfaire.", pageWidth / 2, yPos, { align: "center" });
  
  yPos += 30;
  doc.setTextColor(...primaryColor);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Contactez-nous", pageWidth / 2, yPos, { align: "center" });
  
  yPos += 20;
  doc.setTextColor(...textColor);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  
  const contactInfo = [
    "📧 contact@logisconnect.fr",
    "📞 01 23 45 67 89",
    "🌐 www.logisconnect.fr",
    "",
    "📍 Paris, France"
  ];
  
  contactInfo.forEach((info) => {
    doc.text(info, pageWidth / 2, yPos, { align: "center" });
    yPos += 10;
  });
  
  yPos += 20;
  
  // CTA Box
  doc.setFillColor(...successColor);
  doc.roundedRect(margin + 20, yPos, contentWidth - 40, 40, 5, 5, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Demandez votre démonstration gratuite", pageWidth / 2, yPos + 18, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("30 minutes • Sans engagement • Personnalisée", pageWidth / 2, yPos + 30, { align: "center" });
  
  // Footer
  doc.setTextColor(...mutedColor);
  doc.setFontSize(9);
  doc.text("© 2025 LogisConnect - Tous droits réservés | Solution conforme logement social", pageWidth / 2, pageHeight - 15, { align: "center" });

  // Save
  doc.save("LogisConnect-Plaquette-Commerciale.pdf");
};

export default generateCommercialPDF;
