// "use client"

// import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// type Language = "en-US" | "fr-FR" | "ar-SA"

// interface LanguageContextType {
//   language: Language
//   setLanguage: (lang: Language) => void
//   isRTL: boolean
//   t: (key: string) => string
// }

// const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// const supportedLanguages = [
//   { code: "en-US", name: "English (US)" },
//   { code: "fr-FR", name: "Français (France)" },
//   { code: "ar-SA", name: "العربية (السعودية)" },
// ]

// // Translation dictionary
// const translations = {
//   "en-US": {
//     // Navigation
//     "nav.dashboard": "Dashboard",
//     "nav.assistant": "Assistant",
//     "nav.voiceAssistant": "Voice Assistant",

//     // Dashboard
//     "dashboard.title": "Voice AI Assistant Dashboard",
//     "dashboard.subtitle": "Monitor and manage your Voice AI Assistant",
//     "dashboard.totalConversations": "Total Conversations",
//     "dashboard.todayConversations": "Today's Conversations",
//     "dashboard.avgResponseTime": "Avg Response Time",
//     "dashboard.successRate": "Success Rate",
//     "dashboard.recentConversations": "Recent Conversations",
//     "dashboard.noConversations": "No conversations yet",
//     "dashboard.export": "Export",
//     "dashboard.clear": "Clear",
//     "dashboard.systemStatus": "System Status",
//     "dashboard.quickActions": "Quick Actions",
//     "dashboard.refreshStats": "Refresh Stats",
//     "dashboard.downloadReport": "Download Report",
//     "dashboard.systemSettings": "System Settings",
//     "dashboard.usageTips": "Usage Tips",

//     // Assistant Selection
//     "selection.title": "Choose Your AI Assistant",
//     "selection.subtitle":
//       "Select the assistant that best matches your needs. Each assistant is specialized to provide you with the most relevant support.",
//     "selection.startChat": "Start Chat with",
//     "selection.whichAssistant": "Which Assistant is Right for You?",
//     "selection.chooseSlahB2B": "Choose Slah for B2B",
//     "selection.chooseAmiraB2C": "Choose Amira for B2C",
//     "selection.connecting": "Connecting to",
//     "selection.pleaseWait": "Please wait while we set up your",

//     // Assistant Cards
//     "assistant.slah.type": "B2B Assistant",
//     "assistant.slah.description": "Specialized in business-to-business solutions and enterprise support",
//     "assistant.slah.features.enterprise": "Enterprise Solutions",
//     "assistant.slah.features.integration": "Technical Integration",
//     "assistant.slah.features.analytics": "Business Analytics",
//     "assistant.slah.features.documentation": "API Documentation",
//     "assistant.slah.features.architecture": "System Architecture",
//     "assistant.slah.features.corporateSupport": "Corporate Support", // Changed key for consistency

//     "assistant.amira.type": "B2C Assistant",
//     "assistant.amira.description": "Focused on consumer support and customer service excellence",
//     "assistant.amira.features.customerSupport": "Customer Support", // Changed key for consistency
//     "assistant.amira.features.productInformation": "Product Information", // Changed key for consistency
//     "assistant.amira.features.orderAssistance": "Order Assistance", // Changed key for consistency
//     "assistant.amira.features.accountManagement": "Account Management", // Changed key for consistency
//     "assistant.amira.features.billingInquiries": "Billing Inquiries", // Changed key for consistency
//     "assistant.amira.features.generalHelp": "General Help", // Changed key for consistency

//     "assistant.gender.male": "Male",
//     "assistant.gender.female": "Female",

//     // Comparison Section
//     "comparison.enterpriseSolutions": "Enterprise-level solutions", // New key
//     "comparison.technicalIntegrations": "Technical integrations", // New key
//     "comparison.businessProcessOptimization": "Business process optimization", // New key
//     "comparison.corporateAccountManagement": "Corporate account management", // New key
//     "comparison.personalCustomerSupport": "Personal customer support", // New key
//     "comparison.productRecommendations": "Product recommendations", // New key
//     "comparison.orderBillingAssistance": "Order and billing assistance", // New key
//     "comparison.generalConsumerInquiries": "General consumer inquiries", // New key

//     // Assistant Chat
//     "chat.backToSelection": "Back to Selection",
//     "chat.selectLanguage": "Select Language",
//     "chat.limitedBrowser": "Limited Browser Support",
//     "chat.speechNotSupported":
//       "Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari for the best experience.",
//     "chat.youSaid": "You said:",
//     "chat.response": "Response:",
//     "chat.conversationHistory": "Conversation History",
//     "chat.clearHistory": "Clear History",
//     "chat.specializations": "Specializations",
//     "chat.playing": "Playing...",
//     "chat.replayResponse": "Replay Response",
//     "chat.interrupted": "Interrupted",
//     "chat.speechStopped": "Speech stopped. You can speak now!",
//     "chat.conversationCleared": "Conversation Cleared",
//     "chat.historyReset": "Your conversation history has been reset.",

//     // Status messages
//     "status.listening": "I'm listening...",
//     "status.thinking": "is thinking...",
//     "status.speaking": "is speaking...",
//     "status.ready": "Ready for your next question!",
//     "status.clickToStart": "Click me to start talking",
//     "status.rememberConversation": "(I remember our conversation)",
//     "status.clickToStop": "(click to stop)",
//     "status.clickToInterrupt": "(click to interrupt when I start speaking)",
//     "status.clickAnywhere": "(click anywhere on me to interrupt)",
//   },

//   "fr-FR": {
//     // Navigation
//     "nav.dashboard": "Tableau de bord",
//     "nav.assistant": "Assistant",
//     "nav.voiceAssistant": "Assistant Vocal",

//     // Dashboard
//     "dashboard.title": "Tableau de bord Assistant IA Vocal",
//     "dashboard.subtitle": "Surveillez et gérez votre Assistant IA Vocal",
//     "dashboard.totalConversations": "Conversations totales",
//     "dashboard.todayConversations": "Conversations d'aujourd'hui",
//     "dashboard.avgResponseTime": "Temps de réponse moyen",
//     "dashboard.successRate": "Taux de réussite",
//     "dashboard.recentConversations": "Conversations récentes",
//     "dashboard.noConversations": "Aucune conversation pour le moment",
//     "dashboard.export": "Exporter",
//     "dashboard.clear": "Effacer",
//     "dashboard.systemStatus": "État du système",
//     "dashboard.quickActions": "Actions rapides",
//     "dashboard.refreshStats": "Actualiser les statistiques",
//     "dashboard.downloadReport": "Télécharger le rapport",
//     "dashboard.systemSettings": "Paramètres système",
//     "dashboard.usageTips": "Conseils d'utilisation",

//     // Assistant Selection
//     "selection.title": "Choisissez votre Assistant IA",
//     "selection.subtitle":
//       "Sélectionnez l'assistant qui correspond le mieux à vos besoins. Chaque assistant est spécialisé pour vous fournir le support le plus pertinent.",
//     "selection.startChat": "Commencer le chat avec",
//     "selection.whichAssistant": "Quel assistant vous convient le mieux ?",
//     "selection.chooseSlahB2B": "Choisissez Slah pour B2B",
//     "selection.chooseAmiraB2C": "Choisissez Amira pour B2C",
//     "selection.connecting": "Connexion à",
//     "selection.pleaseWait": "Veuillez patienter pendant que nous configurons votre",

