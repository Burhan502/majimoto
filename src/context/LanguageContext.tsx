import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Language = 'en' | 'sw'
type TranslationKey =
  | 'home' | 'shop' | 'about' | 'delivery' | 'contact' | 'cart' | 'orderNow' | 'fromMpanda' | 'links' | 'follow' | 'allRightsReserved'
  | 'ourProducts' | 'catalogue' | 'searchProducts' | 'all' | 'rice' | 'beans' | 'noProducts'
  | 'shoppingCart' | 'orderSummary' | 'emptyCart' | 'emptyCartMessage' | 'browseProducts' | 'unitPrice' | 'subtotal' | 'total' | 'proceedCheckout'
  | 'checkout' | 'completeOrder' | 'fullName' | 'phoneNumber' | 'whatsappNumber' | 'deliveryRegion' | 'deliveryDistrict' | 'deliveryArea' | 'streetLocation' | 'deliveryInstructions' | 'deliveryNotes' | 'backToCart' | 'placeOrder' | 'submitting' | 'orderError' | 'toggleLanguage'
  | 'trustedFromMpanda' | 'qualityHeadline' | 'heroDescription' | 'shopNow' | 'orderViaWhatsApp' | 'freshClean' | 'trustedSourcing' | 'whyChoose' | 'qualityTrustConvenience' | 'featuredProducts' | 'freshEssentials' | 'viewAllProducts' | 'details' | 'order' | 'readyToOrder' | 'shopMajimoto' | 'addToCart' | 'priceComingSoon'
  | 'aboutMajimoto' | 'fromMpandaToTable' | 'aboutP1' | 'aboutP2' | 'aboutP3' | 'aboutP4' | 'agricultureImage' | 'howDeliveryWorks' | 'deliveryAreas' | 'deliveryFeeNote'
  | 'contactUs' | 'hereToHelp' | 'mapPlaceholder' | 'name' | 'email' | 'message' | 'messagePlaceholder' | 'sendMessage'
  | 'orderPlaced' | 'thankYouOrder' | 'continueShopping' | 'backHome' | 'loadingProduct' | 'productNotFound' | 'backToShop' | 'backToProducts' | 'selectSize' | 'quantity' | 'source' | 'packagingSize'

