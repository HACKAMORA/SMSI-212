import type { Control } from "@/lib/types";

export const CONTROLS_TECH: Control[] = [
  {
    id: "8.1",
    domain: "technologique",
    title: "Terminaux utilisateurs",
    question:
      "Les PC et mobiles professionnels sont-ils gérés (politique, MAJ, chiffrement, MDM/antivirus) y compris s'il y a du BYOD ?",
    explanation:
      "Un terminal est un bout du SI. Inventaire, configuration de référence, durcissement minimal, séparation perso / pro si BYOD.",
    whyItMatters:
      "BYOD non cadré en ESN = données client dans une photo iCloud. Les clients l'interdisent souvent, ou l'encadrent très fort.",
    howToStart:
      "Parc géré uniquement pour les files clients. Chiffrement + antivirus + verrouillage. BYOD : conteneur ou interdiction.",
    criticality: 5,
    ease: 3,
    templates: ["charte-utilisateur", "pol-acces"],
    dnssi: [{ code: "OPS-02", title: "Sécurisation des postes de travail" }],
  },
  {
    id: "8.2",
    domain: "technologique",
    title: "Droits d'accès privilégiés",
    question:
      "Les comptes admin (AD, cloud, firewall, prod) sont-ils nominatifs, MFA, utilisés seulement quand nécessaire, et journalisés ?",
    explanation:
      "Le quotidien se fait en compte standard. L'admin est un sésame : nombre réduit, revue, pas d'admin local partout.",
    whyItMatters:
      "Ransomware : le compte domain admin du DSI laissé ouvert sur le PC du quotidien. Scénario n°1.",
    howToStart:
      "Compte quotidien ≠ compte admin. MFA admin. Recensez tous les global admin M365 / root cloud.",
    criticality: 5,
    ease: 3,
    templates: ["pol-acces"],
    dnssi: [{ code: "ACC-05", title: "Comptes à privilèges" }],
  },
  {
    id: "8.3",
    domain: "technologique",
    title: "Restriction d'accès à l'information",
    question:
      "Les applicatifs et partages n'exposent-ils que ce que le rôle doit voir (pas de « tout le monde / lecture » par défaut) ?",
    explanation:
      "Le contrôle d'accès se traduit dans les ACL, les rôles applicatifs, les vues CRM. Moindre privilège technique.",
    whyItMatters:
      "Un partage « Commercial » avec 80 personnes et tous les exports clients : non-conformité immédiate.",
    howToStart:
      "Revoir les 10 partages / groupes les plus larges. Rôles CRM par file / client.",
    criticality: 5,
    ease: 3,
    templates: ["pol-acces", "pol-classif"],
    dnssi: [{ code: "ACC-06", title: "Restriction d'accès à l'information" }],
  },
  {
    id: "8.4",
    domain: "technologique",
    title: "Accès au code source",
    question:
      "Le code (et les secrets associés) est-il dans un dépôt contrôlé, avec droits nominatifs, revue, et pas de secrets en clair ?",
    explanation:
      "Dépôts privés, 2FA, branches protégées, scan des secrets. Les stagiaires n'ont pas le push sur main.",
    whyItMatters:
      "Éditeur SaaS à Rabat : un repo public « par erreur » ou une clé AWS dans Git = incident majeur.",
    howToStart:
      "SSO + 2FA Git, protection main, coffre pour les secrets, revue des deploy keys.",
    criticality: 4,
    ease: 4,
    templates: ["proc-devsec", "pol-acces"],
    dnssi: [{ code: "DEV-01", title: "Protection du code source" }],
  },
  {
    id: "8.5",
    domain: "technologique",
    title: "Authentification sécurisée",
    question:
      "Les accès distants et les apps critiques imposent-ils une authentification forte (MFA) et des sessions maîtrisées ?",
    explanation:
      "MFA, anti-rejeu, timeout, protection contre le stuffing. Les questions secrètes et les SMS seuls sont un minimum fragile.",
    whyItMatters:
      "VPN et webmail sans MFA : porte d'entrée favorite. Exigence quasi standard des questionnaires clients UE.",
    howToStart:
      "MFA sur messagerie, VPN, admin cloud, RH. Désactivez l'auth basique. Session 15 min sur les postes partagés.",
    criticality: 5,
    ease: 4,
    templates: ["pol-acces", "pol-crypto"],
    dnssi: [{ code: "ACC-03", title: "Authentification forte" }],
  },
  {
    id: "8.6",
    domain: "technologique",
    title: "Gestion de la capacité",
    question:
      "Surveillez-vous disque, CPU, licences, bande passante, places plateau pour éviter la saturation qui dégrade sécurité et service ?",
    explanation:
      "La saturation fait tomber les logs, les sauvegardes, les filtres. On prévoit, on alerte, on dimensionne.",
    whyItMatters:
      "Disque plein = plus de logs ni de backup. Lien saturé = agents qui coupent l'antivirus « pour que ça aille plus vite ».",
    howToStart:
      "Alertes 80 % sur les volumes critiques et le lien. Revue trimestrielle capacité / recrutement plateau.",
    criticality: 3,
    ease: 3,
    templates: ["proc-continuité"],
    dnssi: [{ code: "OPS-03", title: "Gestion de la capacité" }],
  },
  {
    id: "8.7",
    domain: "technologique",
    title: "Protection contre les malwares",
    question:
      "Antivirus / EDR est-il déployé, à jour, non désactivable par l'utilisateur, avec une conduite à tenir si détection ?",
    explanation:
      "Couverture complète du parc, centralisée, excluant le moins possible. Sensibilisation jointe (pièces jointes, clés, craques).",
    whyItMatters:
      "Poste agent + pièce jointe + droits locaux = incident de plateau. Les clients demandent la console et le taux de couverture.",
    howToStart:
      "EDR ou AV centralisé, 100 % des postes, alerte au RSSI, interdiction de désactiver.",
    criticality: 5,
    ease: 4,
    templates: ["charte-utilisateur", "proc-incidents"],
    dnssi: [{ code: "OPS-04", title: "Lutte contre les codes malveillants" }],
  },
  {
    id: "8.8",
    domain: "technologique",
    title: "Gestion des vulnérabilités techniques",
    question:
      "Les correctifs de sécurité sont-ils suivis avec des délais selon la criticité, y compris sur le cloud et les applis métier ?",
    explanation:
      "Inventaire + scan ou source éditeur + priorisation + preuve de déploiement + exceptions datées.",
    whyItMatters:
      "VPN et firewall non patchés : scénario d'intrusion le plus banal. L'auditeur demandera le dernier scan et les exceptions.",
    howToStart:
      "Patch mardi Windows, revue mensuelle CVE exposées, délai écrit pour le critique. Ticket pour chaque exception.",
    criticality: 5,
    ease: 3,
    templates: ["proc-vuln"],
    dnssi: [{ code: "OPS-05", title: "Gestion des vulnérabilités" }],
  },
  {
    id: "8.9",
    domain: "technologique",
    title: "Gestion des configurations",
    question:
      "Les configs de référence (poste, serveur, firewall, SaaS) sont-elles documentées, durcies, et les écarts détectés ?",
    explanation:
      "Baseline : services inutiles off, ports fermés, MFA, logging. Les changements passent par un contrôle, pas par le « on a touché vite fait ».",
    whyItMatters:
      "Un firewall « ouvert le temps du projet » oublié ouvert. Finding technique le plus rentable pour un auditeur.",
    howToStart:
      "Check-list durcissement Windows / M365 / firewall. Revue trimestrielle des règles « any-any ».",
    criticality: 4,
    ease: 3,
    templates: ["proc-devsec"],
    dnssi: [{ code: "OPS-06", title: "Gestion des configurations" }],
  },
  {
    id: "8.10",
    domain: "technologique",
    title: "Suppression de l'information",
    question:
      "Quand une donnée n'est plus nécessaire (fin de contrat client, départ, expiration), est-elle réellement effacée partout — prod, backup, exports, laptop ?",
    explanation:
      "La suppression est un processus : applicatif, archives, sauvegardes (politique de rétention), postes, prestataires.",
    whyItMatters:
      "Fin de lot BPO : le client exige un certificat de destruction. Des exports Excel trainent encore 2 ans plus tard.",
    howToStart:
      "Procédure de fin de contrat : liste des emplacements, effacement, attestation. Alignez la rétention des backups.",
    criticality: 4,
    ease: 2,
    templates: ["pol-classif", "reg-legal"],
    dnssi: [{ code: "AST-06", title: "Effacement des données" }],
  },
  {
    id: "8.11",
    domain: "technologique",
    title: "Masquage des données",
    question:
      "Dans les environnements non prod, démos, tickets et formations, les données réelles sont-elles masquées ou anonymisées ?",
    explanation:
      "Pseudonymisation, masquage (PAN, CIN, e-mail), jeux de synthèses. On n'utilise pas la prod pour former les nouveaux.",
    whyItMatters:
      "Recette SaaS ou training BPO avec de vrais IBAN : violation 09-08 / DPA, et fuite via un stagiaire.",
    howToStart:
      "Interdiction de copier la prod vers la recette sans masquage. Jeu de données fictif pour les formations.",
    criticality: 4,
    ease: 3,
    templates: ["proc-devsec", "pol-classif"],
    dnssi: [{ code: "DEV-02", title: "Masquage et anonymisation" }],
  },
  {
    id: "8.12",
    domain: "technologique",
    title: "Prévention des fuites de données",
    question:
      "Avez-vous des mesures (techniques et organisationnelles) pour détecter ou empêcher les exfiltrations (USB, mail, cloud, impression, screenshot) ?",
    explanation:
      "DLP n'est pas obligatoire partout. On commence par bloquer USB, restreindre le partage externe M365, watermark, journaliser les exports massifs.",
    whyItMatters:
      "Un agent qui envoie 5 000 lignes vers Gmail : le cauchemar du donneur d'ordre. Même un DLP léger change l'audit.",
    howToStart:
      "Bloquez USB + sharing externe + alerte sur pièces jointes volumineuses. Puis DLP sur les 2 apps les plus sensibles.",
    criticality: 4,
    ease: 2,
    templates: ["charte-utilisateur", "pol-classif"],
    dnssi: [{ code: "OPS-07", title: "Prévention des fuites de données" }],
  },
  {
    id: "8.13",
    domain: "technologique",
    title: "Sauvegarde de l'information",
    question:
      "Les données et configs critiques sont-elles sauvegardées, chiffrées, hors d'atteinte d'un ransomware, et restaurées avec succès lors de tests ?",
    explanation:
      "3-2-1, immuabilité ou hors ligne, contrôle d'intégrité, tests. Une sauvegarde jamais restaurée n'existe pas.",
    whyItMatters:
      "Argument n°1 face au ransomware et à l'erreur humaine. Les clients demandent la fréquence et le dernier test.",
    howToStart:
      "Couvrez AD / M365 / bases / configs firewall. 1 test de restore documenté ce trimestre. Compte backup hors du domaine.",
    criticality: 5,
    ease: 3,
    templates: ["proc-sauvegarde"],
    dnssi: [{ code: "OPS-08", title: "Sauvegardes" }],
  },
  {
    id: "8.14",
    domain: "technologique",
    title: "Redondance des installations de traitement",
    question:
      "Les composants dont dépend le service (site, lien, VM, cluster) ont-ils une redondance alignée sur les RTO promis ?",
    explanation:
      "HA, site de secours, multi-AZ cloud — à la mesure du métier. Documentez ce qui n'est PAS redondant.",
    whyItMatters:
      "SaaS mono-VM ou plateau mono-FAI : le discours commercial « 99,9 % » ne tient pas à l'audit.",
    howToStart:
      "Pour chaque service critique : SPOF listé + décision assumée ou plan de bascule.",
    criticality: 4,
    ease: 2,
    templates: ["proc-continuité"],
    dnssi: [{ code: "BCP-03", title: "Redondance des traitements" }],
  },
  {
    id: "8.15",
    domain: "technologique",
    title: "Journalisation",
    question:
      "Les événements de sécurité et d'admin sont-ils journalisés, horodatés, protégés contre l'effacement, et conservés assez longtemps ?",
    explanation:
      "Auth, admin, accès data, changements firewall. Centraliser si possible. Un attaquant admin ne doit pas pouvoir tout effacer facilement.",
    whyItMatters:
      "Sans logs, pas d'investigation, pas de preuve client, pas d'audit crédible. 90–180 jours est un plancher fréquent.",
    howToStart:
      "Activez les audit logs M365 / AD / firewall. Envoyez-les hors de la machine source. Définissez la rétention.",
    criticality: 5,
    ease: 3,
    templates: ["proc-incidents"],
    dnssi: [{ code: "OPS-09", title: "Journalisation" }],
  },
  {
    id: "8.16",
    domain: "technologique",
    title: "Surveillance des activités",
    question:
      "Quelqu'un (humain ou outil) regarde-t-il réellement les alertes : connexions anormales, exports, désactivation d'AV ?",
    explanation:
      "Logger sans regarder ne sert à rien. Même une revue hebdo des alertes critiques + une astreinte P1 suffit au début.",
    whyItMatters:
      "Les questionnaires clients demandent un SOC. Un SOC-lite interne (revue + EDR) est un premier palier honnête.",
    howToStart:
      "5 alertes à traiter sous 24 h (MFA bypass, admin added, AV off, mass download, VPN odd country).",
    criticality: 4,
    ease: 3,
    templates: ["proc-incidents"],
    dnssi: [{ code: "OPS-10", title: "Supervision de sécurité" }],
  },
  {
    id: "8.17",
    domain: "technologique",
    title: "Synchronisation des horloges",
    question:
      "Serveurs, firewall, postes critiques sont-ils à l'heure (NTP) pour que les logs soient corrélables ?",
    explanation:
      "Sans horloge commune, un incident est illisible. NTP interne ou source de confiance, écart surveillé.",
    whyItMatters:
      "Corréler VPN, AD et appli client : si 7 minutes de décalage, le REX est bancal et l'auditeur le note.",
    howToStart:
      "NTP unique, vérifiez firewall + AD + hyperviseur. Documentez la source.",
    criticality: 2,
    ease: 5,
    templates: ["proc-incidents"],
    dnssi: [{ code: "OPS-11", title: "Synchronisation de l'heure" }],
  },
  {
    id: "8.18",
    domain: "technologique",
    title: "Utilisation des programmes utilitaires privilégiés",
    question:
      "Les outils puissants (PsExec, software de remote, crack, tuneurs) sont-ils restreints, justifiés, et journalisés ?",
    explanation:
      "Un utilitaire admin est une arme. Catalogue autorisé, interdiction du reste, détection si possible.",
    whyItMatters:
      "Les outils de support à distance non officiels et les « optimiseurs » sont des malwares déguisés sur les plateaux.",
    howToStart:
      "ApplLocker / liste blanche légère + interdiction d'installer. Remote support unique et validé.",
    criticality: 3,
    ease: 3,
    templates: ["pol-acces", "charte-utilisateur"],
    dnssi: [{ code: "ACC-07", title: "Utilitaires à privilèges" }],
  },
  {
    id: "8.19",
    domain: "technologique",
    title: "Installation de logiciels sur les systèmes opérationnels",
    question:
      "Peut-on installer n'importe quoi sur un poste de prod / de plateau, ou seulement un catalogue validé ?",
    explanation:
      "Droit local retiré, store contrôlé, exceptions via ticket. Les systèmes de prod encore plus verrouillés.",
    whyItMatters:
      "Chrome + 15 extensions + WhatsApp Desktop sur un poste d'enregistrement : surface et fuite.",
    howToStart:
      "Retirez les droits admin locaux. Catalogue (navigateur, Office, VPN, soft métier). Ticket pour le reste.",
    criticality: 4,
    ease: 4,
    templates: ["charte-utilisateur"],
    dnssi: [{ code: "OPS-12", title: "Installation de logiciels" }],
  },
  {
    id: "8.20",
    domain: "technologique",
    title: "Sécurité des réseaux",
    question:
      "Le réseau est-il segmenté et filtré (firewall, VLAN plateau / IT / invités / baie) plutôt qu'un plat « tout le monde voit tout » ?",
    explanation:
      "Segmentation, filtrage, durcissement des équipements, pas de telnet, admin hors bande ou VPN dédié.",
    whyItMatters:
      "Plateau, Wi-Fi invité et serveurs sur le même VLAN : un poste agent compromet la baie.",
    howToStart:
      "3 VLAN min (users, serveurs, invités). Firewall par défaut deny. Admin firewall en MFA.",
    criticality: 5,
    ease: 2,
    templates: ["pol-acces"],
    dnssi: [{ code: "COM-02", title: "Sécurité des réseaux" }],
  },
  {
    id: "8.21",
    domain: "technologique",
    title: "Sécurité des services réseau",
    question:
      "Les services réseau (FAI, MPLS client, Zscaler, VPN managé) ont-ils des exigences de sécurité contractuelles et une config revue ?",
    explanation:
      "On ne « prend le lien » sans savoir le chiffrement, le peering, le responsable des règles, le délai de notification.",
    whyItMatters:
      "Lien dédié client mal configuré = pont vers le SI du donneur d'ordre. Votre responsabilité partagée.",
    howToStart:
      "Fiche par lien : qui gère les règles, chiffrement, contacts incident, revue semestrielle.",
    criticality: 4,
    ease: 3,
    templates: ["pol-fournisseurs"],
    dnssi: [{ code: "COM-03", title: "Sécurité des services réseau" }],
  },
  {
    id: "8.22",
    domain: "technologique",
    title: "Cloisonnement des réseaux",
    question:
      "Les environnements qui ne doivent pas se parler (invités, recette, prod, clients différents) sont-ils isolés ?",
    explanation:
      "Cloisonnement logique (VLAN, SG, tenants) et parfois physique selon le contrat (salle / réseau dédié d'un grand compte).",
    whyItMatters:
      "Deux clients banque sur le même plateau attendent souvent une séparation réseau et d'annuaire. C'est dans le contrat.",
    howToStart:
      "Cartographie flux. Isolez invités et recette. Documentez les exceptions (jump host).",
    criticality: 4,
    ease: 2,
    templates: ["pol-acces"],
    dnssi: [{ code: "COM-04", title: "Cloisonnement des réseaux" }],
  },
  {
    id: "8.23",
    domain: "technologique",
    title: "Filtrage web",
    question:
      "L'accès Internet des postes métier est-il filtré (catégories, malware, webmail perso) de façon adaptée au plateau ?",
    explanation:
      "Proxy / DNS filter / SWG. Exceptions justifiées. Le filtrage n'est pas de la censure RH : c'est de la réduction de surface.",
    whyItMatters:
      "Téléchargement de craques et webmail perso = malware + exfiltration. Standard des cahiers des charges BPO.",
    howToStart:
      "Filtrage DNS (catégorie + malware) dès cette semaine. Bloquez les webmails perso sur les postes clients.",
    criticality: 3,
    ease: 4,
    templates: ["charte-utilisateur"],
    dnssi: [{ code: "COM-05", title: "Filtrage des accès web" }],
  },
  {
    id: "8.24",
    domain: "technologique",
    title: "Cryptographie",
    question:
      "Chiffrement en transit et au repos : avez-vous une politique (algos, TLS, disques, sauvegardes, gestion des clés) réellement appliquée ?",
    explanation:
      "TLS partout, disques portables chiffrés, secrets dans un coffre, certificats suivis, interdiction des algos morts.",
    whyItMatters:
      "Exigence contractuelle et 09-08 « mesures appropriées ». Un FTP clair vers le client UE est un finding rouge.",
    howToStart:
      "Politique courte + inventaire : où ce n'est PAS chiffré. Traitez d'abord VPN, webmail, laptops, backups.",
    criticality: 5,
    ease: 3,
    templates: ["pol-crypto"],
    dnssi: [{ code: "CRY-01", title: "Cryptographie" }],
  },
  {
    id: "8.25",
    domain: "technologique",
    title: "Cycle de vie de développement sécurisé",
    question:
      "Le développement (produit ou scripts internes) suit-il des étapes sécurité (exigences, revue, tests) et pas seulement « ça compile » ?",
    explanation:
      "Un SDLC léger : stories sécu, revue, dépendances, tests, séparation des rôles. Adapté à une équipe de 4 comme à 40.",
    whyItMatters:
      "Éditeurs SaaS : c'est le cœur de l'audit. ESN qui livrent du code : le client vous le demandera dans le DPSSI.",
    howToStart:
      "Check-list PR (secrets, authz, logs). Scan dépendances. Definition of done avec 3 critères sécu.",
    criticality: 4,
    ease: 3,
    templates: ["proc-devsec"],
    dnssi: [{ code: "DEV-03", title: "Développement sécurisé" }],
  },
  {
    id: "8.26",
    domain: "technologique",
    title: "Exigences de sécurité des applications",
    question:
      "Les apps (achetées ou développées) ont-elles des exigences sécu écrites (auth, journaux, chiffrement, droits) avant l'achat ou le build ?",
    explanation:
      "On spécifie avant de choisir l'outil. Questionnaire éditeur, clauses, critères d'acceptation.",
    whyItMatters:
      "Un dialer ou un ATS choisi uniquement au prix, sans SSO ni logs : 3 ans de dette avant la certif.",
    howToStart:
      "Grille 12 exigences pour tout nouvel outil métier. RSSI vise l'achat.",
    criticality: 4,
    ease: 4,
    templates: ["proc-devsec", "pol-fournisseurs"],
    dnssi: [{ code: "DEV-04", title: "Exigences de sécurité applicative" }],
  },
  {
    id: "8.27",
    domain: "technologique",
    title: "Architecture et ingénierie sécurisées des systèmes",
    question:
      "Les choix d'architecture (trust boundaries, exposition Internet, comptes de service) suivent-ils des principes écrits et revus ?",
    explanation:
      "Principes : moindre privilège, défense en profondeur, fail-safe, pas d'exposition inutile, secrets hors de l'image.",
    whyItMatters:
      "Une API admin ouverte sur Internet « le temps du debug » est le ticket d'entrée d'un incident.",
    howToStart:
      "Une page de principes + revue d'archi pour tout nouveau service exposé. Diagramme de flux de données.",
    criticality: 4,
    ease: 3,
    templates: ["proc-devsec"],
    dnssi: [{ code: "DEV-05", title: "Architecture sécurisée" }],
  },
  {
    id: "8.28",
    domain: "technologique",
    title: "Codage sécurisé",
    question:
      "Les développeurs connaissent-ils et appliquent-ils des règles de codage sécurisé (injections, XSS, authz, secrets) avec des outils d'aide ?",
    explanation:
      "Standards (OWASP ASVS allégé), linters, formation, revues ciblées sur les surfaces exposées.",
    whyItMatters:
      "Le pentest client trouvera l'IDOR sur le portail. Mieux vaut l'avoir déjà cherché.",
    howToStart:
      "Guide 2 pages + formation 2 h + règle « pas de secret dans le repo » scannée.",
    criticality: 4,
    ease: 3,
    templates: ["proc-devsec"],
    dnssi: [{ code: "DEV-06", title: "Codage sécurisé" }],
  },
  {
    id: "8.29",
    domain: "technologique",
    title: "Tests de sécurité en développement et acceptation",
    question:
      "Avant la mise en prod, y a-t-il des tests sécu (SAST/DAST léger, revue, pentest périodique) et des critères pour dire non au go-live ?",
    explanation:
      "Tester la sécu comme on teste la reco. Un go-live peut être refusé. Fréquence de pentest selon l'exposition.",
    whyItMatters:
      "Les grands comptes exigent un pentest annuel du périmètre qui les touche. Sans budget prévu, la certif glisse.",
    howToStart:
      "Critères d'acceptation sécu sur les releases. Pentest annuel du périmètre exposé, corrections suivies.",
    criticality: 4,
    ease: 3,
    templates: ["proc-devsec"],
    dnssi: [{ code: "DEV-07", title: "Tests de sécurité" }],
  },
  {
    id: "8.30",
    domain: "technologique",
    title: "Développement externalisé",
    question:
      "Si du code ou de l'intégration est fait par des freelances / une usine, les mêmes exigences sécu s'appliquent-elles, avec revue de votre côté ?",
    explanation:
      "Le tiers code dans votre SMSI. Clauses, accès au repo, revue, pas de prod depuis le PC perso du freelance non géré.",
    whyItMatters:
      "Freelance payé à la tâche, repo cloné sur un PC familial : trou fréquent des éditeurs en croissance.",
    howToStart:
      "NDA + accès repo limité + interdiction de copier hors du SI + revue de vos leads sur chaque livraison.",
    criticality: 4,
    ease: 3,
    templates: ["proc-devsec", "pol-fournisseurs", "clause-nda"],
    dnssi: [{ code: "DEV-08", title: "Développement externalisé" }],
  },
  {
    id: "8.31",
    domain: "technologique",
    title: "Séparation des environnements de développement, test et production",
    question:
      "Dev, recette et prod sont-ils séparés (comptes, réseaux, données), avec un passage de prod contrôlé ?",
    explanation:
      "Pas de coder en prod, pas de données réelles en recette, comptes distincts, pipeline qui trace qui a déployé.",
    whyItMatters:
      "Le DSI qui hotfix en prod avec sa session admin : indisponibilité + pas de rollback + finding.",
    howToStart:
      "Trois environnements même modestes. Interdiction des comptes prod au quotidien pour les devs.",
    criticality: 4,
    ease: 3,
    templates: ["proc-devsec"],
    dnssi: [{ code: "DEV-09", title: "Séparation des environnements" }],
  },
  {
    id: "8.32",
    domain: "technologique",
    title: "Gestion des changements",
    question:
      "Les changements SI (firewall, prod, droits, fournisseur) sont-ils demandés, risqués, approuvés, testés, avec rollback ?",
    explanation:
      "Même léger : ticket, impact sécu, fenêtre, validation, comms. Les urgences ont un rattrapage documenté.",
    whyItMatters:
      "Vendredi 18 h, règle firewall « le temps du debug », lundi l'ouverture est toujours là. Classique.",
    howToStart:
      "Tout changement prod / réseau = ticket. CAB express 2 personnes pour le P1. Revue mensuelle des urgences.",
    criticality: 4,
    ease: 3,
    templates: ["proc-devsec"],
    dnssi: [{ code: "OPS-13", title: "Gestion des changements" }],
  },
  {
    id: "8.33",
    domain: "technologique",
    title: "Informations de test",
    question:
      "Les jeux de test sont-ils protégés, anonymisés s'ils viennent de la prod, et détruits après usage ?",
    explanation:
      "La data de test est de la data. Accès restreint, masquage, durée de vie courte, pas de copie sur le laptop du stagiaire.",
    whyItMatters:
      "Dump prod « pour reproduire le bug » envoyé par WeTransfer : incident de confidentialité, pas un détail QA.",
    howToStart:
      "Politique : pas de prod en test sans masquage. Espace recette contrôlé. Purge mensuelle.",
    criticality: 3,
    ease: 4,
    templates: ["proc-devsec", "pol-classif"],
    dnssi: [{ code: "DEV-02", title: "Protection des données de test" }],
  },
  {
    id: "8.34",
    domain: "technologique",
    title: "Protection des SI pendant les tests d'audit",
    question:
      "Les audits et pentests sont-ils cadré (ordre de mission, fenêtre, comptes, restauration) pour ne pas casser la prod ni fuiter les rapports ?",
    explanation:
      "Un test mal cadré est un incident. Périmètre écrit, contacts, interdiction de pivoter hors scope, rapports classifiés.",
    whyItMatters:
      "Pentest d'un client sur votre SI partagé, ou scan agressif un jour de campagne : risque dispo + rapport qui circule trop.",
    howToStart:
      "Modèle d'ordre de mission + fenêtre + compte de test + NDA cabinet + diffusion restreinte du rapport.",
    criticality: 3,
    ease: 4,
    templates: ["pol-fournisseurs", "proc-incidents"],
    dnssi: [{ code: "CNF-05", title: "Encadrement des tests d'audit" }],
  },
];