//     // Assistant Cards
//     "assistant.slah.type": "Assistant B2B",
//     "assistant.slah.description": "Spécialisé dans les solutions inter-entreprises et le support d'entreprise",
//     "assistant.slah.features.enterprise": "Solutions d'entreprise",
//     "assistant.slah.features.integration": "Intégration technique",
//     "assistant.slah.features.analytics": "Analyses commerciales",
//     "assistant.slah.features.documentation": "Documentation API",
//     "assistant.slah.features.architecture": "Architecture système",
//     "assistant.slah.features.corporateSupport": "Support d'entreprise",

//     "assistant.amira.type": "Assistant B2C",
//     "assistant.amira.description": "Axée sur le support client et l'excellence du service client",
//     "assistant.amira.features.customerSupport": "Support client",
//     "assistant.amira.features.productInformation": "Informations produit",
//     "assistant.amira.features.orderAssistance": "Assistance commande",
//     "assistant.amira.features.accountManagement": "Gestion de compte",
//     "assistant.amira.features.billingInquiries": "Demandes de facturation",
//     "assistant.amira.features.generalHelp": "Aide générale",

//     "assistant.gender.male": "Homme",
//     "assistant.gender.female": "Femme",

//     // Comparison Section
//     "comparison.enterpriseSolutions": "Solutions de niveau entreprise",
//     "comparison.technicalIntegrations": "Intégrations techniques",
//     "comparison.businessProcessOptimization": "Optimisation des processus métier",
//     "comparison.corporateAccountManagement": "Gestion de compte d'entreprise",
//     "comparison.personalCustomerSupport": "Support client personnel",
//     "comparison.productRecommendations": "Recommandations de produits",
//     "comparison.orderBillingAssistance": "Assistance commande et facturation",
//     "comparison.generalConsumerInquiries": "Demandes générales des consommateurs",

//     // Assistant Chat
//     "chat.backToSelection": "Retour à la sélection",
//     "chat.selectLanguage": "Sélectionner la langue",
//     "chat.limitedBrowser": "Support de navigateur limité",
//     "chat.speechNotSupported":
//       "La reconnaissance vocale n'est pas prise en charge dans ce navigateur. Veuillez utiliser Chrome, Edge ou Safari pour une meilleure expérience.",
//     "chat.youSaid": "Vous avez dit :",
//     "chat.response": "Réponse :",
//     "chat.conversationHistory": "Historique des conversations",
//     "chat.clearHistory": "Effacer l'historique",
//     "chat.specializations": "Spécialisations",
//     "chat.playing": "En cours de lecture...",
//     "chat.replayResponse": "Rejouer la réponse",
//     "chat.interrupted": "Interrompu",
//     "chat.speechStopped": "Parole arrêtée. Vous pouvez parler maintenant !",
//     "chat.conversationCleared": "Conversation effacée",
//     "chat.historyReset": "Votre historique de conversation a été réinitialisé.",

//     // Status messages
//     "status.listening": "J'écoute...",
//     "status.thinking": "réfléchit...",
//     "status.speaking": "parle...",
//     "status.ready": "Prêt pour votre prochaine question !",
//     "status.clickToStart": "Cliquez sur moi pour commencer à parler",
//     "status.rememberConversation": "(Je me souviens de notre conversation)",
//     "status.clickToStop": "(cliquez pour arrêter)",
//     "status.clickToInterrupt": "(cliquez pour interrompre quand je commence à parler)",
//     "status.clickAnywhere": "(cliquez n'importe où sur moi pour interrompre)",
//   },
//   "ar-SA": {
//     // Navigation
//     "nav.dashboard": "لوحة القيادة",
//     "nav.assistant": "المساعد",
//     "nav.voiceAssistant": "المساعد الصوتي بالذكاء الاصطناعي",

//     // Dashboard
//     "dashboard.title": "لوحة قيادة المساعد الصوتي بالذكاء الاصطناعي",
//     "dashboard.subtitle": "مراقبة وإدارة مساعدك الصوتي بالذكاء الاصطناعي",
//     "dashboard.totalConversations": "إجمالي المحادثات",
//     "dashboard.todayConversations": "محادثات اليوم",
//     "dashboard.avgResponseTime": "متوسط وقت الاستجابة",
//     "dashboard.successRate": "معدل النجاح",
//     "dashboard.recentConversations": "المحادثات الأخيرة",
//     "dashboard.noConversations": "لا توجد محادثات بعد",
//     "dashboard.export": "تصدير",
//     "dashboard.clear": "مسح",
//     "dashboard.systemStatus": "حالة النظام",
//     "dashboard.quickActions": "إجراءات سريعة",
//     "dashboard.refreshStats": "تحديث الإحصائيات",
//     "dashboard.downloadReport": "تنزيل التقرير",
//     "dashboard.systemSettings": "إعدادات النظام",
//     "dashboard.usageTips": "نصائح الاستخدام",

//     // Assistant Selection
//     "selection.title": "اختر مساعدك بالذكاء الاصطناعي",
//     "selection.subtitle": "اختر المساعد الذي يناسب احتياجاتك. كل مساعد متخصص ليوفر لك الدعم الأكثر صلة.",
//     "selection.startChat": "بدء الدردشة مع",
//     "selection.whichAssistant": "أي مساعد هو الأنسب لك؟",
//     "selection.chooseSlahB2B": "اختر صلاح لـ B2B",
//     "selection.chooseAmiraB2C": "اختر أميرة لـ B2C",
//     "selection.connecting": "جاري الاتصال بـ",
//     "selection.pleaseWait": "الرجاء الانتظار بينما نقوم بإعداد مساعدك",

//     // Assistant Cards
//     "assistant.slah.type": "مساعد B2B",
//     "assistant.slah.description": "متخصص في حلول الأعمال التجارية ودعم الشركات",
//     "assistant.slah.features.enterprise": "حلول المؤسسات",
//     "assistant.slah.features.integration": "التكامل التقني",
//     "assistant.slah.features.analytics": "تحليلات الأعمال",
//     "assistant.slah.features.documentation": "وثائق API",
//     "assistant.slah.features.architecture": "هندسة النظم",
//     "assistant.slah.features.corporateSupport": "دعم الشركات",

//     "assistant.amira.type": "مساعد B2C",
//     "assistant.amira.description": "يركز على دعم المستهلكين وتميز خدمة العملاء",
//     "assistant.amira.features.customerSupport": "دعم العملاء",
//     "assistant.amira.features.productInformation": "معلومات المنتج",
//     "assistant.amira.features.orderAssistance": "مساعدة الطلبات",
//     "assistant.amira.features.accountManagement": "إدارة الحساب",
//     "assistant.amira.features.billingInquiries": "استفسارات الفواتير",
//     "assistant.amira.features.generalHelp": "مساعدة عامة",

//     "assistant.gender.male": "ذكر",
//     "assistant.gender.female": "أنثى",

//     // Comparison Section
//     "comparison.enterpriseSolutions": "حلول على مستوى المؤسسة",
//     "comparison.technicalIntegrations": "تكاملات تقنية",
//     "comparison.businessProcessOptimization": "تحسين عمليات الأعمال",
//     "comparison.corporateAccountManagement": "إدارة حسابات الشركات",
//     "comparison.personalCustomerSupport": "دعم العملاء الشخصي",
//     "comparison.productRecommendations": "توصيات المنتج",
//     "comparison.orderBillingAssistance": "مساعدة الطلبات والفواتير",
//     "comparison.generalConsumerInquiries": "استفسارات المستهلكين العامة",

