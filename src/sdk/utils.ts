import { Coin, JsonRpcProvider, SuiAddress, SuiObject } from '@mysten/sui.js';
import { SuiWalletAdapter } from '@mysten/wallet-adapter-sui-wallet';

export const fetchCoinObjectRefs = async (address: SuiAddress): Promise<any[]> => {
	const provider = new JsonRpcProvider('https://fullnode.devnet.sui.io');
	const ownedObjects = await provider.getObjectsOwnedByAddress(address);
	const coinObjectRefs = ownedObjects
		.filter((x) => Coin.isCoin(x))
		.map((x) => {
			return { type: Coin.getCoinTypeArg(x)!, id: x.objectId };
		});
	return coinObjectRefs;
};

export const fetchCoinObjects = async (objectIds: string[]): Promise<any[]> => {
	const provider = new JsonRpcProvider('https://fullnode.devnet.sui.io');
	const objectDetails = await Promise.all(objectIds.map((id) => provider.getObject(id)));
	return objectDetails.map((obj) => {
		return {
			id: (obj.details as any).reference.objectId,
			type: Coin.getCoinTypeArg(obj)!,
			balance: Coin.getBalance(obj)
		};
	});
};

export const split = async (objectId: string, type: string, split_amount: number) => {
	const wallet = new SuiWalletAdapter();
	if (!wallet.connected) await wallet.connect();

	return await wallet.executeMoveCall({
		packageObjectId: '0x02',
		module: 'coin',
		function: 'split',
		typeArguments: [type],
		arguments: [objectId, split_amount],
		gasBudget: 1000
	});
};

// https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
export const groupBy = function (xs, key) {
	return xs.reduce(function (rv, x) {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
};
