import * as RNLocalize from 'react-native-localize';
import { I18n } from 'i18n-js';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LANGUAGE_KEY } from '../types';

const translations = {
  en: {
    search_placeholder: 'Search events',
    city_placeholder: 'Enter city',
    favorites: 'Favorites',
    profile: 'Profile',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    toggle_language: 'Toggle Language',
    search: 'Search',
    no_favourite_event: 'No favorite events',
    buy_ticket: 'Buy Tickets',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    login_required: 'Login Required'
  },
  ar: {
    search_placeholder: 'ابحث عن الأحداث',
    city_placeholder: 'أدخل المدينة',
    favorites: 'المفضلة',
    profile: 'الملف الشخصي',
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    logout: 'تسجيل خروج',
    toggle_language: 'تغيير اللغة',
    search: 'يبحث',
    no_favourite_event: 'لا توجد أحداث مفضلة',
    buy_ticket: 'شراء التذاكر',
    email: 'بريد إلكتروني',
    password: 'كلمة المرور',
    name: 'اسم',
    login_required: 'تسجيل الدخول مطلوب'
  }
};


const i18n = new I18n(translations);
i18n.enableFallback = true;


export const setI18nConfig = async (languageTag?: string) => {
  const fallback = { languageTag: 'en', isRTL: false };
  let selectedLangTag = languageTag;
  if (!selectedLangTag) {
    const savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
    selectedLangTag = savedLang || (RNLocalize.getLocales()[0]?.languageTag || fallback.languageTag);
  }
  const isRTL = selectedLangTag === 'ar';
  i18n.locale = selectedLangTag;
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
  await AsyncStorage.setItem(LANGUAGE_KEY, selectedLangTag);
};

export default i18n;
