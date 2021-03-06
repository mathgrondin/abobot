# coding: utf-8

import random

welcome = [
        'Salut! Pour voter, il te suffit de m\'écrire le mot Vote!',
        'Hey! Si tu veux voter, tu n\'as qu\'à m\'écrire le mot vote! Je me charge du reste!',
        'Bonsoir! Pour voter, simplement m\'écrire le mot Vote . Rock&Roll !',
        'Salut! Pour voter, écris-moi le mot Vote et je te guiderai pour la suite!',
        'Je ne suis qu\'un robot. Si tu m\'écris le mot Vote, je pourrai te guider ensuite!',
        'Hello! Si tu veux voter pour tes étoiles, fais juste m\'écrire le mot Vote !',
        'Salut! Si tu veux voter pour tes étoiles du match, écris le mot Vote.',
        'Bonjour! Pour faire valoir ton droit de parole pour les étoiles, écris-moi le mot Vote !',
        'Hey! Pour voter pour tes Étoiles, écris-moi le mot Vote !'
]

third_star = [
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
]

second_star = [
        'Bien vu! Quel est ton choix pour la 2e?',
        'Parfait! Ta 2e Étoile?',
        'C\'est noté! À qui veux-tu donner la 2e? ',
        'Ben oui! Ta 2e Étoile?',
        'Très drôle, en effet! Pour ta 2e?',
        'Bien vu! 2e Étoile?',
        'Clairement. À qui revient la 2e Étoile? '
]


first_star = [
        'Parfait ça! On y est presque! Première Étoile?',
        'Je pensais justement à ça aussi! Ta Première Étoile?',
        'Hah! Okay! Finalement, ta Première Étoile?',
        'Clairement. Finalement, ta Première?',
        'C\'est noté. À qui décernes-tu l\'Étoile Numéro 1 ?',
        'Ça me va! Finalement ta Première Étoile?',
        'Yes! Et finalement, ta 1e Étoile?',
        'Haha okay! Roulement de tambour, ta Première Étoile?',
        'Parf. Finalement, comme 1e Étoile?'
]

conclusion = [
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
]

name_duplicate = [
        'Il y en a plus qu\'un.e dans la ligue..! Peux-tu être plus précis s\'il te plait?',
        'Oh, j\'en connais plusieurs... De qui parles-tu, exactement?',
        'Je les mélange toujours ceux-là! Nom de famille?',
        'Oh, j\'en connais genre 200... Peux-tu préciser s\'il te plait?',
        'Oh, c\'est un nom assez commun dans la ligue... Peux-tu préciser?',
        'Oh, je vais avoir besoin que tu sois un brin plus précis… J\'en connais plusieurs dans la ligue..!',
        'Oh, j\'en connais plusieurs... Nom de famille?',
        'Plus précisément?',
        'Nom de famille?',
        'C\'est un nom assez commun… Peux-tu être plus précis s\'il te plait?',
        'Ayayaye, c\'est qu\'il y en a plusieurs avec ce nom-là..! Peux-tu être plus précis s\'il te please?'
]

name_error = [
        'Oops, tu sembles avoir fait une erreur dans le nom... Peux-tu vérifier et réessayer s\'il te plait? (Sinon, tu peux aussi voter avec le numéro et la couleur du chandail)',
        'Je ne reconnais pas ce que tu as écrit... Peux-tu t\'assurer que c\'est bien écrit et réessayer s\'il te please? (Tu peux aussi voter avec le numéro et la couleur du chandail)',
        'Je n\'ai pas été capable de comptabiliser ton vote... Peux-tu vérifier que c\'est bien écrit et me le réécrire s\'il te plait? (Tu peux aussi voter avec le numéro et la couleur du chandail si t\'est pas sûr)',
        'Hmmmm... Pourrais-tu vérifier l\'orthographe et essayer à nouveau, s\'il te plait? (Tu peux aussi voter avec le numéro et la couleur du chandail)',
        'Hmmm, pas de chance, je n\'ai rien trouvé avec cet orthographe-là... Peux-tu réessayer en étant plus précis s\'il te plait?',
        'Woup, ça ne semble pas être bien écrit... Peux-tu essayer de l\'écrire différemment? (Tu peux aussi voter avec le numéro et la couleur du chandail, si t\'es pas sûr)',
        'Hmmm... Je ne reconnais pas ce que tu as écrit. Peut-être pourrais-tu vérifier l\'orthographe s\'il te plait?',
        'Oh flûte, je n\'ai pas saisi pour qui tu voulais voter... Peux-tu essayer en changeant l\'orthographe? (Tu peux aussi voter avec le numéro et la couleur du chandail si t\'est pas sûr!)'
]

answer_sequence = [third_star, second_star, first_star, conclusion]
