/**
 * AgriMind — i18n (Internationalization)
 * Supports English (en) and Urdu (ur / Nastaliq)
 */

export const T = {
  en: {
    'tagline':'AI Farming Agent','active-farm':'Active Farm','acres':'acres','crop-tomatoes':'Wheat','day-label':'Day','navigation':'Navigation',
    'nav-dashboard':'Dashboard','nav-ai-agent':'AI Agent','nav-alerts':'Alerts','nav-weather':'Weather','nav-fields':'Fields','agent-active':'● Agent Active',
    'dashboard-title':'Farm Dashboard','dashboard-date':'Monday, May 4, 2026 · 09:42 AM PKT',
    'agent-running':'Agent Running','automode':'Auto-mode ON',
    'stat-water':'Water Saved','stat-water-sub':'↑ vs last season avg',
    'stat-yield':'Yield Forecast','stat-yield-sub':'↑ 12% above baseline',
    'stat-disease':'Disease Risk','medium':'Medium','stat-disease-sub':'Yellow rust watch active',
    'stat-alerts':'Active Alerts','stat-alerts-sub':'1 critical · 2 high',
    'weather-title':'Weather Forecast','weather-source':'Open-Meteo · ECMWF blend',
    'weather-now-desc':'Sunny · Humidity 58% · Wind 14 km/h SW',
    'weather-now-note':'No precipitation next 12h · Loo winds possible Day 4',
    'feels-like':'Feels like','uv-index':'UV Index: 10 (Very High)',
    'irrigation-title':'Irrigation Status','active':'ACTIVE',
    'good':'Good','low-warn':'Low ⚠','optimal':'Optimal','critical-warn':'Critical !',
    'next-scheduled':'Next Scheduled','next-sched-val':'Zone 2 & 4 — Today 3:30 PM','next-sched-sub':'340L estimated · Drip system',
    'etc-today':'ETc today','last-irr':'Last irrigation','last-rain':'Last rainfall',
    'last-irr-val':'Yesterday 4 PM','last-rain-val':'3 days ago (8mm)',
    'disease-title':'Disease & Pest Risk',
    'late-blight':'Yellow Rust','blight-pct':'45%',
    'aphid':'Aphid Infestation','aphid-pct':'18%',
    'fusarium':'Karnal Bunt','fusarium-pct':'12%',
    'whitefly':'Armyworm','whitefly-pct':'38%',
    'blight-warn-title':'⚠ Yellow Rust Risk Window',
    'blight-warn-body':'Risk rises Sat–Sun due to cooler nights and morning dew. Preventive propiconazole spray recommended by Fri evening.',
    'plan-title':"Today's AI Action Plan",'plan-generated':'Generated 6:00 AM',
    'plan-1-title':'Irrigate Zone 2 & 4 — 3:30 PM today',
    'plan-1-body':'Zone 2: 280L (18 min) · Zone 4: 340L (22 min). Drip valves will auto-open. Soil moisture critical in Zone 4.',
    'plan-2-title':'Apply propiconazole spray by Friday 5 PM',
    'plan-2-body':'Preventive yellow rust treatment before Loo winds arrive Saturday. Propiconazole 25EC 1ml/L. Cover all leaf surfaces.',
    'plan-3-title':'HOLD urea fertilizer application',
    'plan-3-body':'Loo winds forecast Sat–Sun will raise soil temperature rapidly. Reschedule urea top-dress for Monday when conditions cool.',
    'plan-4-title':'Inspect Zone 3 drip emitters',
    'plan-4-body':'Pressure anomaly detected. Possible blockage at rows 12–15. Visual check before irrigation cycle.',
    'badge-auto':'AUTO','badge-approval':'APPROVAL','badge-advisory':'ADVISORY','badge-manual':'MANUAL',
    'moisture-chart-title':'Soil Moisture Trend — 7 Days',
    'ai-title':'AI Agent — Farm Analyzer',
    'ai-subtitle':"Send real-time farm data to AgriMind's AI brain and get autonomous recommendations",
    'powered-by':'Powered by',
    'crop-section':'🌾 Crop & Field Details','crop-type-label':'Crop Type','growth-stage-label':'Growth Stage',
    'crop-day-label':'Crop Day','field-size-label':'Field Size (acres)','irr-method-label':'Irrigation Method',
    'sensor-section':'🌡 Sensor Readings','soil-moisture-label':'Soil Moisture:',
    'air-temp-label':'Air Temp (°C)','humidity-label':'Humidity (%)','soil-temp-label':'Soil Temp (°C)','soil-type-label':'Soil Type',
    'weather-section':'🌧 Recent Weather','last-rain-label':'Last Rain (mm)','days-since-rain-label':'Days Since Rain',
    'upcoming-weather-label':'Upcoming Weather (7 days)',
    'concerns-section':'💬 Specific Concerns',
    'analyze-btn':'🤖 Analyze with AgriMind AI','load-preset':'↺ Load demo preset data',
    'ai-analysis-title':'AgriMind Analysis','awaiting':'Awaiting data',
    'ai-placeholder-main':'Fill in your farm data and click',
    'ai-placeholder-btn':'"Analyze with AgriMind AI"',
    'ai-placeholder-sub':'AgriMind will analyze your soil, weather, crop stage, and disease risk to give you a complete autonomous action plan.',
    'thinking-msg':'AgriMind is analyzing your farm data...','thinking-sub':'Evaluating soil, weather, disease risk & crop stage',
    'alerts-title':'Alert Center','alerts-subtitle':'4 active alerts · Last updated 09:42 AM',
    'mark-all-read':'Mark all read','alert-settings':'Alert Settings',
    'badge-critical':'Critical','badge-high':'High','badge-medium':'Medium','badge-info':'Info',
    'a1-meta':'Weather · 2 hours ago','a1-title':'Loo winds forecast Saturday — hold urea application',
    'a1-body':'80% probability of 40–50°C Loo winds Saturday. Applying urea before Loo causes scorching and volatile losses, wasting ₨4,200 in inputs. Hold until Monday 6 May.',
    'acknowledge':'✓ Acknowledge','snooze':'Snooze 24h','tell-more':'Tell me more →',
    'a2-meta':'Disease Risk · 4 hours ago','a2-title':'Yellow rust risk window opens Friday evening',
    'a2-body':'Humidity will exceed 80% for 10+ hours after cool overnight dew at 15–18°C — ideal yellow rust conditions. Apply propiconazole 25EC preventively by Friday 5 PM. Cost: ₨850.',
    'schedule-treatment':'✓ Schedule Treatment','decline':'Decline',
    'a3-meta':'Irrigation · 30 mins ago','a3-title':'Zone 4 soil moisture critical — 48% (threshold: 55%)',
    'a3-body':'Zone 4 has dropped below the stress threshold. Auto-irrigation scheduled for 3:30 PM today — drip valves open for 22 minutes delivering 340L.',
    'approve-irrigate':'✓ Approve (Auto-irrigate)','adjust-timing':'Adjust timing',
    'a4-meta':'Operational · 1 hour ago','a4-title':'Zone 3 drip emitter pressure anomaly detected',
    'a4-body':'Flow sensor reading 12% below expected for Zone 3. Likely partial clog in rows 12–15. Visual inspection recommended before next irrigation.',
    'mark-inspect':'Mark for inspection','dismiss':'Dismiss →',
    'a5-meta':'Market · 15 mins ago','a5-title':'Wheat mandi price: ₨3,800/40kg at Lahore (up ₨120 from yesterday)',
    'a5-body':'Price crossed your ₨3,700 alert threshold. Harvest window is Days 90–100. Holding 2 more weeks could yield better returns if Loo winds subside and grain quality holds.',
    'weather-view-title':'Hyperlocal Weather','weather-view-subtitle':'Al-Barkat Farm · Open-Meteo + ECMWF blend · Updated 09:40 AM',
    '48hr-title':'48-Hour Hourly Forecast','conditions-now':'Conditions Now','sunny-clear':'Sunny, Clear',
    'w-humidity':'Humidity','w-wind':'Wind','w-pressure':'Pressure','w-uv':'UV Index','w-uv-val':'10 — Very High','w-dew':'Dew Point','w-vis':'Visibility',
    '7day-title':'7-Day Forecast with Agri-Impact',
    'th-day':'Day','th-cond':'Condition','th-temp':'High/Low','th-rain':'Rain %','th-hum':'Humidity','th-advisory':'AgriMind Advisory',
    'today-wed':'Today Mon','sunny':'Sunny','adv-1':'Good day to irrigate Zones 2 & 4',
    'thu-1may':'Tue 5 May','partly-cloudy':'Partly Cloudy','adv-2':'Good window for fungicide application',
    'fri-2may':'Wed 6 May','cloudy':'Hazy','adv-3':'Apply propiconazole spray before 5 PM',
    'sat-3may':'Thu 7 May ⚠','heavy-rain':'Loo Winds','adv-4':'No field operations. Yellow rust risk HIGH.',
    'sun-4may':'Fri 8 May','showers':'Clearing','adv-5':'Monitor for rust symptoms',
    'mon-5may':'Sat 9 May','clearing':'Partly Cloudy','adv-6':'Resume fertilizer application today',
    'tue-6may':'Sun 10 May','adv-7':'Optimal conditions resume',
    'fields-title':'Field Overview','fields-subtitle':'Al-Barkat Farm · 45 acres · 4 irrigation zones',
    'field-map-title':'Field Map',
    'zone1-name':'Zone 1 — North Block','zone1-detail':'12 acres · Rows 1–24 · Last irrigated: Yesterday 4 PM',
    'zone2-name':'Zone 2 — East Block','zone2-detail':'10 acres · Rows 25–44 · Irrigation scheduled 3:30 PM',
    'zone3-name':'Zone 3 — South Block','zone3-detail':'13 acres · Rows 45–70 · ⚠ Emitter check needed',
    'zone4-name':'Zone 4 — West Block','zone4-detail':'10 acres · Rows 71–90 · CRITICAL — auto-irrigate today',
    'season-progress':'Season Progress — Wheat','sowing':'Sowing','harvest':'Harvest',
    'day-zero':'Day 0','day-now':'Day 65 (now)','day-120':'Day 120',
    'today':'Today','thu':'Thu','fri':'Fri','sat-warn':'Sat ⚠','sun':'Sun','mon':'Mon','tue':'Tue',
  },

  ur: {
    'tagline':'ذہین زراعت ایجنٹ','active-farm':'فعال فارم','acres':'ایکڑ','crop-tomatoes':'گندم','day-label':'دن','navigation':'نیویگیشن',
    'nav-dashboard':'ڈیش بورڈ','nav-ai-agent':'اے آئی ایجنٹ','nav-alerts':'اطلاعات','nav-weather':'موسم','nav-fields':'کھیت','agent-active':'● ایجنٹ فعال',
    'dashboard-title':'فارم ڈیش بورڈ','dashboard-date':'پیر، ۴ مئی ۲۰۲۶ · صبح ۹:۴۲ PKT',
    'agent-running':'ایجنٹ چل رہا ہے','automode':'خودکار موڈ: آن',
    'stat-water':'پانی کی بچت','stat-water-sub':'↑ گزشتہ سیزن سے بہتر',
    'stat-yield':'پیداوار کا تخمینہ','stat-yield-sub':'↑ بنیادی لائن سے ۱۲٪ زیادہ',
    'stat-disease':'بیماری کا خطرہ','medium':'درمیانہ','stat-disease-sub':'پیلی زنگ کی نگرانی جاری',
    'stat-alerts':'فعال اطلاعات','stat-alerts-sub':'۱ اہم · ۲ زیادہ',
    'weather-title':'موسمی پیشگوئی','weather-source':'اوپن میٹیو · ای سی ایم ڈبلیو ایف',
    'weather-now-desc':'دھوپ · نمی ۵۸٪ · ہوا ۱۴ کلومیٹر/گھنٹہ جنوب مغرب',
    'weather-now-note':'اگلے ۱۲ گھنٹے بارش نہیں · چوتھے دن لو چلنے کا امکان',
    'feels-like':'محسوس ہوتا ہے','uv-index':'UV انڈیکس: ۱۰ (بہت زیادہ)',
    'irrigation-title':'آبپاشی کا حال','active':'فعال',
    'good':'اچھا','low-warn':'کم ⚠','optimal':'بہترین','critical-warn':'نازک !',
    'next-scheduled':'اگلی آبپاشی','next-sched-val':'زون ۲ اور ۴ — آج شام ۳:۳۰','next-sched-sub':'۳۴۰ لیٹر تخمینہ · ڈرپ سسٹم',
    'etc-today':'آج ETc','last-irr':'آخری آبپاشی','last-rain':'آخری بارش',
    'last-irr-val':'کل شام ۴ بجے','last-rain-val':'۳ دن پہلے (۸ ملی میٹر)',
    'disease-title':'بیماری اور کیڑوں کا خطرہ',
    'late-blight':'پیلی زنگ','blight-pct':'۴۵٪',
    'aphid':'افڈ کا حملہ','aphid-pct':'۱۸٪',
    'fusarium':'کرنال بنٹ','fusarium-pct':'۱۲٪',
    'whitefly':'آرمی ورم','whitefly-pct':'۳۸٪',
    'blight-warn-title':'⚠ پیلی زنگ کا خطرہ',
    'blight-warn-body':'ہفتہ اتوار کو ٹھنڈی راتوں اور صبح کی اوس سے خطرہ بڑھے گا۔ جمعہ شام تک پروپیکونازول سپرے کریں۔',
    'plan-title':'آج کا اے آئی منصوبہ','plan-generated':'صبح ۶:۰۰ بجے تیار',
    'plan-1-title':'زون ۲ اور ۴ کو آج شام ۳:۳۰ بجے آبپاشی',
    'plan-1-body':'زون ۲: ۲۸۰ لیٹر (۱۸ منٹ) · زون ۴: ۳۴۰ لیٹر (۲۲ منٹ)۔ ڈرپ والو خودبخود کھلیں گے۔',
    'plan-2-title':'جمعہ شام ۵ بجے تک پروپیکونازول سپرے کریں',
    'plan-2-body':'لو سے پہلے پیلی زنگ سے بچاؤ۔ پروپیکونازول 25EC 1ml/L۔ تمام پتوں پر چھڑکیں۔',
    'plan-3-title':'یوریا کھاد کا اطلاق روکیں',
    'plan-3-body':'ہفتہ اتوار کی لو مٹی کا درجہ حرارت تیزی سے بڑھائے گی۔ پیر تک انتظار کریں جب حالات ٹھنڈے ہوں۔',
    'plan-4-title':'زون ۳ کے ڈرپ ایمیٹرز کا معائنہ کریں',
    'plan-4-body':'پریشر میں کمی محسوس ہوئی۔ قطاروں ۱۲–۱۵ میں رکاوٹ ہو سکتی ہے۔ آبپاشی سے پہلے چیک کریں۔',
    'badge-auto':'خودکار','badge-approval':'منظوری','badge-advisory':'مشورہ','badge-manual':'دستی',
    'moisture-chart-title':'مٹی کی نمی کا رجحان — ۷ دن',
    'ai-title':'اے آئی ایجنٹ — فارم تجزیہ کار',
    'ai-subtitle':'اپنے فارم کا ڈیٹا بھیجیں اور خودکار سفارشات حاصل کریں',
    'powered-by':'طاقت ملی ہے',
    'crop-section':'🌾 فصل اور کھیت کی تفصیل','crop-type-label':'فصل کی قسم','growth-stage-label':'نشوونما کا مرحلہ',
    'crop-day-label':'فصل کا دن','field-size-label':'کھیت کا رقبہ (ایکڑ)','irr-method-label':'آبپاشی کا طریقہ',
    'sensor-section':'🌡 سینسر ریڈنگز','soil-moisture-label':'مٹی کی نمی:',
    'air-temp-label':'ہوا کا درجہ حرارت (°C)','humidity-label':'نمی (%)','soil-temp-label':'مٹی کا درجہ حرارت (°C)','soil-type-label':'مٹی کی قسم',
    'weather-section':'🌧 حالیہ موسم','last-rain-label':'آخری بارش (ملی میٹر)','days-since-rain-label':'بارش کے بعد دن',
    'upcoming-weather-label':'آنے والے ۷ دنوں کا موسم',
    'concerns-section':'💬 مخصوص مسائل',
    'analyze-btn':'🤖 اے آئی سے تجزیہ کریں','load-preset':'↺ ڈیمو ڈیٹا لوڈ کریں',
    'ai-analysis-title':'ایگری مائنڈ تجزیہ','awaiting':'ڈیٹا کا انتظار',
    'ai-placeholder-main':'فارم کا ڈیٹا بھریں اور دبائیں',
    'ai-placeholder-btn':'"اے آئی سے تجزیہ کریں"',
    'ai-placeholder-sub':'ایگری مائنڈ آپ کی مٹی، موسم، فصل کا مرحلہ اور بیماری کے خطرے کا تجزیہ کر کے مکمل خودکار منصوبہ دے گا۔',
    'thinking-msg':'ایگری مائنڈ آپ کے فارم کا تجزیہ کر رہا ہے...','thinking-sub':'مٹی، موسم، بیماری اور فصل کا جائزہ لیا جا رہا ہے',
    'alerts-title':'اطلاع مرکز','alerts-subtitle':'۴ فعال اطلاعات · آخری اپڈیٹ صبح ۹:۴۲',
    'mark-all-read':'سب پڑھ لیا','alert-settings':'اطلاع کی ترتیبات',
    'badge-critical':'اہم','badge-high':'زیادہ','badge-medium':'درمیانہ','badge-info':'معلومات',
    'a1-meta':'موسم · ۲ گھنٹے پہلے','a1-title':'ہفتہ کو لو متوقع — یوریا کا اطلاق روکیں',
    'a1-body':'ہفتہ کو ۴۰–۵۰°C لو چلنے کا ۸۰٪ امکان۔ لو سے پہلے یوریا لگانا ₨۴,۲۰۰ کا نقصان ہوگا۔ ۶ مئی پیر تک انتظار کریں۔',
    'acknowledge':'✓ سمجھ گیا','snooze':'۲۴ گھنٹے بعد یاد دلائیں','tell-more':'مزید بتائیں →',
    'a2-meta':'بیماری کا خطرہ · ۴ گھنٹے پہلے','a2-title':'پیلی زنگ کا خطرہ جمعہ شام کو شروع ہوگا',
    'a2-body':'ٹھنڈی اوس کے بعد ۱۵–۱۸°C پر ۸۰٪ سے زیادہ نمی — پیلی زنگ کے لیے مثالی حالات۔ جمعہ شام ۵ بجے تک پروپیکونازول 25EC لگائیں۔ لاگت: ₨۸۵۰۔',
    'schedule-treatment':'✓ علاج شیڈول کریں','decline':'انکار کریں',
    'a3-meta':'آبپاشی · ۳۰ منٹ پہلے','a3-title':'زون ۴ کی مٹی کی نمی نازک — ۴۸٪ (حد: ۵۵٪)',
    'a3-body':'زون ۴ تناؤ کی حد سے نیچے آ گیا ہے۔ آج شام ۳:۳۰ بجے خودکار آبپاشی شیڈول ہے — ۲۲ منٹ میں ۳۴۰ لیٹر۔',
    'approve-irrigate':'✓ منظور کریں (خودکار آبپاشی)','adjust-timing':'وقت تبدیل کریں',
    'a4-meta':'آپریشنل · ۱ گھنٹہ پہلے','a4-title':'زون ۳ کے ڈرپ ایمیٹر میں پریشر کا مسئلہ',
    'a4-body':'زون ۳ میں فلو سینسر ۱۲٪ کم پڑھ رہا ہے۔ قطاروں ۱۲–۱۵ میں رکاوٹ ممکن ہے۔ اگلی آبپاشی سے پہلے چیک کریں۔',
    'mark-inspect':'معائنے کے لیے نشان لگائیں','dismiss':'رد کریں →',
    'a5-meta':'مارکیٹ · ۱۵ منٹ پہلے','a5-title':'لاہور منڈی میں گندم کا بھاؤ: ₨۳,۸۰۰ فی ۴۰ کلو',
    'a5-body':'قیمت آپ کی ₨۳,۷۰۰ کی الرٹ حد سے اوپر۔ فصل کاٹنے کا وقت دن ۹۰–۱۰۰ ہے۔ اگر لو رک جائے اور دانے کا معیار برقرار رہے تو مزید انتظار فائدہ مند ہو سکتا ہے۔',
    'weather-view-title':'مقامی موسمی خبریں','weather-view-subtitle':'البرکت فارم · اوپن میٹیو + ای سی ایم ڈبلیو ایف',
    '48hr-title':'۴۸ گھنٹے کی پیشگوئی','conditions-now':'ابھی کی صورتحال','sunny-clear':'دھوپ، صاف',
    'w-humidity':'نمی','w-wind':'ہوا','w-pressure':'دباؤ','w-uv':'UV انڈیکس','w-uv-val':'۱۰ — بہت زیادہ','w-dew':'شبنم نقطہ','w-vis':'نمائش',
    '7day-title':'۷ دنوں کی پیشگوئی اور زرعی اثرات',
    'th-day':'دن','th-cond':'موسم','th-temp':'زیادہ/کم','th-rain':'بارش %','th-hum':'نمی','th-advisory':'ایگری مائنڈ مشورہ',
    'today-wed':'آج پیر','sunny':'دھوپ','adv-1':'زون ۲ اور ۴ کی آبپاشی کے لیے اچھا دن',
    'thu-1may':'منگل ۵ مئی','partly-cloudy':'جزوی ابر','adv-2':'فنگی سائیڈ لگانے کا اچھا موقع',
    'fri-2may':'بدھ ۶ مئی','cloudy':'دھند','adv-3':'شام ۵ بجے سے پہلے پروپیکونازول سپرے کریں',
    'sat-3may':'جمعرات ۷ مئی ⚠','heavy-rain':'لو','adv-4':'کھیت میں کام نہیں۔ پیلی زنگ خطرہ زیادہ۔',
    'sun-4may':'جمعہ ۸ مئی','showers':'ابر چھٹ رہا ہے','adv-5':'زنگ کی علامات چیک کریں',
    'mon-5may':'ہفتہ ۹ مئی','clearing':'جزوی ابر','adv-6':'آج سے کھاد دوبارہ شروع کریں',
    'tue-6may':'اتوار ۱۰ مئی','adv-7':'بہترین حالات بحال',
    'fields-title':'کھیت کا جائزہ','fields-subtitle':'البرکت فارم · ۴۵ ایکڑ · ۴ آبپاشی زون',
    'field-map-title':'کھیت کا نقشہ',
    'zone1-name':'زون ۱ — شمالی بلاک','zone1-detail':'۱۲ ایکڑ · قطاریں ۱–۲۴ · آخری آبپاشی: کل شام ۴ بجے',
    'zone2-name':'زون ۲ — مشرقی بلاک','zone2-detail':'۱۰ ایکڑ · قطاریں ۲۵–۴۴ · آبپاشی شام ۳:۳۰ بجے',
    'zone3-name':'زون ۳ — جنوبی بلاک','zone3-detail':'۱۳ ایکڑ · قطاریں ۴۵–۷۰ · ⚠ ایمیٹر چیک ضروری',
    'zone4-name':'زون ۴ — مغربی بلاک','zone4-detail':'۱۰ ایکڑ · قطاریں ۷۱–۹۰ · نازک — خودکار آبپاشی آج',
    'season-progress':'فصلی ترقی — گندم','sowing':'بوائی','harvest':'کٹائی',
    'day-zero':'دن ۰','day-now':'دن ۶۵ (ابھی)','day-120':'دن ۱۲۰',
    'today':'آج','thu':'جمعرات','fri':'جمعہ','sat-warn':'ہفتہ ⚠','sun':'اتوار','mon':'پیر','tue':'منگل',
  }
};

/** @type {'en'|'ur'} */
export let currentLang = 'en';

/**
 * Switch the UI language.
 * @param {'en'|'ur'} lang
 */
export function setLanguage(lang) {
  currentLang = lang;
  const html = document.getElementById('html-root');

  if (lang === 'ur') {
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'ur');
    document.body.classList.add('urdu-mode');
    document.getElementById('btn-ur').classList.add('active');
    document.getElementById('btn-en').classList.remove('active');
  } else {
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', 'en');
    document.body.classList.remove('urdu-mode');
    document.getElementById('btn-en').classList.add('active');
    document.getElementById('btn-ur').classList.remove('active');
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (T[lang][key] !== undefined) el.textContent = T[lang][key];
  });
}

/** Expose to inline onclick handlers */
window.setLanguage = setLanguage;
