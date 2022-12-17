/*//création objet pew
let pew = {
    img: new Image(),
    URLImage: "image/pew.png",
    x:0,
    y:0,
    angle:0,
    vitesse:7,
    index:0,
    sourceX:0,
    nbImages:6,
    hauteur:32,
    largeur:32
}

pew.img.src = pew.URLImage;*/

let lesPew = []
// placer les pew
function mettrePew() {
//création objet pew
let pew = {
    img: new Image(),
    URLImage: "image/pew.png",
    x:0,
    y:0,
    angle:0,
    vitesse:7,
    index:0,
    sourceX:0,
    nbImages:6,
    hauteur:32,
    largeur:32,
    nouveau: true
}
//doner a pew les mêmes coordonnées et angle que la voiture
pew.x = voitureRouge.x
pew.y = voitureRouge.y
pew.angle = voitureRouge.angle;
//charger l'image des pew
pew.img.src = pew.URLImage;

//ajouter pew au tableau lesPew
lesPew.push(pew);
}

//fonction pour deplacer les pew
function deplacerPew() {
    for (let unPew of lesPew) {
        //doner a pew les mêmes coordonnées et angle que la voiture
        if (unPew.nouveau) {
            unPew.x = voitureRouge.x;
            unPew.y = voitureRouge.y;
            unPew.angle = voitureRouge.angle;
            unPew.nouveau = false;
        }

        //calculs vectoriels
        let vitesseX = unPew.vitesse * Math.cos(unPew.angle * Math.PI/180);
        let vitesseY = unPew.vitesse * Math.sin(unPew.angle * Math.PI/180);

        //deplacer le pew
        unPew.x += vitesseX;
        unPew.y += vitesseY;

        //limite pew
        if (unPew.x + unPew.largeur < 0 || unPew.x > leCanvas.width || unPew.y > leCanvas.height || unPew.y + unPew.hauteur < 0) {
            let index = lesPew.indexOf(unPew);
            lesPew.splice(index, 1)
        }

        //dessiner le pew
        ctx.drawImage(unPew.img, unPew.sourceX, 0, unPew.largeur, unPew.hauteur, unPew.x, unPew.y, unPew.largeur,unPew.hauteur);
    }
}

//fonction pour gerer l'animation
function animPew() {
    for (let unPew of lesPew) {
        unPew.sourceX = unPew.index * unPew.largeur;
        unPew.index++;

        if (unPew.index == unPew.nbImages) {
            unPew.index = 0
        }
    }
}