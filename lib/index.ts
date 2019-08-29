
export function msg(msg: string) {
	return new Message(msg);
}

/**
 * **NOT WELL TESTED**
 * Generates the message from a template and returns an
 * object with the options to "log()" or "wirte()"
 * 
 * *Example input: "%fg.green%this is a message %clear,bg.green,fg.black%hey"*
 * @param msg Mesage to be replaced with color codes
 */
export function _template(msg: string): {
	log   : () => void;
	write : () => void;
} {
	let inSequence = false;
	let sequenceStart = 0;
	let ret = '';
	
	Array.from(msg).forEach((char, index) => {
		if(char === '%') {
			if(!inSequence) sequenceStart = index;
			else {
				msg.slice(sequenceStart + 1, index).split(',').forEach(command => {
					const sections = command.split('.');

					switch(sections[0]) {
						case 'bg'     : ret += getEscapeCode('background', sections[1] as TColor); break;
						case 'clear'  : ret += getEscapeCode('clear'); break;
						case 'fg'     : ret += getEscapeCode('foreground', sections[1] as TColor); break;

						default: throw new Error(`Invalid escape category: ${sections[0]}`);
					}
				});
			}
			inSequence = !inSequence;
		} else if(!inSequence) ret += char;
	});

	if(ret.lastIndexOf(escapeMap.clear) !== ret.length - escapeMap.clear.length) ret += escapeMap.clear;

	function getEscapeCode(type: TType, color?: TColor) {
		if(type === 'clear') return escapeMap.clear;
		else if(!(type in escapeMap)) throw new Error('Type is not in escapeMap');
		else if(!(color in (escapeMap as any)[type])) throw new Error(`Color "${color}" is not in map "${type}"`);
		else return (escapeMap as any)[type][color];
	}

	return {
		log   : () => console.log(ret),
		write : () => process.stdout.write(ret)
	}
}

export interface IFrameOptions {
	padding   ?: number;
	color     ?: TColor;
}

export type TColor =      
	'black'       |
	'blue'        |
	'brightBlack' |
	'cyan'        |
	'green'       |
	'magenta'     |
	'red'         |
	'white'       |
	'yellow';

export type TType = 
	'background' |
	'foreground' |
	'clear';

export const colorList: string[] = [
	'black',
	'blue',
	'brightBlack',
	'cyan',
	'green',
	'magenta',
	'red',
	'white',
	'yellow',
];

export const escapeMap = Object.freeze({
	clear: '\x1b[0m',
	background: {
		'black'       : '\x1b[40m',
		'blue'        : '\x1b[44m',
		'brightBlack' : '\x1b[100m',
		'cyan'        : '\x1b[46m',
		'green'       : '\x1b[42m',
		'magenta'     : '\x1b[45m',
		'red'         : '\x1b[41m',
		'white'       : '\x1b[47m',
		'yellow'      : '\x1b[43m',
	},
	foreground: {
		'black'       : '\x1b[30m',
		'blue'        : '\x1b[34m',
		'brightBlack' : '\x1b[90m',
		'cyan'        : '\x1b[36m',
		'green'       : '\x1b[32m',
		'magenta'     : '\x1b[35m',
		'red'         : '\x1b[31m',
		'white'       : '\x1b[37m',
		'yellow'      : '\x1b[33m',
	},
});

export class Message {
	private _bgColor        : string  = null;
	private _bold           : boolean = false;
	private _fgColor        : string  = null;
	private _space          : boolean = false;
	private _underline      : boolean = false;
	private _head           : Message = null;
	private _message        : string;

