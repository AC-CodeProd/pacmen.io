var Game = function(contextBoard, contextBubbles, contextPacmen, contextBlinky, contextPinky, contextInky, contextClyde) {
    EventTarget.call(this);
    this.ctxBoard = contextBoard;
    this.ctxBubbles = contextBubbles;
    this.ctxPacmen = contextPacmen;
    this.ctxBlinky = contextBlinky;
    this.ctxPinky = contextPinky;
    this.ctxInky = contextInky;
    this.ctxClyde = contextClyde;
    //Game
    this.PAUSE = false;
    this.LOCK = false;
    this.HIGHSCORE = 0;
    this.SCORE = 0;
    this.SCORE_BUBBLE = 10;
    this.SCORE_SUPER_BUBBLE = 50;
    this.SCORE_GHOST_COMBO = 200;
    this.LIFES = 2;
    this.GAMEOVER = false;
    this.LEVEL = 1;
    this.LEVEL_NEXT_TIMER = -1;
    this.LEVEL_NEXT_STATE = 0;
    this.TIME_GENERAL_TIMER = -1;
    this.TIME_GAME = 0;
    this.TIME_LEVEL = 0;
    this.TIME_LIFE = 0;
    this.TIME_FRUITS = 0;
    this.PATHS = new Array();
    //Bubbles
    this.BUBBLES = [];
    this.BUBBLES_X_START = 30;
    this.BUBBLES_X_END = 518;
    this.BUBBLES_GAP = ((this.BUBBLES_X_END - this.BUBBLES_X_START) / 25);
    this.BUBBLES_Y_START = 26;
    this.BUBBLES_Y_END = 522;
    this.BUBBLES_SIZE = 3;
    this.BUBBLES_COUNTER = 0;
    this.SUPER_BUBBLES = [];
    this.SUPER_BUBBLES_SIZE = 8;
    this.SUPER_BUBBLES_BLINK = false;
    this.SUPER_BUBBLES_BLINK_STATE = 0;
    this.SUPER_BUBBLES_BLINK_TIMER = -1;
    this.SUPER_BUBBLES_BLINK_SPEED = 300;
    //Ghost
    this.GHOST_BLINKY_POSITION_X = 276;
    this.GHOST_BLINKY_POSITION_Y = 204;
    this.GHOST_BLINKY_DIRECTION = 1;
    this.GHOST_BLINKY_COLOR = "#ed1b24";
    this.GHOST_BLINKY_MOVING_TIMER = -1;
    this.GHOST_BLINKY_MOVING = false;
    this.GHOST_BLINKY_BODY_STATE = 0;
    this.GHOST_BLINKY_STATE = 0;
    this.GHOST_BLINKY_EAT_TIMER = null;
    this.GHOST_BLINKY_AFFRAID_TIMER = null;
    this.GHOST_BLINKY_AFFRAID_STATE = 0;
    this.GHOST_BLINKY_TUNNEL = false;
    this.GHOST_PINKY_POSITION_X = 276;
    this.GHOST_PINKY_POSITION_Y = 258;
    this.GHOST_PINKY_DIRECTION = 2;
    this.GHOST_PINKY_COLOR = "#feaec9";
    this.GHOST_PINKY_MOVING_TIMER = -1;
    this.GHOST_PINKY_MOVING = false;
    this.GHOST_PINKY_BODY_STATE = 1;
    this.GHOST_PINKY_STATE = 0;
    this.GHOST_PINKY_EAT_TIMER = null;
    this.GHOST_PINKY_AFFRAID_TIMER = null;
    this.GHOST_PINKY_AFFRAID_STATE = 0;
    this.GHOST_PINKY_TUNNEL = false;
    this.GHOST_INKY_POSITION_X = 238;
    this.GHOST_INKY_POSITION_Y = 258;
    this.GHOST_INKY_DIRECTION = 3;
    this.GHOST_INKY_COLOR = "#4adecb";
    this.GHOST_INKY_MOVING_TIMER = -1;
    this.GHOST_INKY_MOVING = false;
    this.GHOST_INKY_BODY_STATE = 2;
    this.GHOST_INKY_STATE = 0;
    this.GHOST_INKY_EAT_TIMER = null;
    this.GHOST_INKY_AFFRAID_TIMER = null;
    this.GHOST_INKY_AFFRAID_STATE = 0;
    this.GHOST_INKY_TUNNEL = false;
    this.GHOST_CLYDE_POSITION_X = 314;
    this.GHOST_CLYDE_POSITION_Y = 258;
    this.GHOST_CLYDE_DIRECTION = 4;
    this.GHOST_CLYDE_COLOR = "#f99c00";
    this.GHOST_CLYDE_MOVING_TIMER = -1;
    this.GHOST_CLYDE_MOVING = false;
    this.GHOST_CLYDE_BODY_STATE = 3;
    this.GHOST_CLYDE_STATE = 0;
    this.GHOST_CLYDE_EAT_TIMER = null;
    this.GHOST_CLYDE_AFFRAID_TIMER = null;
    this.GHOST_CLYDE_AFFRAID_STATE = 0;
    this.GHOST_CLYDE_TUNNEL = false;
    this.GHOST_AFFRAID_COLOR = "#2d3eff";
    this.GHOST_AFFRAID_FINISH_COLOR = "#fff";
    this.GHOST_POSITION_STEP = 2;
    this.GHOST_MOVING_SPEED = 15;
    this.GHOST_TUNNEL_MOVING_SPEED = 35;
    this.GHOST_AFFRAID_MOVING_SPEED = 40;
    this.GHOST_EAT_MOVING_SPEED = 6;
    this.GHOST_AFFRAID_TIME = 8500;
    this.GHOST_EAT_TIME = 5500;
    this.GHOST_BODY_STATE_MAX = 6;
    //Pacmen
    this.PACMEN_DIRECTION = 3;
    this.PACMEN_DIRECTION_TRY = -1;
    this.PACMEN_DIRECTION_TRY_TIMER = null;
    this.PACMEN_DIRECTION_TRY_CANCEL = 1000;
    this.PACMEN_POSITION_X = 276;
    this.PACMEN_POSITION_Y = 416;
    this.PACMEN_POSITION_STEP = 2;
    this.PACMEN_MOUNTH_STATE = 3;
    this.PACMEN_MOUNTH_STATE_MAX = 6;
    this.PACMEN_SIZE = 16;
    this.PACMEN_MOVING = false;
    this.PACMEN_MOVING_TIMER = -1;
    this.PACMEN_MOVING_SPEED = 15;
    this.PACMEN_EAT_GAP = 15;
    this.PACMEN_GHOST_GAP = 20;
    this.PACMEN_FRUITS_GAP = 15;
    this.PACMEN_KILLING_TIMER = -1;
    this.PACMEN_KILLING_SPEED = 100;
    this.PACMEN_DEAD = false;
    this.GAME_START = -1;
    this.IS_GAME_START = false;
    this.GAME_SPEED = 15;
};
Game.prototype = new EventTarget();
Game.prototype.constructor = Game;
Game.prototype.onInitGame = function() {
    this.onInitPaths();
    // this.onDebugPaths();
    this.onDrawBoard();
    this.onDrawBoardDoor();
    this.onDrawBubbles();
    this.onBlinkSuperBubbles();
    this.onDrawGhosts();
    this.onMoveGhosts();
    this.onDrawPacmen();
};
Game.prototype.onWin = function() {
    this.LOCK = true;
    this.onStopPacmen();
    this.onStopGhosts();
    this.onStopBlinkSuperBubbles();
    // this.onStopTimes();

    this.onEraseGhosts();

    // setTimeout("prepareNextLevel()", 1000);
};
Game.prototype.onGameover = function() {
    this.GAMEOVER = true;
    this.onStopTimes();
    this.onErasePacmen();
    this.onEraseGhosts();
    this.onResetPacmen();
    this.onResetGhosts();
    this.TIME_GAME = 0;
    this.TIME_LEVEL = 0;
    this.TIME_LIFE = 0;
    this.TIME_FRUITS = 0;
    this.LIFES = 2;
    this.LEVEL = 1;
    this.SCORE = 0;
}
Game.prototype.onNextLevel = function() {
    this.LOCK = false;
    this.LEVEL++;
    this.onErasePacmen();
    this.onEraseGhosts();
    this.onResetPacmen();
    this.onResetGhosts();
    this.onInitGame();
    this.TIME_LEVEL = 0;
    this.TIME_LIFE = 0;
    this.TIME_FRUITS = 0;
}
Game.prototype.onRetry = function() {
    // this.onStopTimes();
    this.onErasePacmen();
    this.onEraseGhosts();
    this.onResetPacmen();
    this.onResetGhosts();
    this.onDrawPacmen();
    this.onDrawGhosts();
    this.onMoveGhosts();
    this.TIME_LIFE = 0;
    this.TIME_FRUITS = 0;
}
Game.prototype.onScoreEvent = function() {
    this.fire('onScoreEvent');
};
Game.prototype.onHighScoreEvent = function() {
    this.fire('onHighScoreEvent');
};
Game.prototype.onScore = function(s, type) {
    var scoreBefore = (this.SCORE / 10000) | 0;
    this.SCORE += s;
    var scoreAfter = (this.SCORE / 10000) | 0;
    if (scoreAfter > scoreBefore) {
        this.onLifes(+1);
    }
    if (this.SCORE > this.HIGHSCORE) {
        this.HIGHSCORE = this.SCORE;
        this.onHighScoreEvent();
    }
    if (this.type && (this.type === "clyde" || this.type === "pinky" || this.type === "inky" || this.type === "blinky")) {
        this.onErasePacmen();
        this.onEraseGhost(type);
        this.SCORE_GHOST_COMBO = this.SCORE_GHOST_COMBO * 2;
    } else if (this.type && this.type === "fruit") {}
    this.onScoreEvent();
};
Game.prototype.getScorePacmen = function() {
    return this.SCORE;
};
Game.prototype.getHighScorePacmen = function() {
    return this.HIGHSCORE;
};

function Timer(callback, delay) {
    var id, started, remaining = delay,
        running
    this.start = function() {
        running = true
        started = new Date()
        id = setTimeout(callback, remaining)
    }
    this.resume = function() {
        running = true
        started = new Date()
        id = setTimeout(callback, remaining)
    }
    this.cancel = function() {
        running = false
        clearTimeout(id)
        remaining = 0;
    }
    this.pause = function() {
        running = false
        clearTimeout(id)
        remaining -= new Date() - started
    }
    this.remain = function() {
        if (running) {
            this.pause()
            this.start()
        }
        return remaining
    }
    this.isRunning = function() {
        return running
    }
    this.start();
};
String.prototype.toCapitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};