import type { LanyardData } from '$lib/types';

export function createLanyardStore(userId: string) {
	let data = $state<LanyardData | null>(null);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let socket: WebSocket | null = null;
	let heartbeatInterval: ReturnType<typeof setInterval> | null = null;
	let pollInterval: ReturnType<typeof setInterval> | null = null;

	async function fetchPresence() {
		try {
			const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
			if (res.ok) {
				const json = await res.json();
				if (json.success && json.data) {
					data = json.data;
					error = null;
				}
			} else {
				error = `HTTP ${res.status}`;
			}
		} catch (e) {
			error = String(e);
		} finally {
			loading = false;
		}
	}

	function connectSocket() {
		if (typeof window === 'undefined') return;

		try {
			if (socket) {
				socket.close();
				socket = null;
			}

			const ws = new WebSocket('wss://api.lanyard.rest/socket');
			socket = ws;

			ws.onmessage = (event) => {
				try {
					const msg = JSON.parse(event.data);
					const { op, d, t } = msg;

					if (op === 1) {
						// Heartbeat hello
						const heartbeat = d.heartbeat_interval;
						if (heartbeatInterval) clearInterval(heartbeatInterval);
						heartbeatInterval = setInterval(() => {
							if (ws.readyState === WebSocket.OPEN) {
								ws.send(JSON.stringify({ op: 3 }));
							}
						}, heartbeat);

						// Subscribe to user
						if (ws.readyState === WebSocket.OPEN) {
							ws.send(
								JSON.stringify({
									op: 2,
									d: {
										subscribe_to_id: userId
									}
								})
							);
						}
					} else if (t === 'INIT_STATE' || t === 'PRESENCE_UPDATE') {
						if (d) {
							data = d;
							loading = false;
							error = null;
						}
					}
				} catch (err) {
					console.debug('Lanyard message parse error:', err);
				}
			};

			ws.onerror = (e) => {
				console.debug('Lanyard WebSocket error:', e);
				fetchPresence();
			};

			ws.onclose = () => {
				if (heartbeatInterval) clearInterval(heartbeatInterval);
			};
		} catch (e) {
			console.debug('Lanyard socket init error:', e);
			fetchPresence();
		}
	}

	function init() {
		fetchPresence();
		connectSocket();

		// Fallback polling every 8s to ensure data freshness
		pollInterval = setInterval(fetchPresence, 8000);

		return () => {
			if (heartbeatInterval) clearInterval(heartbeatInterval);
			if (pollInterval) clearInterval(pollInterval);
			if (socket) {
				socket.close();
				socket = null;
			}
		};
	}

	return {
		get data() {
			return data;
		},
		get loading() {
			return loading;
		},
		get error() {
			return error;
		},
		init
	};
}
