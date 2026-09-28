import type { Control } from "@/lib/types";

export const CONTROLS_PHYS: Control[] = [
  {
    id: "7.1",
    domain: "physique",
    title: "Périmètres de sécurité physique",
    question:
      "Les locaux ont-ils des périmètres clairs (accueil, open space, salles clients, local technique) avec des protections adaptées à chaque zone ?",
    explanation:
      "On dessine des lignes : qui peut entrer où. Un open space n'est pas une salle serveurs. Les murs, portes et signalétique matérialisent le modèle.",
    whyItMatters:
      "À Casa/Rabat, beaucoup de PME partagent un étage. Sans périmètre, un visiteur du voisin arrive dans la zone d'enregistrement.",
    howToStart:
      "Plan simple annoté + portes fermées sur les zones sensibles. Affichez « accès restreint ».",
    criticality: 4,
    ease: 4,
    templates: ["proc-physique"],
    dnssi: [{ code: "PHY-01", title: "Périmètres de sécurité physique" }],
  },
  {
    id: "7.2",
    domain: "physique",
    title: "Contrôle des accès physiques",
    question:
      "L'entrée dans les zones de travail et techniques est-elle contrôlée (badge, registre, anti-passback) et révoquée le jour du départ ?",
    explanation:
      "Badge nominatif, pas de porte « coincée ouverte », revue des habilitations. Les codes partagés de l'interphone ne suffisent pas.",
    whyItMatters:
      "Turnover BPO : badges fantômes. Un audit client commence souvent par « montrez-moi qui a accès à la salle ».",
    howToStart:
      "Badges nominatifs + liste d'habilitations + révocation J0. Interdiction de prêter son badge.",
    criticality: 5,
    ease: 3,
    templates: ["proc-physique", "proc-onboarding"],
    dnssi: [{ code: "PHY-02", title: "Contrôle d'accès physique" }],
  },
  {
    id: "7.3",
    domain: "physique",
    title: "Sécurisation des bureaux, salles et installations",
    question:
      "Les bureaux et salles (surtout celles qui traitent des données clients) sont-ils protégés contre l'intrusion opportuniste et le vis-à-vis ?",
    explanation:
      "Portes, stores, position des écrans, salles de crise, local baie. On réduit ce qu'un visiteur ou un voisin d'immeuble peut voir ou saisir.",
    whyItMatters:
      "Open space avec écrans CRM visibles depuis les vitres ou l'accueil : finding fréquent en audit client.",
    howToStart:
      "Filtres écran sur les postes sensibles, orientation des bureaux, fermeture des salles hors occupation.",
    criticality: 3,
    ease: 4,
    templates: ["proc-physique"],
    dnssi: [{ code: "PHY-03", title: "Sécurisation des locaux" }],
  },
  {
    id: "7.4",
    domain: "physique",
    title: "Surveillance de la sécurité physique",
    question:
      "Les accès sensibles sont-ils surveillés (vidéosurveillance, alarmes, rondes) de façon proportionnée, avec conservation limitée et légale ?",
    explanation:
      "Caméras sur les entrées et la baie, pas sur les pauses individuelles. Affichage, durée de conservation, accès aux images restreint.",
    whyItMatters:
      "Utile en investigation (vol de PC, tailgating). Sensible 09-08 : information du personnel, pas de caméra abusive.",
    howToStart:
      "Couvrez entrée + local technique. Journal d'accès aux enregistrements. Mention dans le règlement intérieur.",
    criticality: 3,
    ease: 3,
    templates: ["proc-physique", "reg-legal"],
    dnssi: [{ code: "PHY-04", title: "Surveillance physique" }],
  },
  {
    id: "7.5",
    domain: "physique",
    title: "Protection contre les menaces physiques et environnementales",
    question:
      "Incendie, inondation, chaleur, séisme, coupure électrique : les locaux critiques ont-ils des mesures réalistes (extincteurs, onduleurs, hors d'eau) ?",
    explanation:
      "On traite les risques du site réel (RDC inondable, baie sous les clim, pas de détection incendie). Pas besoin d'un bunker.",
    whyItMatters:
      "Une baie dans un placard sans clim à Maarif un août : indisponibilité plus probable qu'un APT.",
    howToStart:
      "Extincteurs contrôlés, détecteurs, onduleur testé, baie hors du sol, pas de stockage carton contre le rack.",
    criticality: 4,
    ease: 3,
    templates: ["proc-continuité", "proc-physique"],
    dnssi: [{ code: "PHY-05", title: "Menaces environnementales" }],
  },
  {
    id: "7.6",
    domain: "physique",
    title: "Travail dans les zones sécurisées",
    question:
      "Les règles dans les zones sensibles (pas de photo, pas de personne seule non autorisée, pas de matériel perso) sont-elles connues et appliquées ?",
    explanation:
      "Une zone sécurisée a un régime : qui accompagne, ce qu'on peut y introduire, comment on y travaille.",
    whyItMatters:
      "Salle d'enregistrement, war room client, local serveurs : un selfie ou un prestataire seul suffit à un écart.",
    howToStart:
      "Consignes affichées sur la porte. Registre d'entrée baie. Interdiction téléphone si le contrat client l'exige.",
    criticality: 3,
    ease: 4,
    templates: ["proc-physique"],
    dnssi: [{ code: "PHY-06", title: "Travail en zone sécurisée" }],
  },
  {
    id: "7.7",
    domain: "physique",
    title: "Bureau propre et écran verrouillé",
    question:
      "Les postes se verrouillent-ils (raccourci, timeout) et les documents sensibles sont-ils rangés en fin de journée / en pause ?",
    explanation:
      "Clear desk / clear screen : pas de listing client sur le bureau, session verrouillée dès qu'on quitte le siège.",
    whyItMatters:
      "Open space + turnover + agents qui « gardent la session ouverte pour le collègue » : fuite interne banale.",
    howToStart:
      "GPO verrouillage 5 min + rappel brief + contrôles aléatoires du superviseur. Casiers pour le papier.",
    criticality: 4,
    ease: 5,
    templates: ["charte-utilisateur"],
    dnssi: [{ code: "PHY-07", title: "Bureau propre et écran verrouillé" }],
  },
  {
    id: "7.8",
    domain: "physique",
    title: "Emplacement et protection des équipements",
    question:
      "Les équipements (PC, écrans, baies, imprimantes) sont-ils placés pour limiter le vol, le vis-à-vis et les dégâts (eau, choc, poussière) ?",
    explanation:
      "Imprimante d'une file confidentielle dans le couloir, baie dans la cuisine, PC portable sans câble : autant de scénarios évitables.",
    whyItMatters:
      "Vol de laptop en open space le vendredi soir : incident classique, données client non chiffrées en plus.",
    howToStart:
      "Baie dans un local fermé. Imprimantes sensibles en zone contrôlée. Câbles antivol sur les portables de l'étage.",
    criticality: 3,
    ease: 4,
    templates: ["proc-physique"],
    dnssi: [{ code: "PHY-08", title: "Protection des équipements" }],
  },
  {
    id: "7.9",
    domain: "physique",
    title: "Sécurité des actifs hors site",
    question:
      "PC, tel, disques emportés (client, domicile, salon) sont-ils inventoriés, chiffrés, et soumis à des règles de perte / vol ?",
    explanation:
      "Hors site = risque accru. Inventaire, chiffrement, interdiction de laisser le PC dans le coffre en évidence, procédure de déclaration.",
    whyItMatters:
      "Commercial ESN + taxi + café : le PC perdu sans BitLocker est un incident à notifier au client.",
    howToStart:
      "Chiffrement disque obligatoire, inventaire, procédure perte 1 page, MDM ou au minimum mot de passe firmware.",
    criticality: 5,
    ease: 3,
    templates: ["charte-utilisateur", "reg-actifs"],
    dnssi: [{ code: "PHY-09", title: "Actifs hors des locaux" }],
  },
  {
    id: "7.10",
    domain: "physique",
    title: "Supports de stockage",
    question:
      "USB, disques, bandes, impressions : l'usage est-il restreint, chiffré si besoin, et la destruction tracée ?",
    explanation:
      "Les supports amovibles sont un vecteur de fuite et de malware. Autorisation, scan, chiffrement, registre de destruction.",
    whyItMatters:
      "Clients BPO interdisent souvent toute clé USB. Une exception « pour dépanner » devient la norme.",
    howToStart:
      "Politique USB (idéalement bloquée par GPO) + clés d'entreprise chiffrées nominatives si indispensable.",
    criticality: 4,
    ease: 4,
    templates: ["charte-utilisateur", "pol-classif"],
    dnssi: [{ code: "PHY-10", title: "Gestion des supports" }],
  },
  {
    id: "7.11",
    domain: "physique",
    title: "Services généraux de soutien",
    question:
      "Électricité, clim, liens réseau : y a-t-il une redondance ou un plan si le service tombe (onduleur, groupe, second FAI) à la hauteur du RTO ?",
    explanation:
      "Les utilities sont des dépendances de sécurité (disponibilité). On dimensionne selon le métier, on teste, on maintient les contrats.",
    whyItMatters:
      "Coupure ONEE + un seul FAI : le plateau BPO s'arrête. Les contrats clients ont souvent des pénalités.",
    howToStart:
      "Onduleur testé mensuellement, second lien si le CA le justifie, procédure bascule 4G/site de secours.",
    criticality: 4,
    ease: 2,
    templates: ["proc-continuité"],
    dnssi: [{ code: "PHY-11", title: "Alimentation et utilities" }],
  },
  {
    id: "7.12",
    domain: "physique",
    title: "Sécurité du câblage",
    question:
      "Les câbles réseau et électriques critiques sont-ils protégés contre l'interception, le débranchement accidentel et les dégâts ?",
    explanation:
      "Goulottes, baies fermées, pas de prises « invité » sur le VLAN prod, documentation des brassages sensibles.",
    whyItMatters:
      "Un stagiaire qui rebranche un câble dans la mauvaise baie, ou une prise ouverte en salle d'attente.",
    howToStart:
      "Armoire fermée, plan de brassage, VLAN visiteur isolé, pas de switch sous le bureau du manager.",
    criticality: 2,
    ease: 3,
    templates: ["proc-physique"],
    dnssi: [{ code: "PHY-12", title: "Sécurité du câblage" }],
  },
  {
    id: "7.13",
    domain: "physique",
    title: "Maintenance des équipements",
    question:
      "La maintenance (climatisation, onduleurs, photocopieurs, serveurs) est-elle faite par des personnes habilitées, avec contrôle de ce qu'elles voient / emportent ?",
    explanation:
      "Le technicien photocopieur accède au disque du MFP. Le prestataire clim entre dans la baie. On encadre, on accompagne, on journalise.",
    whyItMatters:
      "Le disque d'un copieur rendu au loueur contient encore des copies de contrats. Finding d'audit « facile ».",
    howToStart:
      "Prestataires sur registre, accompagnement en zone sensible, clause NDA, purge / destruction des disques MFP.",
    criticality: 3,
    ease: 3,
    templates: ["proc-physique", "pol-fournisseurs"],
    dnssi: [{ code: "PHY-13", title: "Maintenance des équipements" }],
  },
  {
    id: "7.14",
    domain: "physique",
    title: "Mise au rebut ou réemploi sécurisé des équipements",
    question:
      "Avant de revendre, donner ou jeter un PC, disque, tel ou photocopieur, les données sont-elles effacées de façon sûre, avec preuve ?",
    explanation:
      "Formatage Windows ne suffit pas. Effacement certifié, destruction physique, ou clause prestataire avec certificat.",
    whyItMatters:
      "Le marché de l'occasion à Derb Ghallef / En ligne : un disque d'ancien commercial ESN = jackpot.",
    howToStart:
      "Procédure : inventaire → effacement (outil) ou déchiquetage → certificat → sortie d'inventaire.",
    criticality: 4,
    ease: 4,
    templates: ["reg-actifs", "proc-physique"],
    dnssi: [{ code: "PHY-14", title: "Réforme sécurisée des équipements" }],
  },
];
