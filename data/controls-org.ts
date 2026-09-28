import type { Control } from "@/lib/types";

export const CONTROLS_ORG: Control[] = [
  {
    id: "5.1",
    domain: "organisationnel",
    title: "Politiques de sécurité de l'information",
    question:
      "Disposez-vous d'une politique de sécurité écrite, approuvée par la direction, communiquée au personnel et revue au moins une fois par an ?",
    explanation:
      "C'est le document cadre du SMSI : ce que l'entreprise protège, pourquoi, et qui est responsable. Sans PSSI signée, l'auditeur n'a pas de fil conducteur.",
    whyItMatters:
      "Les clients européens demandent souvent la PSSI dès le RFP. Au Maroc, elle sert aussi de preuve d'engagement direction — exigence ISO et, le cas échéant, DNSSI.",
    howToStart:
      "Rédigez 4–6 pages : périmètre (sites Casa/Rabat, SI, prestataires), objectifs, rôles, revue annuelle. Faites signer le DG. Publiez-la sur l'intranet.",
    criticality: 5,
    ease: 4,
    templates: ["pol-pssi"],
    dnssi: [{ code: "ORG-01", title: "Politique de sécurité SSI" }],
  },
  {
    id: "5.2",
    domain: "organisationnel",
    title: "Rôles et responsabilités de sécurité",
    question:
      "Les rôles sécurité (direction, RSSI même à temps partiel, responsables d'actifs, IT) sont-ils nommés par écrit, avec des suppléants ?",
    explanation:
      "L'ISO n'exige pas un RSSI à temps plein, mais une personne clairement désignée et des responsabilités non ambiguës.",
    whyItMatters:
      "Dans une ESN / BPO de 30–100 personnes, tout repose souvent sur le DSI. L'audit bloque si personne n'est officiellement responsable.",
    howToStart:
      "Nommez un RSSI (lettre de mission 20–40 %), un sponsor direction, des propriétaires d'actifs. Une page organigramme SSI suffit.",
    criticality: 5,
    ease: 5,
    templates: ["pol-pssi"],
    dnssi: [{ code: "ORG-02", title: "Organisation et responsabilités SSI" }],
  },
  {
    id: "5.3",
    domain: "organisationnel",
    title: "Séparation des tâches",
    question:
      "Une même personne peut-elle à la fois demander, approuver et exécuter une action sensible (paiement, droit admin, mise en prod) ?",
    explanation:
      "On évite qu'un seul profil cumule pouvoir et contrôle. Si la taille de l'équipe l'interdit, on documente une compensation (revue a posteriori).",
    whyItMatters:
      "En petite structure Casa/Rabat, le cumul DSI + admin + déployeur est fréquent. L'auditeur accepte une revue hebdo des actions admin si c'est écrit.",
    howToStart:
      "Listez 8 actions sensibles. Pour chacune : qui demande, qui valide, qui exécute. Si cumul, notez la compensation.",
    criticality: 4,
    ease: 3,
    templates: ["pol-acces"],
    dnssi: [{ code: "ORG-03", title: "Séparation des fonctions" }],
  },
  {
    id: "5.4",
    domain: "organisationnel",
    title: "Responsabilités de la direction",
    question:
      "La direction exige-t-elle concrètement l'application des règles de sécurité (objectifs, revue, moyens, sanctions) ?",
    explanation:
      "L'engagement ne se limite pas à signer la PSSI : comités, budget, arbitrage des risques, exemplarité (MFA du DG y compris).",
    whyItMatters:
      "Un client qui impose l'ISO regardera si le SMSI survit au départ du DSI. La direction doit porter le sujet.",
    howToStart:
      "Inscrivez un point SSI au CODIR mensuel (15 min) : incidents, score de maturité, blocages.",
    criticality: 5,
    ease: 4,
    templates: ["pol-pssi"],
    dnssi: [{ code: "ORG-04", title: "Implication de la direction" }],
  },
  {
    id: "5.5",
    domain: "organisationnel",
    title: "Contact avec les autorités",
    question:
      "Savez-vous qui appeler en cas d'incident grave (DGSSI, CNDP, police judiciaire, CERT, client) et les délais contractuels ?",
    explanation:
      "Une fiche de contacts à jour évite de chercher les numéros sous stress. Elle liste autorités, CERT, assureur, avocats, clients à notifier.",
    whyItMatters:
      "Fuite de données perso → CNDP. Incident sur un SI d'intérêt vital ou marché public → interlocuteurs DGSSI. Contrats BPO UE : notification souvent 24–72 h.",
    howToStart:
      "Une page : organisme, motif, délai, titulaire + backup. Testez les e-mails une fois par an.",
    criticality: 3,
    ease: 5,
    templates: ["proc-incidents", "reg-legal"],
    dnssi: [{ code: "ORG-05", title: "Relations avec les autorités" }],
  },
  {
    id: "5.6",
    domain: "organisationnel",
    title: "Contact avec les groupes d'intérêt",
    question:
      "L'équipe SI suit-elle des sources de veille (CERT, éditeurs, communautés secteur) plutôt que de découvrir les menaces par hasard ?",
    explanation:
      "Il s'agit de s'abonner à des canaux utiles, pas d'adhérer à dix associations. L'objectif est de recevoir les alertes qui vous concernent.",
    whyItMatters:
      "Ransomware visant les centres d'appels, 0-day Microsoft, fuite d'un prestataire cloud : la veille évite d'être le dernier informé.",
    howToStart:
      "Abonnez le RSSI à 2–3 listes (alertes éditeur, CERT, newsletter secteur). Notez-le dans la PSSI.",
    criticality: 2,
    ease: 5,
    templates: ["pol-pssi"],
    dnssi: [{ code: "ORG-06", title: "Veille et communautés SSI" }],
  },
  {
    id: "5.7",
    domain: "organisationnel",
    title: "Renseignement sur les menaces",
    question:
      "Exploitez-vous de la threat intelligence (même légère) pour ajuster vos contrôles : campagnes en cours, TTP visant le BPO / SaaS ?",
    explanation:
      "Au-delà de la newsletter : relier une alerte à une action (règle mail, patch prioritaire, briefing agents).",
    whyItMatters:
      "Les PME offshoring sont des cibles de phishing ciblé (données de cartes, dossiers RH européens). Une veille actionnée se voit à l'audit.",
    howToStart:
      "Chaque alerte pertinente → ticket : « patcher X », « bloquer domaine Y », « mail interne Z ». Gardez 3 exemples pour l'auditeur.",
    criticality: 3,
    ease: 3,
    templates: ["proc-vuln"],
    dnssi: [{ code: "ORG-07", title: "Veille sur les menaces" }],
  },
  {
    id: "5.8",
    domain: "organisationnel",
    title: "Sécurité de l'information dans les projets",
    question:
      "Chaque projet (nouveau client, migration cloud, outil interne) a-t-il un volet sécurité dès le cadrage, pas à la veille du go-live ?",
    explanation:
      "La sécurité s'invite au kick-off : données manipulées, accès, sous-traitants, localisation, critères d'acceptation.",
    whyItMatters:
      "Un nouveau lot BPO arrive en 3 semaines : sans check-list SSI, on ouvre des partages trop larges et on le paie à l'audit client.",
    howToStart:
      "Ajoutez 8 questions sécurité au dossier projet / au questionnaire avant-vente. Le RSSI vise le go-live.",
    criticality: 4,
    ease: 4,
    templates: ["pol-pssi", "pol-classif"],
    dnssi: [{ code: "ORG-08", title: "Sécurité dès la conception des projets" }],
  },
  {
    id: "5.9",
    domain: "organisationnel",
    title: "Inventaire des informations et autres actifs associés",
    question:
      "Avez-vous un inventaire à jour des applicatifs, données, matériels critiques et SaaS, avec un propriétaire nommé ?",
    explanation:
      "On ne protège que ce que l'on connaît. L'inventaire n'a pas besoin d'être un CMDB coûteux : un tableur vivant, revu trimestriellement.",
    whyItMatters:
      "Shadow IT (WhatsApp, Drive perso, outils IA) est le trou classique des ESN. L'inventaire est aussi le socle Loi 09-08 / registres.",
    howToStart:
      "Partez des abonnements, DNS, Azure/M365, parc AD. Nommez un propriétaire métier par actif critique.",
    criticality: 5,
    ease: 3,
    templates: ["reg-actifs"],
    dnssi: [{ code: "AST-01", title: "Inventaire des actifs" }],
  },
  {
    id: "5.10",
    domain: "organisationnel",
    title: "Usage acceptable des actifs",
    question:
      "Les règles d'usage (poste, mail, cloud, USB, IA générative, WhatsApp) sont-elles écrites, signées, et contrôlées de façon proportionnée ?",
    explanation:
      "La charte dit ce qui est permis. Sans elle, une sanction ou un incident devient un conflit social plutôt qu'une règle claire.",
    whyItMatters:
      "En centre d'appels, le téléphone perso en salle est souvent interdit par le client. Il faut que ce soit dans la charte, pas seulement oral.",
    howToStart:
      "Charte 3 pages, signature à l'embauche, rappel annuel 15 min. Interdictions alignées sur les contrats clients.",
    criticality: 4,
    ease: 5,
    templates: ["charte-utilisateur"],
    dnssi: [{ code: "AST-02", title: "Utilisation acceptable des actifs" }],
  },
  {
    id: "5.11",
    domain: "organisationnel",
    title: "Restitution des actifs",
    question:
      "À chaque départ ou fin de mission, récupérez-vous badge, PC, tel, jetons, accès cloud, et le constatez-vous par écrit ?",
    explanation:
      "La restitution matérielle et logique (comptes) doit être synchrone. Un PC non rendu = données client qui circulent.",
    whyItMatters:
      "Turnover élevé en BPO / ESN. Un départ mal fermé est le scénario n°1 de fuite « involontaire ».",
    howToStart:
      "Check-list départ RH+IT, case « comptes révoqués J0 ». Pas de solde de tout compte sans fiche signée.",
    criticality: 5,
    ease: 4,
    templates: ["proc-onboarding"],
    dnssi: [{ code: "AST-03", title: "Restitution des actifs" }],
  },
  {
    id: "5.12",
    domain: "organisationnel",
    title: "Classification de l'information",
    question:
      "L'information est-elle classée (ex. Public / Interne / Confidentiel / Secret) avec un responsable qui assume le niveau ?",
    explanation:
      "La classification pilote le reste : qui accède, où stocker, s'il faut chiffrer, combien de temps conserver.",
    whyItMatters:
      "Enregistrements d'appels, IBAN, dossiers patients ou paie UE n'ont rien à faire dans un groupe « Tout le monde ».",
    howToStart:
      "4 niveaux, 10 exemples métier, propriétaires sur les 15 actifs les plus sensibles.",
    criticality: 4,
    ease: 4,
    templates: ["pol-classif", "reg-actifs"],
    dnssi: [{ code: "AST-04", title: "Classification de l'information" }],
  },
  {
    id: "5.13",
    domain: "organisationnel",
    title: "Étiquetage de l'information",
    question:
      "Les documents et supports sensibles portent-ils leur niveau de classification (en-tête, nom de fichier, dossier) ?",
    explanation:
      "Sans étiquette, personne ne sait comment traiter le fichier. L'étiquette doit suivre le document dans les e-mails et les partages.",
    whyItMatters:
      "Un export Excel « clients_FR.xlsx » sans mention Confidentiel finit sur une clé USB ou un canal non validé.",
    howToStart:
      "Modèles Word/Excel avec bandeau. Règle de nommage des partages. Formation 10 min aux chefs d'équipe.",
    criticality: 3,
    ease: 4,
    templates: ["pol-classif"],
    dnssi: [{ code: "AST-05", title: "Étiquetage de l'information" }],
  },
  {
    id: "5.14",
    domain: "organisationnel",
    title: "Transfert de l'information",
    question:
      "Les échanges (e-mail, WeTransfer, SFTP, API, papier, oral) de données sensibles suivent-ils des canaux et règles définis ?",
    explanation:
      "On fixe les canaux autorisés vers le client, les sous-traitants et en interne. Le reste est interdit ou exception signée.",
    whyItMatters:
      "Le client européen refuse Gmail perso et les liens ouverts. Un transfert non maîtrisé = non-conformité contractuelle immédiate.",
    howToStart:
      "Liste des canaux autorisés par classification. Interdiction des clouds grand public pour les données clients.",
    criticality: 5,
    ease: 3,
    templates: ["pol-classif", "charte-utilisateur"],
    dnssi: [{ code: "COM-01", title: "Transfert sécurisé de l'information" }],
  },
  {
    id: "5.15",
    domain: "organisationnel",
    title: "Contrôle d'accès",
    question:
      "Une politique d'accès formalise-t-elle le moindre privilège, les revues de droits et les règles d'accès physique / logique ?",
    explanation:
      "Le contrôle d'accès est le fil rouge : identité, authentification, autorisation, revue. La politique relie badge, AD, VPN et applicatifs.",
    whyItMatters:
      "Auditeur et client testeront : un stagiaire peut-il voir tous les tickets ? Un ancien prestataire a-t-il encore le VPN ?",
    howToStart:
      "Rédigez la politique, puis alignez AD / M365 / badges. Planifiez une revue trimestrielle.",
    criticality: 5,
    ease: 3,
    templates: ["pol-acces"],
    dnssi: [{ code: "ACC-01", title: "Politique de contrôle d'accès" }],
  },
  {
    id: "5.16",
    domain: "organisationnel",
    title: "Gestion des identités",
    question:
      "Chaque personne et chaque compte de service a-t-il une identité unique, rattachée à un responsable, désactivée à temps ?",
    explanation:
      "Pas de comptes « admin », « stage », « hotline » partagés sans traçabilité. Les identités machines ont un propriétaire.",
    whyItMatters:
      "Les comptes génériques de supervision BPO sont un classique. En cas d'incident, impossible de savoir qui a exporté la liste.",
    howToStart:
      "Interdisez les comptes partagés nominatifs. Coffre pour les comptes techniques. Recertification à chaque départ.",
    criticality: 5,
    ease: 3,
    templates: ["pol-acces", "proc-onboarding"],
    dnssi: [{ code: "ACC-02", title: "Gestion des identités" }],
  },
  {
    id: "5.17",
    domain: "organisationnel",
    title: "Informations d'authentification",
    question:
      "Les secrets (mots de passe, clés, jetons) sont-ils robustes, jamais partagés par mail/chat, stockés dans un coffre, renouvelés ?",
    explanation:
      "Politique de mots de passe moderne (longueur, anti-réutilisation) + MFA + gestionnaire. Les Post-it et le fichier Excel sont hors jeu.",
    whyItMatters:
      "Credential stuffing sur webmail et portails clients. Un secret dans un ticket Jira public interne = incident.",
    howToStart:
      "Déployez un gestionnaire d'équipe, MFA partout où c'est possible, interdiction du partage oral des mots de passe admin.",
    criticality: 5,
    ease: 4,
    templates: ["pol-acces", "pol-crypto"],
    dnssi: [{ code: "ACC-03", title: "Authentification et secrets" }],
  },
  {
    id: "5.18",
    domain: "organisationnel",
    title: "Droits d'accès",
    question:
      "L'attribution, la modification et le retrait des droits sont-ils tracés, approuvés, et revus périodiquement ?",
    explanation:
      "Un droit naît d'une demande validée, pas d'un coup de fil. La revue détecte les privilèges accumulés avec l'ancienneté.",
    whyItMatters:
      "Un agent passé team leader qui garde l'accès à 4 files clients : surface inutile, finding d'audit quasi certain.",
    howToStart:
      "Ticket obligatoire pour tout droit non standard. Revue trimestrielle des groupes AD sensibles, PV signé.",
    criticality: 5,
    ease: 3,
    templates: ["pol-acces"],
    dnssi: [{ code: "ACC-04", title: "Gestion des habilitations" }],
  },
  {
    id: "5.19",
    domain: "organisationnel",
    title: "Sécurité dans les relations avec les fournisseurs",
    question:
      "Les prestataires (infogérance, ménage IT, cloud, freelance, cabling) sont-ils évalués sous l'angle sécurité avant et pendant le contrat ?",
    explanation:
      "La chaîne de sous-traitance est dans le périmètre. On classe les fournisseurs, on exige un minimum, on suit les incidents chez eux.",
    whyItMatters:
      "Beaucoup de PME marocaines sous-traitent l'hébergement ou le SOC. Le client européen vous tiendra responsable de leur faille.",
    howToStart:
      "Registre fournisseurs + questionnaire 15 questions pour les critiques + clause SSI type.",
    criticality: 4,
    ease: 3,
    templates: ["pol-fournisseurs"],
    dnssi: [{ code: "TIE-01", title: "Sécurité des prestataires" }],
  },
  {
    id: "5.20",
    domain: "organisationnel",
    title: "Sécurité dans les accords avec les fournisseurs",
    question:
      "Les contrats critiques contiennent-ils des clauses SSI (confidentialité, localisation, incident, audit, restitution) ?",
    explanation:
      "Sans clause, vous n'avez aucun levier le jour où le prestataire refuse de parler d'un incident ou de rendre les données.",
    whyItMatters:
      "Hébergeur, éditeur de dialer, cabinet de paie, freelance offshore : clauses à aligner sur vos propres engagements clients.",
    howToStart:
      "Annexe SSI d'une page à coller aux nouveaux contrats. Renégociez les 5 plus critiques à l'échéance.",
    criticality: 4,
    ease: 3,
    templates: ["pol-fournisseurs", "clause-nda"],
    dnssi: [{ code: "TIE-02", title: "Clauses de sécurité contractuelles" }],
  },
  {
    id: "5.21",
    domain: "organisationnel",
    title: "Sécurité de la chaîne d'approvisionnement TIC",
    question:
      "Maîtrisez-vous d'où viennent vos composants critiques (cloud, librairies, appliances, intégrateurs) et les risques associés ?",
    explanation:
      "Au-delà du prestataire direct : sa sous-traitance, le pays d'hébergement, les dépendances logicielles.",
    whyItMatters:
      "Un SaaS « européen » dont le support lit les tickets depuis un tiers pays, ou une lib npm compromise, devient votre incident.",
    howToStart:
      "Pour chaque actif critique : hébergeur, sous-traitants connus, pays, plan de sortie. SBOM léger pour le produit SaaS.",
    criticality: 4,
    ease: 2,
    templates: ["pol-fournisseurs", "reg-actifs"],
    dnssi: [{ code: "TIE-03", title: "Chaîne d'approvisionnement TIC" }],
  },
  {
    id: "5.22",
    domain: "organisationnel",
    title: "Suivi, revue et changements des services fournisseurs",
    question:
      "Les services des fournisseurs critiques sont-ils revus (SLA, incidents, changements) et pas seulement payés tous les mois ?",
    explanation:
      "On suit la qualité et la sécurité dans le temps : rapports, comités, changements de périmètre, nouvelles régions cloud.",
    whyItMatters:
      "Un hébergeur qui migre vos VM sans vous prévenir, ou un SOC qui ne livre plus les rapports : trou de gouvernance.",
    howToStart:
      "Comité trimestriel 30 min avec les 3 prestataires critiques. Compte-rendu classé.",
    criticality: 3,
    ease: 3,
    templates: ["pol-fournisseurs"],
    dnssi: [{ code: "TIE-04", title: "Suivi des prestataires" }],
  },
  {
    id: "5.23",
    domain: "organisationnel",
    title: "Sécurité de l'usage des services cloud",
    question:
      "L'usage du cloud (M365, AWS, GCP, outils métier) est-il cadré : qui souscrit, où sont les données, comment on sort ?",
    explanation:
      "Le cloud n'est pas « hors SMSI ». On définit les services autorisés, la résidence des données, le partage externe, la sauvegarde.",
    whyItMatters:
      "Shadow SaaS + OneDrive perso = finding immédiat. Les clients UE demandent la région et le DPA.",
    howToStart:
      "Catalogue des clouds autorisés, interdiction d'en ouvrir un sans IT, check résidence (MA/UE).",
    criticality: 5,
    ease: 3,
    templates: ["pol-fournisseurs", "pol-classif"],
    dnssi: [{ code: "TIE-05", title: "Usage sécurisé du cloud" }],
  },
  {
    id: "5.24",
    domain: "organisationnel",
    title: "Planification de la gestion des incidents",
    question:
      "Existe-t-il un plan d'incident (rôles, sévérités, comms interne/client, astreinte) testé au moins une fois ?",
    explanation:
      "Le plan se rédige au calme. Il dit qui décide d'éteindre un service, qui parle au client, qui préserve les preuves.",
    whyItMatters:
      "Sans plan, le premier ransomware se gère en groupe WhatsApp. Les contrats BPO imposent souvent un délai de notification.",
    howToStart:
      "Procédure 5 pages + fiche réflexe 1 page affichée. Table-top 1 h avec DSI, RH, commercial.",
    criticality: 5,
    ease: 4,
    templates: ["proc-incidents"],
    dnssi: [{ code: "INC-01", title: "Dispositif de gestion des incidents" }],
  },
  {
    id: "5.25",
    domain: "organisationnel",
    title: "Évaluation et décision sur les événements de sécurité",
    question:
      "Savez-vous distinguer un événement bénin d'un incident, avec des critères écrits et une personne qui tranche ?",
    explanation:
      "Tout log d'échec n'est pas un incident. Des critères évitent le sous-signalement (« on verra lundi ») et le sur-signalement.",
    whyItMatters:
      "Un export massif à 23 h un vendredi : événement à qualifier en minutes, pas au CODIR du mois suivant.",
    howToStart:
      "Grille : impact données / service / client / réglementaire. Le RSSI ou l'astreinte décide du niveau.",
    criticality: 4,
    ease: 4,
    templates: ["proc-incidents"],
    dnssi: [{ code: "INC-02", title: "Qualification des événements" }],
  },
  {
    id: "5.26",
    domain: "organisationnel",
    title: "Réponse aux incidents de sécurité",
    question:
      "Quand un incident est déclaré, les étapes confinement / éradication / rétablissement / communication sont-elles suivies et tracées ?",
    explanation:
      "La réponse est un processus, pas un héroïsme individuel. On documente les actions pour l'assurance, le client et l'audit.",
    whyItMatters:
      "Reconstruire trop vite sans preuve = impossible d'expliquer au client européen ce qui s'est passé.",
    howToStart:
      "Ticket type « incident SSI » avec horodatage. Interdiction d'effacer les logs avant feu vert RSSI.",
    criticality: 5,
    ease: 3,
    templates: ["proc-incidents"],
    dnssi: [{ code: "INC-03", title: "Réponse aux incidents" }],
  },
  {
    id: "5.27",
    domain: "organisationnel",
    title: "Apprentissage à partir des incidents",
    question:
      "Chaque incident significatif donne-t-il lieu à un REX et à des actions (contrôle, formation, outil) réellement suivies ?",
    explanation:
      "L'ISO attend une amélioration continue. Un incident sans REX se reproduira, et l'auditeur le verra au 2e cycle.",
    whyItMatters:
      "Phishing réussi sur un agent : si on ne change que le mot de passe, le suivant cliquera aussi.",
    howToStart:
      "REX sous 10 jours, 3 actions max dans le plan. Revoyez-les au CODIR SSI.",
    criticality: 3,
    ease: 4,
    templates: ["proc-incidents"],
    dnssi: [{ code: "INC-04", title: "Retour d'expérience incidents" }],
  },
  {
    id: "5.28",
    domain: "organisationnel",
    title: "Collecte des preuves",
    question:
      "En cas d'incident ou de litige, savez-vous préserver des preuves exploitables (logs, disque, mails) sans les altérer ?",
    explanation:
      "Horodatage, hash, chaîne de custody minimale. On n'explore pas un PC compromis en « bidouillant » le disque source.",
    whyItMatters:
      "Un client ou un tribunal (vol de base, harcèlement via SI) exigera des preuves. Une image mal faite les rend inutiles.",
    howToStart:
      "Règle : snapshot / copie avant investigation. Coffre des preuves, accès restreint. Juriste briefé.",
    criticality: 3,
    ease: 3,
    templates: ["proc-incidents"],
    dnssi: [{ code: "INC-05", title: "Préservation des preuves" }],
  },
  {
    id: "5.29",
    domain: "organisationnel",
    title: "Sécurité de l'information pendant une perturbation",
    question:
      "En mode dégradé (site fermé, bascule cloud, crise), les exigences de sécurité restent-elles définies — on ne « ouvre pas tout » ?",
    explanation:
      "La crise n'autorise pas le Drive perso pour tout le monde. On prévoit des exceptions temporaires, datées, validées.",
    whyItMatters:
      "Grève transport, inondation, COVID-like : le BPO bascule à la maison. Sans cadre, la conformité client s'évapore.",
    howToStart:
      "Annexe « mode crise » : accès temporaires, canaux, durée max, qui autorise.",
    criticality: 4,
    ease: 3,
    templates: ["proc-continuité"],
    dnssi: [{ code: "BCP-01", title: "Sécurité en situation de crise" }],
  },
  {
    id: "5.30",
    domain: "organisationnel",
    title: "Préparation des TIC pour la continuité d'activité",
    question:
      "Les SI critiques ont-ils des RTO/RPO, une capacité de bascule, et des tests de restauration — pas seulement une sauvegarde « on espère » ?",
    explanation:
      "Continuité ≠ sauvegarde. Il faut savoir relancer le service dans le délai promis au client.",
    whyItMatters:
      "Un centre d'appels ou un SaaS facture de la disponibilité. Un RPO fantaisiste se découvre le jour du crash disque.",
    howToStart:
      "3 services critiques, RTO/RPO réalistes, test de restore documenté ce trimestre.",
    criticality: 5,
    ease: 2,
    templates: ["proc-continuité", "proc-sauvegarde"],
    dnssi: [{ code: "BCP-02", title: "Continuité des TIC" }],
  },
  {
    id: "5.31",
    domain: "organisationnel",
    title: "Exigences légales, réglementaires et contractuelles",
    question:
      "Avez-vous un registre à jour des obligations qui s'appliquent (Loi 09-08, CNDP, travail, contrats clients, DNSSI si concerné) ?",
    explanation:
      "On ne peut pas « être conforme en général ». On liste les textes et clauses, le responsable, et la preuve.",
    whyItMatters:
      "PME marocaine + clients UE = empilement 09-08, clauses RGPD du donneur d'ordre, parfois DNSSI / homologation.",
    howToStart:
      "Tableur : obligation, source, owner, preuve, date de revue. Partez des 5 plus gros contrats.",
    criticality: 5,
    ease: 3,
    templates: ["reg-legal"],
    dnssi: [{ code: "CNF-01", title: "Veille légale et réglementaire" }],
  },
  {
    id: "5.32",
    domain: "organisationnel",
    title: "Droits de propriété intellectuelle",
    question:
      "Les licences logicielles, contenus et codes (y compris open source) sont-ils inventoriés et utilisés dans les droits acquis ?",
    explanation:
      "Copies illégales d'OS / Office, fonts, librairies mal licenciées : risque légal et finding d'audit. L'OSS a aussi des obligations.",
    whyItMatters:
      "Contrôle de licences fréquent chez les clients ESN. Un crack sur un poste de recette peut faire échouer un audit.",
    howToStart:
      "Inventaire licences + interdiction d'installer hors catalogue. Politique OSS pour le produit.",
    criticality: 3,
    ease: 3,
    templates: ["reg-actifs", "reg-legal"],
    dnssi: [{ code: "CNF-02", title: "Propriété intellectuelle et licences" }],
  },
  {
    id: "5.33",
    domain: "organisationnel",
    title: "Protection des enregistrements",
    question:
      "Les enregistrements importants (contrats, logs, tickets, preuves RH, enregistrements d'appels) sont-ils protégés, complets, et conservés le bon temps ?",
    explanation:
      "Intégrité + disponibilité + durée de conservation + destruction. Ce n'est pas « on garde tout au cas où ».",
    whyItMatters:
      "Les records d'appels ont des durées imposées par le client et la CNDP. Trop longtemps = risque ; trop peu = impossible de se défendre.",
    howToStart:
      "Tableau de conservation par type d'enregistrement. Droits d'accès restreints. Horodatage fiable.",
    criticality: 4,
    ease: 3,
    templates: ["reg-legal", "pol-classif"],
    dnssi: [{ code: "CNF-03", title: "Protection des enregistrements" }],
  },
  {
    id: "5.34",
    domain: "organisationnel",
    title: "Vie privée et protection des DCP",
    question:
      "Les données personnelles (salariés, prospects, clients finaux européens) sont-elles traitées avec un cadre 09-08 / CNDP et des clauses clients ?",
    explanation:
      "Minimisation, bases légales, information des personnes, sous-traitance, transferts, droits des personnes, sécurité adaptée.",
    whyItMatters:
      "Cœur du risque BPO / SaaS. Un client UE vous traitera en sous-traitant : DPA, registres, violation à notifier.",
    howToStart:
      "Registre des traitements, DPA types, procédure de violation, désigner un contact CNDP interne.",
    criticality: 5,
    ease: 2,
    templates: ["reg-legal", "pol-classif"],
    dnssi: [{ code: "CNF-04", title: "Protection des données personnelles" }],
  },
  {
    id: "5.35",
    domain: "organisationnel",
    title: "Revue indépendante de la sécurité",
    question:
      "Quelqu'un d'indépendant de l'opérationnel (interne d'un autre pôle, ou externe) revoit-il périodiquement le dispositif ?",
    explanation:
      "L'œil extérieur détecte l'auto-complaisance. Ce n'est pas encore l'audit de certification, mais une revue annuelle minimale.",
    whyItMatters:
      "Le DSI qui s'auto-évalue 100 % conforme n'est pas crédible. Un prestataire 2 jours / an change la donne.",
    howToStart:
      "Revue annuelle par un tiers (cabinet local, RSSI d'un autre groupe) + plan d'actions. Gardez le rapport.",
    criticality: 4,
    ease: 3,
    templates: ["pol-pssi"],
    dnssi: [{ code: "CNF-05", title: "Revue indépendante de la SSI" }],
  },
  {
    id: "5.36",
    domain: "organisationnel",
    title: "Conformité aux politiques et normes",
    question:
      "Contrôlez-vous que les règles sont réellement appliquées (sondages, contrôles techniques, échantillons) et corrigez-vous les écarts ?",
    explanation:
      "Une politique non contrôlée est de la littérature. Des contrôles proportionnés (MFA activée ? postes chiffrés ?) ferment la boucle.",
    whyItMatters:
      "L'auditeur échantillonnera. Mieux vaut avoir déjà vos propres constats et corrections.",
    howToStart:
      "5 contrôles mensuels automatisables (MFA, disk encryption, backups, comptes dormants, patchs).",
    criticality: 4,
    ease: 3,
    templates: ["pol-pssi"],
    dnssi: [{ code: "CNF-06", title: "Contrôle de conformité interne" }],
  },
  {
    id: "5.37",
    domain: "organisationnel",
    title: "Procédures d'exploitation documentées",
    question:
      "Les opérations critiques (restore, création de compte, mise en prod, ouverture de flux) sont-elles écrites assez pour qu'un binôme les exécute ?",
    explanation:
      "La connaissance ne doit pas vivre uniquement dans la tête du DSI. Des modes opératoires courts, versionnés, suffisent.",
    whyItMatters:
      "Congé, départ, astreinte junior : sans procédure, on improvise sur la prod client.",
    howToStart:
      "Documentez d'abord restore, offboarding, incident P1, déploiement. Format une page + captures.",
    criticality: 3,
    ease: 4,
    templates: ["proc-sauvegarde", "proc-onboarding"],
    dnssi: [{ code: "OPS-01", title: "Procédures d'exploitation" }],
  },
];
