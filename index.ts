
export function msg(msg: string) {
  return new Message(msg);
}


export class Message {
  private _fgColor    : string  = null;
  private _bgColor    : string  = null;
  private _underline  : boolean = false;
  private _bold       : boolean = false;
  private _italic     : boolean = false;
  private _message    : string;

  constructor(msg: string) {
    this._message = msg;
  }
  /**
   * Generates the message with the given parameters
   */
  public generate(): string {
    let str = this._message + '\x1b[0m';
    
    if(this._bgColor !== null) str = `${this._bgColor}${str}`;
    if(this._fgColor !== null) str = `${this._fgColor}${str}`;

    if(this._bold) str = `\x1b[1m${str}`;
    if(this._underline) str = `\x1b[4m${str}`;
    if(this._italic) str = `\x1b[3m${str}`;

    return str;
  }
  /**
   * Sets the foreground color of the message
   * @param color The foreground color
   */
  public fg(color: 
      'black'       |
      'blue'        |
      'brightBlack' |
      'cyan'        |
      'green'       |
      'magenta'     |
      'red'         |
      'white'       |
      'yellow'
    ): Message {

    switch(color) {
      case 'black'        : this._fgColor = '\x1b[30m'; break;
      case 'blue'         : this._fgColor = '\x1b[34m'; break;
      case 'brightBlack'  : this._fgColor = '\x1b[90m'; break;
      case 'cyan'         : this._fgColor = '\x1b[36m'; break;
      case 'green'        : this._fgColor = '\x1b[32m'; break;
      case 'magenta'      : this._fgColor = '\x1b[35m'; break;
      case 'red'          : this._fgColor = '\x1b[31m'; break;
      case 'white'        : this._fgColor = '\x1b[37m'; break;
      case 'yellow'       : this._fgColor = '\x1b[33m'; break;
    }

    return this;
  }
  /**
   * Sets the background color of the message
   * @param color The background color
   */
  public bg(color: 
      'black'       |
      'blue'        |
      'brightBlack' |
      'cyan'        |
      'green'       |
      'magenta'     |
      'red'         |
      'white'       |
      'yellow'
    ): Message {
    switch(color) {
      case 'black'        : this._bgColor = '\x1b[40m';   break;
      case 'blue'         : this._bgColor = '\x1b[44m';   break;
      case 'brightBlack'  : this._bgColor = '\x1b[100m';  break;
      case 'cyan'         : this._bgColor = '\x1b[46m';   break;
      case 'green'        : this._bgColor = '\x1b[42m';   break;
      case 'magenta'      : this._bgColor = '\x1b[45m';   break;
      case 'red'          : this._bgColor = '\x1b[41m';   break;
      case 'white'        : this._bgColor = '\x1b[47m';   break;
      case 'yellow'       : this._bgColor = '\x1b[43m';   break;
    }

    return this;
  }
  /**
   * Makes the message bold
   */
  public b(): Message {
    this._bold = true;
    return this;
  }
  /**
   * Makes the message italic
   * 
   * **======== WARNING ========** 
   * 
   * This is rarely supported!!
   */
  public i(): Message {
    this._italic = true;
    return this;
  }
  /**
   * Makes the message underlined
   */
  public u(): Message {
    this._underline = true;
    return this;
  }
  /**
   * Sends the message to console.log
   */
  public log(): Message {
    console.log(this.generate());
    return this;
  }
  /**
   * Writes the generated string to stdout
   */
  public write(): Message {
    process.stdout.write(this.generate());
    return this;
  }
}