//     // Assistant Chat
//     "chat.backToSelection": "العودة إلى الاختيار",
//     "chat.selectLanguage": "اختر اللغة",
//     "chat.limitedBrowser": "دعم متصفح محدود",
//     "chat.speechNotSupported":
//       "التعرف على الكلام غير مدعوم في هذا المتصفح. يرجى استخدام Chrome أو Edge أو Safari للحصول على أفضل تجربة.",
//     "chat.youSaid": "قلت:",
//     "chat.response": "الرد:",
//     "chat.conversationHistory": "سجل المحادثات",
//     "chat.clearHistory": "مسح السجل",
//     "chat.specializations": "التخصصات",
//     "chat.playing": "جاري التشغيل...",
//     "chat.replayResponse": "إعادة تشغيل الرد",
//     "chat.interrupted": "تمت المقاطعة",
//     "chat.speechStopped": "توقف الكلام. يمكنك التحدث الآن!",
//     "chat.conversationCleared": "تم مسح المحادثة",
//     "chat.historyReset": "تمت إعادة تعيين سجل محادثاتك.",

//     // Status messages
//     "status.listening": "أنا أستمع...",
//     "status.thinking": "يفكر...",
//     "status.speaking": "يتحدث...",
//     "status.ready": "جاهز لسؤالك التالي!",
//     "status.clickToStart": "انقر عليّ لبدء التحدث",
//     "status.rememberConversation": "(أتذكر محادثتنا)",
//     "status.clickToStop": "(انقر للإيقاف)",
//     "status.clickToInterrupt": "(انقر للمقاطعة عندما أبدأ في التحدث)",
//     "status.clickAnywhere": "(انقر في أي مكان عليّ للمقاطعة)",
//   },
// }

// export function LanguageProvider({ children }: { children: ReactNode }) {
//   const [language, setLanguage] = useState<Language>("en-US")
//   const isRTL = language === "ar-SA"

//   // Load saved language preference
//   useEffect(() => {
//     const saved = localStorage.getItem("preferred-language") as Language
//     if (saved && ["en-US", "fr-FR", "ar-SA"].includes(saved)) {
//       setLanguage(saved)
//     }
//   }, [])

//   // Update HTML lang and dir attributes
//   useEffect(() => {
//     const htmlElement = document.documentElement
//     htmlElement.lang = language
//     htmlElement.dir = isRTL ? "rtl" : "ltr"

//     if (isRTL) {
//       document.body.classList.add("rtl")
//       document.body.classList.remove("ltr")
//     } else {
//       document.body.classList.add("ltr")
//       document.body.classList.remove("rtl")
//     }
//   }, [language, isRTL])

//   // Save language preference
//   const handleSetLanguage = (lang: Language) => {
//     setLanguage(lang)
//     localStorage.setItem("preferred-language", lang)
//   }

//   // Translation function
//   const t = (key: string): string => {
//     return translations[language]?.[key] || translations["en-US"][key] || key
//   }

//   return (
//     <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, isRTL, t }}>
//       {children}
//     </LanguageContext.Provider>
//   )
// }

// export function useLanguage() {
//   const context = useContext(LanguageContext)
//   if (context === undefined) {
//     throw new Error("useLanguage must be used within a LanguageProvider")
//   }
//   return context
// }
"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en-US" | "fr-FR" | "ar-SA"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isRTL: boolean
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Define the translation type structure
type TranslationKeys = {
  // Navigation
  "nav.dashboard": string
  "nav.assistant": string
  "nav.voiceAssistant": string

  // Dashboard
  "dashboard.title": string
  "dashboard.subtitle": string
  "dashboard.totalConversations": string
  "dashboard.todayConversations": string
  "dashboard.avgResponseTime": string
  "dashboard.successRate": string
  "dashboard.recentConversations": string
  "dashboard.noConversations": string
  "dashboard.export": string
  "dashboard.clear": string
  "dashboard.systemStatus": string
  "dashboard.quickActions": string
  "dashboard.refreshStats": string
  "dashboard.downloadReport": string
  "dashboard.systemSettings": string
  "dashboard.usageTips": string
  "dashboard.totalUsers": string
  "dashboard.totalSessions": string
  "dashboard.activeDays": string
  "dashboard.audioRecordings": string
  "dashboard.adminTitle": string
  "dashboard.adminSubtitle": string
  "dashboard.searchPlaceholder": string
  "dashboard.showingConversations": string
  "dashboard.noConversationsFound": string
  "dashboard.timestamp": string
  "dashboard.user": string
  "dashboard.userMessage": string
  "dashboard.aiResponse": string
  "dashboard.language": string
  "dashboard.audio": string
  "dashboard.guest": string
  "dashboard.noEmail": string
  "dashboard.noAudio": string
  "dashboard.play": string
  "dashboard.playing": string
  "dashboard.accessDenied": string
  "dashboard.adminAccessRequired": string
  "dashboard.errorLoading": string
  "dashboard.failedToLoad": string
  "dashboard.playbackError": string
  "dashboard.couldNotPlayAudio": string
  "dashboard.conversationsCleared": string
  "dashboard.allConversationsRemoved": string
  "dashboard.confirmClear": string

  // Assistant Selection
  "selection.title": string
  "selection.subtitle": string
  "selection.startChat": string
  "selection.whichAssistant": string
  "selection.chooseSlahB2B": string
  "selection.chooseAmiraB2C": string
  "selection.connecting": string
  "selection.pleaseWait": string

  // Assistant Cards
  "assistant.slah.type": string
  "assistant.slah.description": string
  "assistant.slah.features.enterprise": string
  "assistant.slah.features.integration": string
  "assistant.slah.features.analytics": string
  "assistant.slah.features.documentation": string
  "assistant.slah.features.architecture": string
  "assistant.slah.features.corporateSupport": string

  "assistant.amira.type": string
  "assistant.amira.description": string
  "assistant.amira.features.customerSupport": string
  "assistant.amira.features.productInformation": string
  "assistant.amira.features.orderAssistance": string
  "assistant.amira.features.accountManagement": string
  "assistant.amira.features.billingInquiries": string
  "assistant.amira.features.generalHelp": string

  "assistant.gender.male": string
  "assistant.gender.female": string

  // Comparison Section
  "comparison.enterpriseSolutions": string
  "comparison.technicalIntegrations": string
  "comparison.businessProcessOptimization": string
  "comparison.corporateAccountManagement": string
  "comparison.personalCustomerSupport": string
  "comparison.productRecommendations": string
  "comparison.orderBillingAssistance": string
  "comparison.generalConsumerInquiries": string

  // Assistant Chat
  "chat.backToSelection": string
  "chat.selectLanguage": string
  "chat.limitedBrowser": string
  "chat.speechNotSupported": string
  "chat.youSaid": string
  "chat.response": string
  "chat.conversationHistory": string
  "chat.clearHistory": string
  "chat.specializations": string
  "chat.playing": string
  "chat.replayResponse": string
  "chat.interrupted": string
  "chat.speechStopped": string
  "chat.conversationCleared": string
  "chat.historyReset": string

  // Status messages
  "status.listening": string
  "status.thinking": string
  "status.speaking": string
  "status.ready": string
  "status.clickToStart": string
  "status.rememberConversation": string
  "status.clickToStop": string
  "status.clickToInterrupt": string
  "status.clickAnywhere": string

  // Home Page
  "home.title": string
  "home.subtitle": string
  "home.languageSupport": string
  "home.existingUsers": string
  "home.existingUsersDescription": string
  "home.loginButton": string
  "home.newUsers": string
  "home.newUsersDescription": string
  "home.registerButton": string
  "home.quickAccess": string
  "home.quickAccessDescription": string
  "home.continueAsGuest": string
  "home.demoAccount": string
  "home.demoEmail": string
  "home.demoPassword": string
  "home.featureVoiceInteraction": string
  "home.featureVoiceDescription": string
  "home.featureMultilingual": string
  "home.featureMultilingualDescription": string
  "home.featureSecure": string
  "home.featureSecureDescription": string
  "home.loading": string

  // Login Page
  "login.title": string
  "login.subtitle": string
  "login.emailLabel": string
  "login.emailPlaceholder": string
  "login.passwordLabel": string
  "login.passwordPlaceholder": string
  "login.button": string
  "login.loggingIn": string
  "login.noAccount": string
  "login.registerLink": string
  "login.continueAsGuest": string
  "login.demoAccount": string
  "login.demoEmail": string
  "login.demoPassword": string
  "login.successTitle": string
  "login.successDescription": string
  "login.failedTitle": string
  "login.failedDescription": string

  // Register Page
  "register.title": string
  "register.subtitle": string
  "register.fullNameLabel": string
  "register.fullNamePlaceholder": string
  "register.emailLabel": string
  "register.emailPlaceholder": string
  "register.passwordLabel": string
  "register.passwordPlaceholder": string
  "register.confirmPasswordLabel": string
  "register.confirmPasswordPlaceholder": string
  "register.button": string
  "register.creatingAccount": string
  "register.passwordMismatchTitle": string
  "register.passwordMismatchDescription": string
  "register.weakPasswordTitle": string
  "register.weakPasswordDescription": string
  "register.successTitle": string
  "register.successDescription": string
  "register.failedTitle": string
  "register.failedDescription": string
  "register.alreadyHaveAccount": string
  "register.loginLink": string

  // Common UI elements
  "common.back": string
  "common.logout": string
  "common.login": string
  "common.signUp": string
  "common.or": string
  "common.refresh": string
  "common.loading": string
  "common.error": string
  "common.success": string
  "common.cancel": string
  "common.confirm": string
  "common.yes": string
  "common.no": string

  [key: string]: string
}

