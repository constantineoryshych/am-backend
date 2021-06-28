import { mkdirSync } from "fs";

export function createDirectoryIfNotExistSync(absolutePath: string | string[]) {
	if (Array.isArray(absolutePath)) {
		for (let i = 0; i < absolutePath.length; i++) mkdirSync(absolutePath[i], { recursive: true });
	} else mkdirSync(absolutePath, { recursive: true });
}

