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

// Logo URL - using a reliable public URL or embedded SVG fallback logic would be here,
// but for email clients, a hosted image is best.
// Using the raw GitHub content URL or your Vercel URL is a good bet.
const LOGO_URL = 'https://vitaltech.sk/logo_vitaltech.svg'; // Assuming this is accessible

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
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; color: #334155; }
    table { border-collapse: collapse; }
    .content-box { background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
    .header { background-color: #0f172a; padding: 40px 20px; text-align: center; }
    .main-content { padding: 40px; }
    .footer { background-color: #0f172a; padding: 30px; text-align: center; color: #94a3b8; font-size: 14px; }
    .button { display: inline-block; padding: 12px 24px; background-color: #0d9488; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 20px; }
    .message-box { background-color: #f1f5f9; border-radius: 12px; padding: 20px; margin: 24px 0; border-left: 4px solid #0d9488; }
    .step-number { width: 32px; height: 32px; background-color: #0d9488; color: white; border-radius: 50%; text-align: center; line-height: 32px; font-weight: bold; display: inline-block; margin-right: 15px; }
    .step-item { margin-bottom: 20px; }
    
    /* Dark mode override */
    @media (prefers-color-scheme: dark) {
      .content-box { background-color: #ffffff !important; color: #334155 !important; }
      h1, h2, h3, p, td { color: #334155 !important; }
      .header h1 { color: #ffffff !important; }
      .footer p, .footer a { color: #94a3b8 !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 10px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" class="content-box" style="background-color: #ffffff; width: 100%; max-width: 600px; margin: 0 auto; border-radius: 16px; overflow: hidden;">
          
          <!-- Header with Logo -->
          <tr>
            <td class="header" style="background-color: #0f172a; padding: 40px 20px; text-align: center;">
              <!-- Using img tag with width for Outlook compatibility -->
              <img src="https://vitaltech.vercel.app/white.svg" alt="Vitaltech" width="180" style="display: block; margin: 0 auto; width: 180px; height: auto; border: 0;" />
            </td>
          </tr>
          
          <!-- Success Message -->
          <tr>
            <td class="main-content" style="padding: 40px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-bottom: 24px;">
                    <h1 style="margin: 0; font-size: 24px; color: #0f172a; font-weight: 700;">Ďakujeme za váš dopyt!</h1>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #334155;">
                      Dobrý deň, <strong>${firstName}</strong>,
                    </p>
                    <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #334155;">
                      Váš záujem o službu <strong style="color: #0d9488;">${serviceName}</strong> si veľmi vážime. 
                      Správu sme úspešne prijali a už sa jej venujeme.
                    </p>
                  </td>
                </tr>
                
                <!-- User's Message Review -->
                <tr>
                  <td>
                    <div class="message-box" style="background-color: #f1f5f9; padding: 20px; border-radius: 12px; margin: 10px 0 30px 0; border-left: 4px solid #0d9488;">
                      <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: 700; letter-spacing: 0.5px;">Vaša správa:</p>
                      <p style="margin: 0; font-size: 15px; font-style: italic; color: #334155; line-height: 1.5;">"${message}"</p>
                    </div>
                  </td>
                </tr>

                <!-- Next Steps -->
                <tr>
                  <td>
                    <h3 style="margin: 0 0 20px 0; font-size: 18px; color: #0f172a;">Čo bude nasledovať?</h3>
                    
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 15px;">
                      <tr>
                        <td width="50" valign="top" style="padding-bottom: 20px;">
                          <div style="background-color: #0d9488; width: 32px; height: 32px; border-radius: 50%; color: #ffffff; text-align: center; line-height: 32px; font-weight: bold;">1</div>
                        </td>
                        <td valign="top" style="padding-bottom: 20px;">
                          <strong style="display: block; color: #0f172a; margin-bottom: 4px;">Kontakt od nášho tímu</strong>
                          <span style="color: #475569; font-size: 14px;">Ozveme sa vám do 24 hodín na dohodnutie detailov.</span>
                        </td>
                      </tr>
                      <tr>
                        <td width="50" valign="top" style="padding-bottom: 20px;">
                          <div style="background-color: #cbd5e1; width: 32px; height: 32px; border-radius: 50%; color: #475569; text-align: center; line-height: 32px; font-weight: bold;">2</div>
                        </td>
                        <td valign="top" style="padding-bottom: 20px;">
                          <strong style="display: block; color: #0f172a; margin-bottom: 4px;">Príprava ponuky</strong>
                          <span style="color: #475569; font-size: 14px;">Na základe konzultácie pripravíme riešenie na mieru.</span>
                        </td>
                      </tr>
                      <tr>
                        <td width="50" valign="top">
                          <div style="background-color: #cbd5e1; width: 32px; height: 32px; border-radius: 50%; color: #475569; text-align: center; line-height: 32px; font-weight: bold;">3</div>
                        </td>
                        <td valign="top">
                          <strong style="display: block; color: #0f172a; margin-bottom: 4px;">Realizácia</strong>
                          <span style="color: #475569; font-size: 14px;">Po schválení sa pustíme do práce.</span>
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
            <td class="footer" style="background-color: #0f172a; padding: 40px 20px; text-align: center;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                     <a href="https://vitaltech.sk" style="text-decoration: none; color: #ffffff; font-weight: bold; font-size: 16px;">www.vitaltech.sk</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
                    Vitaltech s.r.o.<br>
                    Landererova 8, 811 09 Bratislava<br>
                    <a href="mailto:info@vitaltech.sk" style="color: #0d9488; text-decoration: none;">info@vitaltech.sk</a> | <a href="tel:+421908051379" style="color: #0d9488; text-decoration: none;">+421 908 051 379</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 20px; color: #64748b; font-size: 12px;">
                    © ${new Date().getFullYear()} Vitaltech s.r.o. Všetky práva vyhradené.
                  </td>
                </tr>
              </table>
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
  <title>Nový dopyt</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9; color: #334155;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; width: 100%; max-width: 600px; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #0d9488; padding: 25px 30px;">
              <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600;">🔔 Nový dopyt z webu</h2>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                
                <!-- Service -->
                <tr>
                  <td style="padding-bottom: 20px; border-bottom: 1px solid #e2e8f0;">
                    <p style="margin: 0 0 5px 0; font-size: 12px; text-transform: uppercase; color: #94a3b8; font-weight: 600; letter-spacing: 0.5px;">Služba</p>
                    <p style="margin: 0; font-size: 18px; color: #0d9488; font-weight: 700;">${serviceName}</p>
                  </td>
                </tr>

                <!-- Contact Info -->
                <tr>
                  <td style="padding: 20px 0; border-bottom: 1px solid #e2e8f0;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="50%" valign="top">
                          <p style="margin: 0 0 5px 0; font-size: 12px; text-transform: uppercase; color: #94a3b8; font-weight: 600;">Meno</p>
                          <p style="margin: 0 0 15px 0; font-size: 16px; color: #1e293b; font-weight: 600;">${name}</p>
                          
                          <p style="margin: 0 0 5px 0; font-size: 12px; text-transform: uppercase; color: #94a3b8; font-weight: 600;">Firma</p>
                          <p style="margin: 0; font-size: 16px; color: #1e293b;">${company || '-'}</p>
                        </td>
                        <td width="50%" valign="top">
                          <p style="margin: 0 0 5px 0; font-size: 12px; text-transform: uppercase; color: #94a3b8; font-weight: 600;">Email</p>
                          <p style="margin: 0 0 15px 0; font-size: 16px; color: #0d9488;"><a href="mailto:${email}" style="color: #0d9488; text-decoration: none;">${email}</a></p>
                          
                          <p style="margin: 0 0 5px 0; font-size: 12px; text-transform: uppercase; color: #94a3b8; font-weight: 600;">Telefón</p>
                          <p style="margin: 0; font-size: 16px; color: #1e293b;">${phone || '-'}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Message -->
                <tr>
                  <td style="padding-top: 20px;">
                    <p style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; color: #94a3b8; font-weight: 600;">Správa</p>
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
                      <p style="margin: 0; font-size: 15px; color: #475569; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                    </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 15px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">Odoslané z kontaktného formulára na vitaltech.sk</p>
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
