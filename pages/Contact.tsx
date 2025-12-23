import React, { useState } from 'react';
import { Container, Section, H1, Subtext, Button, Card } from '../components/ui/DesignSystem';
import { Mail, Phone, MapPin, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'eventy',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Nepodarilo sa odoslať správu.');
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Reset form data for potential new submission
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: 'eventy',
        message: ''
      });

    } catch (err) {
      console.error('Form submission error:', err);
      setError(err instanceof Error ? err.message : 'Nastala neočakávaná chyba. Skúste to prosím znova.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Section className="bg-slate-50 pt-12 pb-12">
        <Container>
          <H1 className="mb-6">Kontaktujte nás</H1>
          <Subtext className="max-w-2xl">
            Máte záujem o naše služby? Vyplňte formulár alebo nám zavolajte. Tešíme sa na spoluprácu.
          </Subtext>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Form */}
            <div>
              {submitted ? (
                <Card className="bg-teal-50 border-teal-100 text-center py-12">
                  <div className="mx-auto w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Ďakujeme za správu!</h3>
                  <p className="text-slate-600 mb-2">
                    Vaša požiadavka bola úspešne odoslaná.
                  </p>
                  <p className="text-teal-700 font-medium mb-6">
                    📧 Potvrdenie sme vám zaslali na email.
                  </p>
                  <p className="text-slate-500 text-sm mb-6">
                    Náš kolega vás bude kontaktovať do 24 hodín.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline">
                    Odoslať ďalšiu správu
                  </Button>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-slate-700">Meno a priezvisko *</label>
                      <input 
                        required 
                        type="text" 
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                        placeholder="Ján Novák"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium text-slate-700">Firma / Organizácia</label>
                      <input 
                        type="text" 
                        name="company"
                        id="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                        placeholder="Názov firmy"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-slate-700">Email *</label>
                      <input 
                        required 
                        type="email" 
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                        placeholder="jan@firma.sk"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-slate-700">Telefón</label>
                      <input 
                        type="tel" 
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                        placeholder="+421 908 051 379"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-medium text-slate-700">O ktorú službu máte záujem?</label>
                    <div className="relative">
                      <select 
                        name="service" 
                        id="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                      >
                        <option value="eventy">Eventy & Priestory</option>
                        <option value="it">IT Servis & PC riešenia</option>
                        <option value="reklama">Marketing & Reklama</option>
                        <option value="ine">Iné / Kombinácia služieb</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-slate-700">Správa *</label>
                    <textarea 
                      required 
                      name="message"
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Popíšte stručne vašu požiadavku..."
                    ></textarea>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                      <AlertCircle className="flex-shrink-0" size={20} />
                      <p className="text-sm font-medium">{error}</p>
                    </div>
                  )}

                  <Button variant="primary" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={20} />
                        Odosielam...
                      </>
                    ) : (
                      'Odoslať nezáväzný dopyt'
                    )}
                  </Button>
                  <p className="text-xs text-slate-400 text-center mt-4">
                    Odoslaním súhlasíte so spracovaním osobných údajov pre účely kontaktovania.
                  </p>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Kontaktné údaje</h3>
                <div className="space-y-6">
                   <div className="flex items-start gap-4">
                     <div className="bg-teal-50 p-3 rounded-xl text-teal-700">
                       <MapPin />
                     </div>
                     <div>
                       <h4 className="font-bold text-slate-900">Sídlo spoločnosti</h4>
                       <p className="text-slate-600">Vitaltech s.r.o.<br/>Landererova 8<br/>811 09 Bratislava</p>
                       <p className="text-xs text-slate-400 mt-2">
                         IČO: 53433785<br/>
                         DIČ: 2121366984
                       </p>
                     </div>
                   </div>

                   <div className="flex items-start gap-4">
                     <div className="bg-teal-50 p-3 rounded-xl text-teal-700">
                       <Mail />
                     </div>
                     <div>
                       <h4 className="font-bold text-slate-900">Email</h4>
                       <a href="mailto:info@vitaltech.sk" className="text-slate-600 hover:text-teal-600 transition-colors">info@vitaltech.sk</a>
                     </div>
                   </div>

                   <div className="flex items-start gap-4">
                     <div className="bg-teal-50 p-3 rounded-xl text-teal-700">
                       <Phone />
                     </div>
                     <div>
                       <h4 className="font-bold text-slate-900">Telefón</h4>
                       <a href="tel:+421908051379" className="text-slate-600 hover:text-teal-600 transition-colors">+421 908 051 379</a>
                       <p className="text-sm text-slate-400 mt-1">Po-Pia: 8:00 - 17:00</p>
                     </div>
                   </div>
                </div>
              </div>

              <div className="bg-slate-900 text-slate-300 p-8 rounded-3xl">
                <h3 className="text-white font-bold text-lg mb-4">Čo sa stane po odoslaní?</h3>
                <ol className="space-y-4 relative border-l border-slate-700 ml-2 pl-6">
                  <li className="relative">
                    <span className="absolute -left-[1.95rem] top-1 h-3 w-3 rounded-full bg-teal-500"></span>
                    <strong>Potvrdenie:</strong> Príde vám automatický email o prijatí dopytu.
                  </li>
                  <li className="relative">
                    <span className="absolute -left-[1.95rem] top-1 h-3 w-3 rounded-full bg-slate-600"></span>
                    <strong>Kontakt:</strong> Náš manažér vás bude kontaktovať do 24 hodín.
                  </li>
                  <li className="relative">
                    <span className="absolute -left-[1.95rem] top-1 h-3 w-3 rounded-full bg-slate-600"></span>
                    <strong>Návrh:</strong> Preberieme detaily a pripravíme ponuku na mieru.
                  </li>
                </ol>
              </div>
            </div>

          </div>
        </Container>
      </Section>
    </>
  );
};

export default Contact;
