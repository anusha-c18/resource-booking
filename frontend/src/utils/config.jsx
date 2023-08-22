const domain = process.env.AUTH0_DOMAIN;
const clientId = process.env.AUTH0_CLIENT_ID;

const display = () => {
  console.log(domain, clientId);
};

display();

export { domain, clientId };
