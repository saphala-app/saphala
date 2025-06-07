import { Poppins, Bricolage_Grotesque, Bagel_Fat_One, Parkinsans } from 'next/font/google';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-Poppins',
});

export const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-bricolage',
});

export const bagelFatOne = Bagel_Fat_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bagel-fat-one',
});

export const parkinsans = Parkinsans({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-parkinsans',
});
