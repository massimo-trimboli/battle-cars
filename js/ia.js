let direction

setInterval(vitesse, 1000/2);

function vitesse() {
    //voitureBleu.vitesse += voitureBleu.acceleration;
    //voitureBleu.vitesse = Math.random()*24 - 12;
    voitureBleu.vitesse = Math.random()*15 - 3;

    direction = Math.round(Math.random()*2)

    if (direction == 0) {
        return
    }
    if (direction == 1) {
        voitureBleu.angle += Math.random()*90;
    }
    if (direction == 2) {
        voitureBleu.angle -= Math.random()*90;
    }

    /*if (voitureBleu.vitesse > voitureBleu.vitesseMax) {
        voitureBleu.vitesse = voitureBleu.vitesseMax
    }*/
    //voitureBleu.acceleration
}