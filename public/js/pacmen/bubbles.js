Game.prototype.onDrawBubbles = function() {
    this.ctxBubbles.fillStyle = "#dca5be";
    for (var line = 1, linemax = 29, i = 0, s = 0; line <= linemax; line++) {
        var y = this.getYFromLine(line);
        for (var x = this.BUBBLES_X_START, xmax = this.BUBBLES_X_END, bubble = 1; x < xmax; bubble++, x += this.BUBBLES_GAP) {
            if (this.onCanAddBubble(line, bubble)) {
                var type = "";
                var size = "";
                if (this.isSuperBubble(line, bubble)) {
                    type = "s";
                    size = this.SUPER_BUBBLES_SIZE;
                    this.SUPER_BUBBLES[s] = line + ";" + bubble + ";" + this.onCorrectionX(x, bubble) + "," + y;
                    s++;
                } else {
                    type = "b";
                    size = this.BUBBLES_SIZE;
                }
                this.BUBBLES_COUNTER++;
                this.ctxBubbles.beginPath();
                this.ctxBubbles.arc(this.onCorrectionX(x, bubble), y, size, 0, 2 * Math.PI, false);
                this.ctxBubbles.fill();
                this.ctxBubbles.closePath();
                this.BUBBLES[parseInt(this.onCorrectionX(x, bubble)) + "," + parseInt(y)] = line + ";" + bubble + ";" + type + ";0"
                i++;
            }
        }
    }
};
Game.prototype.onUpdateBubbles = function() {};
Game.prototype.onBlinkSuperBubbles = function() {
    if (this.SUPER_BUBBLES_BLINK === false) {
        this.SUPER_BUBBLES_BLINK = true;
        this.SUPER_BUBBLES_BLINK_TIMER = setInterval(this.onBlinkSuperBubbles.bind(this), this.SUPER_BUBBLES_BLINK_SPEED);
    } else {
        if (this.SUPER_BUBBLES_BLINK_STATE === 0) {
            this.SUPER_BUBBLES_BLINK_STATE = 1;
        } else {
            this.SUPER_BUBBLES_BLINK_STATE = 0;
        }
        for (var i = 0, imax = this.SUPER_BUBBLES.length; i < imax; i++) {
            var s = this.SUPER_BUBBLES[i];
            var sx = parseInt(s.split(";")[2].split(",")[0]);
            var sy = parseInt(s.split(";")[2].split(",")[1]);
            var b = this.BUBBLES[sx + "," + sy];
            var eat = b.split(";")[3];
            if (eat === "0") {
                if (this.SUPER_BUBBLES_BLINK_STATE === 1) {
                    this.onEraseBubble("s", sx, sy);
                } else {
                    this.ctxBubbles.fillStyle = "#dca5be";
                    this.ctxBubbles.beginPath();
                    this.ctxBubbles.arc(sx, sy, this.SUPER_BUBBLES_SIZE, 0, 2 * Math.PI, false);
                    this.ctxBubbles.fill();
                    this.ctxBubbles.closePath();
                }
            }
        }
    }
};
Game.prototype.onStopBlinkSuperBubbles = function() {
    clearInterval(this.SUPER_BUBBLES_BLINK_TIMER);
    this.SUPER_BUBBLES_BLINK_TIMER = -1;
    this.SUPER_BUBBLES_BLINK = false;
};
Game.prototype.getYFromLine = function(line) {
    var y = this.BUBBLES_Y_START;
    if (line < 8) {
        y = this.BUBBLES_Y_START + ((line - 1) * 18);
    } else if (line > 7 && line < 15) {
        y = 150 + ((line - 8) * 18);
    } else if (line > 14 && line < 21) {
        y = 256 + ((line - 14) * 18);
    } else if (line > 20 && line < 26) {
        y = 362 + ((line - 20) * 18);
    } else if (line > 25 && line < 29) {
        y = 452 + ((line - 25) * 18);
    } else if (line === 29) {
        y = this.BUBBLES_Y_END;
    }
    return y;
};
Game.prototype.onCanAddBubble = function(line, bubble) {
    if (((line >= 1 && line <= 4) || (line >= 9 && line <= 10) || (line >= 20 && line <= 22) || (line >= 26 && line <= 28)) && (bubble === 13 || bubble === 14)) {
        return false;
    } else if (((line >= 2 && line <= 4) || (line >= 21 && line <= 22)) && ((bubble >= 2 && bubble <= 5) || (bubble >= 7 && bubble <= 11) || (bubble >= 16 && bubble <= 20) || (bubble >= 22 && bubble <= 25))) {
        return false;
    } else if ((line >= 6 && line <= 7) && ((bubble >= 2 && bubble <= 5) || (bubble >= 7 && bubble <= 8) || (bubble >= 10 && bubble <= 17) || (bubble >= 19 && bubble <= 20) || (bubble >= 22 && bubble <= 25))) {
        return false;
    } else if ((line === 8) && ((bubble >= 7 && bubble <= 8) || (bubble >= 13 && bubble <= 14) || (bubble >= 19 && bubble <= 20))) {
        return false;
    } else if (((line >= 9 && line <= 19)) && ((bubble >= 1 && bubble <= 5) || (bubble >= 22 && bubble <= 26))) {
        return false;
    } else if ((line === 11 || line === 17) && ((bubble >= 7 && bubble <= 20))) {
        return false;
    } else if ((line === 9 || line === 10) && ((bubble === 12 || bubble === 15))) {
        return false;
    } else if (((line >= 12 && line <= 13) || (line >= 15 && line <= 16)) && ((bubble === 9 || bubble === 18))) {
        return false;
    } else if (line === 14 && ((bubble >= 7 && bubble <= 9) || (bubble >= 18 && bubble <= 20))) {
        return false;
    } else if ((line === 18 || line === 19) && (bubble === 9 || bubble === 18)) {
        return false;
    } else if ((line >= 9 && line <= 10) && ((bubble >= 7 && bubble <= 11) || (bubble >= 16 && bubble <= 20))) {
        return false;
    } else if (((line >= 11 && line <= 13) || (line >= 15 && line <= 19)) && ((bubble >= 7 && bubble <= 8) || (bubble >= 19 && bubble <= 20))) {
        return false;
    } else if (((line >= 12 && line <= 16) || (line >= 18 && line <= 19)) && (bubble >= 10 && bubble <= 17)) {
        return false;
    } else if ((line === 23) && ((bubble >= 4 && bubble <= 5) || (bubble >= 22 && bubble <= 23))) {
        return false;
    } else if ((line >= 24 && line <= 25) && ((bubble >= 1 && bubble <= 2) || (bubble >= 4 && bubble <= 5) || (bubble >= 7 && bubble <= 8) || (bubble >= 10 && bubble <= 17) || (bubble >= 19 && bubble <= 20) || (bubble >= 22 && bubble <= 23) || (bubble >= 25 && bubble <= 26))) {
        return false;
    } else if ((line === 26) && ((bubble >= 7 && bubble <= 8) || (bubble >= 19 && bubble <= 20))) {
        return false;
    } else if ((line >= 27 && line <= 28) && ((bubble >= 2 && bubble <= 11) || (bubble >= 16 && bubble <= 25))) {
        return false;
    }
    return true;
};
Game.prototype.onCorrectionX = function(x, bubble) {
    if (bubble === 3) {
        return x + 1;
    } else if (bubble === 6) {
        return x + 1;
    } else if (bubble === 15) {
        return x + 1;
    } else if (bubble === 18) {
        return x + 1;
    } else if (bubble === 21) {
        return x + 2;
    } else if (bubble === 24) {
        return x + 2;
    } else if (bubble === 26) {
        return x + 1;
    }
    return x;
};
Game.prototype.isSuperBubble = function(line, bubble) {
    if ((line === 23 || line === 4) && (bubble === 1 || bubble === 26)) {
        return true;
    }
    return false;
};
Game.prototype.onEraseBubble = function(t, x, y) {
    var size = "";
    if (t === "s") {
        size = this.SUPER_BUBBLES_SIZE;
    } else {
        size = this.BUBBLES_SIZE;
    }
    this.ctxBubbles.clearRect(x - size, y - size, (size + 1) * 2, (size + 1) * 2);
};