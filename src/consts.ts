export const SITE = {
  title: 'TCA বাংলায়',
  description: 'The Composable Architecture বাংলায়, গল্পের মতো করে — MVVM থেকে আসা SwiftUI ডেভেলপারের জন্য।',
  url: 'https://tca-bangla.example.com',
  author: 'একজন বড় ভাই',
  lang: 'bn',
};

export type PartId = 'warm-up' | 'গল্প' | 'হাতে কলমে' | 'গভীরে' | 'সিদ্ধান্ত' | 'closing';

export const PARTS: { id: PartId; label: string; tagline: string }[] = [
  { id: 'warm-up', label: 'শুরুর আগে', tagline: 'একটু দম নাও' },
  { id: 'গল্প', label: 'PART ১ — গল্প', tagline: 'চা স্টল আর ৫ বন্ধু' },
  { id: 'হাতে কলমে', label: 'PART ২ — হাতে কলমে', tagline: 'কোড লেখো, app বানাও' },
  { id: 'গভীরে', label: 'PART ৩ — গভীরে', tagline: 'navigation, dependency, testing' },
  { id: 'সিদ্ধান্ত', label: 'PART ৪ — সিদ্ধান্ত', tagline: 'কখন TCA, কোথায় যাবে' },
  { id: 'closing', label: 'শেষ কথা', tagline: '' },
];
