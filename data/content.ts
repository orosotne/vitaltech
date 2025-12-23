import { Calendar, Monitor, Megaphone, CheckCircle, Layout, Users, Settings, PenTool, Server, ShieldCheck } from 'lucide-react';
import { ServicePillar, Realization } from '../types';

export const servicesData: ServicePillar[] = [
  {
    id: 'eventy-a-priestory',
    title: 'Eventy & Priestory',
    shortDesc: 'Firemné eventy na kľúč – od produkcie cez techniku až po koordináciu.',
    fullDesc: 'Od návrhu cez produkciu až po realizáciu. Zabezpečíme priestor, techniku, logistiku aj ľudí – vy riešite len hostí. Jeden partner, jedna zodpovednosť, žiadne medzery.',
    heroTagline: 'Event, ktorý funguje technicky aj zážitkovo.',
    path: '/eventy-a-priestory',
    icon: Calendar,
    image: '/images/services/eventy-a-priestory.jpg',
    features: [
      'Kompletná produkcia a koordinácia eventov',
      'AV technika (ozvučenie, osvetlenie, projekcia)',
      'Livestream a hybridné formáty',
      'Scénografia, branding priestoru, tlač materiálov',
      'Logistika a onsite produkčný tím',
      'Registrácia hostí, harmonogram, moderácia',
      'Záložné riešenia (plán B) pre kritické body',
      'Foto/video dokumentácia podujatia'
    ],
    benefits: [
      { title: 'Jedna zodpovednosť', desc: 'Jeden partner, jeden kontakt, menej stresu. Preberáme kompletnú zodpovednosť za výsledok.' },
      { title: 'Technická istota', desc: 'Profesionálna AV technika + skúsená réžia. Pripravené zálohy na mikrofóny, projekciu, konektivitu.' },
      { title: 'Exekúcia na minútu', desc: 'Detailný harmonogram, koordinácia, backstage manažment a jasný plán A/B.' }
    ],
    targetAudience: [
      'Firemné konferencie a školenia (80–300 účastníkov)',
      'Produktové launche a PR eventy',
      'Interné eventy (townhall, kick-off, teambuilding)',
      'Gala večery a networking eventy'
    ],
    typicalProjects: [
      'Firemné konferencie a školenia (80–300 ľudí) – kompletná produkcia, AV, registrácia, moderácia',
      'Produktové launch-e a PR eventy – scénografia, branding, svetelný dizajn, livestream',
      'Interné eventy (townhall, kick-off) – technika + réžia, hladký priebeh bez výpadkov'
    ],
    processSteps: [
      { title: 'Brief a obhliadka', desc: 'Počúvame. Pochopíme formát, ciele a očakávania. Obhliadneme priestor.' },
      { title: 'Návrh a rozpočet', desc: 'Pripravíme detailný produkčný plán, vizuál a transparentnú kalkuláciu.' },
      { title: 'Produkčný plán', desc: 'Harmonogram, technický rider, záložné scenáre – všetko písomne.' },
      { title: 'Realizácia a vyhodnotenie', desc: 'Exekúcia na mieste, koordinácia tímu, feedback a reporting po akcii.' }
    ],
    faq: [
      { q: 'Koľko vopred potrebujete vedieť o evente?', a: 'Ideálne 4–6 týždňov, pri väčších eventoch 2–3 mesiace. Vieme však reagovať aj rýchlejšie.' },
      { q: 'Čo ak sa niečo pokazí počas eventu?', a: 'Máme pripravený plán B – záložné mikrofóny, náhradné káble, backup prezentácií. Riešime v reálnom čase.' },
      { q: 'Viete aj hybridný/online formát?', a: 'Áno, poskytujeme kompletný livestream vrátane réžie, grafiky a technickej podpory pre vzdialených účastníkov.' },
      { q: 'Ako tvoríte rozpočet?', a: 'Na základe briefu a obhliadky. Rozpočet je transparentný, rozdelený na položky, bez skrytých nákladov.' }
    ]
  },
  {
    id: 'it-servis',
    title: 'IT Servis & PC riešenia',
    shortDesc: 'Spoľahlivá IT infraštruktúra pre firmy – bez výpadkov, bez starostí.',
    fullDesc: 'Servis, správa a dodávka IT riešení pre firmy, aby vaša infraštruktúra bežala spoľahlivo a bezpečne. Riešime problémy skôr, ako zastavia vašu prácu.',
    heroTagline: 'IT, ktoré neruší prácu. Podporuje ju.',
    path: '/it-servis',
    icon: Monitor,
    image: '/images/services/it-servis.jpg',
    features: [
      'Dodávka a servis firemných PC a workstations',
      'Návrh a realizácia sieťovej infraštruktúry',
      'Stabilná Wi-Fi pre kancelárie a prevádzky',
      'Zálohovanie dát a bezpečnostné politiky',
      'Helpdesk a vzdialená podpora (remote)',
      'On-site servisné zásahy',
      'Pravidelná údržba, aktualizácie, monitoring',
      'Onboarding a offboarding zamestnancov (IT časť)'
    ],
    benefits: [
      { title: 'Prevencia namiesto hasenia', desc: 'Problémy riešime skôr, než zastavia firmu. Pravidelný monitoring, reporting a odporúčania.' },
      { title: 'Transparentné odporúčania', desc: 'Nepredávame "čo sa dá", ale "čo dáva zmysel" – s ohľadom na TCO, škálovanie a bezpečnosť.' },
      { title: 'Rýchla reakcia + jasné SLA', desc: 'Definované časy odozvy, pravidelné reporty, jeden kontakt pre všetko.' }
    ],
    targetAudience: [
      'Malé a stredné firmy (10–80 používateľov)',
      'Kancelárie, coworkingy a zdieľané priestory',
      'Výrobné firmy a logistika',
      'Architektonické štúdiá a kreatívne agentúry (workstations)'
    ],
    typicalProjects: [
      'Dodávka a servis firemných PC/workstations – návrh konfigurácií podľa pozícií, rollout, správa',
      'Sieť a Wi-Fi pre kancelárie – stabilná konektivita, segmentácia, bezpečný prístup',
      'Správa IT pre SMB (10–80 používateľov) – helpdesk, aktualizácie, zálohy, bezpečnostné politiky'
    ],
    processSteps: [
      { title: 'Diagnostika / Audit', desc: 'Zistíme stav infraštruktúry, identifikujeme riziká a rezervy.' },
      { title: 'Návrh riešenia', desc: 'Pripravíme odporúčanie na mieru – čo riešiť hneď, čo môže počkať.' },
      { title: 'Implementácia', desc: 'Dodávka, inštalácia, migrácia – s minimálnym dopadom na prevádzku.' },
      { title: 'Správa a zlepšovanie', desc: 'Pravidelná údržba, monitoring, kvartálne reporty a roadmapa.' }
    ],
    faq: [
      { q: 'Viete prísť aj on-site?', a: 'Áno, pre firemných klientov poskytujeme on-site servis v rámci SLA alebo na vyžiadanie.' },
      { q: 'Ako rýchlo reagujete na problémy?', a: 'Závisí od balíčka – štandardne do 4 hodín, pri Pro Care do 1 hodiny počas pracovnej doby.' },
      { q: 'Dodávate aj hardware?', a: 'Áno, zabezpečíme PC, notebooky, monitory, sieťové prvky aj príslušenstvo.' },
      { q: 'Ako riešite zálohovanie?', a: 'Nastavíme automatické zálohy – lokálne aj do cloudu, s pravidelnými testami obnovy.' }
    ]
  },
  {
    id: 'marketing-a-reklama',
    title: 'Marketing & Reklama',
    shortDesc: 'Stratégia, kreatíva a exekúcia – všetko pod jednou strechou.',
    fullDesc: 'Od stratégie a kreatívy po exekúciu a meranie. Budujeme značku a zároveň výkon. Marketing, ktorý prináša dopyt – nie len "pekno".',
    heroTagline: 'Marketing, ktorý prináša dopyt – nie len „pekno".',
    path: '/marketing-a-reklama',
    icon: Megaphone,
    image: '/images/services/marketing-a-reklama.jpg',
    features: [
      'Stratégia a positioning značky',
      'Vizuálna identita a brand dizajn',
      'B2B lead-gen kampane (Meta, Google, LinkedIn)',
      'Landing pages a konverzné funely',
      'Copywriting a obsahový marketing',
      'Grafika pre print aj digitál',
      'Výroba reklamných predmetov a materiálov',
      'Reporting, KPI a priebežná optimalizácia'
    ],
    benefits: [
      { title: 'Kreatíva aj exekúcia pod jednou strechou', desc: 'Stratégia → dizajn → kampane → meranie. Bez strát v odovzdávkach medzi agentúrami.' },
      { title: 'Dôraz na merateľný výsledok', desc: 'KPI, reporting, iterácie. Nie "pocity", ale dáta a jasne definované ciele.' },
      { title: 'B2B špecializácia', desc: 'Rozumieme B2B predaju – dlhší rozhodovací cyklus, viac stakeholderov, dôraz na dôveryhodnosť.' }
    ],
    targetAudience: [
      'B2B firmy hľadajúce nových klientov (lead-gen)',
      'Firmy pred rebrandingom alebo launchom',
      'Spoločnosti riešiace employer branding a nábor',
      'Startupy a scale-upy budujúce značku'
    ],
    typicalProjects: [
      'B2B lead-gen kampane – landing page + formulár + kvalifikácia leadov, Meta/Google/LinkedIn',
      'Rebranding / vizuálna identita – jednotný vzhľad, materiály pre obchod, eventy, social',
      'Obsah a výkon pre web – texty, case studies, meranie, priebežná optimalizácia'
    ],
    processSteps: [
      { title: 'Ciele a KPI', desc: 'Definujeme, čo má marketing dosiahnuť – leady, awareness, nábor.' },
      { title: 'Koncept a stratégia', desc: 'Cieľovky, messaging, kanály, formáty – všetko na papieri pred štartom.' },
      { title: 'Produkcia', desc: 'Tvorba vizuálov, textov, landing pages, kampaňových materiálov.' },
      { title: 'Spustenie a optimalizácia', desc: 'Nasadenie, A/B testy, reporting, pravidelné vyhodnotenie a ladenie.' }
    ],
    faq: [
      { q: 'Aký rozpočet na kampane dáva zmysel?', a: 'Pre B2B lead-gen odporúčame min. 500–1000 € mesačne na médiá + fee za správu. Pri menších rozpočtoch ideme cez organiku a obsah.' },
      { q: 'Kedy uvidíme výsledky?', a: 'Prvé dáta za 2–4 týždne, stabilné výsledky typicky po 2–3 mesiacoch optimalizácie.' },
      { q: 'Čo presne dostaneme každý mesiac?', a: 'Závisí od balíčka – vždy však report s KPI, prehľad aktivít a odporúčania na ďalší mesiac.' },
      { q: 'Robíte aj správu sociálnych sietí?', a: 'Áno, vrátane content plánu, tvorby príspevkov a community managementu.' }
    ]
  }
];

