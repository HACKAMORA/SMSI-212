import type { Control } from "@/lib/types";

export const CONTROLS_PEOPLE: Control[] = [
  {
    id: "6.1",
    domain: "personnes",
    title: "Sélection à l'embauche",
    question:
      "Avant d'accéder à des données sensibles, les candidats (et prestataires long terme) font-ils l'objet de vérifications proportionnées et légales ?",
    explanation:
      "Identité, références, parfois casier selon le poste et le droit du travail. Ce n'est pas du fichage : c'est proportionné au risque, documenté, conforme au droit marocain.",
    whyItMatters:
      "Les clients BPO (banque, santé, retail UE) exigent souvent un screening. Mal fait = faille RH et risque prud'homal.",
    howToStart:
      "Grille par type de poste. Conservez les preuves le temps nécessaire, pas plus. Alignez-vous sur le Code du travail et la 09-08.",
    criticality: 4,
    ease: 3,
    templates: ["proc-onboarding", "reg-legal"],
    dnssi: [{ code: "RH-01", title: "Vérifications préalables à l'embauche" }],
  },
  {
    id: "6.2",
    domain: "personnes",
    title: "Termes et conditions d'emploi",
    question:
      "Le contrat (ou avenant) fixe-t-il les devoirs de sécurité et de confidentialité, y compris après le départ ?",
    explanation:
      "Les obligations SSI doivent être opposables : charte, NDA, usage des outils, signalement, sanctions. Pas seulement un règlement intérieur vague.",
    whyItMatters:
      "Sans clause, difficile de réagir à une fuite volontaire ou à un départ avec un export CRM.",
    howToStart:
      "Avenant type + charte annexée. Faites signer les anciens au prochain cycle d'entretien.",
    criticality: 5,
    ease: 5,
    templates: ["clause-nda", "charte-utilisateur"],
    dnssi: [{ code: "RH-02", title: "Clauses contractuelles de sécurité" }],
  },
  {
    id: "6.3",
    domain: "personnes",
    title: "Sensibilisation, formation et éducation",
    question:
      "Tout le monde (y compris les nouveaux et les prestataires présents) reçoit-il une sensibilisation adaptée, avec preuve de suivi ?",
    explanation:
      "Accueil J0, rappel annuel, modules ciblés (phishing pour tous, admin pour l'IT, privacy pour les superviseurs). On mesure la participation.",
    whyItMatters:
      "Le phishing reste le vecteur n°1 en centre de contacts. L'auditeur demandera les feuilles d'émargement ou logs LMS.",
    howToStart:
      "Module 30 min à l'arrivée + campagne phishing trimestrielle + 1 h annuelle. Tracez les absents.",
    criticality: 5,
    ease: 4,
    templates: ["charte-utilisateur", "proc-onboarding"],
    dnssi: [{ code: "RH-03", title: "Sensibilisation et formation SSI" }],
  },
  {
    id: "6.4",
    domain: "personnes",
    title: "Processus disciplinaire",
    question:
      "Les manquements sécurité (partage de mot de passe, USB interdit, fuite) ont-ils une réponse disciplinaire connue, graduée, appliquée équitablement ?",
    explanation:
      "Sans barème, la charte n'est pas crédible. Le processus doit être RH, pas « le DSI qui punit ».",
    whyItMatters:
      "Un agent sanctionné au feeling crée un conflit. Un cadre jamais sanctionné pour le même fait détruit la culture.",
    howToStart:
      "Échelle : rappel / avertissement / mise à pied / licenciement, validée RH + juridique. Citez-la dans la charte.",
    criticality: 3,
    ease: 4,
    templates: ["charte-utilisateur"],
    dnssi: [{ code: "RH-04", title: "Sanctions et processus disciplinaire" }],
  },
  {
    id: "6.5",
    domain: "personnes",
    title: "Responsabilités après la fin ou le changement d'emploi",
    question:
      "Départ, mobilité interne, fin de mission : les accès tombent-ils le jour J, et la personne sait-elle ce qui reste confidentiel ?",
    explanation:
      "Rappel des obligations post-contrat + révocation technique + récupération des matériels. La mobilité interne est souvent oubliée.",
    whyItMatters:
      "Un commercial devenu chef de projet qui garde l'export Salesforce de l'ancienne équipe : trou fréquent.",
    howToStart:
      "Le ticket de départ / mobilité déclenche IT le même jour. Mail type « vos obligations continuent ».",
    criticality: 5,
    ease: 4,
    templates: ["proc-onboarding", "clause-nda"],
    dnssi: [{ code: "RH-05", title: "Gestion des départs et mobilités" }],
  },
  {
    id: "6.6",
    domain: "personnes",
    title: "Accords de confidentialité ou de non-divulgation",
    question:
      "Collaborateurs, stagiaires, prestataires et visiteurs longue durée ont-ils un NDA adapté, signé, archivé ?",
    explanation:
      "Le NDA couvre l'oral, le papier, le numérique, et dure après la mission. Les prestataires au forfait l'oublient souvent.",
    whyItMatters:
      "Clients banque / assurance / santé exigent la preuve de NDA sur toute la chaîne, y compris le ménage IT et les freelances.",
    howToStart:
      "NDA court (2 pages) + registre des signatures. NDA prestataire dans le contrat cadre.",
    criticality: 4,
    ease: 5,
    templates: ["clause-nda"],
    dnssi: [{ code: "RH-06", title: "Accords de confidentialité" }],
  },
  {
    id: "6.7",
    domain: "personnes",
    title: "Télétravail",
    question:
      "Le travail hors site (domicile, client, hôtel, coworking) a-t-il des règles : VPN, poste géré, pièce, interdiction des réseaux publics non protégés ?",
    explanation:
      "Le télétravail est un périmètre, pas une exception. On définit qui a le droit, avec quel matériel, quelles données, quel contrôle.",
    whyItMatters:
      "Beaucoup de clients BPO interdisent le home office sur leur file. D'autres l'autorisent sous conditions strictes. Il faut que ce soit écrit.",
    howToStart:
      "Politique télétravail 2 pages + VPN + écran verrouillé + interdiction café/wifi ouvert pour les données client.",
    criticality: 4,
    ease: 4,
    templates: ["charte-utilisateur", "pol-acces"],
    dnssi: [{ code: "RH-07", title: "Sécurité du télétravail" }],
  },
  {
    id: "6.8",
    domain: "personnes",
    title: "Signalement des événements de sécurité",
    question:
      "Chacun sait-il comment et à qui signaler un doute (mail bizarre, badge perdu, écran ouvert), sans crainte d'être blâmé ?",
    explanation:
      "Un canal simple (mail, chat, responsable) + encouragement. Le non-signalement est plus dangereux que le faux positif.",
    whyItMatters:
      "En plateau, la peur du superviseur fait taire les erreurs. L'ISO veut un canal connu et utilisé (preuves : tickets).",
    howToStart:
      "Affiche + signature charte + 1 exemple par mois dans le brief d'équipe. Temps de réponse affiché (ex. 1 h ouvrée).",
    criticality: 4,
    ease: 5,
    templates: ["proc-incidents", "charte-utilisateur"],
    dnssi: [{ code: "INC-01", title: "Signalement des événements SSI" }],
  },
];
