Game.prototype.onResetPacmen = function() {
    this.onStopPacmen();
    this.PACMEN_DIRECTION = 3;
    this.PACMEN_DIRECTION_TRY = -1;
    this.PACMEN_DIRECTION_TRY_TIMER = null;
    this.PACMEN_POSITION_X = 276;
    this.PACMEN_POSITION_Y = 416;
    this.PACMEN_MOUNTH_STATE = 3;
    this.PACMEN_MOVING = false;
    this.PACMEN_MOVING_TIMER = -1;
    this.PACMEN_KILLING_TIMER = -1;
    this.PACMEN_DEAD = false;
    this.PACMEN_SUPER = false;
};
Game.prototype.onStopPacmen = function() {
    if (this.PACMEN_MOVING_TIMER != -1) {
        clearInterval(this.PACMEN_MOVING_TIMER);
        this.PACMEN_MOVING_TIMER = -1;
        this.PACMEN_MOVING = false;
    }
    if (this.PACMEN_KILLING_TIMER != -1) {
        clearInterval(this.PACMEN_KILLING_TIMER);
        this.PACMEN_KILLING_TIMER = -1;
    }
};
Game.prototype.onPausePacmen = function() {
    if (this.PACMEN_DIRECTION_TRY_TIMER != null) {
        this.PACMEN_DIRECTION_TRY_TIMER.pause();
    }
    if (this.PACMEN_MOVING_TIMER != -1) {
        clearInterval(this.PACMEN_MOVING_TIMER);
        this.PACMEN_MOVING_TIMER = -1;
        this.PACMEN_MOVING = false;
    }
};
Game.prototype.onResumePacmen = function() {
    if (this.PACMEN_DIRECTION_TRY_TIMER != null) {
        this.PACMEN_DIRECTION_TRY_TIMER.resume();
    }
    this.onMovePacmen();
};
Game.prototype.onTryMovePacmenCancel = function() {
    if (this.PACMEN_DIRECTION_TRY_TIMER != null) {
        this.PACMEN_DIRECTION_TRY_TIMER.cancel();
        this.PACMEN_DIRECTION_TRY = -1;
        this.PACMEN_DIRECTION_TRY_TIMER = null;
    }
};
Game.prototype.onTryMovePacmen = function(direction) {
    this.PACMEN_DIRECTION_TRY = direction;
    this.PACMEN_DIRECTION_TRY_TIMER = new Timer((function() {
        this.onTryMovePacmenCancel();
    }).bind(this), this.PACMEN_DIRECTION_TRY_CANCEL);
};
Game.prototype.onMovePacmen = function(direction) {
    if (this.PACMEN_MOVING === false) {
        this.PACMEN_MOVING = true;
        this.PACMEN_MOVING_TIMER = setInterval(this.onMovePacmen.bind(this), this.PACMEN_MOVING_SPEED);
    }
    var directionTry = direction;
    var quarterChangeDirection = false;
    if (!directionTry && this.PACMEN_DIRECTION_TRY != -1) {
        directionTry = this.PACMEN_DIRECTION_TRY;
    }
    if ((!directionTry || this.PACMEN_DIRECTION !== directionTry)) {
        if (directionTry) {
            if (this.onCanMovePacmen(directionTry)) {
                if (this.PACMEN_DIRECTION + 1 === directionTry || this.PACMEN_DIRECTION - 1 === directionTry || this.PACMEN_DIRECTION + 1 === directionTry || (this.PACMEN_DIRECTION === 4 && directionTry === 1) || (this.PACMEN_DIRECTION === 1 && directionTry === 4)) {
                    quarterChangeDirection = true;
                }
                this.PACMEN_DIRECTION = directionTry;
                this.onTryMovePacmenCancel();
            } else {
                if (directionTry !== this.PACMEN_DIRECTION_TRY) {
                    this.onTryMovePacmenCancel();
                }
                if (this.PACMEN_DIRECTION_TRY === -1) {
                    this.onTryMovePacmen(directionTry);
                }
            }
        }
        if (this.onCanMovePacmen(this.PACMEN_DIRECTION)) {
            this.onErasePacmen();
            if (this.PACMEN_MOUNTH_STATE < this.PACMEN_MOUNTH_STATE_MAX) {
                this.PACMEN_MOUNTH_STATE++;
            } else {
                this.PACMEN_MOUNTH_STATE = 0;
            }
            var speedUp = 0;
            if (quarterChangeDirection) {
                speedUp = 6;
            }
            if (this.PACMEN_DIRECTION === 1) {
                this.PACMEN_POSITION_X += this.PACMEN_POSITION_STEP + speedUp;
            } else if (this.PACMEN_DIRECTION === 2) {
                this.PACMEN_POSITION_Y += this.PACMEN_POSITION_STEP + speedUp;
            } else if (this.PACMEN_DIRECTION === 3) {
                this.PACMEN_POSITION_X -= this.PACMEN_POSITION_STEP + speedUp;
            } else if (this.PACMEN_DIRECTION === 4) {
                this.PACMEN_POSITION_Y -= (this.PACMEN_POSITION_STEP + speedUp);
            }
            if (this.PACMEN_POSITION_X === 2 && this.PACMEN_POSITION_Y === 258) {
                this.PACMEN_POSITION_X = 548;
                this.PACMEN_POSITION_Y = 258;
            } else if (this.PACMEN_POSITION_X === 548 && this.PACMEN_POSITION_Y === 258) {
                this.PACMEN_POSITION_X = 2;
                this.PACMEN_POSITION_Y = 258;
            }
            this.onDrawPacmen();
            if ((this.PACMEN_MOUNTH_STATE) === 0 || (this.PACMEN_MOUNTH_STATE) === 3) {
                this.onTestBubblesPacmen();
                this.onTestGhostsPacmen();
                this.onTestFruitsPacmen();
            }
        } else {
            this.onStopPacmen();
        }
    } else if (direction && this.PACMEN_DIRECTION === direction) {
        this.onTryMovePacmenCancel();
    }
};
Game.prototype.onCanMovePacmen = function(direction) {
    var positionX = this.PACMEN_POSITION_X;
    var positionY = this.PACMEN_POSITION_Y;
    if (positionX === 276 && positionY === 204 && direction === 2) return false;
    if (direction === 1) {
        positionX += this.PACMEN_POSITION_STEP;
    } else if (direction === 2) {
        positionY += this.PACMEN_POSITION_STEP;
    } else if (direction === 3) {
        positionX -= this.PACMEN_POSITION_STEP;
    } else if (direction === 4) {
        positionY -= this.PACMEN_POSITION_STEP;
    }
    for (var i = 0, imax = this.PATHS.length; i < imax; i++) {
        var p = this.PATHS[i];
        var c = p.split("-");
        var cx = c[0].split(",");
        var cy = c[1].split(",");
        var startX = cx[0];
        var startY = cx[1];
        var endX = cy[0];
        var endY = cy[1];
        if (positionX >= startX && positionX <= endX && positionY >= startY && positionY <= endY) {
            return true;
        }
    }
    return false;
};
Game.prototype.onSetPostionPacmen = function(position) {
    this.onErasePacmen();
    this.PACMEN_POSITION_X = position.x;
    this.PACMEN_POSITION_Y = position.y;
    this.onDrawPacmen();
};
Game.prototype.onGetPostionPacmen = function() {
    return {
        x: this.PACMEN_POSITION_X,
        y: this.PACMEN_POSITION_Y
    }
};
Game.prototype.onDrawPacmen = function() {
    var startAngle = 0;
    var endAngle = 2 * Math.PI;
    var lineToX = this.PACMEN_POSITION_X;
    var lineToY = this.PACMEN_POSITION_Y;
    if (this.PACMEN_DIRECTION === 1) {
        startAngle = (0.35 - (this.PACMEN_MOUNTH_STATE * 0.05)) * Math.PI;
        endAngle = (1.65 + (this.PACMEN_MOUNTH_STATE * 0.05)) * Math.PI;
        lineToX -= 8;
    } else if (this.PACMEN_DIRECTION === 2) {
        startAngle = (0.85 - (this.PACMEN_MOUNTH_STATE * 0.05)) * Math.PI;
        endAngle = (0.15 + (this.PACMEN_MOUNTH_STATE * 0.05)) * Math.PI;
        lineToY -= 8;
    } else if (this.PACMEN_DIRECTION === 3) {
        startAngle = (1.35 - (this.PACMEN_MOUNTH_STATE * 0.05)) * Math.PI;
        endAngle = (0.65 + (this.PACMEN_MOUNTH_STATE * 0.05)) * Math.PI;
        lineToX += 8;
    } else if (this.PACMEN_DIRECTION === 4) {
        startAngle = (1.85 - (this.PACMEN_MOUNTH_STATE * 0.05)) * Math.PI;
        endAngle = (1.15 + (this.PACMEN_MOUNTH_STATE * 0.05)) * Math.PI;
        lineToY += 8;
    }
    this.ctxPacmen.beginPath();
    this.ctxPacmen.fillStyle = "#fff200";
    this.ctxPacmen.arc(this.PACMEN_POSITION_X, this.PACMEN_POSITION_Y, this.PACMEN_SIZE, startAngle, endAngle, false);
    this.ctxPacmen.lineTo(lineToX, lineToY);
    this.ctxPacmen.fill();
    this.ctxPacmen.closePath();
};
Game.prototype.onKillPacmenEvent = function() {
    this.fire('onKillPacmenEvent');
};
Game.prototype.onKillPacmen = function() {
    this.LOCK = true;
    this.PACMEN_DEAD = true;
    this.onStopPacmen();
    this.onStopGhosts();
    // this.onPauseTimes();
    this.onStopBlinkSuperBubbles();
    this.PACMEN_KILLING_TIMER = setInterval(this.onKillingPacmen.bind(this), this.PACMEN_KILLING_SPEED);
};
Game.prototype.onKillingPacmen = function() {
    if (this.PACMEN_MOUNTH_STATE > -12) {
        this.onErasePacmen();
        this.PACMEN_MOUNTH_STATE--;
        this.onDrawPacmen();
    } else {
        clearInterval(this.PACMEN_KILLING_TIMER);
        this.PACMEN_KILLING_TIMER = -1;
        this.onErasePacmen();
        this.onRetry();
        /*if (this.LIFES > 0) {
            this.onLifes(-1);
            this.onRetry();
        } else {
            this.onGameover();
        }*/
    }
};
Game.prototype.onTestGhostsPacmen = function() {
    this.onTestGhostPacmen('blinky');
    this.onTestGhostPacmen('pinky');
    this.onTestGhostPacmen('inky');
    this.onTestGhostPacmen('clyde');
};
Game.prototype.onTestGhostPacmen = function(ghost) {
    eval('var positionX = this.GHOST_' + ghost.toUpperCase() + '_POSITION_X');
    eval('var positionY = this.GHOST_' + ghost.toUpperCase() + '_POSITION_Y');
    if (positionX <= this.PACMEN_POSITION_X + this.PACMEN_GHOST_GAP && positionX >= this.PACMEN_POSITION_X - this.PACMEN_GHOST_GAP && positionY <= this.PACMEN_POSITION_Y + this.PACMEN_GHOST_GAP && positionY >= this.PACMEN_POSITION_Y - this.PACMEN_GHOST_GAP) {
        eval('var state = this.GHOST_' + ghost.toUpperCase() + '_STATE');
        if (state === 0) {
            // this.onKillPacmen();
            this.onKillPacmenEvent();
        } else if (state === 1) {
            this.onStartEatGhost(ghost);
        }
    }
};
Game.prototype.onTestFruitsPacmen = function() {
    if (this.FRUIT_CANCEL_TIMER != null) {
        if (this.FRUITS_POSITION_X <= this.PACMEN_POSITION_X + this.PACMEN_FRUITS_GAP && this.FRUITS_POSITION_X >= this.PACMEN_POSITION_X - this.PACMEN_FRUITS_GAP && this.FRUITS_POSITION_Y <= this.PACMEN_POSITION_Y + this.PACMEN_FRUITS_GAP && this.FRUITS_POSITION_Y >= this.PACMEN_POSITION_Y - this.PACMEN_FRUITS_GAP) {
            this.onEatFruit();
        }
    }
}
Game.prototype.onTestBubblesPacmen = function() {
    var i, imax;
    if (this.PACMEN_DIRECTION === 3 || this.PACMEN_DIRECTION === 4) {
        i = -this.PACMEN_EAT_GAP;
        imax = 0;
    } else if (this.PACMEN_DIRECTION === 1 || this.PACMEN_DIRECTION === 2) {
        i = 0;
        imax = this.PACMEN_EAT_GAP;
    }
    for (; i < imax; i++) {
        var testX = (this.PACMEN_POSITION_X);
        var testY = (this.PACMEN_POSITION_Y);
        if (this.PACMEN_DIRECTION === 3 || this.PACMEN_DIRECTION === 1) {
            testX += i;
        } else if (this.PACMEN_DIRECTION === 4 || this.PACMEN_DIRECTION === 2) {
            testY += i;
        }
        var b = this.BUBBLES[testX + "," + testY];
        if (b) {
            var t = b.split(";");
            var eat = t[3];
            if (eat === "0") {
                var type = t[2];
                this.onEraseBubble(type, testX, testY);
                this.BUBBLES[testX + "," + testY] = b.substr(0, b.length - 1) + "1";
                if (type === "s") {
                    this.onScore(this.SCORE_SUPER_BUBBLE);
                    this.onAffraidGhosts();
                } else {
                    this.onScore(this.SCORE_BUBBLE);
                }
                this.BUBBLES_COUNTER--;
                if (this.BUBBLES_COUNTER === 0) {
                    this.onWin();
                }
                return;
            }
        }
    }
};
Game.prototype.onErasePacmen = function() {
    this.ctxPacmen.clearRect((this.PACMEN_POSITION_X - 2) - this.PACMEN_SIZE, (this.PACMEN_POSITION_Y - 2) - this.PACMEN_SIZE, (this.PACMEN_SIZE * 2) + 5, (this.PACMEN_SIZE * 2) + 5);
};