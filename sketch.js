var human, humanrun, humanstop;
var virus11, virus2, virusImg1, virusImg2, virusImg3, virusGrp;
var backgroundImg, backGround;
var humanHealth = 5;
var block1, block2, block3, block4, block5;
var gameState = "play";
var invisibleGround;
var log, log1, log2, log3, log4, log5, logGroup;
var vaccine, vaccineImg, vaccineGrp;
var score = 0;
var coinCount = 0;
var vaccineCount = 0;
var coin, coinImg, coinGrp;

function preload() {
    humanrun = loadAnimation("images/run/pc2.png", "images/run/pc3.png", "images/run/pc4.png", "images/run/pc5.png", "images/run/pc6.png", "images/run/pc7.png");
    virusImg1 = loadImage("images/virus/1.png");
    virusImg2 = loadImage("images/virus/2.png");
    virusImg3 = loadImage("images/virus/3.png");
    backgroundImg = loadImage("images/background.png");
    log1 = loadImage("images/block/block1.png");
    log2 = loadImage("images/block/block2.png");
    log3 = loadImage("images/block/block3.png");
    log4 = loadImage("images/block/block4.png");
    log5 = loadImage("images/block/block5.png");
    vaccineImg = loadImage("images/injection1.png");
    humanstop = loadAnimation("images/run/pc4.png");
    coinImg = loadAnimation("images/coins/coin1.png", "images/coins/coin2.png", "images/coins/coin3.png", "images/coins/coin4.png", "images/coins/coin5.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    backGround = createSprite(100, 180, 400, 20);
    backGround.addImage("backGround", backgroundImg);
    backGround.x = backGround.width / 3 - 30;
    backGround.velocityX = -(6 + 3 * score / 100);
    backGround.scale = 1.2;
    human = createSprite(100, height - 250, 100, 100);
    human.addAnimation("run", humanrun);
    human.addAnimation("stop", humanstop);
    human.scale = 1;
    virusGroup = new Group();
    vaccineGrp = new Group();
    logGroup = new Group();
    coinGrp = new Group();
    block1 = createSprite(width / 2, height - 30, 80, 20);
    block2 = createSprite(width / 2 + 80, height - 30, 80, 20);
    block3 = createSprite(width / 2 + 160, height - 30, 80, 20);
    block4 = createSprite(width / 2 + 240, height - 30, 80, 20);
    block5 = createSprite(width / 2 + 320, height - 30, 80, 20);
    invisibleGround = createSprite(width / 2, height - 125, 1500, 10);
    invisibleGround.visible = false;

    score = 0;
    coinCount = 0;
}

function draw() {
    background(255);
    backgroundImg.velocityX += 5;

    if (gameState === "play") {
        score = score + Math.round(getFrameRate() / 60);
        background.velocityX = -(6 + 3 * score / 100);
        if (keyDown(UP_ARROW) && human.y >= 100) {
            human.velocityY = -12;
        }
        human.velocityY = human.velocityY + 0.8;
        if (backGround.x < 0) {
            backGround.x = backGround.width / 3;
        }
        if (vaccineGrp.isTouching(human)) {
            for (var n = 0; n < vaccineGrp.length; n++) {
                if (vaccineGrp.get(n).isTouching(human)) {
                    vaccineGrp.get(n).destroy();
                    vaccineCount += 1;
                }
            }
        }

        if (virusGroup.isTouching(human)) {
            for (var i = 0; i < virusGroup.length; i++) {
                if (virusGroup.get(i).isTouching(human)) {
                    virusGroup.get(i).destroy();
                    humanHealth = humanHealth - 1;
                    if (humanHealth === 4) {
                        block5.visible = false;
                    }
                    if (humanHealth === 3) {
                        block4.visible = false;
                    }
                    if (humanHealth === 2) {
                        block3.visible = false;
                    }
                    if (humanHealth === 1) {
                        block2.visible = false;
                    }
                    if (humanHealth === 0) {
                        block1.visible = false;
                        gameState = "end";
                    }
                }
            }
        }
        if (vaccineCount >= 4 && humanHealth < 5) {
            if (keyDown(R)) {

            }
        }
    }

    spwanVirus();
    spwanVaccine();
    spwanLog();
    spwanCoins();

    human.collide(invisibleGround);
    coinGrp.collide(logGroup);
    drawSprites();
}
textSize(15);
fill("white");
text("vaccine: " + vaccineCount, 500, 80);
text("Score: " + score, 500, 50);
text("Human Health : ", width / 2 - 150, height - 30);
if (gameState === "end") {
    human.changeAnimation("stop", humanstop);
    backGround.velocityX = 0;
    human.velocityY = 0;
    virusGroup.setVelocityXEach(0);
    vaccineGrp.setVelocityXEach(0);
    textSize(30);
    fill("red");
    text("GAME OVER", width / 2, height / 2);
    console.log("GAME OVER");
}

function spwanVirus() {
    if (frameCount % 60 === 0) {
        var virus = createSprite(width, 50, 40, 10);
        virus.y = Math.round(random(400, 100));
        var rand = Math.round(random(1, 3));
        switch (rand) {
            case 1:
                virus.addImage(virusImg1);
                break;
            case 2:
                virus.addImage(virusImg2);
                break;
            case 3:
                virus.addImage(virusImg3);
                break;
            default:
                break;
        }

        virus.scale = 0.3;
        virus.velocityX = -8 - score * 3 / 100;

        virus.lifetime = width / 3;

        virus.depth = human.depth;
        human.depth = human.depth + 1;

        virusGroup.add(virus);
    }
}

function spwanVaccine() {
    if (frameCount % 200 === 0) {
        var vaccine = createSprite(width, 50, 40, 10);
        vaccine.y = Math.round(random(100, 300));
        vaccine.addImage(vaccineImg);
        vaccine.scale = 0.5;
        vaccine.velocityX = -8;

        vaccine.lifetime = width / 3;

        vaccine.depth = human.depth;
        human.depth = human.depth + 1;

        vaccineGrp.add(vaccine);
    }
}

function spwanLog() {
    if (frameCount % 60 === 0) {
        var log = createSprite(width, 50, 40, 10);
        log.y = Math.round(random(400, 100));
        var rand = Math.round(random(1, 3));
        switch (rand) {
            case 1:
                log.addImage(log1);
                break;
            case 2:
                log.addImage(log2);
                break;
            case 3:
                log.addImage(log3);
                break;
            case 4:
                log.addImage(log4);
                break;
            case 5:
                log.addImage(log5);
                break;
            default:
                break;
        }

        log.scale = 0.9;
        log.velocityX = -8 - score * 3 / 100;

        log.lifetime = width / 3;

        log.depth = human.depth;
        human.depth = human.depth + 1;

        logGroup.add(log);
    }
}

function spwanCoins() {
    if (frameCount % 200 === 0) {
        var coin = createSprite(width, 50, 40, 10);
        coin.y = Math.round(random(100, 300));
        coin.addImage(coinImg);
        coin.scale = 0.5;
        coin.velocityX = -8;

        coin.lifetime = width / 3;

        coin.depth = human.depth;
        human.depth = human.depth + 1;

        coinGrp.add(coin);
    }
}