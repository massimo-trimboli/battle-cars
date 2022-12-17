        //j1
        let voitureRouge = {
            img: new Image(),
            URLImage: "image/car.png",
            x: 10,
            y: 10,
            largeur: 200/4,
            hauteur: 104/4,
            vitesse: 0,
            acceleration: .25,
            deceleration: .1,
            vitesseMax: 6,
            angle: 0
        }

        voitureRouge.img.src = voitureRouge.URLImage;
        voitureRouge.vitesseMin = voitureRouge.vitesseMax*-1;
        
        //j2
        let voitureBleu = {
            img: new Image(),
            URLImage: "image/blueCar.png",
            x: 690,
            y: 420,
            largeur: 200/4,
            hauteur: 104/4,
            vitesse: 0,
            acceleration: .25,
            deceleration: .1,
            vitesseMax: 6,
            angle: 0
        }

        voitureBleu.img.src = voitureBleu.URLImage;
        voitureBleu.vitesseMin = voitureBleu.vitesseMax*-1;

        //controls
        //j1
        let wasd = {
            w: false,
            a: false,
            s: false,
            d: false
        }
        //j2
        let fleche = {
            haut: false,
            gauche: false,
            bas: false,
            droite: false
        }

        //event listener
        document.addEventListener("keydown", presserTouche)
        document.addEventListener("keyup", relacherTouche)
        //////////////////////////////////////////////////// fct

        function deplacerVoitures(voiture, voiture2) {
            conduire(voiture, voiture2);
            dessinerVoiture(voiture);
            dessinerVoiture(voiture2);
        }

        function conduire(voiture, voiture2) {
            //pour tourner la voiture
            tourner(voiture, voiture2);
            //accelerer
            //j1
            if (wasd.w) {voiture.vitesse += voiture.acceleration};
            if (wasd.s) {voiture.vitesse -= voiture.acceleration};
            //j2
            if (fleche.haut) {voiture2.vitesse += voiture2.acceleration};
            if (fleche.bas) {voiture2.vitesse -= voiture2.acceleration};

            //vitesse max
            //j1
            if (voiture.vitesse > voiture.vitesseMax) {voiture.vitesse = voiture.vitesseMax};
            if (voiture.vitesse < voiture.vitesseMin) {voiture.vitesse = voiture.vitesseMin};
            //j2
            if (voiture2.vitesse > voiture2.vitesseMax) {voiture2.vitesse = voiture2.vitesseMax};
            if (voiture2.vitesse < voiture2.vitesseMin) {voiture2.vitesse = voiture2.vitesseMin};

            //natural deceleration
            //j1
            if (!wasd.w && !wasd.s) {
                if (voiture.vitesse > 0) {voiture.vitesse -= voiture.deceleration}
                if (voiture.vitesse < 0) {voiture.vitesse += voiture.deceleration}
            }
            //j2
            if (!fleche.haut && !fleche.bas) {
                if (voiture2.vitesse > 0) {voiture2.vitesse -= voiture2.deceleration}
                if (voiture2.vitesse < 0) {voiture2.vitesse += voiture2.deceleration}
            }

            //calculs vectoriels
            //j1
            let vitesseX = voiture.vitesse * Math.cos(voiture.angle * Math.PI/180)
            let vitesseY = voiture.vitesse * Math.sin(voiture.angle * Math.PI/180)
            //j2
            let xvitesse2 = voiture2.vitesse * Math.cos(voiture2.angle * Math.PI/180)
            let yvitesse2 = voiture2.vitesse * Math.sin(voiture2.angle * Math.PI/180)

            //move
            //j1
            voiture.x += vitesseX
            voiture.y += vitesseY
            //j2
            voiture2.x += xvitesse2
            voiture2.y += yvitesse2

            //limiter les voitures au canvas
            limite(voiture);
            limite(voiture2);
        }

        function tourner(voiture, voiture2) {
            //j1
            if (wasd.d && wasd.w) {voiture.angle += 5};
            if (wasd.d && wasd.s) {voiture.angle += 5};
            if (wasd.a && wasd.w) {voiture.angle -= 5};
            if (wasd.a && wasd.s) {voiture.angle -= 5};
            //j2
            if (fleche.droite && fleche.haut) {voiture2.angle += 5};
            if (fleche.droite && fleche.bas) {voiture2.angle += 5};
            if (fleche.gauche && fleche.haut) {voiture2.angle -= 5};
            if (fleche.gauche && fleche.bas) {voiture2.angle -= 5};
        }

        function limite(voiture) {
            if ((voiture.x < 0) ||
                (voiture.x > leCanvas.width - voiture.hauteur) ||
                (voiture.y < 0) ||
                (voiture.y > leCanvas.height - voiture.hauteur)) {
                    voiture.vitesse *=-1;
                }
        }

        function dessinerVoiture(voiture) {
            //deplacer et tourner les contexte de rendu du canvas
            ctx.save()
            ctx.translate(voiture.x + voiture.largeur/2, voiture.y + voiture.hauteur);
            //tourner et conversion degrés en radians
            ctx.rotate(voiture.angle * Math.PI/180);
            ctx.drawImage(voiture.img, 0,0, voiture.largeur, voiture.hauteur);
            ctx.restore()
        }

        //controls
        function presserTouche(event) {
            event.preventDefault()
            //j1
            if (event.keyCode == 87) {wasd.w = true};
            if (event.keyCode == 65) {wasd.a = true};
            if (event.keyCode == 83) {wasd.s = true};
            if (event.keyCode == 68) {wasd.d = true};
            //j2
            if (event.keyCode == 38) {fleche.haut = true};
            if (event.keyCode == 37) {fleche.gauche = true};
            if (event.keyCode == 40) {fleche.bas = true};
            if (event.keyCode == 39) {fleche.droite = true};
        }
        function relacherTouche(event) {
            event.preventDefault()
            //j1
            if (event.keyCode == 87) {wasd.w = false};
            if (event.keyCode == 65) {wasd.a = false};
            if (event.keyCode == 83) {wasd.s = false};
            if (event.keyCode == 68) {wasd.d = false};

            //apuyer sur espace pour tirer
            if (event.keyCode == 32) {
                mettrePew()
            };

            //j2
            if (event.keyCode == 38) {fleche.haut = false};
            if (event.keyCode == 37) {fleche.gauche = false};
            if (event.keyCode == 40) {fleche.bas = false};
            if (event.keyCode == 39) {fleche.droite = false};

            //recommencer le jeu
            if (event.keyCode == 82 && fin) {
                document.location.reload()
            }
        }