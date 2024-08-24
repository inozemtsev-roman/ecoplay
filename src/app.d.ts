import type { InventoryItem, User } from '@prisma/client'
import type { tFunction } from './lib/shared/localization'

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			initData: {
				user: {
					id: number,
					firstName: string,
					lastName: string,
					username: string,
					languageCode: string,
					isPremium: boolean,
					allowsWriteToPM: boolean
				}
			},
			user: User & {
				inventoryItems: InventoryItem[]
			},
			t: tFunction
		}
		// interface PageData {}
		// interface Platform {}
	}

	interface Window {
		Telegram: {
			Utils: {
				sessionStorageGet(key: string): unknown,
				sessionStorageSet(key: string, value: any): boolean,
				urlAppendHashParams(url: string, addHash: string): string,
				urlParseHashParams(locationHash: string): Record<string, string | null> | { _path: string },
				urlParseQueryString(queryString: string): Record<string, string | null>,
				urlSafeDecode(urlencoded: string): string
			},
			WebApp: {
				BackButton: {
					get isVisible(): boolean,
					set isVisible(val: boolean),
					show(): unknown,
					hide(): unknown,
					onClick(callback: Function): unknown,
					offClick(callback: Function): unknown,
				},
				CloudStorage: {
					getItem(key: string, callback: (Function)): unknown,
					getItems(keys: string[], callback: Function): unknown,
					getKeys(callback: Function): unknown,
					removeItem(key: string, callback?: Function): unknown,
					removeItems(keys: string[], callback?: Function): unknown,
					setItem(key: string, value: unknown, callback?: Function): unknown
				},
				HapticFeedback: {
					impactOccured(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): unknown,
					notificationOccured(type: 'error' | 'success' | 'warning'): unknown,
					selectionChanged(): unknown
				},
				MainButton: {
					get color(): string,
					set color(val: string): unknown,
					disable(): typeof window.Telegram.WebApp.MainButton,
					enable(): typeof window.Telegram.WebApp.MainButton,
					hide(): typeof window.Telegram.WebApp.MainButton,
					show(): typeof window.Telegram.WebApp.MainButton,
					hideProgress(): typeof window.Telegram.WebApp.MainButton,
					showProgress(): typeof window.Telegram.WebApp.MainButton,
					isActive: boolean,
					get isProgressVisible(): boolean,
					get isVisible(): boolean,
					set isVisible(val: boolean): unknown,
					onClick(callback: Function): unknown,
					offClick(callback: Function): unknown,
					setParams(params: unknown): unknown,
					setText(text: string): unknown,
					text: string,
					textColor: string,
				},
				backgroundColor: string,
				close(): unknown,
				closeScanQrPopup(): unknown,
				colorScheme: 'light' | 'dark',
				disableClosingConfirmation(): unknown,
				enableClosingConfirmation(): unknown,
				expand(): unknown,
				headerColor: string,
				initData: string,
				initDataUnsafe: {
					auth_date: string,
					chat_instance: string,
					chat_type: string,
					hash: string,
					user: {
						id: number,
						username: string | null,
						first_name: string,
						last_name: string
						allows_write_to_pm: boolean,
						is_premium: boolean,
						language_code: string
					}
				},
				invokeCustomMethod(method: string, params: Record<string, unknown>, callback: Function): unknown,
				isClosingConfirmationEnabled: boolean,
				isExpanded: boolean,
				isVersionAtLeast(ver: string): boolean,
				offEvent(eventType: string, callback: Function): unknown,
				onEvent(eventType: string, callback: Function): unknown,
				openInvoice(url: string, callback: Function): unknown,
				openLink(url: string, options: Record<string, unknown>): unknown,
				openTelegramLink(url: string): unknown,
				platform: string,
				readTextFromClipboard(callback: Function): unknown,
				ready(): unknown,
				requestContact(callback: Function): unknown,
				requestWriteAccess(callback: Function): unknown,
				sendData(data: unknown): unknown,
				setBackgroundColor(color: string): unknown,
				// setBackgroundColor(color_key: string): unknown,
				setHeaderColor(color: string): unknown,
				showAlert(message: string, callback?: Function): unknown,
				showConfirm(message: string, callback?: Function): unknown,
				showPopup(params: {
					title?: string,
					message: string,
					buttons?: {
						id?: string,
						type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive',
						text?: string
					}[]
				}, callback?: Function): unknown,
				showScanQrPopup(message: string, callback?: Function): unknown,
				switchInlineQuery(query: string, choose_chat_types: unknown): unknown,
				themeParams: {
					bg_color: string,
					button_color: string,
					button_text_color: string,
					hint_color: string,
					link_color: string,
					secondary_bg_color: string,
					text_color: string
				},
				version: string,
				viewportHeight: number,
				viewportStableHeight: number
			},
			WebView: {
				callEventCallbacks(eventType: any, func: Function): any,
				initParams: {
					tgWebAppData: string,
					tgWebAppPlatform: string,
					tgWebAppThemeParams: string,
					tgWebAppVersion: string
				},
				isIframe: boolean,
				offEvent(eventType: any, callback: Function): any,
				onEvent(eventType: any, callback: Function): any,
				postEvent(eventType: any, callback: Function, eventData: any): any,
				recieveEvent(eventType: any, callback: Function, eventData: any): any
			}
		}
	}
}


declare module '@lottiefiles/svelte-lottie-player' {
    import type { SvelteComponentTyped } from 'svelte'

    export class LottiePlayer extends SvelteComponentTyped<{
        autoplay?: boolean
        background: string
        controls: boolean
        controlsLayout?: string[]
        count?: number
        defaultFrame?: number
        direction?: number
        height: number
        hover?: boolean
        loop?: boolean
        mode?: 'normal' | 'bounce'
        onToggleZoom?: (boolean) => void
        renderer?: 'svg' | 'canvas'
        speed?: number
        src?: string
        style?: string
        width: number
    }> {}
}

export {};