// Translation dictionary with proper typing
const translations: Record<Language, TranslationKeys> = {
  "en-US": {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.assistant": "Assistant",
    "nav.voiceAssistant": "Voice Assistant",

    // Dashboard
    "dashboard.title": "Voice AI Assistant Dashboard",
    "dashboard.subtitle": "Monitor and manage your Voice AI Assistant",
    "dashboard.totalConversations": "Total Conversations",
    "dashboard.todayConversations": "Today's Conversations",
    "dashboard.avgResponseTime": "Avg Response Time",
    "dashboard.successRate": "Success Rate",
    "dashboard.recentConversations": "Recent Conversations",
    "dashboard.noConversations": "No conversations yet",
    "dashboard.export": "Export",
    "dashboard.clear": "Clear",
    "dashboard.systemStatus": "System Status",
    "dashboard.quickActions": "Quick Actions",
    "dashboard.refreshStats": "Refresh Stats",
    "dashboard.downloadReport": "Download Report",
    "dashboard.systemSettings": "System Settings",
    "dashboard.usageTips": "Usage Tips",
    "dashboard.totalUsers": "Total Users",
    "dashboard.totalSessions": "Total Sessions",
    "dashboard.activeDays": "Active Days",
    "dashboard.audioRecordings": "Audio Recordings",
    "dashboard.adminTitle": "Admin Dashboard",
    "dashboard.adminSubtitle": "Complete overview of your AI Assistant system",
    "dashboard.searchPlaceholder": "Search conversations...",
    "dashboard.showingConversations": "Showing {filtered} of {total} conversations",
    "dashboard.noConversationsFound": "No conversations found",
    "dashboard.timestamp": "Timestamp",
    "dashboard.user": "User",
    "dashboard.userMessage": "User Message",
    "dashboard.aiResponse": "AI Response",
    "dashboard.language": "Language",
    "dashboard.audio": "Audio",
    "dashboard.guest": "Guest",
    "dashboard.noEmail": "No email",
    "dashboard.noAudio": "No audio",
    "dashboard.play": "Play",
    "dashboard.playing": "Playing",
    "dashboard.accessDenied": "Access Denied",
    "dashboard.adminAccessRequired": "Admin access required",
    "dashboard.errorLoading": "Error",
    "dashboard.failedToLoad": "Failed to load dashboard data",
    "dashboard.playbackError": "Playback Error",
    "dashboard.couldNotPlayAudio": "Could not play audio recording",
    "dashboard.conversationsCleared": "Conversations Cleared",
    "dashboard.allConversationsRemoved": "All conversation logs have been removed",
    "dashboard.confirmClear": "Are you sure you want to clear all conversations? This cannot be undone.",

    // Assistant Selection
    "selection.title": "Choose Your AI Assistant",
    "selection.subtitle": "Select the assistant that best matches your needs. Each assistant is specialized to provide you with the most relevant support.",
    "selection.startChat": "Start Chat with",
    "selection.whichAssistant": "Which Assistant is Right for You?",
    "selection.chooseSlahB2B": "Choose Slah for B2B",
    "selection.chooseAmiraB2C": "Choose Amira for B2C",
    "selection.connecting": "Connecting to",
    "selection.pleaseWait": "Please wait while we set up your",

    // Assistant Cards
    "assistant.slah.type": "B2B Assistant",
    "assistant.slah.description": "Specialized in business-to-business solutions and enterprise support",
    "assistant.slah.features.enterprise": "Enterprise Solutions",
    "assistant.slah.features.integration": "Technical Integration",
    "assistant.slah.features.analytics": "Business Analytics",
    "assistant.slah.features.documentation": "API Documentation",
    "assistant.slah.features.architecture": "System Architecture",
    "assistant.slah.features.corporateSupport": "Corporate Support",

    "assistant.amira.type": "B2C Assistant",
    "assistant.amira.description": "Focused on consumer support and customer service excellence",
    "assistant.amira.features.customerSupport": "Customer Support",
    "assistant.amira.features.productInformation": "Product Information",
    "assistant.amira.features.orderAssistance": "Order Assistance",
    "assistant.amira.features.accountManagement": "Account Management",
    "assistant.amira.features.billingInquiries": "Billing Inquiries",
    "assistant.amira.features.generalHelp": "General Help",

    "assistant.gender.male": "Male",
    "assistant.gender.female": "Female",

    // Comparison Section
    "comparison.enterpriseSolutions": "Enterprise-level solutions",
    "comparison.technicalIntegrations": "Technical integrations",
    "comparison.businessProcessOptimization": "Business process optimization",
    "comparison.corporateAccountManagement": "Corporate account management",
    "comparison.personalCustomerSupport": "Personal customer support",
    "comparison.productRecommendations": "Product recommendations",
    "comparison.orderBillingAssistance": "Order and billing assistance",
    "comparison.generalConsumerInquiries": "General consumer inquiries",

    // Assistant Chat
    "chat.backToSelection": "Back to Selection",
    "chat.selectLanguage": "Select Language",
    "chat.limitedBrowser": "Limited Browser Support",
    "chat.speechNotSupported": "Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari for the best experience.",
    "chat.youSaid": "You said:",
    "chat.response": "Response:",
    "chat.conversationHistory": "Conversation History",
    "chat.clearHistory": "Clear History",
    "chat.specializations": "Specializations",
    "chat.playing": "Playing...",
    "chat.replayResponse": "Replay Response",
    "chat.interrupted": "Interrupted",
    "chat.speechStopped": "Speech stopped. You can speak now!",
    "chat.conversationCleared": "Conversation Cleared",
    "chat.historyReset": "Your conversation history has been reset.",

    // Status messages
    "status.listening": "I'm listening...",
    "status.thinking": "is thinking...",
    "status.speaking": "is speaking...",
    "status.ready": "Ready for your next question!",
    "status.clickToStart": "Click me to start talking",
    "status.rememberConversation": "(I remember our conversation)",
    "status.clickToStop": "(click to stop)",
    "status.clickToInterrupt": "(click to interrupt when I start speaking)",
    "status.clickAnywhere": "(click anywhere on me to interrupt)",

    // Home Page
    "home.title": "Ooredoo AI Voice Assistant",
    "home.subtitle": "Experience intelligent customer support with our multilingual voice-powered AI assistants",
    "home.languageSupport": "English • Français • العربية",
    "home.existingUsers": "Existing Users",
    "home.existingUsersDescription": "Access your conversation history and personalized experience",
    "home.loginButton": "Login to Your Account",
    "home.newUsers": "New Users",
    "home.newUsersDescription": "Create an account to save your conversations and preferences",
    "home.registerButton": "Create New Account",
    "home.quickAccess": "Quick Access",
    "home.quickAccessDescription": "Try our AI assistants without creating an account",
    "home.continueAsGuest": "Continue as Guest",
    "home.demoAccount": "🔐 Demo Account Available",
    "home.demoEmail": "Email: admin@ooredoo.com",
    "home.demoPassword": "Password: admin123",
    "home.featureVoiceInteraction": "Voice Interaction",
    "home.featureVoiceDescription": "Natural voice conversations with AI",
    "home.featureMultilingual": "Multilingual Support",
    "home.featureMultilingualDescription": "Available in English, French, and Arabic",
    "home.featureSecure": "Secure & Private",
    "home.featureSecureDescription": "Your conversations are protected",
    "home.loading": "Loading...",

    // Login Page
    "login.title": "Welcome to Ooredoo AI Assistant",
    "login.subtitle": "Login to access your conversation history",
    "login.emailLabel": "Email",
    "login.emailPlaceholder": "you@example.com",
    "login.passwordLabel": "Password",
    "login.passwordPlaceholder": "••••••••",
    "login.button": "Login",
    "login.loggingIn": "Logging in...",
    "login.noAccount": "Don't have an account?",
    "login.registerLink": "Register here",
    "login.continueAsGuest": "continue as guest",
    "login.demoAccount": "Demo Account:",
    "login.demoEmail": "Email: admin@ooredoo.com",
    "login.demoPassword": "Password: admin123",
    "login.successTitle": "Login Successful",
    "login.successDescription": "Welcome back, {name}!",
    "login.failedTitle": "Login Failed",
    "login.failedDescription": "Please check your credentials and try again.",

    // Register Page
    "register.title": "Create Your Account",
    "register.subtitle": "Join Ooredoo AI Assistant",
    "register.fullNameLabel": "Full Name (Optional)",
    "register.fullNamePlaceholder": "John Doe",
    "register.emailLabel": "Email *",
    "register.emailPlaceholder": "you@example.com",
    "register.passwordLabel": "Password * (min 6 characters)",
    "register.passwordPlaceholder": "••••••••",
    "register.confirmPasswordLabel": "Confirm Password *",
    "register.confirmPasswordPlaceholder": "••••••••",
    "register.button": "Register",
    "register.creatingAccount": "Creating Account...",
    "register.passwordMismatchTitle": "Password Mismatch",
    "register.passwordMismatchDescription": "Passwords do not match.",
    "register.weakPasswordTitle": "Weak Password",
    "register.weakPasswordDescription": "Password must be at least 6 characters long.",
    "register.successTitle": "Registration Successful",
    "register.successDescription": "Your account has been created. Please login.",
    "register.failedTitle": "Registration Failed",
    "register.failedDescription": "Please try again with different credentials.",
    "register.alreadyHaveAccount": "Already have an account?",
    "register.loginLink": "Login here",

    // Common UI elements
    "common.back": "Back",
    "common.logout": "Logout",
    "common.login": "Login",
    "common.signUp": "Sign Up",
    "common.or": "Or",
    "common.refresh": "Refresh",
    "common.loading": "Loading",
    "common.error": "Error",
    "common.success": "Success",
    "common.cancel": "Cancel",
    "common.confirm": "Confirm",
    "common.yes": "Yes",
    "common.no": "No"
  },

  "fr-FR": {
    // Navigation
    "nav.dashboard": "Tableau de bord",
    "nav.assistant": "Assistant",
    "nav.voiceAssistant": "Assistant Vocal",

    // Dashboard
    "dashboard.title": "Tableau de bord Assistant IA Vocal",
    "dashboard.subtitle": "Surveillez et gérez votre Assistant IA Vocal",
    "dashboard.totalConversations": "Conversations totales",
    "dashboard.todayConversations": "Conversations d'aujourd'hui",
    "dashboard.avgResponseTime": "Temps de réponse moyen",
    "dashboard.successRate": "Taux de réussite",
    "dashboard.recentConversations": "Conversations récentes",
    "dashboard.noConversations": "Aucune conversation pour le moment",
    "dashboard.export": "Exporter",
    "dashboard.clear": "Effacer",
    "dashboard.systemStatus": "État du système",
    "dashboard.quickActions": "Actions rapides",
    "dashboard.refreshStats": "Actualiser les statistiques",
    "dashboard.downloadReport": "Télécharger le rapport",
    "dashboard.systemSettings": "Paramètres système",
    "dashboard.usageTips": "Conseils d'utilisation",
    "dashboard.totalUsers": "Utilisateurs totaux",
    "dashboard.totalSessions": "Sessions totales",
    "dashboard.activeDays": "Jours actifs",
    "dashboard.audioRecordings": "Enregistrements audio",
    "dashboard.adminTitle": "Tableau de bord administrateur",
    "dashboard.adminSubtitle": "Vue d'ensemble complète de votre système d'assistant IA",
    "dashboard.searchPlaceholder": "Rechercher des conversations...",
    "dashboard.showingConversations": "Affichage de {filtered} conversations sur {total}",
    "dashboard.noConversationsFound": "Aucune conversation trouvée",
    "dashboard.timestamp": "Horodatage",
    "dashboard.user": "Utilisateur",
    "dashboard.userMessage": "Message de l'utilisateur",
    "dashboard.aiResponse": "Réponse de l'IA",
    "dashboard.language": "Langue",
    "dashboard.audio": "Audio",
    "dashboard.guest": "Invité",
    "dashboard.noEmail": "Aucun e-mail",
    "dashboard.noAudio": "Aucun audio",
    "dashboard.play": "Lire",
    "dashboard.playing": "En lecture",
    "dashboard.accessDenied": "Accès refusé",
    "dashboard.adminAccessRequired": "Accès administrateur requis",
    "dashboard.errorLoading": "Erreur",
    "dashboard.failedToLoad": "Échec du chargement des données du tableau de bord",
    "dashboard.playbackError": "Erreur de lecture",
    "dashboard.couldNotPlayAudio": "Impossible de lire l'enregistrement audio",
    "dashboard.conversationsCleared": "Conversations supprimées",
    "dashboard.allConversationsRemoved": "Tous les journaux de conversation ont été supprimés",
    "dashboard.confirmClear": "Êtes-vous sûr de vouloir supprimer toutes les conversations ? Cette action est irréversible.",

    // Assistant Selection
    "selection.title": "Choisissez votre Assistant IA",
    "selection.subtitle": "Sélectionnez l'assistant qui correspond le mieux à vos besoins. Chaque assistant est spécialisé pour vous fournir le support le plus pertinent.",
    "selection.startChat": "Commencer le chat avec",
    "selection.whichAssistant": "Quel assistant vous convient le mieux ?",
    "selection.chooseSlahB2B": "Choisissez Slah pour B2B",
    "selection.chooseAmiraB2C": "Choisissez Amira pour B2C",
    "selection.connecting": "Connexion à",
    "selection.pleaseWait": "Veuillez patienter pendant que nous configurons votre",

    // Assistant Cards
    "assistant.slah.type": "Assistant B2B",
    "assistant.slah.description": "Spécialisé dans les solutions inter-entreprises et le support d'entreprise",
    "assistant.slah.features.enterprise": "Solutions d'entreprise",
    "assistant.slah.features.integration": "Intégration technique",
    "assistant.slah.features.analytics": "Analyses commerciales",
    "assistant.slah.features.documentation": "Documentation API",
    "assistant.slah.features.architecture": "Architecture système",
    "assistant.slah.features.corporateSupport": "Support d'entreprise",

    "assistant.amira.type": "Assistant B2C",
    "assistant.amira.description": "Axée sur le support client et l'excellence du service client",
    "assistant.amira.features.customerSupport": "Support client",
    "assistant.amira.features.productInformation": "Informations produit",
    "assistant.amira.features.orderAssistance": "Assistance commande",
    "assistant.amira.features.accountManagement": "Gestion de compte",
    "assistant.amira.features.billingInquiries": "Demandes de facturation",
    "assistant.amira.features.generalHelp": "Aide générale",

    "assistant.gender.male": "Homme",
    "assistant.gender.female": "Femme",

    // Comparison Section
    "comparison.enterpriseSolutions": "Solutions de niveau entreprise",
    "comparison.technicalIntegrations": "Intégrations techniques",
    "comparison.businessProcessOptimization": "Optimisation des processus métier",
    "comparison.corporateAccountManagement": "Gestion de compte d'entreprise",
    "comparison.personalCustomerSupport": "Support client personnel",
    "comparison.productRecommendations": "Recommandations de produits",
    "comparison.orderBillingAssistance": "Assistance commande et facturation",
    "comparison.generalConsumerInquiries": "Demandes générales des consommateurs",

    // Assistant Chat
    "chat.backToSelection": "Retour à la sélection",
    "chat.selectLanguage": "Sélectionner la langue",
    "chat.limitedBrowser": "Support de navigateur limité",
    "chat.speechNotSupported": "La reconnaissance vocale n'est pas prise en charge dans ce navigateur. Veuillez utiliser Chrome, Edge ou Safari pour une meilleure expérience.",
    "chat.youSaid": "Vous avez dit :",
    "chat.response": "Réponse :",
    "chat.conversationHistory": "Historique des conversations",
    "chat.clearHistory": "Effacer l'historique",
    "chat.specializations": "Spécialisations",
    "chat.playing": "En cours de lecture...",
    "chat.replayResponse": "Rejouer la réponse",
    "chat.interrupted": "Interrompu",
    "chat.speechStopped": "Parole arrêtée. Vous pouvez parler maintenant !",
    "chat.conversationCleared": "Conversation effacée",
    "chat.historyReset": "Votre historique de conversation a été réinitialisé.",

    // Status messages
    "status.listening": "J'écoute...",
    "status.thinking": "réfléchit...",
    "status.speaking": "parle...",
    "status.ready": "Prêt pour votre prochaine question !",
    "status.clickToStart": "Cliquez sur moi pour commencer à parler",
    "status.rememberConversation": "(Je me souviens de notre conversation)",
    "status.clickToStop": "(cliquez pour arrêter)",
    "status.clickToInterrupt": "(cliquez pour interrompre quand je commence à parler)",
    "status.clickAnywhere": "(cliquez n'importe où sur moi pour interrompre)",

    // Home Page
    "home.title": "Assistant Vocal IA d'Ooredoo",
    "home.subtitle": "Découvrez un support client intelligent avec nos assistants IA vocaux multilingues",
    "home.languageSupport": "Anglais • Français • العربية",
    "home.existingUsers": "Utilisateurs existants",
    "home.existingUsersDescription": "Accédez à votre historique de conversations et à une expérience personnalisée",
    "home.loginButton": "Connectez-vous à votre compte",
    "home.newUsers": "Nouveaux utilisateurs",
    "home.newUsersDescription": "Créez un compte pour sauvegarder vos conversations et préférences",
    "home.registerButton": "Créer un nouveau compte",
    "home.quickAccess": "Accès rapide",
    "home.quickAccessDescription": "Essayez nos assistants IA sans créer de compte",
    "home.continueAsGuest": "Continuer en tant qu'invité",
    "home.demoAccount": "🔐 Compte de démonstration disponible",
    "home.demoEmail": "Email : admin@ooredoo.com",
    "home.demoPassword": "Mot de passe : admin123",
    "home.featureVoiceInteraction": "Interaction vocale",
    "home.featureVoiceDescription": "Conversations vocales naturelles avec l'IA",
    "home.featureMultilingual": "Support multilingue",
    "home.featureMultilingualDescription": "Disponible en anglais, français et arabe",
    "home.featureSecure": "Sécurisé et privé",
    "home.featureSecureDescription": "Vos conversations sont protégées",
    "home.loading": "Chargement...",

    // Login Page
    "login.title": "Bienvenue sur l'Assistant IA d'Ooredoo",
    "login.subtitle": "Connectez-vous pour accéder à votre historique de conversations",
    "login.emailLabel": "Email",
    "login.emailPlaceholder": "vous@exemple.com",
    "login.passwordLabel": "Mot de passe",
    "login.passwordPlaceholder": "••••••••",
    "login.button": "Connexion",
    "login.loggingIn": "Connexion en cours...",
    "login.noAccount": "Vous n'avez pas de compte ?",
    "login.registerLink": "Inscrivez-vous ici",
    "login.continueAsGuest": "continuer en tant qu'invité",
    "login.demoAccount": "Compte de démonstration :",
    "login.demoEmail": "Email : admin@ooredoo.com",
    "login.demoPassword": "Mot de passe : admin123",
    "login.successTitle": "Connexion réussie",
    "login.successDescription": "Bienvenue, {name} !",
    "login.failedTitle": "Échec de la connexion",
    "login.failedDescription": "Veuillez vérifier vos identifiants et réessayer.",

    // Register Page
    "register.title": "Créer votre compte",
    "register.subtitle": "Rejoignez l'Assistant IA d'Ooredoo",
    "register.fullNameLabel": "Nom complet (facultatif)",
    "register.fullNamePlaceholder": "Jean Dupont",
    "register.emailLabel": "Email *",
    "register.emailPlaceholder": "vous@exemple.com",
    "register.passwordLabel": "Mot de passe * (minimum 6 caractères)",
    "register.passwordPlaceholder": "••••••••",
    "register.confirmPasswordLabel": "Confirmer le mot de passe *",
    "register.confirmPasswordPlaceholder": "••••••••",
    "register.button": "S'inscrire",
    "register.creatingAccount": "Création du compte...",
    "register.passwordMismatchTitle": "Non-concordance des mots de passe",
    "register.passwordMismatchDescription": "Les mots de passe ne correspondent pas.",
    "register.weakPasswordTitle": "Mot de passe faible",
    "register.weakPasswordDescription": "Le mot de passe doit comporter au moins 6 caractères.",
    "register.successTitle": "Inscription réussie",
    "register.successDescription": "Votre compte a été créé. Veuillez vous connecter.",
    "register.failedTitle": "Échec de l'inscription",
    "register.failedDescription": "Veuillez réessayer avec des identifiants différents.",
    "register.alreadyHaveAccount": "Vous avez déjà un compte ?",
    "register.loginLink": "Connectez-vous ici",

    // Common UI elements
    "common.back": "Retour",
    "common.logout": "Déconnexion",
    "common.login": "Connexion",
    "common.signUp": "S'inscrire",
    "common.or": "Ou",
    "common.refresh": "Actualiser",
    "common.loading": "Chargement",
    "common.error": "Erreur",
    "common.success": "Succès",
    "common.cancel": "Annuler",
    "common.confirm": "Confirmer",
    "common.yes": "Oui",
    "common.no": "Non"
  },

  "ar-SA": {
    // Navigation
    "nav.dashboard": "لوحة القيادة",
    "nav.assistant": "المساعد",
    "nav.voiceAssistant": "المساعد الصوتي بالذكاء الاصطناعي",

    // Dashboard
    "dashboard.title": "لوحة قيادة المساعد الصوتي بالذكاء الاصطناعي",
    "dashboard.subtitle": "مراقبة وإدارة مساعدك الصوتي بالذكاء الاصطناعي",
    "dashboard.totalConversations": "إجمالي المحادثات",
    "dashboard.todayConversations": "محادثات اليوم",
    "dashboard.avgResponseTime": "متوسط وقت الاستجابة",
    "dashboard.successRate": "معدل النجاح",
    "dashboard.recentConversations": "المحادثات الأخيرة",
    "dashboard.noConversations": "لا توجد محادثات بعد",
    "dashboard.export": "تصدير",
    "dashboard.clear": "مسح",
    "dashboard.systemStatus": "حالة النظام",
    "dashboard.quickActions": "إجراءات سريعة",
    "dashboard.refreshStats": "تحديث الإحصائيات",
    "dashboard.downloadReport": "تنزيل التقرير",
    "dashboard.systemSettings": "إعدادات النظام",
    "dashboard.usageTips": "نصائح الاستخدام",
    "dashboard.totalUsers": "إجمالي المستخدمين",
    "dashboard.totalSessions": "إجمالي الجلسات",
    "dashboard.activeDays": "الأيام النشطة",
    "dashboard.audioRecordings": "التسجيلات الصوتية",
    "dashboard.adminTitle": "لوحة تحكم المشرف",
    "dashboard.adminSubtitle": "نظرة عامة كاملة على نظام المساعد الذكي",
    "dashboard.searchPlaceholder": "البحث في المحادثات...",
    "dashboard.showingConversations": "عرض {filtered} من أصل {total} محادثة",
    "dashboard.noConversationsFound": "لم يتم العثور على محادثات",
    "dashboard.timestamp": "الطابع الزمني",
    "dashboard.user": "المستخدم",
    "dashboard.userMessage": "رسالة المستخدم",
    "dashboard.aiResponse": "رد الذكاء الاصطناعي",
    "dashboard.language": "اللغة",
    "dashboard.audio": "الصوت",
    "dashboard.guest": "ضيف",
    "dashboard.noEmail": "لا يوجد بريد إلكتروني",
    "dashboard.noAudio": "لا يوجد صوت",
    "dashboard.play": "تشغيل",
    "dashboard.playing": "جاري التشغيل",
    "dashboard.accessDenied": "تم رفض الوصول",
    "dashboard.adminAccessRequired": "يتطلب وصول المشرف",
    "dashboard.errorLoading": "خطأ",
    "dashboard.failedToLoad": "فشل في تحميل بيانات لوحة القيادة",
    "dashboard.playbackError": "خطأ في التشغيل",
    "dashboard.couldNotPlayAudio": "تعذر تشغيل التسجيل الصوتي",
    "dashboard.conversationsCleared": "تم مسح المحادثات",
    "dashboard.allConversationsRemoved": "تم إزالة جميع سجلات المحادثات",
    "dashboard.confirmClear": "هل أنت متأكد من أنك تريد مسح جميع المحادثات؟ لا يمكن التراجع عن هذا الإجراء.",

    // Assistant Selection
    "selection.title": "اختر مساعدك بالذكاء الاصطناعي",
    "selection.subtitle": "اختر المساعد الذي يناسب احتياجاتك. كل مساعد متخصص ليوفر لك الدعم الأكثر صلة.",
    "selection.startChat": "بدء الدردشة مع",
    "selection.whichAssistant": "أي مساعد هو الأنسب لك؟",
    "selection.chooseSlahB2B": "اختر صلاح لـ B2B",
    "selection.chooseAmiraB2C": "اختر أميرة لـ B2C",
    "selection.connecting": "جاري الاتصال بـ",
    "selection.pleaseWait": "الرجاء الانتظار بينما نقوم بإعداد مساعدك",

    // Assistant Cards
    "assistant.slah.type": "مساعد B2B",
    "assistant.slah.description": "متخصص في حلول الأعمال التجارية ودعم الشركات",
    "assistant.slah.features.enterprise": "حلول المؤسسات",
    "assistant.slah.features.integration": "التكامل التقني",
    "assistant.slah.features.analytics": "تحليلات الأعمال",
    "assistant.slah.features.documentation": "وثائق API",
    "assistant.slah.features.architecture": "هندسة النظم",
    "assistant.slah.features.corporateSupport": "دعم الشركات",

    "assistant.amira.type": "مساعد B2C",
    "assistant.amira.description": "يركز على دعم المستهلكين وتميز خدمة العملاء",
    "assistant.amira.features.customerSupport": "دعم العملاء",
    "assistant.amira.features.productInformation": "معلومات المنتج",
    "assistant.amira.features.orderAssistance": "مساعدة الطلبات",
    "assistant.amira.features.accountManagement": "إدارة الحساب",
    "assistant.amira.features.billingInquiries": "استفسارات الفواتير",
    "assistant.amira.features.generalHelp": "مساعدة عامة",

    "assistant.gender.male": "ذكر",
    "assistant.gender.female": "أنثى",

    // Comparison Section
    "comparison.enterpriseSolutions": "حلول على مستوى المؤسسة",
    "comparison.technicalIntegrations": "تكاملات تقنية",
    "comparison.businessProcessOptimization": "تحسين عمليات الأعمال",
    "comparison.corporateAccountManagement": "إدارة حسابات الشركات",
    "comparison.personalCustomerSupport": "دعم العملاء الشخصي",
    "comparison.productRecommendations": "توصيات المنتج",
    "comparison.orderBillingAssistance": "مساعدة الطلبات والفواتير",
    "comparison.generalConsumerInquiries": "استفسارات المستهلكين العامة",

    // Assistant Chat
    "chat.backToSelection": "العودة إلى الاختيار",
    "chat.selectLanguage": "اختر اللغة",
    "chat.limitedBrowser": "دعم متصفح محدود",
    "chat.speechNotSupported": "التعرف على الكلام غير مدعوم في هذا المتصفح. يرجى استخدام Chrome أو Edge أو Safari للحصول على أفضل تجربة.",
    "chat.youSaid": "قلت:",
    "chat.response": "الرد:",
    "chat.conversationHistory": "سجل المحادثات",
    "chat.clearHistory": "مسح السجل",
    "chat.specializations": "التخصصات",
    "chat.playing": "جاري التشغيل...",
    "chat.replayResponse": "إعادة تشغيل الرد",
    "chat.interrupted": "تمت المقاطعة",
    "chat.speechStopped": "توقف الكلام. يمكنك التحدث الآن!",
    "chat.conversationCleared": "تم مسح المحادثة",
    "chat.historyReset": "تمت إعادة تعيين سجل محادثاتك.",

    // Status messages
    "status.listening": "أنا أستمع...",
    "status.thinking": "يفكر...",
    "status.speaking": "يتحدث...",
    "status.ready": "جاهز لسؤالك التالي!",
    "status.clickToStart": "انقر عليّ لبدء التحدث",
    "status.rememberConversation": "(أتذكر محادثتنا)",
    "status.clickToStop": "(انقر للإيقاف)",
    "status.clickToInterrupt": "(انقر للمقاطعة عندما أبدأ في التحدث)",
    "status.clickAnywhere": "(انقر في أي مكان عليّ للمقاطعة)",

    // Home Page
    "home.title": "مساعد أوريدو الصوتي بالذكاء الاصطناعي",
    "home.subtitle": "استمتع بدعم عملاء ذكي مع مساعدينا الصوتيين متعددي اللغات المدعومين بالذكاء الاصطناعي",
    "home.languageSupport": "الإنجليزية • الفرنسية • العربية",
    "home.existingUsers": "المستخدمون الحاليون",
    "home.existingUsersDescription": "الوصول إلى سجل محادثاتك وتجربة مخصصة",
    "home.loginButton": "تسجيل الدخول إلى حسابك",
    "home.newUsers": "مستخدمون جدد",
    "home.newUsersDescription": "إنشاء حساب لحفظ محادثاتك وتفضيلاتك",
    "home.registerButton": "إنشاء حساب جديد",
    "home.quickAccess": "الوصول السريع",
    "home.quickAccessDescription": "جرب مساعدينا بالذكاء الاصطناعي دون إنشاء حساب",
    "home.continueAsGuest": "الاستمرار كضيف",
    "home.demoAccount": "🔐 حساب تجريبي متاح",
    "home.demoEmail": "البريد الإلكتروني: admin@ooredoo.com",
    "home.demoPassword": "كلمة المرور: admin123",
    "home.featureVoiceInteraction": "التفاعل الصوتي",
    "home.featureVoiceDescription": "محادثات صوتية طبيعية مع الذكاء الاصطناعي",
    "home.featureMultilingual": "دعم متعدد اللغات",
    "home.featureMultilingualDescription": "متوفر بالإنجليزية والفرنسية والعربية",
    "home.featureSecure": "آمن وخاص",
    "home.featureSecureDescription": "محادثاتك محمية",
    "home.loading": "جاري التحميل...",

    // Login Page
    "login.title": "مرحبًا بك في مساعد أوريدو بالذكاء الاصطناعي",
    "login.subtitle": "تسجيل الدخول للوصول إلى سجل محادثاتك",
    "login.emailLabel": "البريد الإلكتروني",
    "login.emailPlaceholder": "you@example.com",
    "login.passwordLabel": "كلمة المرور",
    "login.passwordPlaceholder": "••••••••",
    "login.button": "تسجيل الدخول",
    "login.loggingIn": "جاري تسجيل الدخول...",
    "login.noAccount": "ليس لديك حساب؟",
    "login.registerLink": "سجل هنا",
    "login.continueAsGuest": "الاستمرار كضيف",
    "login.demoAccount": "حساب تجريبي:",
    "login.demoEmail": "البريد الإلكتروني: admin@ooredoo.com",
    "login.demoPassword": "كلمة المرور: admin123",
    "login.successTitle": "تسجيل الدخول ناجح",
    "login.successDescription": "مرحبًا بعودتك، {name}!",
    "login.failedTitle": "فشل تسجيل الدخول",
    "login.failedDescription": "يرجى التحقق من بياناتك ومحاولة مرة أخرى.",

    // Register Page
    "register.title": "إنشاء حسابك",
    "register.subtitle": "انضم إلى مساعد أوريدو بالذكاء الاصطناعي",
    "register.fullNameLabel": "الاسم الكامل (اختياري)",
    "register.fullNamePlaceholder": "أحمد محمد",
    "register.emailLabel": "البريد الإلكتروني *",
    "register.emailPlaceholder": "you@example.com",
    "register.passwordLabel": "كلمة المرور * (6 أحرف على الأقل)",
    "register.passwordPlaceholder": "••••••••",
    "register.confirmPasswordLabel": "تأكيد كلمة المرور *",
    "register.confirmPasswordPlaceholder": "••••••••",
    "register.button": "تسجيل",
    "register.creatingAccount": "جاري إنشاء الحساب...",
    "register.passwordMismatchTitle": "عدم تطابق كلمة المرور",
    "register.passwordMismatchDescription": "كلمات المرور غير متطابقة.",
    "register.weakPasswordTitle": "كلمة مرور ضعيفة",
    "register.weakPasswordDescription": "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.",
    "register.successTitle": "تسجيل ناجح",
    "register.successDescription": "تم إنشاء حسابك. يرجى تسجيل الدخول.",
    "register.failedTitle": "فشل التسجيل",
    "register.failedDescription": "يرجى المحاولة مرة أخرى ببيانات مختلفة.",
    "register.alreadyHaveAccount": "هل لديك حساب بالفعل؟",
    "register.loginLink": "تسجيل الدخول هنا",

    // Common UI elements
    "common.back": "عودة",
    "common.logout": "تسجيل الخروج",
    "common.login": "تسجيل الدخول",
    "common.signUp": "إنشاء حساب",
    "common.or": "أو",
    "common.refresh": "تحديث",
    "common.loading": "جاري التحميل",
    "common.error": "خطأ",
    "common.success": "نجح",
    "common.cancel": "إلغاء",
    "common.confirm": "تأكيد",
    "common.yes": "نعم",
    "common.no": "لا"
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en-US")
  const isRTL = language === "ar-SA"

  // Load saved language preference
  useEffect(() => {
    const saved = localStorage.getItem("preferred-language") as Language
    if (saved && ["en-US", "fr-FR", "ar-SA"].includes(saved)) {
      setLanguage(saved)
    }
  }, [])

  // Update HTML lang and dir attributes
  useEffect(() => {
    const htmlElement = document.documentElement
    htmlElement.lang = language
    htmlElement.dir = isRTL ? "rtl" : "ltr"

    if (isRTL) {
      document.body.classList.add("rtl")
      document.body.classList.remove("ltr")
    } else {
      document.body.classList.add("ltr")
      document.body.classList.remove("rtl")
    }
  }, [language, isRTL])

  // Save language preference
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("preferred-language", lang)
  }

  // Translation function with proper type safety
  const t = (key: string): string => {
    const langTranslations = translations[language]
    if (langTranslations && key in langTranslations) {
      return langTranslations[key as keyof TranslationKeys]
    }
    
    // Fallback to English
    const englishTranslations = translations["en-US"]
    if (englishTranslations && key in englishTranslations) {
      return englishTranslations[key as keyof TranslationKeys]
    }
    
    // Final fallback to the key itself
    return key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}