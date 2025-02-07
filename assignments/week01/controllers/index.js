const nameRoute = (req, res) => {
  const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Name Route</title>
          <style>
              body {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 30rem;
                  margin: 0;
                  background-color: rgb(17, 24, 33);
                  color: #61dafb;
                  font-family: 'Arial', sans-serif;
                  font-size: 2rem;
                  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
              }
              .message {
                  padding: 20px;
                  border: 2px solid #61dafb;
                  border-radius: 10px;
                  background-color: rgba(0, 0, 0, 0);
                  box-shadow: 0 0 20px rgba(97, 218, 251, 0.5);
              }
          </style>
      </head>
      <body>
          <div class="message">
              Hudson and Alene Thomson!
          </div>
      </body>
      </html>
  `;

  res.send(htmlContent);
};

module.exports = {
  nameRoute
};
