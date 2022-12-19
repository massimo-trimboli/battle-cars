function colisionVoitures() {
    let siColision = detecterCollisionEntreCercles(voitureRouge, voitureBleu);

    //faire rebondir les voitures s'ils se frappent
    if (siColision) {
        voitureRouge.vitesse *= -1;
        voitureBleu.vitesse *= -1;
    }
}

function colisionPew() {
    for (let unPew of lesPew) {
        let siColision = detecterCollisionEntreCercles(voitureBleu, unPew);

        if (siColision) {
            //detruire tous les pew
            let tousPew = lesPew.length;
            lesPew.splice(0, tousPew);
            vie--;

            //jouer un son
            sonPew.currentTime = 0;
            sonPew.play();
        }
    }
}

function detecterCollisionEntreCercles(cercle1, cercle2) {
    //Calculs des rayons
    let rayonCercle1 = cercle1.largeur / 2;
    let rayonCercle2 = cercle2.largeur / 2;
    //Distance entre les 2 cercles sur l'axe des X
    let distanceX = cercle1.x + rayonCercle1 - (cercle2.x + rayonCercle2);
    //Distance entre les 2 cercles sur l'axe des Y
    let distanceY = cercle1.y + rayonCercle1 - (cercle2.y + rayonCercle2);
    //Calcul de la distance réelle entre les deux cercles (hypoténuse...)
    let distanceXY = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    //Si la distance entre les 2 cercles est plus petite que la somme de leur rayon
    //Il y a une collision
    if (distanceXY < rayonCercle1 + rayonCercle2) {
        return true;
    } else {
        return false;
    }
}