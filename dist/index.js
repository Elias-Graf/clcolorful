"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function msg(msg) {
    return new Message(msg);
}
exports.msg = msg;
var Message = /** @class */ (function () {
    function Message(msg) {
        this._fgColor = null;
        this._bgColor = null;
        this._underline = false;
        this._bold = false;
        this._italic = false;
        this._message = msg;
    }
    /**
     * Generates the message with the given parameters
     */
    Message.prototype.generate = function () {
        var str = this._message + '\x1b[0m';
        if (this._bgColor !== null)
            str = "" + this._bgColor + str;
        if (this._fgColor !== null)
            str = "" + this._fgColor + str;
        if (this._bold)
            str = "\u001B[1m" + str;
        if (this._underline)
            str = "\u001B[4m" + str;
        if (this._italic)
            str = "\u001B[3m" + str;
        return str;
    };
    /**
     * Sets the foreground color of the message
     * @param color The foreground color
     */
    Message.prototype.fg = function (color) {
        switch (color) {
            case 'black':
                this._fgColor = '\x1b[30m';
                break;
            case 'blue':
                this._fgColor = '\x1b[34m';
                break;
            case 'brightBlack':
                this._fgColor = '\x1b[90m';
                break;
            case 'cyan':
                this._fgColor = '\x1b[36m';
                break;
            case 'green':
                this._fgColor = '\x1b[32m';
                break;
            case 'magenta':
                this._fgColor = '\x1b[35m';
                break;
            case 'red':
                this._fgColor = '\x1b[31m';
                break;
            case 'white':
                this._fgColor = '\x1b[37m';
                break;
            case 'yellow':
                this._fgColor = '\x1b[33m';
                break;
        }
        return this;
    };
    /**
     * Sets the background color of the message
     * @param color The background color
     */
    Message.prototype.bg = function (color) {
        switch (color) {
            case 'black':
                this._bgColor = '\x1b[40m';
                break;
            case 'blue':
                this._bgColor = '\x1b[44m';
                break;
            case 'brightBlack':
                this._bgColor = '\x1b[100m';
                break;
            case 'cyan':
                this._bgColor = '\x1b[46m';
                break;
            case 'green':
                this._bgColor = '\x1b[42m';
                break;
            case 'magenta':
                this._bgColor = '\x1b[45m';
                break;
            case 'red':
                this._bgColor = '\x1b[41m';
                break;
            case 'white':
                this._bgColor = '\x1b[47m';
                break;
            case 'yellow':
                this._bgColor = '\x1b[43m';
                break;
        }
        return this;
    };
    /**
     * Makes the message bold
     */
    Message.prototype.b = function () {
        this._bold = true;
        return this;
    };
    /**
     * Makes the message italic
     *
     * **======== WARNING ========**
     *
     * This is rarely supported!!
     */
    Message.prototype.i = function () {
        this._italic = true;
        return this;
    };
    /**
     * Makes the message underlined
     */
    Message.prototype.u = function () {
        this._underline = true;
        return this;
    };
    /**
     * Sends the message to console.log
     */
    Message.prototype.log = function () {
        console.log(this.generate());
        return this;
    };
    /**
     * Writes the generated string to stdout
     */
    Message.prototype.write = function () {
        process.stdout.write(this.generate());
        return this;
    };
    return Message;
}());
exports.Message = Message;