	/**
	 * 
	 * @param msg String in this message
	 * @param head Message that may be prepended to this message
	 */
	constructor(msg: string, head: Message = null) {
		this._head = head;
		this._message = msg;
	}
	/**
	 * Saparetes a property string e.g. '1, 2, 3' (like in css)
	 * and returns an array like [top, right, bottom, left] with
	 * the mapped properties
	 * @param property property string
	 */
	private static _splitProp(property: string): [ string, string, string, string ] {
		const arr = property.split(',').map(p => p.trim());
		switch(arr.length) {
			default:
			case 1: return Array(4).fill(property) as [ string, string, string, string ];
			case 2: return [ 
				arr[0],
				arr[1],
				arr[0],
				arr[1],
			];
			case 3: return [
				arr[0],
				arr[1],
				arr[2],
				arr[1],
			]
			case 4: return [
				arr[0],
				arr[1],
				arr[2],
				arr[3],
			];
		}
	}
	/**
	 * Encapsulates a message in a character
	 * @param msg Message that should be enxapsulated
	 * @param options Encapsulations Options
	 */
	public static encapsulate(msg: string | Message, options?: OptionsEncapsulate): string {
		// Make sure options is not undefined
		if(!options) options = {};
		let { char, draw, padding } = options;
	
		const [ drawTop, drawRight, drawBottom, drawLeft ] = Message._splitProp(draw || '1').map(p => parseInt(p, 10) == 1);
		const [ charTop, charRight, charBottom, charLeft ] = Message._splitProp(char || '=');
		const msgLength = msg instanceof Message ? (msg as Message).raw().length : (msg as string).length;
		const message = msg instanceof Message ? (msg as Message).generate() : msg as string; 

		padding = 1;

		let ret = (drawTop ? charTop.repeat(msgLength + 2 + 2 * padding) : '') + '\n'
			+ (drawLeft ? charLeft : '') + ' '.repeat(padding) + message + ' '.repeat(padding) + (drawRight ? charRight : '') + '\n'
			+ (drawBottom ? charBottom.repeat(msgLength + 2 + 2 * padding) : '')
		return ret;
	}
	public encaplusate(options?: OptionsEncapsulate) {
		return Message.encapsulate(this, options);
	}
	/**
	 * **NOT WELL TESTED** 
	 * Frames the message is a sleek border
	 * @param options Frame options
	 */
	private _frame(options: IFrameOptions = {
		padding: 1,
		color: 'white'
	}): void {
		options.color;
		const lines = this.raw().split('\n');
		const test = this.generate().split('\n');
		const longest = Math.max.apply(this, lines.map(line => line.length));
		
		let ret = '╭' + '─'.repeat(longest + options.padding * 2) + '╮\n';

		// test.forEach(line => {
		//   ret += 
		//     '│' +
		//     ' '.repeat(options.padding) + 
		//     line +
		//     ' '.repeat(longest + options.padding - line.length) +
		//     '│\n';
		// });

		for(let i = 0; i < lines.length; i++) {
			ret += 
				'│' +
				' '.repeat(options.padding) + 
				test[i] +
				' '.repeat(longest + options.padding - lines[i].length) +
				'│\n';
		}
		
		ret += '╰' + '─'.repeat(longest + options.padding * 2) + '╯';
		
		console.log(ret);
	}
	/**
	 * Returns the raw string from this and all heads
	 */
	public raw(): string {
		let ret = this._message;
		
		if(this._space)         ret = ret + ' ';
		if(this._head !== null) ret = this._head.raw() + ret;

		return ret;
	}
	/**
	 * Generates the message with the given parameters
	 */
	public generate(): string {
		let str = this._message + '\x1b[0m';
		
		if(this._space) str = `${str} `;

		if(this._bgColor !== null) str = `${this._bgColor}${str}`;
		if(this._fgColor !== null) str = `${this._fgColor}${str}`;

		if(this._bold)      str = `\x1b[1m${str}`;
		if(this._underline) str = `\x1b[4m${str}`;
	
		// Check if there is a head to this msg. If yes append it
		if(this._head !== null)  str = this._head.generate() + str;

		return str;
	}
	/**
	 * Sets the foreground color of the message
	 * @param color The foreground color
	 */
	public fg(color: TColor): Message {    
		this._fgColor = escapeMap.foreground[color];

		return this;
	}
	/**
	 * Sets the background color of the message
	 * @param color The background color
	 */
	public bg(color: TColor): Message {
		this._bgColor = escapeMap.background[color];

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
	/**
	 * Appends a space to the message
	 */
	public space(): Message {
		this._space = true;
		return this;
	}
	/**
	 * Tails a message and returns the new message for styling.
	 * @param msg The string for the message
	 */
	public tail(msg: string): Message {
		return new Message(msg, this);
	}
}

export function escapeEscapeCodes(msg: string): string {
	return msg.replace(/\x1b/g, '\\x1b');
}


export interface OptionsEncapsulate {
	draw ?: string;
	char ?: string;
	padding ?: number;
}

