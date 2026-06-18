export type SanityErrorType = "sanity";

export interface SanityError {
	type: SanityErrorType;
	message: string;
	isRetryable: boolean;
	cause?: unknown;
}

export interface SanitySuccess<T> {
	ok: true;
	data: T;
}

export interface SanityFailure {
	ok: false;
	error: SanityError;
}

export type SanityResult<T> = SanitySuccess<T> | SanityFailure;

