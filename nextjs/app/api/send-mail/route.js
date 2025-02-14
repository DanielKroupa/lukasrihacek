import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, surname, phone, email, message } = await req.json();

    const { SMTP_HOST, SMTP_EMAIL, SMTP_PASSWORD, SMTP_PORT } = process.env;

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT || 587,
      secure: true,
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `${name} ${surname} <${email}>`,
      to: "kroupa.daniel98@seznam.cz",
      subject: "Zpráva z webu LukášŘiháček.cz",
      text: `
      <p><strong>Jméno:</strong> ${name} ${surname}</p>
      <p>Telefon: ${phone}</p>
      <p>Email: ${email}</p>
      <p>Zpráva ${message} </p>
      `,
      html: `
          <h3>Nová zpráva z formuláře webu</h3>
        <p><strong>Od:</strong> ${name} ${surname}</p><br>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>E-mail:</strong> ${email}</p><br>
        <p><strong>Zpráva:</strong></p>
        <pre>${message}</pre>
      `,
    });

    await transporter.sendMail({
      from: `"LukášŘiháček.cz" <${SMTP_EMAIL}>`,
      to: email, // E-mail uživatele
      subject: "Potvrzení objednání psychologických služeb",
      text: `
        Dobrý den,

        Děkuji za vaše oslovení a využití služeb přes náš web. 

        Brzy Vás budu kontaktovat a spojím se s Vámi.

        S přáním hezkého dne,
        Lukáš Řiháček.

        Telefon: 735 193 766
        E-mail: psycholog@lukasrihacek.cz

        P.S. Toto je automaticky generovaný E-mail. Prosíme, neodpovídejte na něj.
      `,
      html: `
        <h3>Potvrzení objednání psychologických služeb</h3>
        <p>Dobrý den,</p><br>
        <p>Děkuji za vaše oslovení a využití služeb přes náš web. </p><br>
        <p>Brzy Vás budu kontaktovat a spojím se s Vámi.</p><br>

        <p> S přáním hezkého dne,</p>
        <p>Lukáš Řiháček.</p><br>

        <p>Telefon: <strong><a href="tel:735 193 766">735 193 766</a></strong> </p>
        <p>E-mail: <strong><a href="mailto:psycholog@lukasrihacek.cz">psycholog@lukasrihacek.cz</a></strong></p><br>


      <p>P.S. Toto je automaticky generovaný E-mail. Prosíme, neodpovídejte na něj.</p><br>
      `,
    });

    return Response.json(
      { message: "E-mail byl úspěšně odeslán." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Chyba při odesílání e-mailu:", error); // Vypiš chybu do konzole

    return Response.json(
      { message: "Chyba při odesílání e-mailu." },
      { status: 500 }
    );
  }
}
