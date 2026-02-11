<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { Terminal, Copy, RotateCcw } from 'lucide-svelte';
	import PongGame from './PongGame.svelte';
	import SnakeGame from './SnakeGame.svelte';
	import TetrisGame from './TetrisGame.svelte';
	import ParticleBackground from './ParticleBackground.svelte';

	gsap.registerPlugin(ScrollTrigger);

	interface TerminalLine {
		type: 'input' | 'output' | 'system';
		content: string;
		isTyping?: boolean;
	}

	let terminalRef: HTMLElement;
	let inputRef: HTMLInputElement;
	let outputRef: HTMLElement;
	let currentInput = '';
	let terminalLines: TerminalLine[] = [];
	let isAutoTyping = false;
	let isPlayingPong = false;
	let isPlayingSnake = false;
	let isPlayingTetris = false;
	let autoTypeTimeout: NodeJS.Timeout;
	let idleTimeout: NodeJS.Timeout;

	const commands = {
		ls: {
			output: [
				'personal-web/          Branding & Portfolio',
				'corporate-web/         Business Presence',
				'saas-solution/         Cloud Applications',
				'custom-app/            Tailored Solutions',
				'maintenance/           Support & Updates'
			],
			description: 'List all available services'
		},
		help: {
			output: [
				'Available commands:',
				'  ls              - List all services',
				'  order <service> - Place an order (try: order personal)',
				'  info <service>  - Get service details',
				'  contact         - Contact information',
				'  game            - List available games',
				'  play <game>     - Play a game (try: play pong)',
				'  clear           - Clear terminal',
				'  about           - About Penak Dev'
			],
			description: 'Show available commands'
		},
		game: {
			output: [
				'Available games:',
				'  pong            - Classic Pong game',
				'  snake           - Retro Snake game',
				'  tetris          - Classic Tetris game',
				'',
				'Type "play <game>" to start!'
			],
			description: 'List available games'
		},
		about: {
			output: [
				'╔════════════════════════════════════════╗',
				'║           PENAK DEV v1.0               ║',
				'║    Professional Web Development        ║',
				'╚════════════════════════════════════════╝',
				'',
				'Built with ❤️ by the Penak Dev Team',
				'Tech Stack: Svelte + GSAP + Node.js',
				'Status: Ready to Build Your Dream ✓'
			],
			description: 'About Penak Dev'
		},
		contact: {
			output: [
				'📧 Email: dev@penak.online',
				'💬 Discord: discord.gg/penak',
				'🐦 Twitter: @penak_dev',
				'📱 WhatsApp: +62 812-3456-7890',
				'🌐 Website: dev.penak.online'
			],
			description: 'Contact information'
		},
		clear: {
			output: [],
			description: 'Clear terminal'
		}
	};

	const orderCommands: Record<string, string[]> = {
		personal: [
			'📦 Personal Website Package',
			'Link: https://dev.penak.online/order/personal',
			'Status: ✓ Available',
			'Features: Custom design, SEO friendly, Fast loading'
		],
		corporate: [
			'🏢 Corporate Website Package',
			'Link: https://dev.penak.online/order/corporate',
			'Status: ✓ Available',
			'Features: Professional branding, CMS integration, Analytics'
		],
		saas: [
			'☁️ SaaS Solution Development',
			'Link: https://dev.penak.online/order/saas',
			'Status: ✓ Available',
			'Features: Scalable architecture, User management, Subscription system'
		],
		custom: [
			'💻 Custom Web Application',
			'Link: https://dev.penak.online/order/custom',
			'Status: ✓ Available',
			'Features: Tailored workflow, API integration, High security'
		]
	};

	const infoCommands: Record<string, string[]> = {
		personal: [
			'Service: Personal Website',
			'Description: Build your personal brand with a stunning portfolio',
			'Perfect for: Professionals, Artists, Freelancers',
			'Key Features:',
			'  • Responsive Design',
			'  • SEO Optimization',
			'  • Contact Form Integration',
			'  • Social Media Links'
		],
		corporate: [
			'Service: Corporate Website',
			'Description: Establish a strong online presence for your business',
			'Perfect for: SMEs, Large Enterprises, Startups',
			'Key Features:',
			'  • Multi-page Architecture',
			'  • Content Management System',
			'  • Business Analytics',
			'  • Professional Email Setup'
		],
		saas: [
			'Service: SaaS Solution',
			'Description: Build and scale your software as a service',
			'Perfect for: Tech Startups, Product Owners',
			'Tech Stack:',
			'  • Frontend: React/Svelte',
			'  • Backend: Node.js/Go',
			'  • Database: PostgreSQL/MongoDB',
			'  • Infrastructure: AWS/Vercel'
		],
		custom: [
			'Service: Custom Web App',
			'Description: Specialized web solutions for unique business needs',
			'Perfect for: Internal tools, specialized platforms',
			'Key Features:',
			'  • Custom Business Logic',
			'  • Third-party API Integration',
			'  • Advanced Security Protocols',
			'  • Dedicated Support'
		]
	};

	const autoIntroduction = [
		'$ Welcome to Penak Dev Terminal',
		'$ Type "help" to see available commands',
		'$ Or try: ls, order personal, info saas',
		'$ Type "about" to learn more about us',
		'$ ',
		'$ Initializing development environment...',
		'$ ✓ Systems operational',
		'$ ✓ Ready to build your website'
	];

	function addLine(type: TerminalLine['type'], content: string, isTyping = false) {
		terminalLines = [...terminalLines, { type, content, isTyping }];
		scrollToBottom();
	}

	function scrollToBottom() {
		setTimeout(() => {
			if (outputRef) {
				outputRef.scrollTop = outputRef.scrollHeight;
			}
		}, 0);
	}

	function typeText(text: string, callback?: () => void) {
		isAutoTyping = true;
		let index = 0;
		const lineIndex = terminalLines.length - 1;

		const typeNextChar = () => {
			if (index < text.length) {
				terminalLines[lineIndex].content = text.substring(0, index + 1);
				terminalLines = terminalLines;
				index++;
				autoTypeTimeout = setTimeout(typeNextChar, 30);
			} else {
				terminalLines[lineIndex].isTyping = false;
				terminalLines = terminalLines;
				isAutoTyping = false;
				scrollToBottom();
				if (callback) callback();
			}
		};

		typeNextChar();
	}

	function processCommand(cmd: string) {
		const trimmedCmd = cmd.trim().toLowerCase();

		if (!trimmedCmd) return;

		// Add user input
		addLine('input', `$ ${cmd}`);
		currentInput = '';

		if (trimmedCmd === 'clear') {
			terminalLines = [];
			return;
		}

		if (trimmedCmd === 'play' || trimmedCmd === 'play pong') {
			addLine('output', 'Starting Pong game...');
			setTimeout(() => {
				isPlayingPong = true;
			}, 500);
			return;
		}

		if (trimmedCmd === 'play snake') {
			addLine('output', 'Starting Snake game...');
			setTimeout(() => {
				isPlayingSnake = true;
			}, 500);
			return;
		}

		if (trimmedCmd === 'play tetris') {
			addLine('output', 'Starting Tetris game...');
			setTimeout(() => {
				isPlayingTetris = true;
			}, 500);
			return;
		}

		// Check for order commands
		if (trimmedCmd.startsWith('order ')) {
			const service = trimmedCmd.slice(6).trim();
			if (orderCommands[service]) {
				orderCommands[service].forEach(line => addLine('output', line));
			} else {
				addLine('output', `Error: Unknown service "${service}". Try: order personal, order corporate, order saas, order custom`);
			}
			return;
		}

		// Check for info commands
		if (trimmedCmd.startsWith('info ')) {
			const service = trimmedCmd.slice(5).trim();
			if (infoCommands[service]) {
				infoCommands[service].forEach(line => addLine('output', line));
			} else {
				addLine('output', `Error: Unknown service "${service}". Try: info personal, info corporate, info saas, info custom`);
			}
			return;
		}

		// Check for built-in commands
		if (commands[trimmedCmd as keyof typeof commands]) {
			const cmd_obj = commands[trimmedCmd as keyof typeof commands];
			if (cmd_obj.output.length > 0) {
				cmd_obj.output.forEach(line => addLine('output', line));
			}
			return;
		}

		// Unknown command
		addLine('output', `Command not found: ${cmd}`);
		addLine('output', 'Type "help" for available commands');
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (isPlayingPong || isPlayingSnake || isPlayingTetris) return; // Ignore terminal input while playing

		if (e.key === 'Enter') {
			e.preventDefault();
			processCommand(currentInput);
			clearIdleTimeout();
			resetIdleTimeout();
		}
	}

	function clearIdleTimeout() {
		if (idleTimeout) clearTimeout(idleTimeout);
		if (autoTypeTimeout) clearTimeout(autoTypeTimeout);
	}

	function resetIdleTimeout() {
		clearIdleTimeout();
		idleTimeout = setTimeout(() => {
			if (terminalLines.length === 0 && !isAutoTyping && !isPlayingPong && !isPlayingSnake && !isPlayingTetris) {
				autoTypeIntroduction();
			}
		}, 3000);
	}

	function autoTypeIntroduction() {
		let delay = 0;
		autoIntroduction.forEach((line, idx) => {
			setTimeout(() => {
				addLine('system', '', true);
				typeText(line, () => {
					if (idx === autoIntroduction.length - 1) {
						resetIdleTimeout();
					}
				});
			}, delay);
			delay += line.length * 30 + 500;
		});
	}

	function clearTerminal() {
		terminalLines = [];
		currentInput = '';
		clearIdleTimeout();
		resetIdleTimeout();
	}

	function copyToClipboard() {
		const text = terminalLines.map(line => line.content).join('\n');
		navigator.clipboard.writeText(text);
		alert('Terminal output copied to clipboard!');
	}

	onMount(() => {
		// Animate terminal entrance
		gsap.from(terminalRef, {
			scrollTrigger: {
				trigger: terminalRef,
				start: 'top 80%',
				end: 'top 20%',
				scrub: 1
			},
			opacity: 0,
			y: 50,
			scale: 0.95,
			ease: 'power3.out'
		});

		// Start idle timeout
		resetIdleTimeout();

		return () => {
			clearIdleTimeout();
		};
	});
