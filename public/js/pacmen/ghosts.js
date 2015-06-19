Game.prototype.onDrawGhosts = function() {
    this.onDrawGhost("blinky");
    this.onDrawGhost('pinky');
    this.onDrawGhost('inky');
    this.onDrawGhost("clyde");
};
Game.prototype.onDrawGhost = function(ghost) {
    if (eval('this.GHOST_' + ghost.toUpperCase() + '_STATE === 0')) {
        eval('this.ctx' + ghost.toCapitalize() + '.fillStyle = this.GHOST_' + ghost.toUpperCase() + '_COLOR');
    } else {
        if (eval('this.GHOST_' + ghost.toUpperCase() + '_AFFRAID_STATE === 1')) {
            eval('this.ctx' + ghost.toCapitalize() + '.fillStyle = this.GHOST_AFFRAID_FINISH_COLOR');
        } else {
            eval('this.ctx' + ghost.toCapitalize() + '.fillStyle = this.GHOST_AFFRAID_COLOR');
        }
    }
    eval('this.onDrawHelperGhost(this.ctx' + ghost.toCapitalize() + ',this.GHOST_' + ghost.toUpperCase() + '_POSITION_X, this.GHOST_' + ghost.toUpperCase() + '_POSITION_Y, this.GHOST_' + ghost.toUpperCase() + '_DIRECTION, this.GHOST_' + ghost.toUpperCase() + '_BODY_STATE, this.GHOST_' + ghost.toUpperCase() + '_STATE, this.GHOST_' + ghost.toUpperCase() + '_AFFRAID_STATE)');
    eval('this.ctx' + ghost.toCapitalize() + '.closePath()');
};
Game.prototype.onDrawHelperGhost = function(ctx, x, y, d, b, s, a) {
    if (s != -1) {
        ctx.beginPath();
        ctx.moveTo((x - 15), (y + 16));
        ctx.lineTo((x - 15), (y + 16) - 18);
        ctx.bezierCurveTo((x - 15), (y + 16) - 26, (x - 15) + 6, (y + 16) - 32, (x - 15) + 14, (y + 16) - 32);
        ctx.bezierCurveTo((x - 15) + 22, (y + 16) - 32, (x - 15) + 28, (y + 16) - 26, (x - 15) + 28, (y + 16) - 18);
        ctx.lineTo((x - 15) + 28, (y + 16));
        if (b < 4) {
            ctx.lineTo((x - 15) + 23.333, (y + 16) - 5.333);
            ctx.lineTo((x - 15) + 18.666, (y + 16));
            ctx.lineTo((x - 15) + 14, (y + 16) - 5.333);
            ctx.lineTo((x - 15) + 9.333, (y + 16));
            ctx.lineTo((x - 15) + 4.666, (y + 16) - 5.333);
        } else {
            ctx.lineTo((x - 15) + 24.333, (y + 16) - 5.333);
            ctx.lineTo((x - 15) + 20.666, (y + 16));
            ctx.lineTo((x - 15) + 17.333, (y + 16) - 5.333);
            ctx.lineTo((x - 15) + 12.666, (y + 16));
            ctx.lineTo((x - 15) + 9, (y + 16) - 5.333);
            ctx.lineTo((x - 15) + 5.333, (y + 16));
            ctx.lineTo((x - 15) + 2.666, (y + 16) - 5.333);
        }
        ctx.lineTo((x - 15), (y + 16));
        ctx.fill();
    }
    var eyesX = 0;
    var eyesY = 0;
    if (d === 4) {
        eyesY = -5;
    } else if (d === 1) {
        eyesX = +2;
    } else if (d === 2) {
        eyesY = 0;
        eyesY = +5;
    } else if (d === 3) {
        eyesX = -3;
    }
    if (s === 0 || s === -1) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.moveTo((x - 15) + 8 + eyesX, (y + 16) - 24 + eyesY);
        ctx.bezierCurveTo((x - 15) + 5 + eyesX, (y + 16) - 24 + eyesY, (x - 15) + 4 + eyesX, (y + 16) - 21 + eyesY, (x - 15) + 4 + eyesX, (y + 16) - 19 + eyesY);
        ctx.bezierCurveTo((x - 15) + 4 + eyesX, (y + 16) - 17 + eyesY, (x - 15) + 5 + eyesX, (y + 16) - 14 + eyesY, (x - 15) + 8 + eyesX, (y + 16) - 14 + eyesY);
        ctx.bezierCurveTo((x - 15) + 11 + eyesX, (y + 16) - 14 + eyesY, (x - 15) + 12 + eyesX, (y + 16) - 17 + eyesY, (x - 15) + 12 + eyesX, (y + 16) - 19 + eyesY);
        ctx.bezierCurveTo((x - 15) + 12 + eyesX, (y + 16) - 21 + eyesY, (x - 15) + 11 + eyesX, (y + 16) - 24 + eyesY, (x - 15) + 8 + eyesX, (y + 16) - 24 + eyesY);
        ctx.moveTo((x - 15) + 20 + eyesX, (y + 16) - 24 + eyesY);
        ctx.bezierCurveTo((x - 15) + 17 + eyesX, (y + 16) - 24 + eyesY, (x - 15) + 16 + eyesX, (y + 16) - 21 + eyesY, (x - 15) + 16 + eyesX, (y + 16) - 19 + eyesY);
        ctx.bezierCurveTo((x - 15) + 16 + eyesX, (y + 16) - 17 + eyesY, (x - 15) + 17 + eyesX, (y + 16) - 14 + eyesY, (x - 15) + 20 + eyesX, (y + 16) - 14 + eyesY);
        ctx.bezierCurveTo((x - 15) + 23 + eyesX, (y + 16) - 14 + eyesY, (x - 15) + 24 + eyesX, (y + 16) - 17 + eyesY, (x - 15) + 24 + eyesX, (y + 16) - 19 + eyesY);
        ctx.bezierCurveTo((x - 15) + 24 + eyesX, (y + 16) - 21 + eyesY, (x - 15) + 23 + eyesX, (y + 16) - 24 + eyesY, (x - 15) + 20 + eyesX, (y + 16) - 24 + eyesY);
        ctx.fill();
        if (d === 4) {
            eyesY = -9;
            eyesX = 2;
        } else if (d === 1) {
            eyesX = +6;
        } else if (d === 2) {
            eyesY = +8;
            eyesX = 2;
        } else if (d === 3) {}
        ctx.fillStyle = "#0000fa";
        ctx.beginPath();
        ctx.arc((x - 15) + 18 + eyesX, (y + 16) - 18 + eyesY, 2, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.beginPath();
        ctx.arc((x - 15) + 6 + eyesX, (y + 16) - 18 + eyesY, 2, 0, Math.PI * 2, true);
        ctx.fill();
    } else {
        if (a === 1) {
            ctx.fillStyle = "#ee2933";
        } else {
            ctx.fillStyle = "#e5bed0";
        }
        ctx.beginPath();
        ctx.arc((x - 15) + 18, (y + 13) - 17, 2, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.beginPath();
        ctx.arc((x - 15) + 10, (y + 13) - 17, 2, 0, Math.PI * 2, true);
        ctx.fill();
        if (a === 1) {
            ctx.strokeStyle = "#ee2933";
        } else {
            ctx.strokeStyle = "#e5bed0";
        }
        ctx.beginPath();
        ctx.lineTo((x - 14.333) + 24, (y + 6));
        ctx.lineTo((x - 14.333) + 21, (y + 6) - 3);
        ctx.lineTo((x - 14.333) + 17, (y + 6));
        ctx.lineTo((x - 14.333) + 14, (y + 6) - 3);
        ctx.lineTo((x - 14.333) + 10, (y + 6));
        ctx.lineTo((x - 14.333) + 7, (y + 6) - 3);
        ctx.lineTo((x - 14.333) + 3, (y + 6));
        ctx.stroke();
    }
};
Game.prototype.onResetGhosts = function() {
    this.onStopGhosts();
    this.GHOST_BLINKY_POSITION_X = 276;
    this.GHOST_BLINKY_POSITION_Y = 204;
    this.GHOST_BLINKY_DIRECTION = 1;
    this.GHOST_BLINKY_MOVING_TIMER = -1;
    this.GHOST_BLINKY_MOVING = false;
    this.GHOST_BLINKY_BODY_STATE = 0;
    this.GHOST_BLINKY_STATE = 0;
    this.GHOST_BLINKY_EAT_TIMER = null;
    this.GHOST_BLINKY_AFFRAID_TIMER = null;
    this.GHOST_BLINKY_AFFRAID_STATE = 0;
    this.GHOST_PINKY_POSITION_X = 276;
    this.GHOST_PINKY_POSITION_Y = 258;
    this.GHOST_PINKY_DIRECTION = 2;
    this.GHOST_PINKY_MOVING_TIMER = -1;
    this.GHOST_PINKY_MOVING = false;
    this.GHOST_PINKY_BODY_STATE = 1;
    this.GHOST_PINKY_STATE = 0;
    this.GHOST_PINKY_EAT_TIMER = null;
    this.GHOST_PINKY_AFFRAID_TIMER = null;
    this.GHOST_PINKY_AFFRAID_STATE = 0;
    this.GHOST_INKY_POSITION_X = 238;
    this.GHOST_INKY_POSITION_Y = 258;
    this.GHOST_INKY_DIRECTION = 3;
    this.GHOST_INKY_MOVING_TIMER = -1;
    this.GHOST_INKY_MOVING = false;
    this.GHOST_INKY_BODY_STATE = 2;
    this.GHOST_INKY_STATE = 0;
    this.GHOST_INKY_EAT_TIMER = null;
    this.GHOST_INKY_AFFRAID_TIMER = null;
    this.GHOST_INKY_AFFRAID_STATE = 0;
    this.GHOST_CLYDE_POSITION_X = 314;
    this.GHOST_CLYDE_POSITION_Y = 258;
    this.GHOST_CLYDE_DIRECTION = 4;
    this.GHOST_CLYDE_MOVING_TIMER = -1;
    this.GHOST_CLYDE_MOVING = false;
    this.GHOST_CLYDE_BODY_STATE = 3;
    this.GHOST_CLYDE_STATE = 0;
    this.GHOST_CLYDE_EAT_TIMER = null;
    this.GHOST_CLYDE_AFFRAID_TIMER = null;
    this.GHOST_CLYDE_AFFRAID_STATE = 0;
};
Game.prototype.onStopGhost = function(ghost) {
    if (eval('this.GHOST_' + ghost.toUpperCase() + '_STATE === 1')) {
        eval('if(this.GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER !== null) this.GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER.cancel()');
        eval('this.GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER = null');
        eval('this.GHOST_' + ghost.toUpperCase() + '_STATE = 0');
    } else if (eval('this.GHOST_' + ghost.toUpperCase() + '_STATE === -1')) {
        eval('if(this.GHOST_' + ghost.toUpperCase() + '_EAT_TIMER !== null) this.GHOST_' + ghost.toUpperCase() + '_EAT_TIMER.cancel()');
        eval('this.GHOST_' + ghost.toUpperCase() + '_EAT_TIMER = null');
        eval('this.GHOST_' + ghost.toUpperCase() + '_STATE = 0');
    }
    if (eval('this.GHOST_' + ghost.toUpperCase() + '_MOVING_TIMER != -1')) {
        eval('clearInterval(this.GHOST_' + ghost.toUpperCase() + '_MOVING_TIMER)');
        eval('this.GHOST_' + ghost.toUpperCase() + '_MOVING_TIMER = -1');
        eval('this.GHOST_' + ghost.toUpperCase() + '_MOVING = false');
    }
};
Game.prototype.onStopGhosts = function() {
    this.onStopGhost('blinky');
    this.onStopGhost('pinky');
    this.onStopGhost('inky');
    this.onStopGhost('clyde');
};
Game.prototype.onAffraidGhosts = function() {
    this.SCORE_GHOST_COMBO = 200;
    this.onAffraidGhost('blinky');
    this.onAffraidGhost('pinky');
    this.onAffraidGhost('inky');
    this.onAffraidGhost('clyde');
};
Game.prototype.onAffraidGhost = function(ghost) {
    if (eval('this.GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER !== null')) {
        eval('this.GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER.cancel()');
        eval('this.GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER = null');
    }
    eval('this.GHOST_' + ghost.toUpperCase() + '_AFFRAID_STATE = 0');
    if (eval('this.GHOST_' + ghost.toUpperCase() + '_STATE === 0') || eval('this.GHOST_' + ghost.toUpperCase() + '_STATE === 1')) {
        this.onStopGhost(ghost);
        eval('this.GHOST_' + ghost.toUpperCase() + '_STATE = 1');
        this.onMoveGhost(ghost);
        eval('this.GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER = new Timer((function(){this.onCancelAffraidGhost(ghost);}).bind(this), this.GHOST_AFFRAID_TIME)');
    }
};
Game.prototype.onCancelAffraidGhost = function(ghost) {
    console.log('onCancelAffraidGhost : ' + ghost + ' STATE: ' + eval('this.GHOST_' + ghost.toUpperCase() + '_STATE'));
    if (eval('this.GHOST_' + ghost.toUpperCase() + '_STATE === 1')) {
        eval('this.GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER.cancel()');
        eval('this.GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER = null');
        this.onStopGhost(ghost);
        eval('this.GHOST_' + ghost.toUpperCase() + '_STATE = 0');
        this.onMoveGhost(ghost);
    }
};
Game.prototype.onStartEatGhost = function(ghost) {
    console.log('onStartEatGhost : ' + ghost);
    this.LOCK = true;
    console.log(eval('this.GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER'));
    if (eval('this.GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER !== null')) {
        eval('this.GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER.cancel()');
        eval('this.GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER = null');
    }
    this.onScore(this.SCORE_GHOST_COMBO, ghost);
    this.onPauseGhosts();
    this.onPausePacmen();
    setTimeout(this.onEatGhost(ghost), 600);
};
Game.prototype.onEatGhost = function(ghost) {
    console.log('onEatGhost : ' + ghost);
    if (eval('this.GHOST_' + ghost.toUpperCase() + '_STATE === 1')) {
        eval('this.GHOST_' + ghost.toUpperCase() + '_STATE = -1');
        eval('this.GHOST_' + ghost.toUpperCase() + '_EAT_TIMER = new Timer((function(){this.onCancelEatGhost(ghost);}).bind(this), this.GHOST_EAT_TIME)');
        eval('this.GHOST_' + ghost.toUpperCase() + '_EAT_TIMER.pause()');
    }
    this.onResumeGhosts();
    this.onResumePacmen();
    this.LOCK = false;
};
Game.prototype.onCancelEatGhost = function(ghost) {
    if (eval('this.GHOST_' + ghost.toUpperCase() + '_STATE === -1')) {
        eval('this.GHOST_' + ghost.toUpperCase() + '_EAT_TIMER = null');
        this.onStopGhost(ghost);
        eval('this.GHOST_' + ghost.toUpperCase() + '_STATE = 0');
        this.onMoveGhost(ghost);
    }
};
Game.prototype.onMoveGhosts = function() {
    this.onMoveGhost('blinky');
    this.onMoveGhost('pinky');
    this.onMoveGhost('inky');
    this.onMoveGhost('clyde');
};
Game.prototype.onMoveGhost = function(ghost) {
    if (eval('this.GHOST_' + ghost.toUpperCase() + '_MOVING === false')) {
        eval('this.GHOST_' + ghost.toUpperCase() + '_MOVING = true;');
        var speed = -1;
        if (eval('this.GHOST_' + ghost.toUpperCase() + '_STATE === 1')) {
            speed = this.GHOST_AFFRAID_MOVING_SPEED;
        } else if (eval('this.GHOST_' + ghost.toUpperCase() + '_STATE === 0')) {
            if (eval('this.GHOST_' + ghost.toUpperCase() + '_TUNNEL === false')) {
                speed = this.GHOST_MOVING_SPEED;
            } else {
                speed = this.GHOST_TUNNEL_MOVING_SPEED;
            }
        } else {
            speed = this.GHOST_EAT_MOVING_SPEED;
        }
        // eval('this.GHOST_' + ghost.toUpperCase() + '_MOVING_TIMER = setInterval("this.onMoveGhost(\'' + ghost + '\')", ' + speed + ');');
        eval('this.GHOST_' + ghost.toUpperCase() + '_MOVING_TIMER = setInterval((function(){this.onMoveGhost(ghost);}).bind(this), ' + speed + ');');
    } else {
        this.onChangeDirection(ghost);
        if (eval('this.GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER !== null')) {
            var remain = eval('this.GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER.remain();');
            if ((remain >= 2500 && remain < 3000) || (remain >= 1500 && remain <= 2000) || (remain >= 500 && remain <= 1000) || (remain < 0)) {
                eval('this.GHOST_' + ghost.toUpperCase() + '_AFFRAID_STATE = 1;')
            } else if ((remain > 2000 && remain < 2500) || (remain > 1000 && remain < 1500) || (remain >= 0 && remain < 500)) {
                eval('this.GHOST_' + ghost.toUpperCase() + '_AFFRAID_STATE = 0;')
            }
        }
        if (this.onCanMoveGhost(ghost)) {
            this.onEraseGhost(ghost);
            if (eval('this.GHOST_' + ghost.toUpperCase() + '_BODY_STATE < this.GHOST_BODY_STATE_MAX')) {
                eval('this.GHOST_' + ghost.toUpperCase() + '_BODY_STATE ++;');
            } else {
                eval('this.GHOST_' + ghost.toUpperCase() + '_BODY_STATE = 0;');
            }
            if (eval('this.GHOST_' + ghost.toUpperCase() + '_DIRECTION === 1')) {
                eval('this.GHOST_' + ghost.toUpperCase() + '_POSITION_X += this.GHOST_POSITION_STEP;');
            } else if (eval('this.GHOST_' + ghost.toUpperCase() + '_DIRECTION === 2')) {
                eval('this.GHOST_' + ghost.toUpperCase() + '_POSITION_Y += this.GHOST_POSITION_STEP;');
            } else if (eval('this.GHOST_' + ghost.toUpperCase() + '_DIRECTION === 3')) {
                eval('this.GHOST_' + ghost.toUpperCase() + '_POSITION_X -= this.GHOST_POSITION_STEP;');
            } else if (eval('this.GHOST_' + ghost.toUpperCase() + '_DIRECTION === 4')) {
                eval('this.GHOST_' + ghost.toUpperCase() + '_POSITION_Y -= this.GHOST_POSITION_STEP;');
            }
            if (eval('this.GHOST_' + ghost.toUpperCase() + '_POSITION_X === 2') && eval('this.GHOST_' + ghost.toUpperCase() + '_POSITION_Y === 258')) {
                eval('this.GHOST_' + ghost.toUpperCase() + '_POSITION_X = 548;');
                eval('this.GHOST_' + ghost.toUpperCase() + '_POSITION_Y = 258;');
            } else if (eval('this.GHOST_' + ghost.toUpperCase() + '_POSITION_X === 548') && eval('this.GHOST_' + ghost.toUpperCase() + '_POSITION_Y === 258')) {
                eval('this.GHOST_' + ghost.toUpperCase() + '_POSITION_X = 2;');
                eval('this.GHOST_' + ghost.toUpperCase() + '_POSITION_Y = 258;');
            }
            this.onDrawGhost(ghost);
            if (eval('this.GHOST_' + ghost.toUpperCase() + '_BODY_STATE === 3') && eval('this.GHOST_' + ghost.toUpperCase() + '_STATE != -1')) {
                this.onTestGhostPacmen(ghost);
                this.onTestGhostTunnel(ghost);
            }
        } else {
            eval('this.GHOST_' + ghost.toUpperCase() + '_DIRECTION = this.onOneDirection();');
        }
    }
};
Game.prototype.onTestGhostTunnel = function(ghost) {
    if (eval('this.GHOST_' + ghost.toUpperCase() + '_STATE === 0')) {
        if (this.isInTunnel(ghost) && eval('this.GHOST_' + ghost.toUpperCase() + '_TUNNEL === false')) {
            this.onStopGhost(ghost);
            eval('this.GHOST_' + ghost.toUpperCase() + '_TUNNEL = true');
            this.onMoveGhost(ghost);
        } else if (!this.isInTunnel(ghost) && eval('this.GHOST_' + ghost.toUpperCase() + '_TUNNEL === true')) {
            this.onStopGhost(ghost);
            eval('this.GHOST_' + ghost.toUpperCase() + '_TUNNEL = false');
            this.onMoveGhost(ghost);
        }
    }
};
Game.prototype.isInTunnel = function(ghost) {
    if ((eval('this.GHOST_' + ghost.toUpperCase() + '_POSITION_X >= 2') && eval('this.GHOST_' + ghost.toUpperCase() + '_POSITION_X <= 106')) && eval('this.GHOST_' + ghost.toUpperCase() + '_POSITION_Y === 258')) {
        return true;
    } else if ((eval('this.GHOST_' + ghost.toUpperCase() + '_POSITION_X >= 462') && eval('this.GHOST_' + ghost.toUpperCase() + '_POSITION_X <= 548')) && eval('this.GHOST_' + ghost.toUpperCase() + '_POSITION_Y === 258')) {
        return true;
    }
};
Game.prototype.onChangeDirection = function(ghost) {
    eval('var direction = this.GHOST_' + ghost.toUpperCase() + '_DIRECTION');
    eval('var state = this.GHOST_' + ghost.toUpperCase() + '_STATE');
    eval('var ghostX = this.GHOST_' + ghost.toUpperCase() + '_POSITION_X');
    eval('var ghostY = this.GHOST_' + ghost.toUpperCase() + '_POSITION_Y');
    var tryDirection = this.onOneDirection();
    if (state === 0 || state === 1) {
        if (ghostX != 276 && ghostY != 258) {
            var pacmanX = this.PACMAN_POSITION_X;
            var pacmanY = this.PACMAN_POSITION_Y;
            var axe = this.onOneAxe();
            if (ghost === "blinky") {
                var nothing = this.onWhatsYourProblem();
                if (nothing < 6) {
                    tryDirection = this.onGetRightDirection(axe, ghostX, ghostY, pacmanX, pacmanY);
                    if (!(this.onCanMoveGhost(ghost, tryDirection) && (direction != tryDirection - 2 && direction != tryDirection + 2))) {
                        axe++;
                        if (axe > 2) axe = 1;
                        tryDirection = this.onGetRightDirection(axe, ghostX, ghostY, pacmanX, pacmanY);
                    }
                }
            } else if (ghost === "pinky") {
                var nothing = this.onWhatsYourProblem();
                if (nothing < 3) {
                    tryDirection = this.onGetRightDirection(axe, ghostX, ghostY, pacmanX, pacmanY);
                    if (!(this.onCanMoveGhost(ghost, tryDirection) && (direction != tryDirection - 2 && direction != tryDirection + 2))) {
                        axe++;
                        if (axe > 2) axe = 1;
                        tryDirection = this.onGetRightDirection(axe, ghostX, ghostY, pacmanX, pacmanY);
                    }
                    tryDirection = this.onReverseDirection(tryDirection);
                }
            } else if (ghost === "inky") {
                var good = this.onAnyGoodIdea();
                if (good < 3) {
                    tryDirection = this.onGetRightDirection(axe, ghostX, ghostY, pacmanX, pacmanY);
                    if (!(this.onCanMoveGhost(ghost, tryDirection) && (direction != tryDirection - 2 && direction != tryDirection + 2))) {
                        axe++;
                        if (axe > 2) axe = 1;
                        tryDirection = this.onGetRightDirection(axe, ghostX, ghostY, pacmanX, pacmanY);
                    }
                }
            }
        }
        if (state === 1) {
            tryDirection = this.onReverseDirection(tryDirection);
        }
    } else {
        var axe = this.onOneAxe();
        tryDirection = this.onGetRightDirectionForHome(axe, ghostX, ghostY);
        if (this.onCanMoveGhost(ghost, tryDirection) && (direction != tryDirection - 2 && direction != tryDirection + 2)) {} else {
            axe++;
            if (axe > 2) axe = 1;
            tryDirection = this.onGetRightDirectionForHome(axe, ghostX, ghostY);
        }
    }
    if (this.onCanMoveGhost(ghost, tryDirection) && (direction != tryDirection - 2 && direction != tryDirection + 2)) {
        eval('this.GHOST_' + ghost.toUpperCase() + '_DIRECTION = tryDirection');
    }
};
Game.prototype.onGetRightDirectionForHome = function(axe, ghostX, ghostY) {
    var homeX = 276;
    var homeY = 204;
    if (ghostY === 204 && ghostX === 276) {
        return 2;
    } else if (ghostX === 276 && ghostY === 258) {
        return this.onOneDirectionX();
    } else {
        if (axe === 1) {
            if (ghostX > homeX) {
                return 3;
            } else {
                return 1;
            }
        } else {
            if (ghostY > homeY) {
                return 4;
            } else {
                return 2;
            }
        }
    }
};
Game.prototype.onGetRightDirection = function(axe, ghostX, ghostY, pacmanX, pacmanY) {
    if (axe === 1) {
        if (ghostX > pacmanX) {
            return 3;
        } else {
            return 1;
        }
    } else {
        if (ghostY > pacmanY) {
            return 4;
        } else {
            return 2;
        }
    }
};
Game.prototype.onReverseDirection = function(direction) {
    if (direction > 2) return direction - 2;
    else return direction + 2;
};
Game.prototype.onEraseGhost = function(ghost) {
    eval('this.ctx' + ghost.toCapitalize() + '.clearRect(this.GHOST_' + ghost.toUpperCase() + '_POSITION_X - 17, this.GHOST_' + ghost.toUpperCase() + '_POSITION_Y - 17, 34, 34)');
};
Game.prototype.onEraseGhosts = function() {
    this.onEraseGhost('blinky');
    this.onEraseGhost('pinky');
    this.onEraseGhost('inky');
    this.onEraseGhost('clyde');
};
Game.prototype.onCanMoveGhost = function(ghost, direction) {
    if (!direction) {
        eval('var direction = this.GHOST_' + ghost.toUpperCase() + '_DIRECTION');
    }
    eval('var positionX = this.GHOST_' + ghost.toUpperCase() + '_POSITION_X');
    eval('var positionY = this.GHOST_' + ghost.toUpperCase() + '_POSITION_Y');
    eval('var state = this.GHOST_' + ghost.toUpperCase() + '_STATE');
    if (positionX === 276 && positionY === 204 && direction === 2 && state === 0) return false;
    if (direction === 1) {
        positionX += this.GHOST_POSITION_STEP;
    } else if (direction === 2) {
        positionY += this.GHOST_POSITION_STEP;
    } else if (direction === 3) {
        positionX -= this.GHOST_POSITION_STEP;
    } else if (direction === 4) {
        positionY -= this.GHOST_POSITION_STEP;
    }
    for (var i = 0, imax = this.PATHS.length; i < imax; i++) {
        var p = this.PATHS[i];
        var startX = p.split("-")[0].split(",")[0];
        var startY = p.split("-")[0].split(",")[1];
        var endX = p.split("-")[1].split(",")[0];
        var endY = p.split("-")[1].split(",")[1];
        if (positionX >= startX && positionX <= endX && positionY >= startY && positionY <= endY) {
            return true;
        }
    }
    return false;
};
Game.prototype.onOneDirection = function() {
    return Math.floor(Math.random() * (4 - 1 + 1) + 1);
};
Game.prototype.onOneDirectionX = function() {
    var direction = this.onOneDirection();
    if (direction === 4 || direction === 2) direction -= 1;
    return direction;
};
Game.prototype.onOneDirectionY = function() {
    var direction = this.onOneDirection();
    if (direction === 3 || direction === 1) direction -= 1;
    return direction;
};
Game.prototype.onPauseGhost = function(ghost) {
    if (eval('this.GHOST_' + ghost.toUpperCase() + '_STATE === 1')) {
        eval('if(this.GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER !== null) this.GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER.pause()');
    } else if (eval('this.GHOST_' + ghost.toUpperCase() + '_STATE === -1')) {
        eval('if(this.GHOST_' + ghost.toUpperCase() + '_EAT_TIMER !== null) this.GHOST_' + ghost.toUpperCase() + '_EAT_TIMER.pause()');
    }
    if (eval('this.GHOST_' + ghost.toUpperCase() + '_MOVING_TIMER != -1')) {
        eval('clearInterval(this.GHOST_' + ghost.toUpperCase() + '_MOVING_TIMER)');
        eval('this.GHOST_' + ghost.toUpperCase() + '_MOVING_TIMER = -1');
        eval('this.GHOST_' + ghost.toUpperCase() + '_MOVING = false');
    }
};
Game.prototype.onPauseGhosts = function() {
    this.onPauseGhost('blinky');
    this.onPauseGhost('pinky');
    this.onPauseGhost('inky');
    this.onPauseGhost('clyde');
};
Game.prototype.onResumeGhost = function(ghost) {
    if (eval('this.GHOST_' + ghost.toUpperCase() + '_STATE === 1')) {
        eval('if(this.GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER !== null) this.GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER.resume()');
    } else if (eval('this.GHOST_' + ghost.toUpperCase() + '_STATE === -1')) {
        eval('if(this.GHOST_' + ghost.toUpperCase() + '_EAT_TIMER !== null) this.GHOST_' + ghost.toUpperCase() + '_EAT_TIMER.resume()');
    }
    this.onMoveGhost(ghost);
};
Game.prototype.onResumeGhosts = function() {
    this.onResumeGhost('blinky');
    this.onResumeGhost('pinky');
    this.onResumeGhost('inky');
    this.onResumeGhost('clyde');
};
Game.prototype.onOneAxe = function() {
    return Math.floor(Math.random() * (2 - 1 + 1) + 1);
};
Game.prototype.onAnyGoodIdea = function() {
    return Math.floor(Math.random() * (4 - 1 + 1) + 1);
};
Game.prototype.onWhatsYourProblem = function() {
    return Math.floor(Math.random() * (6 - 1 + 1) + 1);
};