type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; t: (key: TranslationKey) => string }

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    home: 'Home', shop: 'Shop', about: 'About', delivery: 'Delivery', contact: 'Contact', cart: 'Cart', orderNow: 'Order Now', fromMpanda: 'From Mpanda Farms', links: 'Links', follow: 'Follow', allRightsReserved: 'All rights reserved.',
    ourProducts: 'Our products', catalogue: 'Majimoto Product Catalogue', searchProducts: 'Search products', all: 'All', rice: 'Rice', beans: 'Beans', noProducts: 'No products match your search yet.', shoppingCart: 'Shopping cart', orderSummary: 'Order summary', emptyCart: 'Your cart is empty', emptyCartMessage: 'Add rice or beans to get started.', browseProducts: 'Browse products', unitPrice: 'Unit price', subtotal: 'Subtotal', total: 'Total', proceedCheckout: 'Proceed to checkout',
    checkout: 'Checkout', completeOrder: 'Complete your order', fullName: 'Full Name', phoneNumber: 'Phone Number', whatsappNumber: 'WhatsApp Number', deliveryRegion: 'Delivery Region', deliveryDistrict: 'Delivery District', deliveryArea: 'Delivery Area', streetLocation: 'Street / Location', deliveryInstructions: 'Additional Delivery Instructions', deliveryNotes: 'Any delivery notes or landmarks...', backToCart: 'Back to cart', placeOrder: 'Place Order', submitting: 'Submitting...', orderError: 'We could not submit your order right now. Please try again or order via WhatsApp.', toggleLanguage: 'Change language',
    trustedFromMpanda: 'Trusted from Mpanda', qualityHeadline: 'Quality Rice & Beans from Mpanda, Delivered to Your Door.', heroDescription: 'From trusted agricultural sources in Mpanda to your table. Order quality rice and beans conveniently and enjoy reliable delivery.', shopNow: 'Shop Now', orderViaWhatsApp: 'Order via WhatsApp', freshClean: 'Fresh & clean', trustedSourcing: 'Trusted sourcing', whyChoose: 'Why choose Majimoto?', qualityTrustConvenience: 'Built for quality, trust, and convenience', featuredProducts: 'Featured products', freshEssentials: 'Fresh essentials for your home', viewAllProducts: 'View all products', details: 'Details', order: 'Order', readyToOrder: 'Ready to order?', shopMajimoto: 'Shop Majimoto today', addToCart: 'Add to cart', priceComingSoon: 'Price coming soon',
    aboutMajimoto: 'About Majimoto', fromMpandaToTable: 'From Mpanda to your table', aboutP1: 'Majimoto Rice was created to make quality agricultural food products more accessible to households, families, and businesses across Tanzania.', aboutP2: 'Rooted in the agricultural heart of Mpanda, we are committed to sourcing reliable rice and beans from trusted producers and delivering them with care to customers who want convenience, consistency, and quality.', aboutP3: 'Our mission is simple: support agricultural producers, strengthen local supply chains, and provide everyday customers with dependable access to staple foods that are essential to daily living.', aboutP4: 'We are building a trusted brand that can grow from rice and beans to a wider range of agricultural products over time, while keeping quality, transparency, and service at the center of everything we do.', agricultureImage: 'Agriculture and food sourcing', howDeliveryWorks: 'How delivery works', deliveryAreas: 'Delivery areas', deliveryFeeNote: 'Delivery fees are configured centrally and may vary by location.',
    contactUs: 'Contact us', hereToHelp: 'We are here to help', mapPlaceholder: 'Map placeholder', name: 'Name', email: 'Email', message: 'Message', messagePlaceholder: 'Tell us how we can help...', sendMessage: 'Send message', orderPlaced: 'Order placed successfully', thankYouOrder: 'Thank you for ordering from Majimoto Rice. Our team will confirm your delivery details soon.', continueShopping: 'Continue shopping', backHome: 'Back home', loadingProduct: 'Loading product...', productNotFound: 'Product not found', backToShop: 'Back to shop', backToProducts: 'Back to products', selectSize: 'Select size', quantity: 'Quantity', source: 'Source', packagingSize: 'Packaging size',
  },
  sw: {
    home: 'Nyumbani', shop: 'Duka', about: 'Kuhusu Sisi', delivery: 'Uwasilishaji', contact: 'Mawasiliano', cart: 'Kikapu', orderNow: 'Agiza Sasa', fromMpanda: 'Kutoka Mashamba ya Mpanda', links: 'Viungo', follow: 'Tufuate', allRightsReserved: 'Haki zote zimehifadhiwa.',
    ourProducts: 'Bidhaa zetu', catalogue: 'Katalogi ya Bidhaa za Majimoto', searchProducts: 'Tafuta bidhaa', all: 'Zote', rice: 'Mchele', beans: 'Maharage', noProducts: 'Hakuna bidhaa zinazolingana na utafutaji wako.', shoppingCart: 'Kikapu cha manunuzi', orderSummary: 'Muhtasari wa oda', emptyCart: 'Kikapu chako kiko tupu', emptyCartMessage: 'Ongeza mchele au maharage kuanza.', browseProducts: 'Angalia bidhaa', unitPrice: 'Bei ya bidhaa', subtotal: 'Jumla ndogo', total: 'Jumla', proceedCheckout: 'Endelea kulipa',
    checkout: 'Malipo', completeOrder: 'Kamilisha oda yako', fullName: 'Jina kamili', phoneNumber: 'Namba ya simu', whatsappNumber: 'Namba ya WhatsApp', deliveryRegion: 'Mkoa wa uwasilishaji', deliveryDistrict: 'Wilaya ya uwasilishaji', deliveryArea: 'Eneo la uwasilishaji', streetLocation: 'Mtaa / Mahali', deliveryInstructions: 'Maelekezo ya ziada ya uwasilishaji', deliveryNotes: 'Maelezo ya uwasilishaji au alama za eneo...', backToCart: 'Rudi kwenye kikapu', placeOrder: 'Weka Oda', submitting: 'Inatuma...', orderError: 'Oda yako haikutumwa kwa sasa. Tafadhali jaribu tena au agiza kupitia WhatsApp.', toggleLanguage: 'Badilisha lugha',
    trustedFromMpanda: 'Tunaoaminika kutoka Mpanda', qualityHeadline: 'Mchele na Maharage Bora kutoka Mpanda, Vikifikishwa Mlangoni Kwako.', heroDescription: 'Kutoka kwa wakulima tunaowaamini Mpanda hadi mezani kwako. Agiza mchele na maharage bora kwa urahisi na upokee kwa wakati.', shopNow: 'Nunua Sasa', orderViaWhatsApp: 'Agiza kupitia WhatsApp', freshClean: 'Safisha na safi', trustedSourcing: 'Chanzo cha kuaminika', whyChoose: 'Kwa nini uchague Majimoto?', qualityTrustConvenience: 'Ubora, uaminifu na urahisi', featuredProducts: 'Bidhaa maarufu', freshEssentials: 'Mahitaji safi kwa familia yako', viewAllProducts: 'Angalia bidhaa zote', details: 'Maelezo', order: 'Agiza', readyToOrder: 'Uko tayari kuagiza?', shopMajimoto: 'Nunua Majimoto leo', addToCart: 'Ongeza kwenye kikapu', priceComingSoon: 'Bei itaongezwa hivi karibuni',
    aboutMajimoto: 'Kuhusu Majimoto', fromMpandaToTable: 'Kutoka Mpanda hadi mezani kwako', aboutP1: 'Majimoto Rice ilianzishwa ili kufanya bidhaa bora za kilimo zipatikane kwa urahisi zaidi kwa kaya, familia na biashara Tanzania nzima.', aboutP2: 'Tukiwa katika moyo wa kilimo wa Mpanda, tunajitolea kupata mchele na maharage bora kutoka kwa wazalishaji tunaowaamini na kuviwasilisha kwa uangalifu kwa wateja wanaotaka urahisi, ubora na uhakika.', aboutP3: 'Dhamira yetu ni rahisi: kuwaunga mkono wazalishaji wa kilimo, kuimarisha minyororo ya usambazaji wa ndani na kuwapa wateja chakula muhimu cha kila siku kwa uhakika.', aboutP4: 'Tunajenga chapa inayoaminika inayoweza kukua kutoka mchele na maharage hadi bidhaa nyingine za kilimo, huku tukiweka ubora, uwazi na huduma katikati ya kila tunachofanya.', agricultureImage: 'Kilimo na upatikanaji wa chakula', howDeliveryWorks: 'Jinsi uwasilishaji unavyofanya kazi', deliveryAreas: 'Maeneo ya uwasilishaji', deliveryFeeNote: 'Ada za uwasilishaji hupangwa kulingana na eneo na zinaweza kutofautiana.',
    contactUs: 'Wasiliana nasi', hereToHelp: 'Tupo kukusaidia', mapPlaceholder: 'Ramani', name: 'Jina', email: 'Barua pepe', message: 'Ujumbe', messagePlaceholder: 'Tuambie tunaweza kukusaidiaje...', sendMessage: 'Tuma ujumbe', orderPlaced: 'Oda imewekwa kikamilifu', thankYouOrder: 'Asante kwa kuagiza kutoka Majimoto Rice. Timu yetu itathibitisha taarifa zako za uwasilishaji hivi karibuni.', continueShopping: 'Endelea kununua', backHome: 'Rudi nyumbani', loadingProduct: 'Inapakia bidhaa...', productNotFound: 'Bidhaa haikupatikana', backToShop: 'Rudi dukani', backToProducts: 'Rudi kwenye bidhaa', selectSize: 'Chagua ukubwa', quantity: 'Idadi', source: 'Chanzo', packagingSize: 'Ukubwa wa kifurushi',
  },
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => window.localStorage.getItem('majimoto-language') === 'sw' ? 'sw' : 'en')
  const setLanguage = (nextLanguage: Language) => setLanguageState(nextLanguage)

  useEffect(() => {
    window.localStorage.setItem('majimoto-language', language)
    document.documentElement.lang = language
  }, [language])

  const value = useMemo(() => ({ language, setLanguage, t: (key: TranslationKey) => translations[language][key] }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider')
  return context
}