</script>

<section id="terminal" class="relative min-h-screen bg-black py-24 overflow-hidden flex items-center justify-center">
	<ParticleBackground />
	
	<div class="container relative z-10">
		<!-- Section Header -->
		<div class="text-center mb-16 space-y-4">
			<div class="text-yellow-200/80 text-sm font-bold tracking-[0.2em] uppercase">Interactive</div>
			<h3 class="text-3xl md:text-5xl font-extrabold text-white leading-tight font-['Playfair_Display']">
				Explore Our Dev Environment
			</h3>
			<p class="text-lg text-white/60 max-w-2xl mx-auto">
				Gunakan terminal interaktif kami untuk menjelajahi layanan dan berinteraksi dengan ekosistem Penak Dev.
			</p>
		</div>

		<!-- Terminal Container -->
		<div 
			bind:this={terminalRef}
			class="max-w-4xl mx-auto bg-[#0D0D0D] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] relative group"
		>
			<!-- Terminal Header -->
			<div class="bg-white/5 border-b border-white/10 px-6 py-4 flex items-center justify-between">
				<div class="flex gap-2">
					<div class="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
					<div class="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
					<div class="w-3 h-3 rounded-full bg-[#27C93F]"></div>
				</div>
				<div class="flex items-center gap-4">
					<button 
						on:click={copyToClipboard}
						class="text-white/40 hover:text-white transition-colors"
						title="Copy Output"
					>
						<Copy size={16} />
					</button>
					<button 
						on:click={clearTerminal}
						class="text-white/40 hover:text-white transition-colors"
						title="Clear Terminal"
					>
						<RotateCcw size={16} />
					</button>
					<div class="flex items-center gap-2 text-white/40 text-xs font-mono">
						<Terminal size={14} />
						<span>bash — penak-dev</span>
					</div>
				</div>
			</div>

			<!-- Terminal Body -->
			<div 
				bind:this={outputRef}
				class="flex-1 p-6 font-mono text-sm overflow-y-auto scroll-smooth custom-scrollbar"
			>
				{#if isPlayingPong}
					<PongGame on:close={() => isPlayingPong = false} />
				{:else if isPlayingSnake}
					<SnakeGame on:close={() => isPlayingSnake = false} />
				{:else if isPlayingTetris}
					<TetrisGame on:close={() => isPlayingTetris = false} />
				{:else}
					<div class="space-y-2">
						{#each terminalLines as line}
							<div class="flex gap-3 {line.type === 'input' ? 'text-yellow-200' : line.type === 'system' ? 'text-white/40' : 'text-white/80'}">
								<span class="whitespace-pre-wrap break-all">{line.content}</span>
								{#if line.isTyping}
									<span class="w-2 h-5 bg-yellow-200 animate-pulse"></span>
								{/if}
							</div>
						{/each}
						
						<!-- Input Line -->
						{#if !isAutoTyping}
							<div class="flex items-center gap-3 text-yellow-200">
								<span>$</span>
								<input
									bind:this={inputRef}
									bind:value={currentInput}
									on:keydown={handleKeyDown}
									type="text"
									class="flex-1 bg-transparent border-none outline-none p-0 text-yellow-200 placeholder:text-yellow-200/20"
									placeholder="type 'help'..."
									spellcheck="false"
									autocomplete="off"
								/>
							</div>
						{/if}
					</div>
				{/if}
			</div>

			<!-- Terminal Footer Info -->
			<div class="bg-white/5 border-t border-white/10 px-6 py-2 flex items-center justify-between text-[10px] font-mono text-white/20">
				<div class="flex gap-4">
					<span>UTF-8</span>
					<span>Svelte</span>
				</div>
				<div>
					<span>Line: {terminalLines.length}</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 6px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 10px;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.2);
	}
</style>
