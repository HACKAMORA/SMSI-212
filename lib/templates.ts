export type Template = {
  id: string;
  title: string;
  kind: "politique" | "procedure" | "modele";
  summary: string;
  outline: string[];
};

export const TEMPLATES: Template[] = [
  {
    id: "pol-pssi",
    title: "Politique de sécurité de l'information (PSSI)",
    kind: "politique",
    summary:
      "Document cadre signé par la direction : objectifs, périmètre, rôles, revue annuelle.",
    outline: [
      "Objet, périmètre (sites, SI, prestataires), exclusions justifiées",
      "Engagement de la direction et objectifs mesurables",
      "Rôles : direction, RSSI (même à temps partiel), responsables métiers",
      "Références : ISO 27001:2022, DNSSI, Loi 09-08, contrats clients",
      "Revue annuelle et communication au personnel",
    ],
  },
  {
    id: "pol-acces",
    title: "Politique de contrôle d'accès",
    kind: "politique",
    summary:
      "Qui a droit à quoi, comment on crée / retire un compte, MFA, comptes à privilèges.",
    outline: [
      "Principe du moindre privilège et besoin d'en connaître",
      "Cycle de vie des identités (arrivée, mobilité, départ)",
      "MFA obligatoire pour VPN, admin, messagerie, cloud client",
      "Revue trimestrielle des droits (surtout les comptes partagés BPO)",
      "Comptes de service documentés, mots de passe dans un coffre",
    ],
  },
  {
    id: "pol-fournisseurs",
    title: "Politique sécurité des fournisseurs et du cloud",
    kind: "politique",
    summary:
      "Due diligence, clauses contractuelles, revue annuelle des sous-traitants.",
    outline: [
      "Classification des prestataires (critique / standard / ponctuel)",
      "Clauses : confidentialité, localisation des données, notification d'incident",
      "Registre des traitements sous-traités (Loi 09-08 / CNDP)",
      "Revue annuelle et plan de sortie (données rendues / détruites)",
    ],
  },
  {
    id: "pol-classif",
    title: "Politique de classification de l'information",
    kind: "politique",
    summary:
      "Public / Interne / Confidentiel / Secret — et les règles d'usage associées.",
    outline: [
      "Niveaux et exemples métier (fiches clients, enregistrements d'appels, code source)",
      "Étiquetage (en-tête mail, nom de fichier, dossier partagé)",
      "Règles de stockage, transfert, impression, conservation",
      "Responsable de l'actif = propriétaire de la classification",
    ],
  },
  {
    id: "proc-incidents",
    title: "Procédure de gestion des incidents de sécurité",
    kind: "procedure",
    summary:
      "Détecter, qualifier, contenir, notifier (client + CNDP si données perso), capitaliser.",
    outline: [
      "Canal de signalement (chat, mail SOC, numéro astreinte)",
      "Critères de gravité et délais de première réponse",
      "Chaîne d'escalade : astreinte IT → RSSI → direction → client",
      "Conservation des preuves (logs, captures) avant reconstruction",
      "REX sous 10 jours ouvrés, mise à jour du plan d'action",
    ],
  },
  {
    id: "proc-continuité",
    title: "Procédure de continuité d'activité SI",
    kind: "procedure",
    summary:
      "RTO/RPO par service critique (plateforme d'appels, prod SaaS, messagerie).",
    outline: [
      "Cartographie des activités critiques et dépendances",
      "RTO / RPO validés avec les clients (souvent contractuels en BPO)",
      "Scénarios : coupure fibre, ransomware, indispo cloud, site inaccessible",
      "Test au moins annuel, compte-rendu et actions",
    ],
  },
  {
    id: "charte-utilisateur",
    title: "Charte d'utilisation des SI",
    kind: "modele",
    summary:
      "Document signé à l'arrivée : usages, BYOD, messagerie, réseaux sociaux, secrets.",
    outline: [
      "Usages autorisés / interdits (USB perso, outils IA grand public, WhatsApp pro)",
      "Mots de passe, verrouillage session, poste clair",
      "Télétravail et travail depuis un cybercafé / hôtel",
      "Signalement obligatoire des incidents, sanctions disciplinaires",
    ],
  },
  {
    id: "clause-nda",
    title: "Clause de confidentialité / NDA collaborateur et prestataire",
    kind: "modele",
    summary:
      "Obligations pendant le contrat et 3 à 5 ans après le départ.",
    outline: [
      "Définition des informations protégées (y compris données clients européens)",
      "Interdiction d'emporter des extraits, captures, listes de contacts",
      "Restitution des badges, VPN, matériels le dernier jour",
      "Droit de contrôle raisonnable et sanctions",
    ],
  },
  {
    id: "proc-sauvegarde",
    title: "Procédure de sauvegarde et de restauration",
    kind: "procedure",
    summary: "Quoi, où, à quelle fréquence, qui teste la restauration.",
    outline: [
      "Périmètre : bases, configs, partages, tickets, enregistrements si contractuel",
      "Règle 3-2-1 (3 copies, 2 supports, 1 hors site / immuable)",
      "Chiffrement des sauvegardes, accès restreint",
      "Test de restauration trimestriel avec PV",
    ],
  },
  {
    id: "proc-onboarding",
    title: "Check-list arrivée / mobilité / départ",
    kind: "procedure",
    summary:
      "RH + IT sur une même fiche : comptes, badge, matériel, clauses, formation.",
    outline: [
      "J-7 : création comptes, groupes, matériel, NDA",
      "J0 : badge, briefing sécurité 30 min, signature charte",
      "Mobilité : revue des droits le jour du changement d'équipe",
      "Départ : révocation J0, restitution, export mailbox selon politique",
    ],
  },
  {
    id: "reg-actifs",
    title: "Registre des actifs d'information",
    kind: "modele",
    summary:
      "Tableau vivant : applicatif, données, propriétaire, classification, hébergement.",
    outline: [
      "Nom, type (appli, base, partage, SaaS), propriétaire métier",
      "Classification, volume / sensibilité, localisation (MA / UE / US)",
      "Prestataire, contrat, date de revue",
      "Lien vers les sauvegardes et les comptes à privilèges",
    ],
  },
  {
    id: "proc-vuln",
    title: "Procédure de gestion des vulnérabilités",
    kind: "procedure",
    summary: "Scan, priorisation, délai de correctif, exception signée.",
    outline: [
      "Sources : CVE éditeur, scan mensuel, pentest annuel",
      "Délais : critique 7j, haute 30j, moyenne 90j (à adapter au contrat client)",
      "Registre des exceptions avec date de fin et compensation",
      "Preuves pour l'audit : tickets + captures de scan",
    ],
  },
  {
    id: "pol-crypto",
    title: "Politique de cryptographie",
    kind: "politique",
    summary: "TLS, disques, sauvegardes, secrets, certificats, clés.",
    outline: [
      "TLS 1.2+ partout, interdiction des protocoles obsolètes",
      "Chiffrement des PC portables et des sauvegardes",
      "Coffre à secrets (pas de .env dans Git, pas de Slack)",
      "Cycle de vie des certificats et des clés API clients",
    ],
  },
  {
    id: "proc-devsec",
    title: "Procédure de développement sécurisé",
    kind: "procedure",
    summary: "Pour éditeurs SaaS et équipes qui customisent des plateformes BPO.",
    outline: [
      "Environnements séparés (dev / recette / prod), données de test anonymisées",
      "Revue de code + scan dépendances avant mise en prod",
      "Gestion des changements avec rollback",
      "Comptes de prod interdits aux développeurs au quotidien",
    ],
  },
  {
    id: "proc-physique",
    title: "Procédure d'accès aux locaux et zones sensibles",
    kind: "procedure",
    summary: "Badge, visiteurs, salle serveurs / baie, open space client.",
    outline: [
      "Périmètres : accueil, open space, salles clients, baie / local onduleurs",
      "Visiteurs : registre, badge visiteur, accompagnement",
      "Interdiction téléphone perso en zone d'enregistrement si le client l'exige",
      "Revue des habilitations badges chaque trimestre",
    ],
  },
  {
    id: "reg-legal",
    title: "Registre des exigences légales et contractuelles",
    kind: "modele",
    summary:
      "Loi 09-08, CNDP, Code du travail, clauses ISO des clients, DNSSI si applicable.",
    outline: [
      "Texte / clause, obligation concrète, responsable, preuve, prochaine revue",
      "Transferts de données hors Maroc / hors UE",
      "Durées de conservation des enregistrements d'appels",
      "Obligations de notification d'incident au client (souvent 24–72 h)",
    ],
  },
];

export function getTemplate(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id);
}
