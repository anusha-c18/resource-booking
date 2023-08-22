const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const display = () => {
  console.log(domain, clientId);
};

display();

export { domain, clientId };
