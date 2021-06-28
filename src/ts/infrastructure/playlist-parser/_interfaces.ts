export interface IInputProps {
	BLOCK_SIZE: number;
	sequence: (string | number)[];
	duration: number;
	content: {
		[key: string]: { 
			duration?: number;
			name: string;
		},
		default: { 
			name: string;
		}
	}
}


export interface IPlaylistItem {
	picture: string;
	video: string;
}

export type IPlaylist = IPlaylistItem[];