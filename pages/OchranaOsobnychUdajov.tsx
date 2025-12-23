import React from 'react';
import { Section, Container, H1, H2, Subtext, Card, CheckItem, Badge, Button } from '../components/ui/DesignSystem';
import { ShieldCheck, FileText, Globe2, Mail, Phone } from 'lucide-react';

const TOC = [
  { id: 'prevadzkovatel', label: 'Prevádzkovateľ' },
  { id: 'ucely', label: 'Účely a právne základy' },
  { id: 'kategorie', label: 'Kategórie údajov' },
  { id: 'prijemcovia', label: 'Príjemcovia' },
  { id: 'prenosy', label: 'Prenosy mimo EÚ/EHP' },
  { id: 'doba', label: 'Doby uchovávania' },
  { id: 'prava', label: 'Práva dotknutých osôb' },
  { id: 'cookies', label: 'Cookies a analytika' },
  { id: 'bezpecnost', label: 'Bezpečnosť' },
  { id: 'kontakt', label: 'Kontakt a sťažnosti' },
];

const OchranaOsobnychUdajov: React.FC = () => {
  return (
    <>
      <Section className="bg-white pt-16 pb-12">
        <Container className="max-w-5xl">
          <Badge variant="dark">GDPR</Badge>
          <H1 className="mb-6">Ochrana osobných údajov</H1>
          <Subtext className="mb-6">
            Transparentne vysvetľujeme, ako spracúvame vaše osobné údaje podľa nariadenia GDPR a slovenskej legislatívy.
          </Subtext>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-50 border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-vital-green" size={24} />
                <h3 className="text-xl font-bold text-slate-900">Úplné zodpovedanie</h3>
              </div>
              <p className="text-slate-600">Spracúvame iba nevyhnutné údaje, s jasným účelom a primeranými lehotami uchovávania.</p>
            </Card>
            <Card className="bg-slate-50 border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="text-vital-green" size={24} />
                <h3 className="text-xl font-bold text-slate-900">Vaše práva</h3>
              </div>
              <p className="text-slate-600">Kedykoľvek nás môžete požiadať o prístup, opravu, výmaz či obmedzenie spracúvania vašich údajov.</p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50 py-12">
        <Container className="max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 bg-white border-slate-100">
              <H2 className="text-2xl mb-4">Rýchla navigácia</H2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TOC.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 hover:border-vital-dark hover:text-vital-dark transition-colors"
                  >
                    <span>{item.label}</span>
                    <span aria-hidden>→</span>
                  </a>
                ))}
              </div>
            </Card>
            <Card className="bg-vital-dark text-white border-transparent shadow-lg shadow-vital-dark/20">
              <h3 className="text-xl font-bold mb-3">Potrebujete vysvetlenie?</h3>
              <p className="text-white/80 mb-4">Radi vám pomôžeme s akoukoľvek žiadosťou k ochrane údajov.</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Mail size={16} />
                  <a href="mailto:info@vitaltech.sk" className="hover:underline text-white">info@vitaltech.sk</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} />
                  <a href="tel:+421908051379" className="hover:underline text-white">+421 908 051 379</a>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section id="prevadzkovatel" className="bg-white">
        <Container className="max-w-5xl space-y-6">
          <H2 className="mb-2">Prevádzkovateľ</H2>
          <p className="text-slate-600">Vitaltech s.r.o., IČO: 55 123 456, so sídlom Landererova 8, 811 09 Bratislava, Slovensko.</p>
          <Card className="bg-slate-50 border-slate-100">
            <ul className="space-y-3 text-slate-700">
              <CheckItem>Kontakt pre GDPR: <a href="mailto:info@vitaltech.sk" className="text-vital-dark hover:underline">info@vitaltech.sk</a></CheckItem>
              <CheckItem>Telefón: <a href="tel:+421908051379" className="text-vital-dark hover:underline">+421 908 051 379</a></CheckItem>
              <CheckItem>Vitaltech nespracúva osobitné kategórie údajov (citlivé údaje) v rámci bežných služieb.</CheckItem>
            </ul>
          </Card>
        </Container>
      </Section>

      <Section id="ucely" className="bg-slate-50">
        <Container className="max-w-5xl space-y-6">
          <H2 className="mb-4">Účely spracúvania a právne základy</H2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Dopyty a kontaktné formuláre</h3>
              <p className="text-slate-600 mb-3">Účel: vybavenie dopytu, príprava ponuky alebo konzultácie.</p>
              <p className="text-slate-600">Právny základ: oprávnený záujem (čl. 6 ods. 1 f GDPR) a/alebo predzmluvný vzťah (čl. 6 ods. 1 b GDPR).</p>
            </Card>
            <Card className="bg-white border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Zmluvné plnenie a fakturácia</h3>
              <p className="text-slate-600 mb-3">Účel: uzavretie a plnenie zmluvy, správa vzťahu s klientmi.</p>
              <p className="text-slate-600">Právny základ: plnenie zmluvy (čl. 6 ods. 1 b) a zákonné povinnosti (účtovníctvo, daňové predpisy – čl. 6 ods. 1 c).</p>
            </Card>
            <Card className="bg-white border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Marketing a newsletter (ak je používaný)</h3>
              <p className="text-slate-600 mb-3">Účel: zasielanie informácií o službách, pozvánok na eventy.</p>
              <p className="text-slate-600">Právny základ: súhlas (čl. 6 ods. 1 a) GDPR). Súhlas môžete kedykoľvek odvolať.</p>
            </Card>
            <Card className="bg-white border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Zlepšovanie webu a bezpečnosť</h3>
              <p className="text-slate-600 mb-3">Účel: základná analytika, zabezpečenie a prevádzka webu.</p>
              <p className="text-slate-600">Právny základ: oprávnený záujem prevádzkovateľa na bezpečnej a funkčnej webovej prezentácii.</p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section id="kategorie" className="bg-white">
        <Container className="max-w-5xl space-y-6">
          <H2 className="mb-4">Kategórie osobných údajov</H2>
          <Card className="bg-slate-50 border-slate-100">
            <ul className="space-y-2 text-slate-700">
              <CheckItem>Identifikačné a kontaktné údaje (meno, priezvisko, e-mail, telefón, firma, pozícia).</CheckItem>
              <CheckItem>Údaje o komunikácii a dopyte (obsah správy, preferencie služieb, požiadavky na event/IT/marketing).</CheckItem>
              <CheckItem>Fakturačné údaje pri zmluvných vzťahoch (IČO, DIČ, adresa, bankové spojenie firmy).</CheckItem>
              <CheckItem>Technické údaje pri návšteve webu (IP adresa, logy servera, základné cookie identifikátory).</CheckItem>
            </ul>
          </Card>
        </Container>
      </Section>

      <Section id="prijemcovia" className="bg-slate-50">
        <Container className="max-w-5xl space-y-6">
          <H2 className="mb-4">Príjemcovia a spracovatelia</H2>
          <Card className="bg-white border-slate-100">
            <ul className="space-y-2 text-slate-700">
              <CheckItem>Účtovné a daňové služby (splnenie zákonných povinností).</CheckItem>
              <CheckItem>IT a hostingové služby (správa webu, servery, úložiská).</CheckItem>
              <CheckItem>Nástroje na marketing/analytiku, ak budú nasadené so súhlasom.</CheckItem>
              <CheckItem>Orgány verejnej moci, ak to vyžaduje zákon.</CheckItem>
            </ul>
          </Card>
        </Container>
      </Section>

      <Section id="prenosy" className="bg-white">
        <Container className="max-w-5xl space-y-4">
          <H2 className="mb-2">Prenosy mimo EÚ/EHP</H2>
          <Card className="bg-slate-50 border-slate-100">
            <p className="text-slate-700">Primárne nesprostredkúvame údaje mimo EÚ/EHP. Ak využijeme nástroj, ktorý prenáša údaje do tretích krajín (napr. cloudová služba), zabezpečíme primerané záruky podľa kapitoly V GDPR (štandardné zmluvné doložky, posúdenie rizík).</p>
          </Card>
        </Container>
      </Section>

      <Section id="doba" className="bg-slate-50">
        <Container className="max-w-5xl space-y-4">
          <H2 className="mb-2">Doby uchovávania</H2>
          <Card className="bg-white border-slate-100">
            <ul className="space-y-2 text-slate-700">
              <CheckItem>Dopyty a e-mailová komunikácia: 12 mesiacov od uzavretia komunikácie, ak nevznikne zmluva.</CheckItem>
              <CheckItem>Zmluvné údaje a fakturácia: podľa zákonných povinností (spravidla 10 rokov od konca účtovného obdobia).</CheckItem>
              <CheckItem>Marketing na základe súhlasu: do odvolania súhlasu alebo maximálne 3 roky od poslednej interakcie.</CheckItem>
              <CheckItem>Technické logy a bezpečnostné záznamy: obvykle 6 mesiacov, ak nejde o incident vyžadujúci dlhšie uchovanie.</CheckItem>
            </ul>
          </Card>
        </Container>
      </Section>

      <Section id="prava" className="bg-white">
        <Container className="max-w-5xl space-y-4">
          <H2 className="mb-3">Práva dotknutých osôb</H2>
          <Card className="bg-slate-50 border-slate-100">
            <ul className="space-y-2 text-slate-700">
              <CheckItem>Právo na prístup k údajom a na potvrdenie spracúvania.</CheckItem>
              <CheckItem>Právo na opravu nepresných alebo neúplných údajov.</CheckItem>
              <CheckItem>Právo na výmaz („právo byť zabudnutý“) v prípadoch stanovených GDPR.</CheckItem>
              <CheckItem>Právo na obmedzenie spracúvania a právo namietať proti oprávnenému záujmu.</CheckItem>
              <CheckItem>Právo na prenosnosť údajov (pri spracúvaní na základe súhlasu alebo zmluvy a automatizovane).</CheckItem>
              <CheckItem>Právo kedykoľvek odvolať súhlas, ak je právnym základom.</CheckItem>
              <CheckItem>Právo podať sťažnosť na Úrad na ochranu osobných údajov SR.</CheckItem>
            </ul>
          </Card>
        </Container>
      </Section>

      <Section id="cookies" className="bg-slate-50">
        <Container className="max-w-5xl space-y-4">
          <H2 className="mb-3">Cookies a analytika</H2>
          <Card className="bg-white border-slate-100">
            <p className="text-slate-700 mb-2">Web môže používať nevyhnutné cookies na zabezpečenie funkčnosti stránky (napr. router, preferencie). Voliteľné analytické alebo marketingové cookies nasadzujeme len na základe súhlasu, ak budú použité.</p>
            <p className="text-slate-700">Viac informácií o konkrétnych cookies (ak sú používané) bude dostupných v lište alebo nastaveniach súhlasov.</p>
          </Card>
        </Container>
      </Section>

      <Section id="bezpecnost" className="bg-white">
        <Container className="max-w-5xl space-y-4">
          <H2 className="mb-3">Bezpečnosť spracúvania</H2>
          <Card className="bg-slate-50 border-slate-100">
            <p className="text-slate-700">Uplatňujeme primerané technické a organizačné opatrenia (kontrola prístupu, šifrovanie prenosu, oddelené prístupy pre spracovateľov, pravidelné aktualizácie systémov). Prístup k údajom majú len oprávnené osoby viazané mlčanlivosťou.</p>
          </Card>
        </Container>
      </Section>

      <Section id="kontakt" className="bg-slate-50 pb-24">
        <Container className="max-w-5xl space-y-6">
          <H2 className="mb-2">Kontakt a sťažnosti</H2>
          <Card className="bg-white border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 text-slate-700">
                <CheckItem>E-mail: <a href="mailto:info@vitaltech.sk" className="text-vital-dark hover:underline">info@vitaltech.sk</a></CheckItem>
                <CheckItem>Telefón: <a href="tel:+421908051379" className="text-vital-dark hover:underline">+421 908 051 379</a></CheckItem>
                <CheckItem>Adresa: Vitaltech s.r.o., Landererova 8, 811 09 Bratislava</CheckItem>
              </div>
              <div className="space-y-3 text-slate-700">
                <CheckItem>Orgán dozoru: Úrad na ochranu osobných údajov SR, Hraničná 12, 820 07 Bratislava.</CheckItem>
                <CheckItem>Web: <a href="https://dataprotection.gov.sk" target="_blank" rel="noreferrer" className="text-vital-dark hover:underline">dataprotection.gov.sk</a></CheckItem>
                <CheckItem>Máte právo podať sťažnosť priamo na úrad, ak sa domnievate, že spracúvanie je v rozpore s GDPR.</CheckItem>
              </div>
            </div>
          </Card>
          <div className="flex flex-wrap items-center gap-3">
            <Button to="/kontakt" variant="primary" icon>Napísať nám</Button>
            <Button variant="outline" to="mailto:info@vitaltech.sk">E-mail</Button>
            <Button variant="ghost" to="tel:+421908051379">Zavolať</Button>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default OchranaOsobnychUdajov;

