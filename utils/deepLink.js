import * as Linking from 'expo-linking';
import { Platform } from 'react-native';

export const DEEP_LINK_DOMAIN = 'PLACEHOLDER_DOMAIN';
export const APPSTORE_URL = 'https://apps.apple.com/app/PLACEHOLDER_APP_ID';
export const PLAYSTORE_URL = 'https://play.google.com/store/apps/details?id=com.imposter.app';

export function buildCategoryURL(category) {
  return `https://${DEEP_LINK_DOMAIN}/play?category=${category}`;
}

// Opens the app directly to a category lobby.
// Falls back to the store listing if the app is not installed.
export async function openCategoryLink(category) {
  const customScheme = `imposter://play?category=${category}`;
  try {
    const canOpen = await Linking.canOpenURL(customScheme);
    if (canOpen) {
      await Linking.openURL(customScheme);
    } else {
      const storeURL = Platform.OS === 'android' ? PLAYSTORE_URL : APPSTORE_URL;
      await Linking.openURL(storeURL);
    }
  } catch {
    const storeURL = Platform.OS === 'android' ? PLAYSTORE_URL : APPSTORE_URL;
    await Linking.openURL(storeURL);
  }
}

const VALID_CATEGORIES = ['nba', 'mlb', 'nfl', 'pokemon', 'smash', 'mcu', 'hp'];

export function parseCategoryFromURL(url) {
  if (!url) return null;
  try {
    const parsed = Linking.parse(url);
    const category = parsed.queryParams?.category;
    return VALID_CATEGORIES.includes(category) ? category : null;
  } catch {
    return null;
  }
}
