import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MessageCircle, ChevronDown, ChevronUp, Bot } from 'lucide-react';
import { faqAPI, FAQ } from '../services/api';
const FAQPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [chatMessages, setChatMessages] = useState<Array<{type: 'question' | 'answer', text: string}>>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    loadFAQs();
  }, []);
  const loadFAQs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await faqAPI.getAll();
      setFaqs(data);
    } catch (err) {
      console.error('Failed to load FAQs:', err);
      setError('Failed to load FAQs. Using offline data.');
      setFaqs(getMockFAQs());
    } finally {
      setLoading(false);
    }
  };
  const getMockFAQs = (): FAQ[] => [
    {
      id: 1,
      question: 'When should my baby start solid foods?',
      questionSi: 'මගේ දරුවා ඝන ආහාර ආරම්භ කළ යුත්තේ කවදාද?',
      answer: 'Most babies are ready to start solid foods around 6 months of age. Signs of readiness include: sitting up with minimal support, showing interest in food, being able to move food to the back of the mouth, and doubling birth weight. Always consult your pediatrician before starting solids.',
      answerSi: 'බොහෝ ළදරුවන් මාස 6 පමණ වයසේදී ඝන ආහාර ආරම්භ කිරීමට සූදානම් වේ. සූදානම් වීමේ සලකුණු: අවම සහාය ඇතිව වාඩි වීමේ හැකියාව, ආහාර කෙරෙහි උනන්දුව පෙන්වීම, ආහාර කට පිටුපසට ගෙන යා හැකි වීම සහ උපත් බර දෙගුණ වීම. ඝන ආහාර ආරම්භ කිරීමට පෙර සෑම විටම ඔබේ ළමා වෛද්‍යවරයා සමඟ සාකච්ඡා කරන්න.',
      category: 'Nutrition'
    },
    {
      id: 2,
      question: 'How much sleep does a newborn need?',
      questionSi: 'අලුත උපන් දරුවෙකුට නින්ද කොපමණ ප්‍රමාණයක් අවශ්‍යයද?',
      answer: 'Newborns typically sleep 14-17 hours per day, but this can vary. They usually sleep in short bursts of 2-4 hours throughout the day and night. Remember that every baby is different, and sleep patterns will become more regular as they grow.',
      answerSi: 'අලුත උපන් ළදරුවෝ සාමාන්‍යයෙන් දිනකට පැය 14-17ක් නිදා ගනී, නමුත් මෙය වෙනස් විය හැකිය. ඔවුන් සාමාන්‍යයෙන් දිවා රාත්‍රී පුරා පැය 2-4ක කෙටි කාල පරතරවලින් නිදා ගනී. සෑම දරුවෙකුම වෙනස් බව මතක තබා ගන්න, සහ ඔවුන් වැඩෙන විට නින්දේ රටාවන් වඩාත් නිත්‍ය වේ.',
      category: 'Sleep'
    },
    {
      id: 3,
      question: 'What vaccines does my baby need in the first year?',
      questionSi: 'පළමු වසර තුළ මගේ දරුවාට කුමන එන්නත් අවශ්‍යයද?',
      answer: 'In the first year, babies typically receive: BCG, Hepatitis B, Polio, DTP (Diphtheria, Tetanus, Pertussis), Hib, Pneumococcal, and Rotavirus vaccines. Follow your country\'s immunization schedule and consult your pediatrician for the exact timing. Vaccines protect your baby from serious diseases.',
      answerSi: 'පළමු වසරේදී, ළදරුවන් සාමාන්‍යයෙන් ලබා ගන්නේ: BCG, හෙපටයිටිස් B, පෝලියෝ, DTP (ඩිප්තීරියාව, ටෙටනස්, පර්ටියුසිස්), Hib, නියුමොකොකල් සහ රොටා වයිරස් එන්නත්. ඔබේ රටේ එන්නත් කාලසටහන අනුගමනය කර නිශ්චිත වේලාව සඳහා ඔබේ ළමා වෛද්‍යවරයා සමඟ සාකච්ඡා කරන්න. එන්නත් ඔබේ දරුවා බරපතල රෝගවලින් ආරක්ෂා කරයි.',
      category: 'Health'
    },
    {
      id: 4,
      question: 'When do babies start teething?',
      questionSi: 'ළදරුවන්ට දත් ගැසීම ආරම්භ වන්නේ කවදාද?',
      answer: 'Most babies start teething between 4-7 months, though some may start earlier or later. First teeth are usually the lower front teeth. Teething symptoms include drooling, irritability, and desire to chew on objects. You can soothe teething pain with a cold washcloth or teething ring.',
      answerSi: 'බොහෝ ළදරුවන් මාස 4-7 අතර දත් ගැසීම ආරම්භ කරයි, නමුත් සමහරු ඊට පෙර හෝ පසුව ආරම්භ කළ හැකිය. පළමු දත් සාමාන්‍යයෙන් යටි ඉදිරිපස දත් වේ. දත් ගැසීමේ රෝග ලක්ෂණ අතර ලවණය දැම්ම, කෝපයට පත්වීම සහ වස්තු හපන්න කැමැත්ත ඇතුළත් වේ. සීතල රෙදි කඩක් හෝ දත් ගැසීමේ වළල්ලකින් දත් වේදනාව සමනය කළ හැකිය.',
      category: 'Development'
    },
    {
      id: 5,
      question: 'How can I help my baby learn to crawl?',
      questionSi: 'මගේ දරුවාට බඩ ගා යාමට ඉගෙන ගැනීමට මම උදව් කරන්නේ කෙසේද?',
      answer: 'Encourage crawling by giving your baby plenty of tummy time, placing toys just out of reach, and creating a safe space to explore. Most babies crawl between 6-10 months. Some babies skip crawling and go straight to walking - this is normal too. Support their movement attempts without forcing.',
      answerSi: 'ඔබේ දරුවාට බොහෝ උදරය කාලය ලබා දීමෙන්, ආධාරයෙන් තොරව සෙල්ලම් බඩු තැබීමෙන් සහ ගවේෂණය කිරීමට ආරක්ෂිත ඉඩක් නිර්මාණය කිරීමෙන් බඩගා යාම දිරිමත් කරන්න. බොහෝ ළදරුවන් මාස 6-10 අතර බඩගා යයි. සමහර ළදරුවන් බඩ ගා යාම මග හැර කෙලින්ම ඇවිදීමට යනසේක - මෙයද සාමාන්‍ය දෙයකි. බලකිරීමකින් තොරව ඔවුන්ගේ චලන උත්සාහයන්ට සහාය වන්න.',
      category: 'Development'
    },
    {
      id: 6,
      question: 'How often should I bathe my newborn?',
      questionSi: 'මගේ අලුත උපන් දරුවාට මම කොපමණ වාරයක් නාන්න පිලා යුතුද?',
      answer: 'Newborns don\'t need daily baths. 2-3 times per week is sufficient, unless they get particularly messy. Daily sponge baths for face, neck, and diaper area are recommended. Keep the room warm, work quickly, and always keep one hand on the baby for safety.',
      answerSi: 'අලුත උපන් ළදරුවන්ට දිනපතා නාන්න අවශ්‍ය නැත. සතියකට 2-3 වාරයක් ප්‍රමාණවත්, ඔවුන් විශේෂයෙන් අපිරිසිදු නොවන්නේ නම්. මුහුණ, බෙල්ල සහ ඩයපර් ප්‍රදේශය සඳහා දෛනික ස්පොන්ජ් නාන නිර්දේශ කරනු ලැබේ. කාමරය උණුසුම්ව තබාගන්න, ඉක්මනින් කාර්යක්ෂම වන්න, සහ ආරක්ෂාව සඳහා සෑම විටම එක් අතක් දරුවා මත තබා ගන්න.',
      category: 'Health'
    },
    {
      id: 7,
      question: 'When will my baby say their first word?',
      questionSi: 'මගේ දරුවා ඔවුන්ගේ පළමු වචනය කියන්නේ කවදාද?',
      answer: 'Most babies say their first recognizable word between 10-14 months. Before this, they babble and make sounds. First words are often "mama," "dada," or simple objects they see daily. Continue talking, reading, and singing to encourage language development.',
      answerSi: 'බොහෝ ළදරුවන් ඔවුන්ගේ පළමු හඳුනාගත හැකි වචනය මාස 10-14 අතර කියයි. මෙයට පෙර, ඔවුන් කතා කරති සහ ශබ්ද ඇති කරති. පළමු වචන බොහෝ විට "අම්මා," "තාත්තා," හෝ ඔවුන් දිනපතා දකින සරල වස්තු වේ. භාෂා සංවර්ධනය දිරිමත් කිරීම සඳහා කතා කිරීම, කියවීම සහ ගායනා කිරීම දිගටම කරගෙන යන්න.',
      category: 'Language'
    },
    {
      id: 8,
      question: 'How do I handle my toddler\'s tantrums?',
      questionSi: 'මගේ කුඩා දරුවාගේ කෝපය මම හසුරුවන්නේ කෙසේද?',
      answer: 'Stay calm during tantrums. Acknowledge your child\'s feelings, ensure safety, and wait for the tantrum to pass. After they calm down, discuss what happened. Prevent tantrums by maintaining routines, avoiding triggers, and teaching emotion regulation. Remember, tantrums are a normal part of development.',
      answerSi: 'කෝපය අතරතුර සන්සුන්ව සිටින්න. ඔබේ දරුවාගේ හැඟීම් පිළිගන්න, ආරක්ෂාව සහතික කරන්න, සහ කෝපය පහව යන තුරු බලා සිටින්න. ඔවුන් සන්සුන් වූ පසු, සිදු වූ දේ සාකච්ඡා කරන්න. ක්‍රමවේදයන් පවත්වා ගැනීම, ප්‍රේරක මග හැරීම සහ සංවේග නියාමනය ඉගැන්වීමෙන් කෝපය වලක්වන්න. මතක තබා ගන්න, කෝපය සංවර්ධනයේ සාමාන්‍ය කොටසකි.',
      category: 'Behavior'
    },
    {
      id: 9,
      question: 'What should I do if my baby has a fever?',
      questionSi: 'මගේ දරුවාට උණ ඇත්නම් මම කළ යුත්තේ කුමක්ද?',
      answer: 'For babies under 3 months with a fever above 38°C (100.4°F), contact your doctor immediately. For older babies, monitor temperature, keep them hydrated, dress lightly, and give age-appropriate fever reducers as directed by your pediatrician. Seek immediate care if fever is very high, baby is lethargic, or shows other concerning symptoms.',
      answerSi: '38°C (100.4°F) ට වඩා වැඩි උණක් ඇති මාස 3 ට අඩු ළදරුවන් සඳහා, වහාම ඔබේ වෛද්‍යවරයා අමතන්න. වැඩිහිටි ළදරුවන් සඳහා, උෂ්ණත්වය පරීක්ෂා කරන්න, ජලීකරණය කරන්න, සැහැල්ලු ඇඳුම් ඇඳගෙන, ඔබේ ළමා වෛද්‍යවරයාගේ නියෝගය පරිදි වයසට සුදුසු උණ අඩු කරන්නන් දෙන්න. උණ ඉතා ඉහළ නම්, ළදරුවා අලස නම්, හෝ වෙනත් කනස්සල්ලට කරුණු පෙන්වන්නේ නම් වහාම සත්කාර ලබා ගන්න.',
      category: 'Health'
    },
    {
      id: 10,
      question: 'How can I encourage my child to eat vegetables?',
      questionSi: 'එළවළු කන්න මගේ දරුවා දිරිමත් කරන්නේ කෙසේද?',
      answer: 'Make vegetables fun by cutting them into interesting shapes, serving with dips, and involving your child in preparation. Offer repeatedly without pressure - it can take 10-15 tries before acceptance. Be a role model by eating vegetables yourself. Start with sweeter vegetables and mix them into favorite foods gradually.',
      answerSi: 'රසවත් රටා වලට කපා, ඩිප් සමඟ සේවය කරමින්, සහ ඔබේ දරුවා සකස් කිරීමට සම්බන්ධ කරමින් එළවළු විනෝදජනක කරන්න. පීඩනයකින් තොරව නැවත නැවත ලබා දෙන්න - පිළිගැනීමට පෙර උත්සාහ 10-15ක් ගත විය හැකිය. ඔබම එළවළු අනුභව කිරීමෙන් ආදර්ශයක් වන්න. මිහිරි එළවළු වලින් ආරම්භ කර ඔවුන්ගේ ප්‍රියතම ආහාර සමඟ ක්‍රමයෙන් මිශ්‍ර කරන්න.',
      category: 'Nutrition'
    },
    {
      id: 11,
      question: 'When should my child start potty training?',
      questionSi: 'මගේ දරුවා වැසිකිළි පුහුණුව ආරම්භ කළ යුත්තේ කවදාද?',
      answer: 'Most children are ready for potty training between 18-36 months. Signs of readiness include: staying dry for longer periods, showing interest in the toilet, communicating when they need to go, and being able to pull pants up and down. Never force it - wait until your child shows readiness signs.',
      answerSi: 'බොහෝ දරුවන් මාස 18-36 අතර වැසිකිළි පුහුණුවට සූදානම් වේ. සූදානම් වීමේ සලකුණු ඇතුළත් වන්නේ: දිගු කාලයක් වියළි වීම, වැසිකිළියට කැමැත්ත පෙන්වීම, යාමට අවශ්‍ය විට සන්නිවේදනය කිරීම, සහ කලිසම ඉහළට සහ පහළට ඇද ගත හැකි වීම. කිසි විටෙකත් බලකිරීම නොකරන්න - ඔබේ දරුවා සූදානම් වීමේ සලකුණු පෙන්වන තුරු බලා සිටින්න.',
      category: 'Development'
    },
    {
      id: 12,
      question: 'How much screen time is appropriate for young children?',
      questionSi: 'කුඩා දරුවන් සඳහා කොපමණ තිරය කාලයක් සුදුසුද?',
      answer: 'AAP recommends: no screen time for babies under 18 months (except video chatting), 1 hour maximum of high-quality programming for ages 2-5. When using screens, watch together and discuss content. Prioritize unplugged playtime, reading, and outdoor activities. Establish screen-free zones and times.',
      answerSi: 'AAP නිර්දේශ කරන්නේ: මාස 18 ට අඩු ළදරුවන් සඳහා තිරය කාලයක් නැත (වීඩියෝ චැට් කිරීම හැර), වයස අවුරුදු 2-5 සඳහා උසස් තත්ත්වයේ වැඩසටහන් පැය 1ක උපරිමයක්. තිර භාවිතා කරන විට, එකට නරඹන්න සහ අන්තර්ගතය සාකච්ඡා කරන්න. ප්ලග් රහිත සෙල්ලම් කාලය, කියවීම සහ එළිමහන් ක්‍රියාකාරකම් ප්‍රමුඛතාවය ලබා දෙන්න. තිරය රහිත කලාප සහ කාලයන් ස්ථාපිත කරන්න.',
      category: 'Behavior'
    }
  ];
  const categories = [
    { id: 'all', label: i18n.language === 'si' ? 'සියලු' : 'All' },
    { id: 'general', label: i18n.language === 'si' ? 'සාමාන්‍ය' : 'General' },
    { id: 'nutrition', label: i18n.language === 'si' ? 'පෝෂණය' : 'Nutrition' },
    { id: 'sleep', label: i18n.language === 'si' ? 'නින්ද' : 'Sleep' },
    { id: 'health', label: i18n.language === 'si' ? 'සෞඛ්‍යය' : 'Health' },
    { id: 'development', label: i18n.language === 'si' ? 'සංවර්ධනය' : 'Development' },
    { id: 'language', label: i18n.language === 'si' ? 'භාෂාව' : 'Language' },
    { id: 'behavior', label: i18n.language === 'si' ? 'හැසිරීම' : 'Behavior' },
    { id: 'discipline', label: i18n.language === 'si' ? 'විනය' : 'Discipline' },
  ];
  useEffect(() => {
    if (searchTerm.trim()) {
      const searchFAQs = async () => {
        try {
          setLoading(true);
          const results = await faqAPI.search(searchTerm, i18n.language === 'si' ? 'si' : 'en');
          setFaqs(results);
        } catch (err) {
          console.error('Search failed:', err);
        } finally {
          setLoading(false);
        }
      };
      const timeoutId = setTimeout(searchFAQs, 300);
      return () => clearTimeout(timeoutId);
    } else {
      loadFAQs();
    }
  }, [searchTerm, i18n.language]);
  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category.toLowerCase() === selectedCategory;
    return matchesCategory;
  });
  const handleQuestionClick = (faq: FAQ) => {
    const question = i18n.language === 'si' ? faq.questionSi : faq.question;
    const answer = i18n.language === 'si' ? faq.answerSi : faq.answer;
    setChatMessages([
      ...chatMessages,
      { type: 'question', text: question },
      { type: 'answer', text: answer }
    ]);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-600 bg-clip-text text-transparent px-4">
              {t('faq.title')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 px-4">
              {t('faq.subtitle')}
            </p>
          </motion.div>
          {}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mb-6 sm:mb-8"
          >
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('faq.search')}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-full border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white text-base sm:text-lg"
              />
            </div>
          </motion.div>
          {}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12 px-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {loading ? (
                <div className="card text-center py-10 sm:py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                  <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg">
                    Loading FAQs...
                  </p>
                  {error && (
                    <p className="text-yellow-600 dark:text-yellow-400 text-sm mt-2">
                      {error}
                    </p>
                  )}
                </div>
              ) : filteredFAQs.length === 0 ? (
                <div className="card text-center py-10 sm:py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg">
                    No questions found. Try a different search term or category.
                  </p>
                </div>
              ) : (
                filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card"
                >
                  <button
                    onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                    className="w-full flex items-start justify-between text-left gap-3 sm:gap-4"
                  >
                    <div className="flex-grow min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 break-words">
                        {i18n.language === 'si' ? faq.questionSi : faq.question}
                      </h3>
                      <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full text-xs font-medium">
                        {faq.category}
                      </span>
                    </div>
                    {expandedId === faq.id ? (
                      <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                          {i18n.language === 'si' ? faq.answerSi : faq.answer}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuestionClick(faq);
                          }}
                          className="mt-3 sm:mt-4 flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm sm:text-base"
                        >
                          <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                          Add to Chat
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )))}
            </div>
            {}
            <div className="lg:col-span-1">
              <div className="card sticky top-20 sm:top-24 max-h-[400px] sm:max-h-[500px] md:max-h-[600px] flex flex-col">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">FAQ Chat</h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">Click questions to add here</p>
                  </div>
                </div>
                <div className="flex-grow overflow-y-auto space-y-3 sm:space-y-4 mb-3 sm:mb-4">
                  {chatMessages.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-6 sm:py-8">
                      <Bot className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 opacity-30" />
                      <p className="text-sm sm:text-base">Click on any question to start a chat!</p>
                    </div>
                  ) : (
                    chatMessages.map((message, index) => (
                      <div
                        key={index}
                        className={`p-2 sm:p-3 rounded-lg text-sm sm:text-base ${
                          message.type === 'question'
                            ? 'bg-purple-100 dark:bg-purple-900/30 ml-4 sm:ml-8'
                            : 'bg-gray-100 dark:bg-gray-800 mr-4 sm:mr-8'
                        }`}
                      >
                        <p className="text-sm text-gray-800 dark:text-gray-200">{message.text}</p>
                      </div>
                    ))
                  )}
                </div>
                {chatMessages.length > 0 && (
                  <button
                    onClick={() => setChatMessages([])}
                    className="w-full py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    Clear Chat
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default FAQPage;