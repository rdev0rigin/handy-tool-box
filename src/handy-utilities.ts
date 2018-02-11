/*
 * Copyright (c) 2018. 1o1 :{P
 */

import { Observable } from '@reactivex/rxjs';

/**
 * Mixin: Two Objects go in and one Object is returned with all values.
 *
 */
export function mergeObjects<T, K extends T>(x: T, y: K): K {
	if (typeof x === typeof {}
		&& typeof y === typeof {}) {
		for (let key of Object.keys(x)) {
			y[key] = x[key];
		}
		return y;
	}
}

/**
 * Hash string.
 * @param {string} dataString
 * @param {string} algo
 * @returns {Promise<string>}
 */
export async function stringShaHash(dataString: string, algo: string = 'sha-256'): Promise<string> {
	const buffer = new Buffer(dataString, 'utf-8');
	return await window.crypto.subtle.digest(algo, buffer).toString();
}

export function counter (mod?: number): {
	increment: (offset: number) => void;
	decrement: (offset: number) => void;
	getCount: number;
} {
	let count = mod ? 0 % mod : 0;
	return {
		increment: (offset: number = 0) => count++ + offset,
		decrement: (offset: number = 0) => count-- + offset,
		getCount: count
	};
}

/**
 * Handy for frameworks that need to load and settle before any Namespace
 * can be called.
 *
 * @param {string} url
 * @returns {<boolean>}
 */
export const loadDependency$ = (url: string): Observable<boolean> => {
	return Observable.create(observer => {
		let node = document.createElement('script');
		node.async = true;
		node.src = url;
		node.onload = (e) => {
			observer.next(e);
		};
		node.onerror = (e) => {
			observer.error(e)
		};
		document.head.appendChild(node);
	});
};

export async function loadDependency(url: string): Promise<boolean> {
	return new Promise((resolve, reject) => {
		let node = document.createElement('script');
		node.async = true;
		node.src = url;
		node.onload = (e) => {
			resolve(e);
		};
		node.onerror = (e) => {
			reject(e);
		};
		document.head.appendChild(node);
	});
};

export function convertToArray(map: Map<any, any> | {[index: string]: {[prop: string]: any}}): any[] {
	let newArray = [];
	for (let key of Object.keys(map)) {
		newArray = [...newArray, map[key]];
	}
	return newArray;
}

export function bufferArrayToBase64(arrayBuffer: ArrayBuffer, format: string = 'audio/mp3'): string {
	if (arrayBuffer) {
		const base64Data = `data:${format};base64,${btoa(
			new Uint8Array(arrayBuffer)
				.reduce((data, byte) => data + String.fromCharCode(byte), '')
		)}`;
		return base64Data;
	} else {
		return 'boo';
	}
}

export function formatSeconds(seconds: number): string {
	return `${Math.trunc(seconds / 60) < 10
		? '0' + Math.trunc(seconds / 60)
		: Math.trunc(seconds / 60) }:${Math.trunc(seconds % 60) < 10
		? '0' +  Math.trunc(seconds % 60)
		: Math.trunc(seconds % 60)}`;
}

export function ensureVal<T>(arg:  T ): T {
	if (arg == undefined) {
		return null;
	}
	return arg;
}

export function HEADER_TO_MIME(header: string): string {
	switch (header.slice(0, 6)) {
		case'464f52':
			return 'aif';
		case'494433':
			return 'mp3';
		case'524946':
			return 'wav';
		case'664C61':
			return 'flac';
		case'000001':
			return 'mp4';
		default:
			return 'unknown';
	}
}
