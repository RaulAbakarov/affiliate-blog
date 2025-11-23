import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Language = 'en' | 'az' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'az';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations: Record<Language, any> = {
  en: {
    nav: {
      admin: 'Admin',
      logout: 'Logout',
      contactUs: 'Contact Us'
    },
    hero: {
      title: 'Welcome to Oriflame by Vusale',
      subtitle: 'Discover the beauty of Swedish cosmetics'
    },
    search: {
      placeholder: 'Search blog posts...',
      filterByTag: 'Filter by tag',
      allTags: 'All Tags',
      sortBy: 'Sort by',
      newest: 'Newest First',
      oldest: 'Oldest First',
      titleAZ: 'Title (A-Z)'
    },
    blog: {
      readMore: 'Read More',
      messageForInfo: 'Message for More Information',
      backToBlog: 'Back to Blog',
      products: 'Featured Products',
      noPosts: 'No blog posts found',
      noPostsDesc: 'Check back soon for new content!'
    },
    footer: {
      about: 'About',
      contact: 'Contact',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      disclaimer: 'Disclaimer',
      copyright: 'All rights reserved.',
      quickLinks: 'Quick Links',
      home: 'Home',
      legal: 'Legal',
      followUs: 'Follow Us',
      brandDescription: 'Your independent consultant for premium Swedish cosmetics and natural beauty products',
      watermark: 'Independent Oriflame consultant. Premium Swedish cosmetics.'
    },
    about: {
      title: 'About Oriflame by Vusale',
      intro: 'Welcome to my Oriflame beauty consulting platform! I\'m Vusale, your dedicated beauty consultant specializing in premium Swedish cosmetics.',
      mission: 'My Mission',
      missionText: 'My mission is to help you discover the perfect beauty products that enhance your natural beauty and boost your confidence. Through this blog, I share beauty tips, product recommendations, and personalized advice.',
      why: 'Why Oriflame?',
      whyText: 'Oriflame is a leading Swedish beauty company with over 50 years of experience in creating natural, innovative cosmetics. Their products combine nature and science to deliver exceptional results.',
      services: 'My Services',
      consultation: 'Personalized Beauty Consultations',
      recommendations: 'Product Recommendations',
      tips: 'Beauty Tips & Tutorials',
      support: 'Ongoing Support & Advice',
      cta: 'Ready to start your beauty journey? Contact me today for personalized recommendations!'
    },
    contact: {
      title: 'Contact Us',
      intro: 'Have questions about Oriflame products or need personalized beauty advice? I\'m here to help!',
      getInTouch: 'Get in Touch',
      whatsapp: 'WhatsApp',
      whatsappDesc: 'Message me directly for quick responses and personalized consultations.',
      email: 'Email',
      emailDesc: 'Send me an email and I\'ll get back to you within 24 hours.',
      hours: 'Response Hours',
      hoursDesc: 'Monday - Saturday: 9:00 AM - 8:00 PM',
      sunday: 'Sunday: 10:00 AM - 6:00 PM',
      followMe: 'Follow Me',
      socialDesc: 'Stay updated with the latest beauty tips, product launches, and exclusive offers!'
    },
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated',
      intro: 'At Oriflame by Vusale, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.',
      collection: 'Information We Collect',
      collectionText: 'We may collect personal information such as your name, email address, and WhatsApp number when you contact us for consultations or subscribe to our updates. We also collect non-personal information such as browser type and pages visited.',
      usage: 'How We Use Your Information',
      usageText: 'We use your information to provide personalized beauty consultations, respond to your inquiries, send product recommendations, and improve our services. We never sell your personal information to third parties.',
      cookies: 'Cookies',
      cookiesText: 'Our website uses cookies to enhance your browsing experience and analyze site traffic. You can disable cookies in your browser settings, though this may affect site functionality.',
      security: 'Data Security',
      securityText: 'We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.',
      contact: 'Contact Us',
      contactText: 'If you have any questions about this Privacy Policy, please contact us at'
    },
    terms: {
      title: 'Terms of Service',
      lastUpdated: 'Last Updated',
      intro: 'Welcome to Oriflame by Vusale. By accessing and using this website, you accept and agree to be bound by the following terms and conditions.',
      use: 'Use of Website',
      useText: 'This website is for informational purposes and to facilitate beauty consultations. You agree to use the site only for lawful purposes and in a way that does not infringe upon the rights of others.',
      content: 'Content',
      contentText: 'All content on this website, including text, images, and blog posts, is the property of Oriflame by Vusale or Oriflame Cosmetics and is protected by copyright laws. You may not reproduce or distribute content without permission.',
      products: 'Product Information',
      productsText: 'While we strive to provide accurate product information and recommendations, we cannot guarantee specific results. Individual results may vary based on skin type, usage, and other factors.',
      consultations: 'Consultations',
      consultationsText: 'Beauty consultations provided through this platform are advisory in nature. We recommend consulting with a dermatologist for specific skin concerns or medical conditions.',
      liability: 'Limitation of Liability',
      liabilityText: 'Oriflame by Vusale shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website or products purchased based on our recommendations.',
      changes: 'Changes to Terms',
      changesText: 'We reserve the right to modify these Terms of Service at any time. Continued use of the website after changes constitutes acceptance of the modified terms.'
    },
    disclaimer: {
      title: 'Disclaimer',
      lastUpdated: 'Last Updated',
      intro: 'The information provided on this website is for general informational purposes only. All information is provided in good faith, however we make no representation or warranty of any kind regarding the accuracy or completeness of any information.',
      affiliate: 'Affiliate Relationship',
      affiliateText: 'This website is operated by an independent Oriflame consultant. While I recommend Oriflame products based on personal experience and knowledge, I am not a licensed dermatologist or medical professional.',
      results: 'Results Disclaimer',
      resultsText: 'Individual results may vary. The testimonials and examples shared on this blog represent personal experiences and are not guarantees of similar results for all users.',
      medical: 'Medical Advice',
      medicalText: 'The content on this website is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions regarding a medical condition or skin concern.',
      products: 'Product Information',
      productsText: 'Product descriptions and recommendations are based on manufacturer information and personal experience. Always read product labels and perform patch tests before using new cosmetic products.',
      external: 'External Links',
      externalText: 'This website may contain links to external sites (such as WhatsApp or Instagram). We are not responsible for the content or privacy practices of these external sites.',
      liability: 'Limitation of Liability',
      liabilityText: 'Under no circumstances shall Oriflame by Vusale be liable for any loss or damage arising from your use of this website or reliance on information provided herein.'
    },
    admin: {
      dashboard: 'Admin Dashboard',
      welcome: 'Welcome',
      stats: 'Statistics',
      totalPosts: 'Total Posts',
      publishedPosts: 'Published Posts',
      draftPosts: 'Draft Posts',
      manage: 'Manage Blog Posts',
      search: 'Search posts...',
      newPost: 'New Post',
      title: 'Title',
      status: 'Status',
      date: 'Date',
      actions: 'Actions',
      edit: 'Edit',
      delete: 'Delete',
      published: 'Published',
      draft: 'Draft',
      confirmDelete: 'Are you sure you want to delete this post?'
    },
    editor: {
      createPost: 'Create New Post',
      editPost: 'Edit Post',
      title: 'Post Title',
      titlePlaceholder: 'Enter post title',
      excerpt: 'Excerpt',
      excerptPlaceholder: 'Brief description of the post',
      content: 'Content',
      tags: 'Tags',
      tagsPlaceholder: 'beauty, skincare, makeup (comma separated)',
      featuredImage: 'Featured Image URL',
      imagePlaceholder: 'https://example.com/image.jpg',
      publishStatus: 'Publish Status',
      products: 'Products',
      addProduct: 'Add Product',
      productTitle: 'Product Title',
      productDescription: 'Product Description',
      productImage: 'Product Image URL',
      whatsappNumber: 'WhatsApp Number',
      whatsappPlaceholder: '+994501234567',
      removeProduct: 'Remove Product',
      saveAsDraft: 'Save as Draft',
      publish: 'Publish',
      update: 'Update Post',
      postLanguage: 'Post Language',
      postLanguageHelp: 'Select the language for this post. This will automatically add the language tag.'
    },
    login: {
      title: 'Admin Login',
      username: 'Username',
      password: 'Password',
      login: 'Login',
      error: 'Invalid credentials'
    }
  },
  az: {
    nav: {
      admin: 'Admin',
      logout: 'Çıxış',
      contactUs: 'Əlaqə'
    },
    hero: {
      title: 'Vüsalə tərəfindən Oriflame-ə Xoş Gəlmisiniz',
      subtitle: 'İsveç kosmetikasının gözəlliyini kəşf edin'
    },
    search: {
      placeholder: 'Blog yazılarında axtar...',
      filterByTag: 'Teqə görə süzgəc',
      allTags: 'Bütün Teqlər',
      sortBy: 'Sırala',
      newest: 'Ən Yeni',
      oldest: 'Ən Köhnə',
      titleAZ: 'Başlıq (A-Z)'
    },
    blog: {
      readMore: 'Daha Ətraflı',
      messageForInfo: 'Ətraflı Məlumat Üçün Mesaj Göndərin',
      backToBlog: 'Bloqa Qayıt',
      products: 'Seçilmiş Məhsullar',
      noPosts: 'Heç bir blog yazısı tapılmadı',
      noPostsDesc: 'Tezliklə yeni məzmun üçün yenidən yoxlayın!'
    },
    footer: {
      about: 'Haqqında',
      contact: 'Əlaqə',
      privacy: 'Məxfilik Siyasəti',
      terms: 'İstifadə Şərtləri',
      disclaimer: 'İmtina',
      copyright: 'Bütün hüquqlar qorunur.',
      quickLinks: 'Sürətli Keçidlər',
      home: 'Ana Səhifə',
      legal: 'Hüquqi',
      followUs: 'Bizi İzləyin',
      brandDescription: 'Premium İsveç kosmetikası və təbii gözəllik məhsulları üzrə müstəqil məsləhətçiniz',
      watermark: 'Müstəqil Oriflame məsləhətçisi. Premium İsveç kosmetikası.'
    },
    about: {
      title: 'Vüsalə tərəfindən Oriflame Haqqında',
      intro: 'Mənim Oriflame gözəllik məsləhət platformama xoş gəlmisiniz! Mən Vüsalə, premium İsveç kosmetikası üzrə ixtisaslaşmış sizin xüsusi gözəllik məsləhətçinizəm.',
      mission: 'Mənim Missiyam',
      missionText: 'Mənim missiyam sizə təbii gözəlliyinizi artıran və özünüzə inamınızı gücləndirən mükəmməl gözəllik məhsullarını kəşf etməyə kömək etməkdir. Bu blog vasitəsilə gözəllik məsləhətləri, məhsul tövsiyələri və fərdi məsləhətlər paylaşıram.',
      why: 'Niyə Oriflame?',
      whyText: 'Oriflame təbii, innovativ kosmetika yaratmaqda 50 ildən çox təcrübəyə malik aparıcı İsveç gözəllik şirkətidir. Onların məhsulları müstəsna nəticələr təqdim etmək üçün təbiət və elmi birləşdirir.',
      services: 'Mənim Xidmətlərim',
      consultation: 'Fərdi Gözəllik Məsləhətləri',
      recommendations: 'Məhsul Tövsiyələri',
      tips: 'Gözəllik Məsləhətləri və Təlimlər',
      support: 'Davamlı Dəstək və Məsləhət',
      cta: 'Gözəllik səyahətinizə başlamağa hazırsınız? Fərdi tövsiyələr üçün bu gün mənimlə əlaqə saxlayın!'
    },
    contact: {
      title: 'Bizimlə Əlaqə',
      intro: 'Oriflame məhsulları haqqında sualınız var və ya fərdi gözəllik məsləhəti lazımdır? Mən sizə kömək etmək üçün buradayam!',
      getInTouch: 'Əlaqə Saxlayın',
      whatsapp: 'WhatsApp',
      whatsappDesc: 'Sürətli cavablar və fərdi məsləhətlər üçün mənə birbaşa mesaj göndərin.',
      email: 'E-poçt',
      emailDesc: 'Mənə e-poçt göndərin və 24 saat ərzində sizə cavab verəcəyəm.',
      hours: 'Cavab Saatları',
      hoursDesc: 'Bazar ertəsi - Şənbə: 09:00 - 20:00',
      sunday: 'Bazar: 10:00 - 18:00',
      followMe: 'Məni İzləyin',
      socialDesc: 'Ən son gözəllik məsləhətləri, məhsul buraxılışları və eksklüziv təkliflər haqqında məlumatlanın!'
    },
    privacy: {
      title: 'Məxfilik Siyasəti',
      lastUpdated: 'Son Yenilənmə',
      intro: 'Vüsalə tərəfindən Oriflame-də məxfiliyinizə hörmət edirik və şəxsi məlumatlarınızın qorunmasına öhdəlikyik. Bu Məxfilik Siyasəti məlumatlarınızı necə topladığımızı, istifadə etdiyimizi və qoruduğumuzu izah edir.',
      collection: 'Topladığımız Məlumatlar',
      collectionText: 'Məsləhət üçün bizimlə əlaqə saxladığınız və ya yeniliklərimizə abunə olduğunuz zaman adınız, e-poçt ünvanınız və WhatsApp nömrəniz kimi şəxsi məlumatları toplaya bilərik. Həmçinin brauzer növü və ziyarət etdiyiniz səhifələr kimi qeyri-şəxsi məlumatları da toplayırıq.',
      usage: 'Məlumatlarınızdan Necə İstifadə Edirik',
      usageText: 'Məlumatlarınızdan fərdi gözəllik məsləhətləri vermək, sorğularınıza cavab vermək, məhsul tövsiyələri göndərmək və xidmətlərimizi təkmilləşdirmək üçün istifadə edirik. Şəxsi məlumatlarınızı heç vaxt üçüncü tərəflərə satmırıq.',
      cookies: 'Kukilər',
      cookiesText: 'Veb saytımız baxış təcrübənizi artırmaq və sayt trafikini təhlil etmək üçün kukilərdən istifadə edir. Brauzer parametrlərinizdə kukiləri söndürə bilərsiniz, baxmayaraq ki bu sayt funksionallığına təsir edə bilər.',
      security: 'Məlumat Təhlükəsizliyi',
      securityText: 'Şəxsi məlumatlarınızı icazəsiz giriş, dəyişiklik və ya açıqlamadan qorumaq üçün müvafiq təhlükəsizlik tədbirləri həyata keçiririk.',
      contact: 'Bizimlə Əlaqə',
      contactText: 'Bu Məxfilik Siyasəti ilə bağlı hər hansı sualınız varsa, bizimlə əlaqə saxlayın'
    },
    terms: {
      title: 'İstifadə Şərtləri',
      lastUpdated: 'Son Yenilənmə',
      intro: 'Vüsalə tərəfindən Oriflame-ə xoş gəlmisiniz. Bu veb sayta daxil olmaqla və istifadə etməklə, aşağıdaki şərtlərlə razılaşırsınız.',
      use: 'Veb Saytın İstifadəsi',
      useText: 'Bu veb sayt məlumat məqsədləri və gözəllik məsləhətlərini asanlaşdırmaq üçündür. Siz saytdan yalnız qanuni məqsədlər üçün və başqalarının hüquqlarını pozmayacaq şəkildə istifadə etməyə razılaşırsınız.',
      content: 'Məzmun',
      contentText: 'Bu veb saytdakı mətn, şəkillər və blog yazıları daxil olmaqla bütün məzmun Vüsalə tərəfindən Oriflame və ya Oriflame Cosmetics-in mülkiyyətidir və müəllif hüquqları qanunları ilə qorunur. İcazə olmadan məzmunu çoxalda və ya yaya bilməzsiniz.',
      products: 'Məhsul Məlumatı',
      productsText: 'Dəqiq məhsul məlumatı və tövsiyələr təqdim etməyə çalışsaq da, konkret nəticələrə zəmanət verə bilmərik. Fərdi nəticələr dəri növü, istifadə və digər amillərdən asılı olaraq dəyişə bilər.',
      consultations: 'Məsləhətlər',
      consultationsText: 'Bu platforma vasitəsilə verilən gözəllik məsləhətləri məsləhət xarakterlidir. Konkret dəri problemləri və ya tibbi vəziyyətlər üçün dermatoloqla məsləhətləşməyi tövsiyə edirik.',
      liability: 'Məsuliyyətin Məhdudlaşdırılması',
      liabilityText: 'Vüsalə tərəfindən Oriflame bu veb saytdan istifadəniz və ya tövsiyələrimizə əsasən alınmış məhsullardan irəli gələn hər hansı dolayı, təsadüfi və ya nəticə zərərlərinə görə məsuliyyət daşımır.',
      changes: 'Şərtlərdə Dəyişikliklər',
      changesText: 'İstifadə Şərtlərini istənilən vaxt dəyişdirmək hüququnu özümüzdə saxlayırıq. Dəyişikliklərdən sonra veb saytdan istifadəni davam etdirmək dəyişdirilmiş şərtləri qəbul etmək deməkdir.'
    },
    disclaimer: {
      title: 'İmtina',
      lastUpdated: 'Son Yenilənmə',
      intro: 'Bu veb saytda təqdim olunan məlumatlar yalnız ümumi məlumat məqsədləri üçündür. Bütün məlumatlar yaxşı niyyətlə təqdim olunur, lakin hər hansı məlumatın dəqiqliyi və ya tamlığı ilə bağlı heç bir təmsil və ya zəmanət vermirik.',
      affiliate: 'Əlaqə Münasibəti',
      affiliateText: 'Bu veb sayt müstəqil Oriflame məsləhətçisi tərəfindən idarə olunur. Şəxsi təcrübə və biliyə əsaslanaraq Oriflame məhsullarını tövsiyə etsəm də, mən lisenziyalı dermatoloq və ya tibb mütəxəssisi deyiləm.',
      results: 'Nəticələr İmtinası',
      resultsText: 'Fərdi nəticələr dəyişə bilər. Bu blogda paylaşılan rəylər və nümunələr şəxsi təcrübələri təmsil edir və bütün istifadəçilər üçün oxşar nəticələrə zəmanət deyil.',
      medical: 'Tibbi Məsləhət',
      medicalText: 'Bu veb saytdakı məzmun peşəkar tibbi məsləhət, diaqnoz və ya müalicənin yerinə keçməsi nəzərdə tutulmayıb. Tibbi vəziyyət və ya dəri problemi ilə bağlı suallarınız varsa, həmişə ixtisaslı tibb işçisindən məsləhət alın.',
      products: 'Məhsul Məlumatı',
      productsText: 'Məhsul təsvirləri və tövsiyələri istehsalçı məlumatı və şəxsi təcrübəyə əsaslanır. Yeni kosmetik məhsullardan istifadə etməzdən əvvəl həmişə məhsul etiketlərini oxuyun və patch testləri aparın.',
      external: 'Xarici Linklər',
      externalText: 'Bu veb saytda xarici saytlara keçidlər ola bilər (məsələn WhatsApp və ya Instagram). Bu xarici saytların məzmunu və məxfilik təcrübələrinə görə məsuliyyət daşımırıq.',
      liability: 'Məsuliyyətin Məhdudlaşdırılması',
      liabilityText: 'Heç bir halda Vüsalə tərəfindən Oriflame bu veb saytdan istifadəniz və ya burada təqdim olunan məlumata arxalanmaqdan irəli gələn hər hansı itki və ya zərərə görə məsuliyyət daşımır.'
    },
    admin: {
      dashboard: 'Admin Paneli',
      welcome: 'Xoş Gəlmisiniz',
      stats: 'Statistika',
      totalPosts: 'Ümumi Yazılar',
      publishedPosts: 'Dərc Edilmiş Yazılar',
      draftPosts: 'Qaralama Yazılar',
      manage: 'Blog Yazılarını İdarə Et',
      search: 'Yazılarda axtar...',
      newPost: 'Yeni Yazı',
      title: 'Başlıq',
      status: 'Status',
      date: 'Tarix',
      actions: 'Əməliyyatlar',
      edit: 'Redaktə Et',
      delete: 'Sil',
      published: 'Dərc Edilmiş',
      draft: 'Qaralama',
      confirmDelete: 'Bu yazını silmək istədiyinizə əminsiniz?'
    },
    editor: {
      createPost: 'Yeni Yazı Yarat',
      editPost: 'Yazını Redaktə Et',
      title: 'Yazı Başlığı',
      titlePlaceholder: 'Yazı başlığını daxil edin',
      excerpt: 'Xülasə',
      excerptPlaceholder: 'Yazının qısa təsviri',
      content: 'Məzmun',
      tags: 'Teqlər',
      tagsPlaceholder: 'gözəllik, dəri baxımı, makiyaj (vergüllə ayrılmış)',
      featuredImage: 'Əsas Şəkil URL',
      imagePlaceholder: 'https://example.com/image.jpg',
      publishStatus: 'Dərc Statusu',
      products: 'Məhsullar',
      addProduct: 'Məhsul Əlavə Et',
      productTitle: 'Məhsul Başlığı',
      productDescription: 'Məhsul Təsviri',
      productImage: 'Məhsul Şəkil URL',
      whatsappNumber: 'WhatsApp Nömrəsi',
      whatsappPlaceholder: '+994501234567',
      removeProduct: 'Məhsulu Sil',
      saveAsDraft: 'Qaralama Kimi Saxla',
      publish: 'Dərc Et',
      update: 'Yazını Yenilə',
      postLanguage: 'Yazı Dili',
      postLanguageHelp: 'Bu yazı üçün dili seçin. Bu avtomatik olaraq dil teqini əlavə edəcək.'
    },
    login: {
      title: 'Admin Girişi',
      username: 'İstifadəçi Adı',
      password: 'Şifrə',
      login: 'Giriş',
      error: 'Yanlış məlumatlar'
    }
  },
  ru: {
    nav: {
      admin: 'Админ',
      logout: 'Выход',
      contactUs: 'Связаться'
    },
    hero: {
      title: 'Добро пожаловать в Oriflame от Вусале',
      subtitle: 'Откройте для себя красоту шведской косметики'
    },
    search: {
      placeholder: 'Поиск статей...',
      filterByTag: 'Фильтр по тегу',
      allTags: 'Все теги',
      sortBy: 'Сортировать',
      newest: 'Сначала новые',
      oldest: 'Сначала старые',
      titleAZ: 'Название (А-Я)'
    },
    blog: {
      readMore: 'Читать далее',
      messageForInfo: 'Напишите для получения информации',
      backToBlog: 'Вернуться к блогу',
      products: 'Рекомендуемые товары',
      noPosts: 'Статьи не найдены',
      noPostsDesc: 'Скоро появится новый контент!'
    },
    footer: {
      about: 'О нас',
      contact: 'Контакты',
      privacy: 'Политика конфиденциальности',
      terms: 'Условия использования',
      disclaimer: 'Отказ от ответственности',
      copyright: 'Все права защищены.',
      quickLinks: 'Быстрые ссылки',
      home: 'Главная',
      legal: 'Правовая информация',
      followUs: 'Следите за нами',
      brandDescription: 'Ваш независимый консультант по премиальной шведской косметике и натуральным продуктам красоты',
      watermark: 'Независимый консультант Oriflame. Премиальная шведская косметика.'
    },
    about: {
      title: 'О Oriflame от Вусале',
      intro: 'Добро пожаловать на мою платформу консультаций по красоте Oriflame! Я Вусале, ваш персональный консультант по красоте, специализирующийся на премиальной шведской косметике.',
      mission: 'Моя миссия',
      missionText: 'Моя миссия - помочь вам найти идеальные продукты красоты, которые подчеркивают вашу естественную красоту и повышают уверенность в себе. Через этот блог я делюсь советами по красоте, рекомендациями продуктов и персональными консультациями.',
      why: 'Почему Oriflame?',
      whyText: 'Oriflame - ведущая шведская косметическая компания с более чем 50-летним опытом создания натуральной инновационной косметики. Их продукты сочетают природу и науку для достижения исключительных результатов.',
      services: 'Мои услуги',
      consultation: 'Персональные консультации по красоте',
      recommendations: 'Рекомендации продуктов',
      tips: 'Советы и уроки красоты',
      support: 'Постоянная поддержка и консультации',
      cta: 'Готовы начать свое путешествие в мир красоты? Свяжитесь со мной сегодня для персональных рекомендаций!'
    },
    contact: {
      title: 'Свяжитесь с нами',
      intro: 'Есть вопросы о продуктах Oriflame или нужна персональная консультация по красоте? Я здесь, чтобы помочь!',
      getInTouch: 'Связаться',
      whatsapp: 'WhatsApp',
      whatsappDesc: 'Напишите мне напрямую для быстрых ответов и персональных консультаций.',
      email: 'Электронная почта',
      emailDesc: 'Отправьте мне письмо, и я отвечу в течение 24 часов.',
      hours: 'Время ответа',
      hoursDesc: 'Понедельник - Суббота: 09:00 - 20:00',
      sunday: 'Воскресенье: 10:00 - 18:00',
      followMe: 'Следите за мной',
      socialDesc: 'Будьте в курсе последних советов по красоте, запусков продуктов и эксклюзивных предложений!'
    },
    privacy: {
      title: 'Политика конфиденциальности',
      lastUpdated: 'Последнее обновление',
      intro: 'В Oriflame от Вусале мы уважаем вашу конфиденциальность и стремимся защищать вашу личную информацию. Эта Политика конфиденциальности объясняет, как мы собираем, используем и защищаем ваши данные.',
      collection: 'Информация, которую мы собираем',
      collectionText: 'Мы можем собирать личную информацию, такую как ваше имя, адрес электронной почты и номер WhatsApp, когда вы связываетесь с нами для консультаций или подписываетесь на наши обновления. Мы также собираем неличную информацию, такую как тип браузера и посещенные страницы.',
      usage: 'Как мы используем вашу информацию',
      usageText: 'Мы используем вашу информацию для предоставления персональных консультаций по красоте, ответов на ваши запросы, отправки рекомендаций продуктов и улучшения наших услуг. Мы никогда не продаем вашу личную информацию третьим лицам.',
      cookies: 'Файлы cookie',
      cookiesText: 'Наш сайт использует файлы cookie для улучшения вашего опыта просмотра и анализа трафика сайта. Вы можете отключить файлы cookie в настройках браузера, хотя это может повлиять на функциональность сайта.',
      security: 'Безопасность данных',
      securityText: 'Мы применяем соответствующие меры безопасности для защиты вашей личной информации от несанкционированного доступа, изменения или раскрытия.',
      contact: 'Свяжитесь с нами',
      contactText: 'Если у вас есть вопросы по этой Политике конфиденциальности, свяжитесь с нами по адресу'
    },
    terms: {
      title: 'Условия использования',
      lastUpdated: 'Последнее обновление',
      intro: 'Добро пожаловать в Oriflame от Вусале. Посещая и используя этот веб-сайт, вы принимаете и соглашаетесь соблюдать следующие условия.',
      use: 'Использование сайта',
      useText: 'Этот сайт предназначен для информационных целей и облегчения консультаций по красоте. Вы соглашаетесь использовать сайт только в законных целях и таким образом, который не нарушает права других лиц.',
      content: 'Контент',
      contentText: 'Весь контент на этом сайте, включая текст, изображения и статьи блога, является собственностью Oriflame от Вусале или Oriflame Cosmetics и защищен законами об авторском праве. Вы не можете воспроизводить или распространять контент без разрешения.',
      products: 'Информация о продуктах',
      productsText: 'Хотя мы стремимся предоставлять точную информацию о продуктах и рекомендации, мы не можем гарантировать конкретные результаты. Индивидуальные результаты могут различаться в зависимости от типа кожи, использования и других факторов.',
      consultations: 'Консультации',
      consultationsText: 'Консультации по красоте, предоставляемые через эту платформу, носят рекомендательный характер. Мы рекомендуем консультироваться с дерматологом по конкретным проблемам кожи или медицинским состояниям.',
      liability: 'Ограничение ответственности',
      liabilityText: 'Oriflame от Вусале не несет ответственности за любой косвенный, случайный или последующий ущерб, возникший в результате использования вами этого сайта или продуктов, приобретенных на основе наших рекомендаций.',
      changes: 'Изменения в условиях',
      changesText: 'Мы оставляем за собой право изменять эти Условия использования в любое время. Продолжение использования сайта после изменений означает принятие измененных условий.'
    },
    disclaimer: {
      title: 'Отказ от ответственности',
      lastUpdated: 'Последнее обновление',
      intro: 'Информация, представленная на этом сайте, предназначена только для общих информационных целей. Вся информация предоставляется добросовестно, однако мы не даем никаких заверений или гарантий относительно точности или полноты любой информации.',
      affiliate: 'Партнерские отношения',
      affiliateText: 'Этот сайт управляется независимым консультантом Oriflame. Хотя я рекомендую продукты Oriflame на основе личного опыта и знаний, я не являюсь лицензированным дерматологом или медицинским специалистом.',
      results: 'Отказ от ответственности за результаты',
      resultsText: 'Индивидуальные результаты могут различаться. Отзывы и примеры, представленные в этом блоге, представляют личный опыт и не являются гарантией аналогичных результатов для всех пользователей.',
      medical: 'Медицинские консультации',
      medicalText: 'Контент на этом сайте не предназначен для замены профессиональной медицинской консультации, диагностики или лечения. Всегда обращайтесь к квалифицированному медицинскому работнику с любыми вопросами относительно медицинского состояния или проблем с кожей.',
      products: 'Информация о продуктах',
      productsText: 'Описания и рекомендации продуктов основаны на информации производителя и личном опыте. Всегда читайте этикетки продуктов и проводите тесты перед использованием новых косметических продуктов.',
      external: 'Внешние ссылки',
      externalText: 'Этот сайт может содержать ссылки на внешние сайты (такие как WhatsApp или Instagram). Мы не несем ответственности за контент или политику конфиденциальности этих внешних сайтов.',
      liability: 'Ограничение ответственности',
      liabilityText: 'Ни при каких обстоятельствах Oriflame от Вусале не несет ответственности за любые убытки или ущерб, возникшие в результате использования вами этого сайта или доверия к предоставленной здесь информации.'
    },
    admin: {
      dashboard: 'Панель администратора',
      welcome: 'Добро пожаловать',
      stats: 'Статистика',
      totalPosts: 'Всего статей',
      publishedPosts: 'Опубликованные статьи',
      draftPosts: 'Черновики',
      manage: 'Управление статьями блога',
      search: 'Поиск статей...',
      newPost: 'Новая статья',
      title: 'Название',
      status: 'Статус',
      date: 'Дата',
      actions: 'Действия',
      edit: 'Редактировать',
      delete: 'Удалить',
      published: 'Опубликовано',
      draft: 'Черновик',
      confirmDelete: 'Вы уверены, что хотите удалить эту статью?'
    },
    editor: {
      createPost: 'Создать новую статью',
      editPost: 'Редактировать статью',
      title: 'Название статьи',
      titlePlaceholder: 'Введите название статьи',
      excerpt: 'Краткое описание',
      excerptPlaceholder: 'Краткое описание статьи',
      content: 'Содержание',
      tags: 'Теги',
      tagsPlaceholder: 'красота, уход за кожей, макияж (через запятую)',
      featuredImage: 'URL главного изображения',
      imagePlaceholder: 'https://example.com/image.jpg',
      publishStatus: 'Статус публикации',
      products: 'Товары',
      addProduct: 'Добавить товар',
      productTitle: 'Название товара',
      productDescription: 'Описание товара',
      productImage: 'URL изображения товара',
      whatsappNumber: 'Номер WhatsApp',
      whatsappPlaceholder: '+994501234567',
      removeProduct: 'Удалить товар',
      saveAsDraft: 'Сохранить как черновик',
      publish: 'Опубликовать',
      update: 'Обновить статью',
      postLanguage: 'Язык статьи',
      postLanguageHelp: 'Выберите язык для этой статьи. Это автоматически добавит языковой тег.'
    },
    login: {
      title: 'Вход администратора',
      username: 'Имя пользователя',
      password: 'Пароль',
      login: 'Войти',
      error: 'Неверные данные'
    }
  }
};
