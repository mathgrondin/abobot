export function getPlayerNotFoundMessage(): string {
  const replyOptions = [
    '🤖Désolé, je n\'ai pas compris. Envoie le nom complet, sans fautes, de la personne pour qui tu veux voter!🤖'
  ];
  const randomIndex = Math.floor(Math.random() * replyOptions.length);
  return replyOptions[randomIndex];
}

export function getDuplicateErrorMessage(): string {
  const replyOptions = [
    'Oops, on dirait que tu as deja voté pour ce joueur'
  ];
  const randomIndex = Math.floor(Math.random() * replyOptions.length);
  return replyOptions[randomIndex];
}

const thirdStar = [
  'Yes allo! Très simple. Pour voter, tu n\'as qu\'à écrire le nom du joueur ou de la joueuse (ou son numéro et sa couleur de chandail) pour chacune des Étoiles. On commence avec ta Troisième:',
  'Allo! Super simple: tu n\'auras qu\'à m\'écrire un nom pour chacune des positions (3e Étoile, 2e, 1e). Tu peux aussi voter avec son numéro et sa couleur de chandail. Qui est ta Troisième Étoile?',
  'On va faire ça simple! T\'as juste à m\'écrire un nom (ou le numéro et la couleur de chandail) pour chacune de tes trois Étoiles. Qui mérite la Troisième ce soir?',
  'Parfait! Tu vas voir, c\'est super facile. Fais juste m\'écrire le nom de la joueuse ou du joueur pour chacune des Étoiles (ou son numéro et sa couleur de chandail). Qui a été ta Troisième Étoile ce soir?',
  'C\'est parti! Peux-tu me dire le nom (ou le numéro et la couleur de chandail) de ta Troisième Étoile ce soir?',
  'Alright! Pourrais-tu me dire le nom (ou le numéro et la couleur de chandail) de ta Troisième Étoile ce soir?',
  'Yes allo! On commence avec la Troisième Étoile! Son nom (ou son numéro et sa couleur de chandail) ?',
  'Allo! Pour voter pour tes Étoiles, tu peux m\'écrire son nom (ou le numéro et la couleur de son chandail). Qui mérite selon toi la 3e Étoile ce soir?',
  'Alright, c\'est parti mon kiki. Tu peux m\'écrire le nom (ou le numéro et la couleur de chandail) de chacune de tes Étoiles. À qui veux-tu décerner ta Troisième?',
  'À toi la parole! Tu n\'as qu\'à m\'écrire le nom (ou le numéro et la couleur de chandail) de tes choix d\'Étoiles. Selon toi, qui mérite la Troisième position ce soir?',
  'C\'est parti! Pour voter, tu peux m\'écrire le nom (ou le numéro et la couleur de chandail) de tes Éoiles. Dis-moi, qui devrait repartir avec la Troisième ce soir?',
  'On va faire ça short & sweet! Pour voter, tu peux m\'écrire le nom (ou le numéro et la couleur de chandail) de tes choix. À qui décernes-tu la Troisième Étoile? '
];

export function getThirdStarMessage(): string {
  const randomIndex = Math.floor(Math.random() * thirdStar.length);
  return thirdStar[randomIndex];
}

// const secondStar = [
//   'Bien vu! Quel est ton choix pour la 2e?',
//   'Parfait! Ta 2e Étoile?',
//   'C\'est noté! À qui veux-tu donner la 2e? ',
//   'Ben oui! Ta 2e Étoile?',
//   'Très drôle, en effet! Pour ta 2e?',
//   'Bien vu! 2e Étoile?',
//   'Clairement. À qui revient la 2e Étoile? '
// ];


// const firstStar = [
//   'Parfait ça! On y est presque! Première Étoile?',
//   'Je pensais justement à ça aussi! Ta Première Étoile?',
//   'Hah! Okay! Finalement, ta Première Étoile?',
//   'Clairement. Finalement, ta Première?',
//   'C\'est noté. À qui décernes-tu l\'Étoile Numéro 1 ?',
//   'Ça me va! Finalement ta Première Étoile?',
//   'Yes! Et finalement, ta 1e Étoile?',
//   'Haha okay! Roulement de tambour, ta Première Étoile?',
//   'Parf. Finalement, comme 1e Étoile?'
// ];

const conclusion = [
  'J\'ai noté le tout! Merci pour ta participation et bonne fin de match!',
  'BINGO! J\'envoie ça à l\'animation. Bonne fin de match!',
  'Alright! Tout est en ordre. Merci pour les votes, t\'as gagné!',
  'J\'accepte tes décisions! J\'envoie ça à l\'animation. Bonne fin de match!',
  'C\'est parfait! Merci pour ta participation, et bonne fin de match!',
  'Okay! Merci pour ton vote, vive l\'impro démocratique!',
  'Très bon choix! Merci, j\'ai comptabilisé le tout. C\'est envoyé!',
  'Parfait, ça. Ton vote est bien reçu. Bravo!',
  'Excellent. J\'ai comptabilisé le tout (et je suis ben d\'accord)! Bonne fin de match!',
  'Ha! Excellent choix. J\'ai enregistré le tout, tu verras tout à l\'heure si le reste du public a pensé comme toi! Merci!',
  'C\'est enregistré! Merci pour tes votes! Vive toi! ',
  '10-4. Merci pour ton vote! Bonne soirée!',
  'Hey c\'est parfait ça! Merci pour tes votes, profite bien de ta fin de match!',
  'Yes parfait! Merci, bonne fin de match ! :)'
];

function getReplyFromCount(count: number){
  switch(count){
  case 0: return conclusion;
  default: return conclusion;
  }
}

export function getReply(count: number){
  const replyOptions = getReplyFromCount(count);
  const randomIndex = Math.floor(Math.random() * replyOptions.length);
  return replyOptions[randomIndex];
}
