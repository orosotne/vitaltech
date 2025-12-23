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

// Logo URL - PNG pre lepšiu kompatibilitu s email klientmi
const LOGO_URL = 'https://vitaltech.vercel.app/logo_vitaltech_-01.png';

// Stary base64 - zaloha
const LOGO_BASE64_OLD = 'data:image/png;base64,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';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A/99/wP//eAv8D/33gL/A/99/wP//eAv8D/33gL/A/99/wP+/cP+gL/A/99+CKT3T+rr8g/6Fhv/+SP/wG/P9/gr8F9Y3+Ar8T+Bf//M/gr/B/X+gr8T+Bf//d9+gr/B/X+gr8T+Bf//M/gr/B/X+gr8T+Bf//M/gr/B/X+gr8T+Bf//M/gr/B/X+gr8T+Bf//M/gr/B/X+gr8T+Bf//M/gr/B/X+gr8T+Bf//M/gr/B/X+gr8T+Bf+/cP+gL/A/99+CKT3T+rr8g/6Fhv/+SP/wG/P9/gr8F9Y3+Ar8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf+/cP+gL/A/99+CKT3T+rr8g/6Fhv/+SP/wG/P9/gr8F9Y3+Ar8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf+/cP+gL/A/99+CKT3T+rr8g/6Fhv/+SP/wG/P9/gr8F9Y3+Ar8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf+/cP+gL/A/99+CKT3T+rr8g/6Fhv/+SP/wG/P9/gr8F9Y3+Ar8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf/3d9+gr/B/X+gr8T+Bf';
// const LOGO_URL = LOGO_BASE64; // stare - nefungovalo

// Customer confirmation email template
function generateCustomerEmail({ name, serviceName, message }) {
  const firstName = name.split(' ')[0];
  
  return `
<!DOCTYPE html>
<html lang="sk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Potvrdenie dopytu | Vitaltech</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc !important; color: #1e293b !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
  <div style="display: none; max-height: 0; overflow: hidden;">Ďakujeme za váš dopyt - potvrdenie od Vitaltech</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc !important; padding: 40px 20px;">
    <tr>
      <td align="center" style="background-color: #f8fafc !important;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff !important; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #0f172a !important; padding: 40px; text-align: center;">
              <img src="${LOGO_URL}" alt="Vitaltech" width="150" style="display: block; margin: 0 auto 20px auto; width: 150px; height: auto; max-width: 150px;" />
              <h1 style="color: #ffffff !important; font-size: 28px; font-weight: 700; margin: 0; letter-spacing: -0.5px; background-color: transparent !important;">
                Ďakujeme za váš dopyt!
              </h1>
            </td>
          </tr>
          
          <!-- Success Icon -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center; background-color: #ffffff !important;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                <tr>
                  <td style="background-color: #ecfdf5 !important; border-radius: 50%; padding: 20px; text-align: center;">
                    <span style="font-size: 32px; line-height: 1;">✅</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 0 40px 40px 40px; background-color: #ffffff !important;">
              <p style="font-size: 18px; color: #475569 !important; margin: 0 0 24px 0; text-align: center; background-color: transparent !important;">
                Dobrý deň, <strong style="color: #0f172a !important;">&#8203;${firstName}</strong>!
              </p>
              <p style="font-size: 16px; color: #64748b !important; line-height: 1.6; margin: 0 0 24px 0; text-align: center; background-color: transparent !important;">
                Váš dopyt ohľadom <strong style="color: #0d9488 !important;">&#8203;${serviceName}</strong> sme úspešne prijali. 
                Náš kolega vás bude kontaktovať <strong style="color: #0f172a !important;">do 24 hodín</strong>.
              </p>
              
              <!-- Message Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 24px 0;">
                <tr>
                  <td style="background-color: #f1f5f9 !important; border-radius: 16px; padding: 24px;">
                    <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8 !important; margin: 0 0 12px 0; font-weight: 600; background-color: transparent !important;">
                      VAŠA SPRÁVA
                    </p>
                    <p style="font-size: 15px; color: #475569 !important; line-height: 1.6; margin: 0; font-style: italic; background-color: transparent !important;">
                      "${message}"
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- What's Next Section -->
          <tr>
            <td style="background-color: #f8fafc !important; padding: 32px 40px;">
              <h3 style="font-size: 16px; color: #0f172a !important; margin: 0 0 20px 0; font-weight: 600; background-color: transparent !important;">
                Čo bude nasledovať?
              </h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding-bottom: 16px; background-color: transparent !important;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="vertical-align: top; padding-right: 16px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="width: 28px; height: 28px; background-color: #0d9488 !important; border-radius: 50%; text-align: center; line-height: 28px; color: #ffffff !important; font-weight: bold; font-size: 14px;">1</td>
                            </tr>
                          </table>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0; color: #475569 !important; font-size: 14px; line-height: 1.5; background-color: transparent !important;">
                            <strong style="color: #0f172a !important;">Kontakt od nášho tímu</strong><br/>
                            Ozveme sa vám do 24 hodín na dohodnutie detailov.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 16px; background-color: transparent !important;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="vertical-align: top; padding-right: 16px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="width: 28px; height: 28px; background-color: #64748b !important; border-radius: 50%; text-align: center; line-height: 28px; color: #ffffff !important; font-weight: bold; font-size: 14px;">2</td>
                            </tr>
                          </table>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0; color: #475569 !important; font-size: 14px; line-height: 1.5; background-color: transparent !important;">
                            <strong style="color: #0f172a !important;">Príprava ponuky</strong><br/>
                            Na základe konzultácie pripravíme ponuku na mieru.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: transparent !important;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="vertical-align: top; padding-right: 16px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="width: 28px; height: 28px; background-color: #64748b !important; border-radius: 50%; text-align: center; line-height: 28px; color: #ffffff !important; font-weight: bold; font-size: 14px;">3</td>
                            </tr>
                          </table>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0; color: #475569 !important; font-size: 14px; line-height: 1.5; background-color: transparent !important;">
                            <strong style="color: #0f172a !important;">Začíname spoluprácu</strong><br/>
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
            <td style="background-color: #0f172a !important; padding: 32px 40px; text-align: center;">
              <p style="color: #94a3b8 !important; font-size: 14px; margin: 0 0 16px 0; background-color: transparent !important;">
                Máte otázky? Neváhajte nás kontaktovať.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                <tr>
                  <td style="padding: 0 12px; background-color: transparent !important;">
                    <a href="tel:+421908051379" style="color: #ffffff !important; text-decoration: none; font-size: 14px; white-space: nowrap;">
                      📞 +421 908 051 379
                    </a>
                  </td>
                  <td style="padding: 0 12px; background-color: transparent !important;">
                    <a href="mailto:info@vitaltech.sk" style="color: #ffffff !important; text-decoration: none; font-size: 14px;">
                      ✉️ info@vitaltech.sk
                    </a>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 24px 0;">
                <tr>
                  <td style="border-top: 1px solid #334155; height: 1px; font-size: 1px; line-height: 1px;">&nbsp;</td>
                </tr>
              </table>
              <p style="color: #64748b !important; font-size: 12px; margin: 0; background-color: transparent !important;">
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
                          ${phone ? `<a href="tel:${phone}" style="font-size: 14px; color: #0d9488; text-decoration: none; white-space: nowrap;">${phone}</a>` : '<span style="color: #94a3b8;">-</span>'}
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