export const realizationsData: Realization[] = [
  { id: '1', title: 'Mestské slávnosti 2023', category: 'eventy', description: 'Kompletná organizácia dní mesta, technické zabezpečenie a program.', location: 'Trenčín', year: '2023', image: '/images/realizations/1.jpg' },
  { id: '2', title: 'IT Infraštruktúra Logistics s.r.o.', category: 'it', description: 'Dodávka a inštalácia 20 kancelárskych staníc + sieťové riešenie.', location: 'Žilina', year: '2023', image: '/images/realizations/2.jpg' },
  { id: '3', title: 'Rebranding hotela Park', category: 'reklama', description: 'Nová vizuálna identita, tlačoviny a event promo pri znovuotvorení.', location: 'Piešťany', year: '2024', image: '/images/realizations/3.jpg' },
  { id: '4', title: 'Konferencia TechMeet', category: 'eventy', description: 'Prenájom priestorov a catering pre 150 účastníkov.', location: 'Bratislava', year: '2023', image: '/images/realizations/4.jpg' },
  { id: '5', title: 'Servisná zmluva EduPro', category: 'it', description: 'Pravidelná údržba a čistenie techniky pre vzdelávacie centrum.', location: 'Trnava', year: '2024', image: '/images/realizations/5.jpg' },
  { id: '6', title: 'Kampaň "Lokálne Vianoce"', category: 'reklama', description: 'Vizuál a promo materiály pre vianočné trhy.', location: 'Nitra', year: '2023', image: '/images/realizations/6.jpg' },
  { id: '7', title: 'Workstation pre architektov', category: 'it', description: 'Stavba high-end PC zostáv pre CAD/BIM systémy.', location: 'Bratislava', year: '2024', image: '/images/realizations/7.jpg' },
  { id: '8', title: 'Gala večer Priemyselnej komory', category: 'eventy', description: 'Výzdoba, osvetlenie a koordinácia večera.', location: 'Košice', year: '2022', image: '/images/realizations/8.jpg' },
  { id: '9', title: 'Start-up Promo Balík', category: 'reklama', description: 'Kompletný launch balík pre technologický startup.', location: 'Remote', year: '2024', image: '/images/realizations/9.jpg' },
];
