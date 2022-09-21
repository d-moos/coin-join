import { MoveCallTransaction, SuiTransactionResponse } from '@mysten/sui.js';
import { MockWalletAdapter } from '@mysten/wallet-adapter-mock-wallet';
import { SuiWalletAdapter } from '@mysten/wallet-adapter-sui-wallet';
import { derived, readable, writable } from 'svelte/store';

function createSuiWallet() {
	const suiWallet = new SuiWalletAdapter();
	const { subscribe, update, set } = writable(suiWallet);

	return {
		subscribe,
		connect: async (): Promise<void> => {
			if (!suiWallet.connected) await suiWallet.connect();

			update((_) => suiWallet);
		},
		executeCall: async (transaction: MoveCallTransaction): Promise<SuiTransactionResponse> => {
			const response = await suiWallet.executeMoveCall(transaction);
			update((_) => suiWallet);

			return response;
		}
	};
}

export const wallet = createSuiWallet();
export const connected = derived(wallet, (w) => w.connected);
