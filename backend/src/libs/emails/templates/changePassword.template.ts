function recoveryEmailTemplate(email: string, templateData: Record<string, string>) {
  return `
    <!DOCTYPE html>
    <html>
     <head>
         <meta name="viewport" content="width=device-width">
         <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
     </head>
     <body>
      <h1 style="font-weight: normal;text-align: center">Change your password</h1>

      <div style="text-align: center">
        <p style="font-weight: normal; text-align: center">Click <a href="${templateData.domain}/change-password?token=${templateData.token}">Here</a> to change your contability app password</p>
        <span style="font-weight: normal; color: red;font-size: .9rem; text-align: center">This link is valid only for 5 minutes</span>
      </div>
     </body>
    </html>
    
    `;
}

export default recoveryEmailTemplate;
