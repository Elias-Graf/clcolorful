export declare function msg(msg: string): Message;
export declare class Message {
    private _fgColor;
    private _bgColor;
    private _underline;
    private _bold;
    private _italic;
    private _message;
    constructor(msg: string);
    /**
     * Generates the message with the given parameters
     */
    generate(): string;
    /**
     * Sets the foreground color of the message
     * @param color The foreground color
     */
    fg(color: 'black' | 'blue' | 'brightBlack' | 'cyan' | 'green' | 'magenta' | 'red' | 'white' | 'yellow'): Message;
    /**
     * Sets the background color of the message
     * @param color The background color
     */
    bg(color: 'black' | 'blue' | 'brightBlack' | 'cyan' | 'green' | 'magenta' | 'red' | 'white' | 'yellow'): Message;
    /**
     * Makes the message bold
     */
    b(): Message;
    /**
     * Makes the message italic
     *
     * **======== WARNING ========**
     *
     * This is rarely supported!!
     */
    i(): Message;
    /**
     * Makes the message underlined
     */
    u(): Message;
    /**
     * Sends the message to console.log
     */
    log(): Message;
    /**
     * Writes the generated string to stdout
     */
    write(): Message;
}
