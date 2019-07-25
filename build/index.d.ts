export declare function msg(msg: string): Message;
export declare class Message {
    private _bgColor;
    private _bold;
    private _fgColor;
    private _strikeThrough;
    private _space;
    private _italic;
    private _underline;
    private _head;
    private _message;
    /**
     *
     * @param msg String in this message
     * @param head Message that may be prepended to this message
     */
    constructor(msg: string, head?: Message);
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
    st(): Message;
    /**
     * Sends the message to console.log
     */
    log(): Message;
    /**
     * Writes the generated string to stdout
     */
    write(): Message;
    /**
     * Appends a space to the message
     */
    space(): Message;
    /**
     * Tails a message and returns the new message for styling.
     * @param msg The string for the message
     */
    tail(msg: string): Message;
}
