export enum MediaType {
	IMAGE = 'image',
	VIDEO = 'video',
}

export interface Apod {
	copyright?: string;
	date: string;
	explanation?: string;
	hdurl: string;
	media_type?: MediaType;
	serviceVersion?: string;
	title: string;
	url: string;
	thumbnail_url?: string;
	isLiked?: boolean;
}
