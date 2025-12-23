import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

// Initialize MailerSend
const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

// Service mapping for Slovak names
const serviceNames = {
  eventy: 'Eventy & Priestory',
  it: 'IT Servis & PC riešenia',
  reklama: 'Marketing & Reklama',
  ine: 'Iné / Kombinácia služieb'
};

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, company, email, phone, service, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Vyplňte prosím všetky povinné polia.' 
      });
    }

    const serviceName = serviceNames[service] || service;

    // 1. Send confirmation email to the customer
    const customerEmailParams = new EmailParams()
      .setFrom(new Sender('info@vitaltech.sk', 'Vitaltech'))
      .setTo([new Recipient(email, name)])
      .setSubject('Ďakujeme za váš dopyt | Vitaltech')
      .setHtml(generateCustomerEmail({ name, serviceName, message }));

    await mailerSend.email.send(customerEmailParams);

    // 2. Send notification email to internal team
    const teamEmailParams = new EmailParams()
      .setFrom(new Sender('info@vitaltech.sk', 'Kontaktný formulár'))
      .setTo([new Recipient('info@vitaltech.sk', 'Vitaltech Team')])
      .setReplyTo(new Recipient(email, name))
      .setSubject(`Nový dopyt: ${serviceName} - ${name}`)
      .setHtml(generateTeamNotificationEmail({ name, company, email, phone, serviceName, message }));

    await mailerSend.email.send(teamEmailParams);

    console.log('✅ Emails sent successfully');

    res.status(200).json({ 
      success: true, 
      message: 'Vaša správa bola úspešne odoslaná. Potvrdenie vám prišlo na email.' 
    });

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Nepodarilo sa odoslať správu. Skúste to prosím znova.' 
    });
  }
}

// Customer confirmation email template
function generateCustomerEmail({ name, serviceName, message }) {
  const firstName = name.split(' ')[0];
  
  return `
<!DOCTYPE html>
<html lang="sk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Potvrdenie dopytu | Vitaltech</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px; text-align: center;">
              <img src="https://vitaltech.sk/logo_vitaltech.svg" alt="Vitaltech" style="height: 40px; margin-bottom: 20px;" />
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">
                Ďakujeme za váš dopyt!
              </h1>
            </td>
          </tr>
          
          <!-- Success Icon -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center;">
              <div style="display: inline-block; background-color: #ecfdf5; border-radius: 50%; padding: 20px;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <p style="font-size: 18px; color: #475569; margin: 0 0 24px 0; text-align: center;">
                Dobrý deň, <strong style="color: #0f172a;">${firstName}</strong>!
              </p>
              <p style="font-size: 16px; color: #64748b; line-height: 1.6; margin: 0 0 24px 0; text-align: center;">
                Váš dopyt ohľadom <strong style="color: #0d9488;">${serviceName}</strong> sme úspešne prijali. 
                Náš kolega vás bude kontaktovať <strong>do 24 hodín</strong>.
              </p>
              
              <!-- Message Box -->
              <div style="background-color: #f1f5f9; border-radius: 16px; padding: 24px; margin: 24px 0;">
                <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin: 0 0 12px 0; font-weight: 600;">
                  Vaša správa
                </p>
                <p style="font-size: 15px; color: #475569; line-height: 1.6; margin: 0; font-style: italic;">
                  "${message}"
                </p>
              </div>
            </td>
          </tr>
          
          <!-- What's Next Section -->
          <tr>
            <td style="background-color: #f8fafc; padding: 32px 40px;">
              <h3 style="font-size: 16px; color: #0f172a; margin: 0 0 20px 0; font-weight: 600;">
                Čo bude nasledovať?
              </h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom: 16px;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="vertical-align: top; padding-right: 16px;">
                          <div style="width: 28px; height: 28px; background-color: #0d9488; border-radius: 50%; text-align: center; line-height: 28px; color: white; font-weight: bold; font-size: 14px;">1</div>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.5;">
                            <strong style="color: #0f172a;">Kontakt od nášho tímu</strong><br/>
                            Ozveme sa vám do 24 hodín na dohodnutie detailov.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 16px;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="vertical-align: top; padding-right: 16px;">
                          <div style="width: 28px; height: 28px; background-color: #64748b; border-radius: 50%; text-align: center; line-height: 28px; color: white; font-weight: bold; font-size: 14px;">2</div>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.5;">
                            <strong style="color: #0f172a;">Príprava ponuky</strong><br/>
                            Na základe konzultácie pripravíme ponuku na mieru.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="vertical-align: top; padding-right: 16px;">
                          <div style="width: 28px; height: 28px; background-color: #64748b; border-radius: 50%; text-align: center; line-height: 28px; color: white; font-weight: bold; font-size: 14px;">3</div>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.5;">
                            <strong style="color: #0f172a;">Začíname spoluprácu</strong><br/>
                            Po schválení rozbehnem realizáciu projektu.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; padding: 32px 40px; text-align: center;">
              <p style="color: #94a3b8; font-size: 14px; margin: 0 0 16px 0;">
                Máte otázky? Neváhajte nás kontaktovať.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                <tr>
                  <td style="padding: 0 12px;">
                    <a href="tel:+421908051379" style="color: #ffffff; text-decoration: none; font-size: 14px;">
                      📞 +421 908 051 379
                    </a>
                  </td>
                  <td style="padding: 0 12px;">
                    <a href="mailto:info@vitaltech.sk" style="color: #ffffff; text-decoration: none; font-size: 14px;">
                      ✉️ info@vitaltech.sk
                    </a>
                  </td>
                </tr>
              </table>
              <hr style="border: none; border-top: 1px solid #334155; margin: 24px 0;" />
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} Vitaltech s.r.o. | Landererova 8, 811 09 Bratislava
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Team notification email template
function generateTeamNotificationEmail({ name, company, email, phone, serviceName, message }) {
  return `
<!DOCTYPE html>
<html lang="sk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); padding: 24px 32px;">
              <h1 style="color: #ffffff; font-size: 20px; font-weight: 600; margin: 0;">
                🔔 Nový dopyt z webu
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom: 16px; border-bottom: 1px solid #e2e8f0;">
                    <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin: 0 0 4px 0;">Služba</p>
                    <p style="font-size: 16px; color: #0d9488; font-weight: 600; margin: 0;">${serviceName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #e2e8f0;">
                    <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin: 0 0 4px 0;">Kontakt</p>
                    <p style="font-size: 16px; color: #0f172a; font-weight: 600; margin: 0;">${name}</p>
                    ${company ? `<p style="font-size: 14px; color: #64748b; margin: 4px 0 0 0;">${company}</p>` : ''}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #e2e8f0;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="50%">
                          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin: 0 0 4px 0;">Email</p>
                          <a href="mailto:${email}" style="font-size: 14px; color: #0d9488; text-decoration: none;">${email}</a>
                        </td>
                        <td width="50%">
                          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin: 0 0 4px 0;">Telefón</p>
                          ${phone ? `<a href="tel:${phone}" style="font-size: 14px; color: #0d9488; text-decoration: none;">${phone}</a>` : '<span style="color: #94a3b8;">-</span>'}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 16px;">
                    <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin: 0 0 8px 0;">Správa</p>
                    <div style="background-color: #f8fafc; border-radius: 12px; padding: 16px; border-left: 4px solid #0d9488;">
                      <p style="font-size: 15px; color: #475569; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f1f5f9; padding: 20px 32px; text-align: center;">
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                Automaticky odoslané z kontaktného formulára na vitaltech.sk
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

