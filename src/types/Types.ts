export enum MediaType {
	IMAGE = 'image',
	VIDEO = 'video',
}

export interface Apod {
	copyright?: string;
	date: string;
	explanation?: string;
	hdUrl: string;
	mediaType?: MediaType;
	serviceVersion?: string;
	title: string;
	url: string;
	thumbnailUrl?: string;
	// used track the post user have liked
	isLiked?: boolean;
}
